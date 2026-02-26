"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "./auth-actions";

export interface AnalyticsDateRange {
  from: string;
  to: string;
  label?: string;
}

/**
 * Get comprehensive analytics data
 */
export async function getAnalyticsData(dateRange?: AnalyticsDateRange) {
  await requireAdmin();

  const now = new Date();
  const from = dateRange?.from
    ? new Date(dateRange.from)
    : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // Default: last 30 days
  const to = dateRange?.to ? new Date(dateRange.to) : now;

  // Previous period for comparison
  const daysDiff = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  const prevFrom = new Date(from.getTime() - daysDiff * 24 * 60 * 60 * 1000);
  const prevTo = new Date(from.getTime() - 1);

  // Current period data
  const [
    currentRevenue,
    currentOrders,
    currentAvgOrderValue,
    currentCustomers,
    currentRefunds,
  ] = await Promise.all([
    db.order.aggregate({
      _sum: { totalAmount: true },
      where: {
        createdAt: { gte: from, lte: to },
        status: { in: ["DELIVERED", "SHIPPED", "PROCESSING"] },
      },
    }),
    db.order.count({
      where: {
        createdAt: { gte: from, lte: to },
      },
    }),
    db.order.aggregate({
      _avg: { totalAmount: true },
      where: {
        createdAt: { gte: from, lte: to },
        status: { in: ["DELIVERED", "SHIPPED", "PROCESSING"] },
      },
    }),
    db.user.count({
      where: {
        createdAt: { gte: from, lte: to },
      },
    }),
    db.order.count({
      where: {
        createdAt: { gte: from, lte: to },
        status: "CANCELLED",
      },
    }),
  ]);

  // Previous period data for comparison
  const [
    prevRevenue,
    prevOrders,
  ] = await Promise.all([
    db.order.aggregate({
      _sum: { totalAmount: true },
      where: {
        createdAt: { gte: prevFrom, lte: prevTo },
        status: { in: ["DELIVERED", "SHIPPED", "PROCESSING"] },
      },
    }),
    db.order.count({
      where: {
        createdAt: { gte: prevFrom, lte: prevTo },
      },
    }),
  ]);

  const totalRevenue = currentRevenue._sum.totalAmount || 0;
  const totalOrders = currentOrders;
  const avgOrderValue = currentAvgOrderValue._avg.totalAmount || 0;
  const newCustomers = currentCustomers;
  const refundRate = currentOrders > 0 ? (currentRefunds / currentOrders) * 100 : 0;

  // Calculate percentage changes
  const revenueChange = prevRevenue._sum.totalAmount && prevRevenue._sum.totalAmount > 0
    ? ((totalRevenue - prevRevenue._sum.totalAmount) / prevRevenue._sum.totalAmount) * 100
    : 0;

  const ordersChange = prevOrders > 0
    ? ((totalOrders - prevOrders) / prevOrders) * 100
    : 0;

  // Net income (assuming 75% profit margin)
  const netIncome = totalRevenue * 0.75;

  // Customer acquisition cost (simplified - would need marketing spend data)
  const cac = newCustomers > 0 ? 42.50 : 0;

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    newCustomers,
    refundRate,
    netIncome,
    cac,
    revenueChange,
    ordersChange,
    period: {
      from,
      to,
    },
  };
}

/**
 * Get revenue breakdown by category
 */
