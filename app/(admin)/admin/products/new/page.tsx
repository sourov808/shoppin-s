import Link from "next/link";

export default function CreateProductPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-20 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/products" className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[16px]">home</span>
          Products
        </Link>
        <span className="material-symbols-outlined text-slate-400 text-[14px]">chevron_right</span>
        <span className="text-slate-900 dark:text-white text-sm font-semibold">Create New Product</span>
      </div>
      
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight mb-2">Create New Product</h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">Set up your product details, pricing, and media to start selling.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information Section */}
          <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span>
              Basic Info
            </h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Product Title</label>
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 outline-none" 
                  placeholder="e.g. Premium Wireless Noise Cancelling Headphones" 
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-2 flex gap-2">
                    <button type="button" className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">format_bold</span>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">format_italic</span>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                    </button>
                    <button type="button" className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">link</span>
                    </button>
                  </div>
                  <textarea 
                    className="w-full bg-white dark:bg-[#1a0f0d] border-none px-4 py-3 focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none resize-none" 
                    placeholder="Describe the key features and benefits of your product..." 
                    rows={6}
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
          
          {/* Media Section */}
          <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">image</span>
              Media & Images
            </h3>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
              <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
              </div>
              <p className="text-slate-900 dark:text-white font-semibold mb-1">Click to upload or drag and drop</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">PNG, JPG or GIF (max. 5MB)</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-slate-400">add_photo_alternate</span>
              </div>
              <div className="aspect-square bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-slate-400">add_photo_alternate</span>
              </div>
            </div>
          </section>
          
          {/* Pricing & Inventory Section */}
          <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">payments</span>
              Pricing & Inventory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Base Price</label>
                <div className="relative border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 h-12 flex items-center focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input 
                    className="w-full bg-transparent border-none h-full pl-8 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none" 
                    placeholder="0.00" 
                    type="number"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">SKU (Stock Keeping Unit)</label>
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 outline-none" 
                  placeholder="e.g. PRD-8821" 
                  type="text"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Stock Quantity</label>
                <input 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 outline-none" 
                  placeholder="0" 
                  type="number"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Discount Percentage</label>
                <div className="relative border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 h-12 flex items-center focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                  <input 
                    className="w-full bg-transparent border-none h-full pl-4 pr-8 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none text-right" 
                    placeholder="0" 
                    type="number"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {/* Sidebar column */}
        <div className="lg:col-span-1 space-y-8">
          {/* Organization Section */}
          <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">category</span>
              Organization
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg h-11 px-4 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                  <option>Electronics</option>
                  <option>Home & Garden</option>
                  <option>Fashion</option>
                  <option>Sports</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sub-category</label>
                <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg h-11 px-4 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                  <option>Audio & Headphones</option>
                  <option>Smartphones</option>
                  <option>Computers</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tags</label>
                <div className="flex flex-wrap gap-2 p-2 min-h-[44px] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <span className="flex items-center gap-1 bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">
                    Wireless 
                    <button className="flex items-center justify-center hover:opacity-80 ml-1 rounded">
                      <span className="material-symbols-outlined text-[10px]">close</span>
                    </button>
                  </span>
                  <span className="flex items-center gap-1 bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">
                    Bluetooth 
                    <button className="flex items-center justify-center hover:opacity-80 ml-1 rounded">
                      <span className="material-symbols-outlined text-[10px]">close</span>
                    </button>
                  </span>
                  <input 
                    className="flex-1 min-w-[60px] bg-transparent border-none focus:ring-0 p-0 text-sm text-slate-900 dark:text-white outline-none" 
                    placeholder="Add..." 
                    type="text"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Status Section */}
          <section className="bg-white dark:bg-[#1a0f0d] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">settings_applications</span>
              Status & Visibility
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Publish immediately</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Feature on homepage</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>
          
          {/* Help Card */}
          <section className="bg-primary/5 p-6 rounded-xl border border-primary/20">
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary">lightbulb</span>
            </div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-2">Need help?</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Check our guide on how to optimize product listings for better SEO and conversion.</p>
            <a className="text-primary text-sm font-bold hover:underline" href="#">Read documentation →</a>
          </section>
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-4">
        <button className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Discard Draft</button>
        <button className="px-10 py-3 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">Create Product</button>
      </div>
    </main>
  );
}
