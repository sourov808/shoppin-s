"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "./auth-actions";

/**
 * Get dashboard statistics for admin
 */
export async function getDashboardStats() {
  await requireAdmin();

  try {
    // Get total revenue
    const totalRevenueResult = await db.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: {
          in: ["DELIVERED", "SHIPPED", "PROCESSING"],
        },
      },
    });

    // Get total orders count
    const totalOrders = await db.order.count();

    // Get average order value
    const avgOrderValueResult = await db.order.aggregate({
      _avg: {
        totalAmount: true,
      },
    });

    // Get active users (users who have placed orders in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsers = await db.user.count({
      where: {
        orders: {
          some: {
            createdAt: {
              gte: thirtyDaysAgo,
            },
          },
        },
      },
    });

    // Get orders from last 30 days for comparison
    const previousOrders = await db.order.count({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
          gte: new Date(thirtyDaysAgo.getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const currentOrders = await db.order.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Calculate percentage changes
    const ordersChange = previousOrders > 0 
      ? ((currentOrders - previousOrders) / previousOrders) * 100 
      : 0;

    const totalRevenue = totalRevenueResult._sum.totalAmount || 0;
    const avgOrderValue = avgOrderValueResult._avg.totalAmount || 0;

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      activeUsers,
      ordersChange,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard statistics");
  }
}

/**
 * Get recent orders for dashboard
 */
export async function getRecentOrders(limit: number = 5) {
  await requireAdmin();

  try {
    const orders = await db.order.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }
}

/**
 * Get top selling products
 */
export async function getTopSellingProducts(limit: number = 5) {
  await requireAdmin();

  try {
    const orderItems = await db.orderItem.findMany({
      include: {
        product: true,
      },
    });

    // Aggregate sales by product
    const productSales = new Map<
      string,
      { product: typeof orderItems[0]["product"]; quantity: number; revenue: number }
    >();

    orderItems.forEach((item) => {
      const existing = productSales.get(item.productId);
      if (existing) {
        existing.quantity += item.quantity;
        existing.revenue += item.price * item.quantity;
      } else {
        productSales.set(item.productId, {
          product: item.product,
          quantity: item.quantity,
          revenue: item.price * item.quantity,
        });
      }
    });

    // Convert to array and sort by quantity
    const topProducts = Array.from(productSales.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);

    return topProducts;
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    return [];
  }
}

/**
 * Get recent activity for dashboard
 */
export async function getRecentActivity(limit: number = 10) {
  await requireAdmin();

  try {
    const [recentOrders, recentUsers] = await Promise.all([
      db.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true },
          },
        },
      }),
      db.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const activity = [
      ...recentOrders.map((order) => ({
        type: "order" as const,
        title: `New order #${order.id.slice(-6).toUpperCase()} placed by ${
          order.user?.name || order.email
        }`,
        timestamp: order.createdAt,
        icon: "shopping_cart_checkout",
      })),
      ...recentUsers.map((user) => ({
        type: "user" as const,
        title: `New customer registered: ${user.name}`,
        timestamp: user.createdAt,
        icon: "person_add",
      })),
    ];

    // Sort by timestamp and return
    return activity
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return [];
  }
}

/**
 * Get low stock products
 */
export async function getLowStockProducts(threshold: number = 10) {
  await requireAdmin();

  try {
    const products = await db.product.findMany({
      where: {
        stock: {
          lte: threshold,
          gt: 0,
        },
        isArchived: false,
      },
      orderBy: {
        stock: "asc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    return [];
  }
}

/**
 * Get sales data for chart (last 7 days)
 */
export async function getSalesChartData() {
  await requireAdmin();

  try {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const orders = await db.order.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
        status: {
          in: ["DELIVERED", "SHIPPED", "PROCESSING"],
        },
      },
      select: {
        totalAmount: true,
        createdAt: true,
      },
    });

    // Group by day
    const salesByDay = new Map<string, number>();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString("en-US", { weekday: "short" });
      salesByDay.set(dateStr, 0);
    }

    orders.forEach((order) => {
      const dateStr = order.createdAt.toLocaleDateString("en-US", { weekday: "short" });
      const current = salesByDay.get(dateStr) || 0;
      salesByDay.set(dateStr, current + order.totalAmount);
    });

    return Array.from(salesByDay.entries()).map(([day, amount]) => ({
      day,
      amount,
    }));
  } catch (error) {
    console.error("Error fetching sales chart data:", error);
    return [];
  }
}
