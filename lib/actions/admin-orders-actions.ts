"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "./auth-actions";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

export interface OrderFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus | "all";
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderUpdateData {
  status?: OrderStatus;
}

/**
 * Get orders with pagination, search, and filters
 */
export async function getOrders(filters: OrderFilters = {}) {
  await requireAdmin();

  const {
    page = 1,
    limit = 10,
    search,
    status,
    dateFrom,
    dateTo,
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: Record<string, unknown> = {};

  // Search filter
  if (search) {
    where.OR = [
      { id: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { shippingAddress: { contains: search, mode: "insensitive" } },
      {
        items: {
          some: {
            product: {
              name: { contains: search, mode: "insensitive" },
            },
          },
        },
      },
    ];
  }

  // Status filter
  if (status && status !== "all") {
    where.status = status;
  }

  // Date range filter
  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) {
      (where.createdAt as Record<string, Date>).gte = new Date(dateFrom);
    }
    if (dateTo) {
      (where.createdAt as Record<string, Date>).lte = new Date(dateTo);
    }
  }

  // Fetch orders and total count
  const [orders, total] = await Promise.all([
    db.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
      },
    }),
    db.order.count({ where }),
  ]);

  return {
    orders,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId: string) {
  await requireAdmin();

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              images: true,
              price: true,
              sku: true,
            },
          },
        },
      },
    },
  });

  return order;
}

/**
 * Update order status
 */
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await requireAdmin();

  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return {
        success: false,
        error: "Order not found",
      };
    }

    await db.order.update({
      where: { id: orderId },
      data: { status },
    });

    revalidatePath("/admin/orders");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update order status",
    };
  }
}

/**
 * Get order statistics
 */
export async function getOrderStats() {
  await requireAdmin();

  const [
    totalOrders,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue,
  ] = await Promise.all([
    db.order.count(),
    db.order.count({ where: { status: "PENDING" } }),
    db.order.count({ where: { status: "PROCESSING" } }),
    db.order.count({ where: { status: "SHIPPED" } }),
    db.order.count({ where: { status: "DELIVERED" } }),
    db.order.count({ where: { status: "CANCELLED" } }),
    db.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: {
          in: ["DELIVERED", "SHIPPED", "PROCESSING"],
        },
      },
    }),
  ]);

  return {
    totalOrders,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
  };
}

/**
 * Get recent orders for dashboard
 */
export async function getRecentOrdersForAdmin(limit: number = 10) {
  await requireAdmin();

  const orders = await db.order.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        take: 1,
        include: {
          product: {
            select: {
              name: true,
              images: true,
            },
          },
        },
      },
    },
  });

  return orders;
}

/**
 * Get orders by status for dashboard widgets
 */
export async function getOrdersByStatus() {
  await requireAdmin();

  const statuses: OrderStatus[] = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const ordersByStatus = await Promise.all(
    statuses.map((status) =>
      db.order.count({
        where: { status },
      })
    )
  );

  return statuses.reduce(
    (acc, status, index) => {
      acc[status] = ordersByStatus[index];
      return acc;
    },
    {} as Record<OrderStatus, number>
  );
}

/**
 * Get sales over time (for charts)
 */
export async function getSalesOverTime(period: "7d" | "30d" | "90d" = "30d") {
  await requireAdmin();

  const now = new Date();
  const startDate = new Date();

  switch (period) {
    case "7d":
      startDate.setDate(now.getDate() - 7);
      break;
    case "30d":
      startDate.setDate(now.getDate() - 30);
      break;
    case "90d":
      startDate.setDate(now.getDate() - 90);
      break;
  }

  const orders = await db.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
      status: {
        in: ["DELIVERED", "SHIPPED", "PROCESSING"],
      },
    },
    select: {
      totalAmount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Group by day
  const salesByDay = new Map<string, number>();

  for (
    let d = new Date(startDate);
    d <= now;
    d.setDate(d.getDate() + 1)
  ) {
    const dateStr = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    salesByDay.set(dateStr, 0);
  }

  orders.forEach((order) => {
    const dateStr = order.createdAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const current = salesByDay.get(dateStr) || 0;
    salesByDay.set(dateStr, current + order.totalAmount);
  });

  return Array.from(salesByDay.entries()).map(([date, amount]) => ({
    date,
    amount,
  }));
}

/**
 * Export orders to CSV
 */
export async function exportOrdersToCSV(filters?: OrderFilters) {
  await requireAdmin();

  try {
    const { orders } = await getOrders({ ...filters, limit: 10000 });

    const headers = [
      "Order ID",
      "Date",
      "Customer Name",
      "Customer Email",
      "Total Amount",
      "Status",
      "Items Count",
      "Shipping Address",
    ];

    const rows = orders.map((order) => [
      order.id,
      order.createdAt.toISOString(),
      order.user?.name || "Guest",
      order.email,
      order.totalAmount,
      order.status,
      order.items.length,
      `"${order.shippingAddress.replace(/"/g, '""')}"`,
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    return {
      success: true,
      data: csv,
    };
  } catch (error) {
    console.error("Error exporting orders:", error);
    return {
      success: false,
      error: "Failed to export orders",
    };
  }
}

/**
 * Delete an order (only cancelled or pending)
 */
export async function deleteOrder(orderId: string) {
  await requireAdmin();

  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return {
        success: false,
        error: "Order not found",
      };
    }

    if (!["CANCELLED", "PENDING"].includes(order.status)) {
      return {
        success: false,
        error: "Can only delete cancelled or pending orders",
      };
    }

    await db.order.delete({
      where: { id: orderId },
    });

    revalidatePath("/admin/orders");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting order:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete order",
    };
  }
}
