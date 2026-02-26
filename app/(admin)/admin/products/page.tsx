export default function AdminProductsPage() {
  return (
    <main className="flex-1 px-6 md:px-10 py-8 max-w-[1440px] mx-auto w-full">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-black leading-tight tracking-tight">Products Management</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base mt-1">Efficiently track, filter and manage your catalog of products.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-[#2a1d1a] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-lg">file_download</span>
              Export CSV
            </button>
            <a href="/admin/products/new" className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm cursor-pointer">
              <span className="material-symbols-outlined text-lg">add</span>
              Create Product
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#1a0f0d] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 outline-none" 
              placeholder="Search by Product Name, SKU, or category..." 
              type="text"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[140px]">
              <select className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border-none rounded-lg py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none text-slate-900 dark:text-slate-100">
                <option>Category: All</option>
                <option>Electronics</option>
                <option>Home & Garden</option>
                <option>Fashion</option>
                <option>Sports</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
            </div>
            <div className="relative min-w-[140px]">
              <select className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border-none rounded-lg py-2.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none text-slate-900 dark:text-slate-100">
                <option>Status: All</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Out of Stock</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
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
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt5p3yYZbvEejJR92YXTCub7qlbg3i1TEh8XpvC9dEpLUVa9nR8XdOAsCkRfVNNsER4vdsvpkAx5G2wC9bFbfwkNxkyMF_m8sjAc1tCtqgBlC4f3vTvLfLweOz3tdWtzaxmtaFf752STSD3Y3R690ApMZaBCV0CsyKXmUOLkk2gzx32vodMWGeJcG67Dkctn5pZmaC8e7W9KJMB-I9kcpIx9jnnNBwUJr9vIf7_2oRzDc6-9KrufC7l5BwuwWwWb1MPYkPj6kdVMQ" className="w-full h-full object-cover rounded-lg" alt="" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Premium Oxford Shirt</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">SKU-8812</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Fashion</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$120.00</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="Edit Product">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-colors" title="Delete Product">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8tYIM8IDg_To6Ca0lTJRA5JoyU8BzGfWBUzucF5jgifKY1b6-SLc95Mc4RRjgGLNFXCOZpvzbluO3H3pIS7Ngyu1_wc53WmO6IVJZyRQjkZkMuXomX48eFH0AO-Va4OIy2C2As9pmrHMXXbpGoVYCA3DjyKe00gXS512r8d-6m88hEEAL_UbkW33yzjDKzDzKRNGcw5bvGFoDNaJL-P0bWTbfo_1VIbxy9NoUd9SdAjCDnVZr1X6WA1NPXLcOtO0NOtws0pHS4jw" className="w-full h-full object-cover rounded-lg" alt="" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Leather Backpack</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">SKU-8809</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Accessories</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$85.50</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="Edit Product">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-colors" title="Delete Product">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                <td className="px-6 py-4">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-slate-400 text-[16px]">image</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Ceramic Coffee Mug</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">SKU-8805</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">Home & Garden</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">$24.99</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                    Out of Stock
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary transition-colors" title="Edit Product">
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-colors" title="Delete Product">
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">10</span> of <span className="font-bold text-slate-900 dark:text-white">42</span> results</p>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex items-center justify-center w-9 h-9 bg-primary text-white rounded-lg text-sm font-bold">1</button>
            <button className="flex items-center justify-center w-9 h-9 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-lg text-sm font-medium">2</button>
            <button className="flex items-center justify-center w-9 h-9 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-lg text-sm font-medium">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="flex items-center justify-center w-9 h-9 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 rounded-lg text-sm font-medium">5</button>
            <button className="flex items-center justify-center w-9 h-9 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
      
    </main>
  );
}
