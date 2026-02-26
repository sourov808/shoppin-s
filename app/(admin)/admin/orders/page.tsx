export default function AdminOrdersPage() {
  return (
    <main className="flex-1 px-6 md:px-10 py-8 max-w-[1440px] mx-auto w-full">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">Order Management</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base mt-1">Efficiently track, filter and manage all customer transactions.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-[#2a1d1a] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-lg">file_download</span>
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-lg">add</span>
              Create Order
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 outline-none" 
              placeholder="Search by Order ID, customer, or product..." 
              type="text"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[140px]">
              <select className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border-none rounded-lg py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none text-slate-900 dark:text-slate-100">
                <option>Status: All</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
            </div>
            <div className="relative min-w-[180px]">
              <button className="flex items-center justify-between w-full bg-slate-50 dark:bg-slate-900 border-none rounded-lg py-2.5 px-4 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-slate-400">calendar_today</span>
                  <span>Last 30 Days</span>
                </span>
                <span className="material-symbols-outlined text-slate-400">expand_more</span>
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 text-primary bg-primary/10 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              More Filters
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 w-12">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                </th>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#ORD-2023-8812</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 24, 2023, 10:45 AM</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">EM</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Eleanor Murphy</p>
                      <p className="text-xs text-slate-400">eleanor.m@example.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$1,240.00</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>
                    Processing
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="View Details">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="Print Invoice">
                      <span className="material-symbols-outlined text-xl">print</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#ORD-2023-8809</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 23, 2023, 04:12 PM</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">JD</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Julian Davidson</p>
                      <p className="text-xs text-slate-400">j.davidson@outlook.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$432.50</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
                    Shipped
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="View Details">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="Print Invoice">
                      <span className="material-symbols-outlined text-xl">print</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#ORD-2023-8805</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 23, 2023, 11:20 AM</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">ST</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Sarah Thompson</p>
                      <p className="text-xs text-slate-400">sarah_t@gmail.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$1,899.99</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    Delivered
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="View Details">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="Print Invoice">
                      <span className="material-symbols-outlined text-xl">print</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#ORD-2023-8792</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 22, 2023, 09:15 AM</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-bold">MK</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Marcus King</p>
                      <p className="text-xs text-slate-400">marcus@king.design</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$78.25</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    Delivered
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="View Details">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="Print Invoice">
                      <span className="material-symbols-outlined text-xl">print</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">#ORD-2023-8788</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Oct 21, 2023, 02:44 PM</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">LB</div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Linda Blair</p>
                      <p className="text-xs text-slate-400">lblair@domain.com</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$210.00</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                    Cancelled
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="View Details">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="Print Invoice">
                      <span className="material-symbols-outlined text-xl">print</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">10</span> of <span className="font-bold text-slate-900 dark:text-white">248</span> results</p>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex items-center justify-center w-9 h-9 bg-primary text-white rounded-lg text-sm font-bold">1</button>
            <button className="flex items-center justify-center w-9 h-9 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-lg text-sm font-medium">2</button>
            <button className="flex items-center justify-center w-9 h-9 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-lg text-sm font-medium">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="flex items-center justify-center w-9 h-9 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-lg text-sm font-medium">25</button>
            <button className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Pending Orders</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-slate-900 dark:text-white">42</p>
            <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              12%
            </span>
          </div>
        </div>
        
        <div className="p-6 bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">In Transit</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-slate-900 dark:text-white">18</p>
            <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              5%
            </span>
          </div>
        </div>
        
        <div className="p-6 bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Total Revenue</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-slate-900 dark:text-white">$14,582.40</p>
            <span className="text-rose-500 text-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              2.4%
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
