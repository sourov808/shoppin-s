export default function AdminDashboard() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Dashboard Body */}
      <div className="p-8 space-y-8 w-full max-w-[1440px] mx-auto">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-slate-400">Monitor your store's performance and manage your business from one place.</p>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">$45,231.89</h3>
          </div>
          
          <div className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">-2.4%</span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Orders</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">1,205</h3>
          </div>
          
          <div className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 flex items-center justify-center">
                <span className="material-symbols-outlined">shopping_bag</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">+5.1%</span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Order Value</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">$37.54</h3>
          </div>
          
          <div className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined">person</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">+18.2%</span>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Users</p>
            <h3 className="text-2xl font-bold mt-1 tracking-tight">892</h3>
          </div>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Overview Chart Container */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold">Sales Overview</h3>
                <p className="text-sm text-slate-500">Revenue trajectory for the last 30 days</p>
              </div>
              <div className="flex items-center gap-2">
                <select className="text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-1 pl-3 pr-8 focus:ring-1 focus:ring-primary outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
            </div>
            <div className="h-[300px] w-full relative">
              {/* SVG Chart Simulation */}
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f44725" stopOpacity="0.2"></stop>
                    <stop offset="100%" stopColor="#f44725" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0,250 Q100,230 200,180 T400,150 T600,80 T800,100 T1000,40" fill="none" stroke="#f44725" strokeLinecap="round" strokeWidth="3"></path>
                <path d="M0,250 Q100,230 200,180 T400,150 T600,80 T800,100 T1000,40 V300 H0 Z" fill="url(#chartGradient)"></path>
                {/* Points */}
                <circle cx="200" cy="180" fill="#f44725" r="4" stroke="white" strokeWidth="2"></circle>
                <circle cx="400" cy="150" fill="#f44725" r="4" stroke="white" strokeWidth="2"></circle>
                <circle cx="600" cy="80" fill="#f44725" r="4" stroke="white" strokeWidth="2"></circle>
                <circle cx="1000" cy="40" fill="#f44725" r="4" stroke="white" strokeWidth="2"></circle>
              </svg>
              <div className="flex justify-between mt-6 text-xs text-slate-400 font-medium px-2">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Feed */}
          <div className="bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Recent Activity</h3>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-6 flex-1">
              <div className="flex gap-4">
                <div className="size-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                  <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
                </div>
                <div>
                  <p className="text-sm">New order <span className="font-bold">#ORD-3942</span> placed by Sarah Miller</p>
                  <p className="text-xs text-slate-400 mt-0.5">2 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
                <div>
                  <p className="text-sm">New customer registered: <span className="font-bold">David Chen</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">45 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                  <span className="material-symbols-outlined text-[20px]">inventory</span>
                </div>
                <div>
                  <p className="text-sm">Product <span className="font-bold">MacBook Air M2</span> is low in stock</p>
                  <p className="text-xs text-slate-400 mt-0.5">3 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                  <span className="material-symbols-outlined text-[20px]">star</span>
                </div>
                <div>
                  <p className="text-sm">New 5-star review from <span className="font-bold">Jessica L.</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </div>
                <div>
                  <p className="text-sm">Payout of <span className="font-bold">$12,400.00</span> processed successfully</p>
                  <p className="text-xs text-slate-400 mt-0.5">Yesterday</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h4 className="text-sm font-bold text-primary">Need more power?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Upgrade to Enterprise plan to unlock advanced analytics and multi-store management.</p>
              <button className="mt-3 w-full py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">Upgrade Now</button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section: Best Selling Products */}
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
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZkXM5H5r_FseTl9CMeOaAmqppAgcTJH9QRIfJ3vRkPU9PXuYMCcOF63ZdZT0kP8ReSpuVgtgsnxCim9G8bj2WDbHvqLicmBq_iPjnHh5SLQF0w75Uzdcd7vMMSrZfSTHUlks6whA4uyWdszQoEx55YLBq-Akdht2OBP3XHJTlFAFQZzNgQoDn499eo-gk-r8y64MjSIU3XTk5d6HhE9PRmKla7X8NpjMOhNwAVeo-OOObobfAbWNw0HAxrhGuA8E0b-6OL54G9k8" className="w-full h-full object-cover rounded-lg" alt="Watch" />
                      </div>
                      <span className="text-sm font-bold">Digital Quartz Watch</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">$89.00</td>
                  <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full text-xs font-bold">In Stock</span></td>
                  <td className="px-6 py-4 text-sm font-medium">854</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">$76,006.00</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMESpC3wzXymVdDdJucgjRwDKOIrjCG08xYQ54mV9TKe6HknzjKDq1wW0AAA9nV6KNbHhg7CCn3mNZNw-tU9h1VCE0GVUCrme7sdeevF25XKJJau2lR2MNzDQ8K11n70RIMhZP3nZHrFN-NSt_YBGMXLyccNaA4Z4Hm5N4-QYManHgEKeYZw3C6SgKiZVPSGBIlhbTib8bZnEcCTKzgdbprQptaY2C8RFQSq4_TbPXJEP1D72J27gEW10GJlf_fteuT-IPmFZ3l0U" className="w-full h-full object-cover rounded-lg" alt="Headphones" />
                      </div>
                      <span className="text-sm font-bold">Wireless Studio Headphones</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">$199.00</td>
                  <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full text-xs font-bold">Low Stock (8)</span></td>
                  <td className="px-6 py-4 text-sm font-medium">412</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">$81,988.00</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXCPolwoWbzfAMNKEglp_mZyLiJU64jo8lz039W4hiOelYXXcGKzhUIViKfTS73-7RLXAKYv-_XOClVEqjkHpihXckHN2hOdVpOPM_DJQzszQCkJIbsSzTYbdVWzPXs7b-wx8sFpkaQn9M8GlDQ05J5lmO50iQjAMvKGm_Yyl03HdQNIkhzYHM98XfjGa3OsjTn9v96qH2oc_563KyIeTKk_tuxs0BEi2rWpMSA100VCHYrJs_2SLnwfXrmCt7MUyM77OatFnS4cE" className="w-full h-full object-cover rounded-lg" alt="Shoes" />
                      </div>
                      <span className="text-sm font-bold">Speed-X Running Shoes</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">$125.00</td>
                  <td className="px-6 py-4 text-sm"><span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full text-xs font-bold">In Stock</span></td>
                  <td className="px-6 py-4 text-sm font-medium">328</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">$41,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
