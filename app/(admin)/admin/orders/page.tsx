"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getOrders,
  updateOrderStatus,
  getOrderStats,
  exportOrdersToCSV,
} from "@/lib/actions/admin-orders-actions";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { OrderStatus } from "@prisma/client";

interface Order {
  id: string;
  userId: string | null;
  status: OrderStatus;
  totalAmount: number;
  shippingCost: number;
  taxAmount: number;
  shippingAddress: string;
  billingAddress: string | null;
  email: string;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      images: string[];
    };
  }>;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

const statusOptions: { value: OrderStatus | "all"; label: string; color: string }[] = [
  { value: "all", label: "All Statuses", color: "slate" },
  { value: "PENDING", label: "Pending", color: "orange" },
  { value: "PROCESSING", label: "Processing", color: "blue" },
  { value: "SHIPPED", label: "Shipped", color: "purple" },
  { value: "DELIVERED", label: "Delivered", color: "emerald" },
  { value: "CANCELLED", label: "Cancelled", color: "red" },
];

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState<OrderStatus | "all">(searchParams.get("status") as OrderStatus || "all");

  // Load stats and orders
  useEffect(() => {
    setLoading(true);
    startTransition(async () => {
      const page = parseInt(searchParams.get("page") || "1");
      const searchParam = searchParams.get("search") || "";
      const statusParam = (searchParams.get("status") as OrderStatus) || "all";

      const [ordersResult, statsResult] = await Promise.all([
        getOrders({
          page,
          limit: 10,
          search: searchParam || undefined,
          status: statusParam !== "all" ? statusParam : undefined,
        }),
        getOrderStats(),
      ]);

      setOrders(ordersResult.orders);
      setPagination(ordersResult.pagination);
      setStats(statsResult);
      setLoading(false);
    });
  }, [searchParams]);

  // Update URL params
  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search });
  };

  // Handle status update
  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    if (!confirm(`Are you sure you want to update this order status to ${newStatus}?`)) return;

    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    } else {
      alert(result.error || "Failed to update order status");
    }
  };

  // Handle export
  const handleExport = async () => {
    const result = await exportOrdersToCSV({
      page: 1,
      limit: 10000,
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") as OrderStatus || undefined,
    });

    if (result.success && result.data) {
      const blob = new Blob([result.data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Get status badge color
  const getStatusColor = (orderStatus: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      PENDING: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      PROCESSING: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      SHIPPED: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      DELIVERED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return colors[orderStatus] || colors.PENDING;
  };

  // Pagination helpers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const { page, totalPages } = pagination;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(page);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <main className="flex-1 px-6 md:px-10 py-8 max-w-[1440px] mx-auto w-full">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-[#1a0f0d] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</span>
              <span className="material-symbols-outlined text-slate-400">shopping_bag</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalOrders.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-[#1a0f0d] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending</span>
              <span className="material-symbols-outlined text-orange-500">schedule</span>
            </div>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.pendingOrders.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-[#1a0f0d] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">In Transit</span>
              <span className="material-symbols-outlined text-blue-500">local_shipping</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.processingOrders + stats.shippedOrders}</p>
          </div>
          <div className="bg-white dark:bg-[#1a0f0d] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</span>
              <span className="material-symbols-outlined text-emerald-500">payments</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">Order Management</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base mt-1">Track and manage all customer orders from one place.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-[#2a1d1a] transition-colors shadow-sm disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">file_download</span>
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 outline-none"
              placeholder="Search by Order ID, customer, product..."
              type="text"
            />
          </form>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[160px]">
              <select
                value={status}
                onChange={(e) => updateFilters({ status: e.target.value })}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border-none rounded-lg py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none text-slate-900 dark:text-slate-100"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="text-slate-500">Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <span className="material-symbols-outlined text-4xl mb-2">receipt_long</span>
                    <p>No orders found</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {formatDate(order.createdAt, { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {order.user?.name || "Guest"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            {item.product.images?.[0] ? (
                              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-xs text-slate-400">image</span>
                              </div>
                            )}
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <span className="text-xs text-slate-500">+{order.items.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-none cursor-pointer outline-none ${getStatusColor(order.status)}`}
                      >
                        {statusOptions.filter((s) => s.value !== "all").map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-xl">visibility</span>
                        </button>
                        <button
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors"
                          title="Print Invoice"
                        >
                          <span className="material-symbols-outlined text-xl">print</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination.totalPages > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900 dark:text-white">{pagination.page}</span> to{" "}
              <span className="font-bold text-slate-900 dark:text-white">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{" "}
              <span className="font-bold text-slate-900 dark:text-white">{pagination.total}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="px-2 text-slate-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => handlePageChange(page as number)}
                    className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium ${
                      page === pagination.page
                        ? "bg-primary text-white"
                        : "border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
