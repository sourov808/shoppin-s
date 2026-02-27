"use client";

import { useEffect, useState } from "react";
import { getAnalyticsData, getRevenueByCategory, getRegionalSalesData, getDailySalesData } from "@/lib/actions/admin-analytics-actions";
import { formatCurrency } from "@/lib/utils";

interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  newCustomers: number;
  refundRate: number;
  netIncome: number;
  cac: number;
  revenueChange: number;
  ordersChange: number;
}

interface CategoryData {
  category: string;
  revenue: number;
  percentage: number;
}

interface RegionData {
  region: string;
  revenue: number;
  percentage: number;
  orderCount: number;
}

interface DailySalesData {
  date: string;
  sales: number;
  orders: number;
}

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [dailySales, setDailySales] = useState<DailySalesData[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAnalyticsData(),
      getRevenueByCategory(),
      getRegionalSalesData(),
      getDailySalesData(30),
    ])
      .then(([analyticsRes, categoryRes, regionRes, dailyRes]) => {
        setAnalytics(analyticsRes);
        setCategoryData(categoryRes);
        setRegionData(regionRes);
        setDailySales(dailyRes);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="flex-1 px-6 md:px-10 py-8 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-slate-500">Loading analytics...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-6 md:px-10 py-8 max-w-[1440px] mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">Analytics Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base mt-1">Comprehensive insights into your store performance.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-[#2a1d1a] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              Last 30 Days
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-lg">download</span>
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Core Metrics */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Net Income"
            value={formatCurrency(analytics.netIncome)}
            change={analytics.revenueChange}
            icon="savings"
            color="emerald"
          />
          <MetricCard
            title="Avg. Order Value"
            value={formatCurrency(analytics.avgOrderValue)}
            change={analytics.ordersChange}
            icon="shopping_cart"
            color="blue"
          />
          <MetricCard
            title="Customer Acquisition Cost"
            value={formatCurrency(analytics.cac)}
            change={-2.4}
            icon="person_add"
            color="orange"
          />
          <MetricCard
            title="Refund Rate"
            value={`${analytics.refundRate.toFixed(1)}%`}
            change={analytics.refundRate > 5 ? 15 : -15}
            icon="refund"
            color="red"
          />
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Breakdown */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue by Category</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Breakdown of revenue across product categories</p>
            </div>
          </div>
          
          {categoryData.length > 0 ? (
            <div className="space-y-4">
              {categoryData.map((cat) => (
                <div key={cat.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{formatCategory(cat.category)}</span>
                    <span className="text-slate-500 dark:text-slate-400">{formatCurrency(cat.revenue)} ({cat.percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getCategoryColor(cat.category)}`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-400 py-8">No sales data available</div>
          )}
        </div>

        {/* Top Sales Regions */}
        <div className="bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Sales Regions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Revenue distribution by region</p>
            </div>
          </div>
          
          {regionData.length > 0 ? (
            <div className="space-y-4">
              {regionData.slice(0, 5).map((region, index) => (
                <div key={region.region} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getRegionColor(index)}`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{region.region}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{region.orderCount} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(region.revenue)}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{region.percentage.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-400 py-8">No regional data available</div>
          )}
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="mt-8 bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sales Trend</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Daily sales over the last 30 days</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-lg">30 Days</button>
            <button className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">90 Days</button>
            <button className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">1 Year</button>
          </div>
        </div>
        
        {dailySales.length > 0 ? (
          <SalesChart data={dailySales} />
        ) : (
          <div className="text-center text-slate-400 py-12">No sales trend data available</div>
        )}
      </div>
    </main>
  );
}

// Metric Card Component
function MetricCard({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: "emerald" | "blue" | "orange" | "red";
}) {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${change >= 0 ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>
          {change >= 0 ? "+" : ""}{change.toFixed(1)}%
        </span>
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="text-2xl font-bold mt-1 tracking-tight text-slate-900 dark:text-white">{value}</h3>
    </div>
  );
}

// Sales Chart Component
function SalesChart({ data }: { data: DailySalesData[] }) {
  const maxValue = Math.max(...data.map((d) => d.sales), 1);
  
  return (
    <div className="h-[300px] w-full relative">
      <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f44725" stopOpacity="0.3"></stop>
            <stop offset="100%" stopColor="#f44725" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="0"
            y1={i * 75}
            x2="1000"
            y2={i * 75}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
        ))}
        
        {/* Area path */}
        <path
          d={`M0,300 L0,${300 - (data[0]?.sales || 0) / maxValue * 250} ${data.map((d, i) => 
            `L${(i / (data.length - 1)) * 1000},${300 - d.sales / maxValue * 250}`
          ).join(" ")} L1000,300 Z`}
          fill="url(#chartGradient)"
        />
        
        {/* Line path */}
        <path
          d={`M0,${300 - (data[0]?.sales || 0) / maxValue * 250} ${data.map((d, i) => 
            `L${(i / (data.length - 1)) * 1000},${300 - d.sales / maxValue * 250}`
          ).join(" ")}`}
          fill="none"
          stroke="#f44725"
          strokeLinecap="round"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {data.filter((_, i) => i % 5 === 0).map((d, i) => {
          const index = data.findIndex((item, idx) => idx % 5 === 0 && item.date === d.date);
          const x = (index / (data.filter((_, idx) => idx % 5 === 0).length - 1)) * 1000;
          const y = 300 - d.sales / maxValue * 250;
          return (
            <circle
              key={d.date}
              cx={x}
              cy={y}
              fill="#f44725"
              r="4"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      
      {/* Day labels */}
      <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium px-2">
        {data.filter((_, i) => i % 6 === 0).map((d) => (
          <span key={d.date}>{d.date}</span>
        ))}
      </div>
    </div>
  );
}

// Helper functions
function formatCategory(category: string): string {
  return category.charAt(0) + category.slice(1).toLowerCase();
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    HEADPHONES: "bg-primary",
    SPEAKERS: "bg-blue-500",
    ACCESSORIES: "bg-purple-500",
    WEARABLES: "bg-orange-500",
    SMARTPHONES: "bg-emerald-500",
    TABLETS: "bg-red-500",
  };
  return colors[category] || "bg-slate-500";
}

function getRegionColor(index: number): string {
  const colors = ["bg-primary", "bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-emerald-500"];
  return colors[index % colors.length];
}
