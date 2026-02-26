import {
  getDashboardStats,
  getRecentActivity,
  getTopSellingProducts,
  getSalesChartData,
  getLowStockProducts,
} from "@/lib/actions/admin-actions";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  const [stats, activity, topProducts, salesData, lowStockProducts] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(10),
    getTopSellingProducts(5),
    getSalesChartData(),
    getLowStockProducts(10),
  ]);

  // Calculate percentage changes (mock data for now - can be enhanced with historical data)
  const revenueChange = 12.5;
  const avgOrderValueChange = 5.1;
  const activeUsersChange = 18.2;

  return (
    <main className="flex-1 flex flex-col">
      {/* Dashboard Body */}
      <div className="p-8 space-y-8 w-full max-w-[1440px] mx-auto">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-slate-400">Monitor your store&apos;s performance and manage your business from one place.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className={`text-xs font-bold ${revenueChange >= 0 ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' : 'text-red-600 bg-red-100 dark:bg-red-900/30'} px-2 py-1 rounded-full`}>
                {revenueChange >= 0 ? '+' : ''}{revenueChange.toFixed(1)}%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">{formatCurrency(stats.totalRevenue)}</h3>
          </div>

          <div className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <span className={`text-xs font-bold ${stats.ordersChange >= 0 ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' : 'text-red-600 bg-red-100 dark:bg-red-900/30'} px-2 py-1 rounded-full`}>
                {stats.ordersChange >= 0 ? '+' : ''}{stats.ordersChange.toFixed(1)}%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">{stats.totalOrders.toLocaleString()}</h3>
          </div>

          <div className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 flex items-center justify-center">
                <span className="material-symbols-outlined">shopping_bag</span>
              </div>
              <span className={`text-xs font-bold ${avgOrderValueChange >= 0 ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' : 'text-red-600 bg-red-100 dark:bg-red-900/30'} px-2 py-1 rounded-full`}>
                {avgOrderValueChange >= 0 ? '+' : ''}{avgOrderValueChange.toFixed(1)}%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Order Value</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">{formatCurrency(stats.avgOrderValue)}</h3>
          </div>

          <div className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined">person</span>
              </div>
              <span className={`text-xs font-bold ${activeUsersChange >= 0 ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' : 'text-red-600 bg-red-100 dark:bg-red-900/30'} px-2 py-1 rounded-full`}>
                {activeUsersChange >= 0 ? '+' : ''}{activeUsersChange.toFixed(1)}%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Users</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">{stats.activeUsers.toLocaleString()}</h3>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Overview Chart Container */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold">Sales Overview</h3>
                <p className="text-sm text-slate-500">Revenue trajectory for the last 7 days</p>
              </div>
              <div className="flex items-center gap-2">
                <select className="text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-1 pl-3 pr-8 focus:ring-1 focus:ring-primary outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 6 Months</option>
                </select>
              </div>
            </div>
            <div className="h-[300px] w-full relative">
              {salesData.length > 0 ? (
                <SalesChart data={salesData} />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  No sales data available
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Recent Activity</h3>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1 overflow-y-auto max-h-[400px]">
              {activity.length > 0 ? (
                activity.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="size-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{formatDate(item.timestamp)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8">No recent activity</div>
              )}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h4 className="text-sm font-bold text-primary">Need more power?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Upgrade to Enterprise plan to unlock advanced analytics and multi-store management.</p>
              <button className="mt-3 w-full py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">Upgrade Now</button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Best Selling Products & Low Stock Alert */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Selling Products */}
          <div className="bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold">Top Selling Products</h3>
              <button className="text-sm font-semibold px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">Export Report</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Total Sales</th>
                    <th className="px-6 py-4 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {topProducts.length > 0 ? (
                    topProducts.map((item) => (
                      <tr key={item.product.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden">
                              {item.product.images?.[0] ? (
                                <img 
                                  src={item.product.images[0]} 
                                  alt={item.product.name} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <span className="material-symbols-outlined text-sm">image</span>
                                </div>
                              )}
                            </div>
                            <span className="text-sm font-bold">{item.product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{formatCurrency(item.product.price)}</td>
                        <td className="px-6 py-4 text-sm">
                          {item.product.stock <= 0 ? (
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full text-xs font-bold">Out of Stock</span>
                          ) : item.product.stock <= 10 ? (
                            <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full text-xs font-bold">Low Stock ({item.product.stock})</span>
                          ) : (
                            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full text-xs font-bold">In Stock</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{item.quantity}</td>
                        <td className="px-6 py-4 text-sm font-bold text-right">{formatCurrency(item.revenue)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                        No products sold yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-lg font-bold">Low Stock Alert</h3>
              <button className="text-sm font-semibold px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">View All</button>
            </div>
            <div className="p-6 space-y-4">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0 overflow-hidden">
                        {product.images?.[0] ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{product.name}</p>
                        <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-600">{product.stock} left</p>
                      <button className="text-xs text-primary hover:underline mt-1">Restock</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8">
                  <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
                  <p>All products are well stocked</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Sales Chart Component
function SalesChart({ data }: { data: { day: string; amount: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.amount), 1);
  
  return (
    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
      <defs>
        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f44725" stopOpacity="0.2"></stop>
          <stop offset="100%" stopColor="#f44725" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
      
      {/* Grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="0"
          y1={i * 100}
          x2="1000"
          y2={i * 100}
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
      ))}
      
      {/* Area path */}
      <path
        d={`M0,300 L0,${300 - (data[0]?.amount || 0) / maxValue * 250} L${data.map((d, i) => 
          `${(i / (data.length - 1)) * 1000},${300 - d.amount / maxValue * 250}`
        ).join(" L")} L1000,300 Z`}
        fill="url(#chartGradient)"
      />
      
      {/* Line path */}
      <path
        d={`M0,${300 - (data[0]?.amount || 0) / maxValue * 250} ${data.map((d, i) => 
          `L${(i / (data.length - 1)) * 1000},${300 - d.amount / maxValue * 250}`
        ).join(" ")}`}
        fill="none"
        stroke="#f44725"
        strokeLinecap="round"
        strokeWidth="3"
      />
      
      {/* Data points */}
      {data.map((d, i) => (
        <g key={i}>
          <circle
            cx={(i / (data.length - 1)) * 1000}
            cy={300 - d.amount / maxValue * 250}
            fill="#f44725"
            r="5"
            stroke="white"
            strokeWidth="2"
          />
          <text
            x={(i / (data.length - 1)) * 1000}
            y={280 - d.amount / maxValue * 250}
            textAnchor="middle"
            className="text-xs fill-slate-600 dark:fill-slate-400"
            fontSize="12"
          >
            ${d.amount.toFixed(0)}
          </text>
        </g>
      ))}
      
      {/* Day labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={(i / (data.length - 1)) * 1000}
          y="295"
          textAnchor="middle"
          className="text-xs fill-slate-400 font-medium"
          fontSize="12"
        >
          {d.day}
        </text>
      ))}
    </svg>
  );
}