export async function getRevenueByCategory(dateRange?: AnalyticsDateRange) {
  await requireAdmin();

  const now = new Date();
  const from = dateRange?.from
    ? new Date(dateRange.from)
    : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const to = dateRange?.to ? new Date(dateRange.to) : now;

  // Get all order items in the date range
  const orderItems = await db.orderItem.findMany({
    where: {
      order: {
        createdAt: { gte: from, lte: to },
        status: { in: ["DELIVERED", "SHIPPED", "PROCESSING"] },
      },
    },
    include: {
      product: {
        select: {
          category: true,
        },
      },
    },
  });

  // Aggregate by category
  const categoryRevenue = new Map<string, number>();

  orderItems.forEach((item) => {
    const category = item.product.category;
    const revenue = item.price * item.quantity;
    const current = categoryRevenue.get(category) || 0;
    categoryRevenue.set(category, current + revenue);
  });

  // Convert to array and calculate percentages
  const totalRevenue = Array.from(categoryRevenue.values()).reduce((a, b) => a + b, 0);

  return Array.from(categoryRevenue.entries()).map(([category, revenue]) => ({
    category,
    revenue,
    percentage: totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0,
  })).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Get regional sales data
 */
export async function getRegionalSalesData(dateRange?: AnalyticsDateRange) {
  await requireAdmin();

  const now = new Date();
  const from = dateRange?.from
    ? new Date(dateRange.from)
    : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const to = dateRange?.to ? new Date(dateRange.to) : now;

  const orders = await db.order.findMany({
    where: {
      createdAt: { gte: from, lte: to },
      status: { in: ["DELIVERED", "SHIPPED", "PROCESSING"] },
    },
    select: {
      totalAmount: true,
      shippingAddress: true,
    },
  });

  // Simple region extraction from shipping address
  const regionMap: Record<string, string> = {
    "USA": "North America",
    "US": "North America",
    "United States": "North America",
    "Canada": "North America",
    "Mexico": "North America",
    "UK": "Europe",
    "United Kingdom": "Europe",
    "Germany": "Europe",
    "France": "Europe",
    "Spain": "Europe",
    "Italy": "Europe",
    "Netherlands": "Europe",
    "China": "Asia Pacific",
    "Japan": "Asia Pacific",
    "Australia": "Asia Pacific",
    "India": "Asia Pacific",
    "Singapore": "Asia Pacific",
    "Brazil": "South America",
    "Argentina": "South America",
  };

  const regionSales = new Map<string, number>();

  orders.forEach((order) => {
    let region = "Other";
    const address = order.shippingAddress.toLowerCase();

    for (const [country, r] of Object.entries(regionMap)) {
      if (address.includes(country.toLowerCase())) {
        region = r;
        break;
      }
    }

    const current = regionSales.get(region) || 0;
    regionSales.set(region, current + order.totalAmount);
  });

  const totalRevenue = Array.from(regionSales.values()).reduce((a, b) => a + b, 0);

  return Array.from(regionSales.entries()).map(([region, revenue]) => ({
    region,
    revenue,
    percentage: totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0,
    orderCount: orders.filter((o) => {
      if (region === "Other") {
        return !Object.values(regionMap).some((r) => 
          o.shippingAddress.toLowerCase().includes(Object.entries(regionMap).find(([_, v]) => v === r)?.[0].toLowerCase() || "")
        );
      }
      return Object.entries(regionMap)
        .filter(([_, r]) => r === region)
        .some(([country]) => o.shippingAddress.toLowerCase().includes(country.toLowerCase()));
    }).length,
  })).sort((a, b) => b.revenue - a.revenue);
}

/**
 * Get top selling products
 */
export async function getTopSellingProducts(limit: number = 10, dateRange?: AnalyticsDateRange) {
  await requireAdmin();

  const now = new Date();
  const from = dateRange?.from
    ? new Date(dateRange.from)
    : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const to = dateRange?.to ? new Date(dateRange.to) : now;

  const orderItems = await db.orderItem.findMany({
    where: {
      order: {
        createdAt: { gte: from, lte: to },
        status: { in: ["DELIVERED", "SHIPPED", "PROCESSING"] },
      },
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          category: true,
        },
      },
    },
  });

  // Aggregate by product
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

  return Array.from(productSales.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
}

/**
 * Get customer analytics
 */
export async function getCustomerAnalytics(dateRange?: AnalyticsDateRange) {
  await requireAdmin();

  const now = new Date();
  const from = dateRange?.from
    ? new Date(dateRange.from)
    : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const to = dateRange?.to ? new Date(dateRange.to) : now;

  const [
    totalCustomers,
    newCustomers,
    returningCustomers,
    activeCustomers,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({
      where: {
        createdAt: { gte: from, lte: to },
      },
    }),
    db.user.count({
      where: {
        orders: {
          some: {
            createdAt: { gte: from, lte: to },
          },
        },
        createdAt: { lt: from },
      },
    }),
    db.user.count({
      where: {
        orders: {
          some: {
            createdAt: { gte: from, lte: to },
          },
        },
      },
    }),
  ]);

  return {
    totalCustomers,
    newCustomers,
    returningCustomers,
    activeCustomers,
    retentionRate: activeCustomers > 0 ? (returningCustomers / activeCustomers) * 100 : 0,
  };
}

/**
 * Get daily sales data for charts
 */
export async function getDailySalesData(days: number = 30) {
  await requireAdmin();

  const now = new Date();
  const from = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const orders = await db.order.findMany({
    where: {
      createdAt: { gte: from },
      status: { in: ["DELIVERED", "SHIPPED", "PROCESSING"] },
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
  const salesByDay = new Map<string, { sales: number; orders: number }>();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    salesByDay.set(dateStr, { sales: 0, orders: 0 });
  }

  orders.forEach((order) => {
    const dateStr = order.createdAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const current = salesByDay.get(dateStr) || { sales: 0, orders: 0 };
    salesByDay.set(dateStr, {
      sales: current.sales + order.totalAmount,
      orders: current.orders + 1,
    });
  });

  return Array.from(salesByDay.entries()).map(([date, data]) => ({
    date,
    sales: data.sales,
    orders: data.orders,
  }));
}

/**
 * Get inventory analytics
 */
export async function getInventoryAnalytics() {
  await requireAdmin();

  const [
    totalProducts,
    lowStockProducts,
    outOfStockProducts,
    totalInventoryValue,
  ] = await Promise.all([
    db.product.count(),
    db.product.count({
      where: {
        stock: { lte: 10, gt: 0 },
        isArchived: false,
      },
    }),
    db.product.count({
      where: {
        stock: 0,
        isArchived: false,
      },
    }),
    db.product.aggregate({
      _sum: {
        stock: true,
      },
      where: {
        isArchived: false,
      },
    }),
  ]);

  // Calculate total inventory value
  const products = await db.product.findMany({
    where: {
      isArchived: false,
    },
    select: {
      price: true,
      stock: true,
    },
  });

  const inventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  return {
    totalProducts,
    lowStockProducts,
    outOfStockProducts,
    totalInventoryValue: inventoryValue,
  };
}
