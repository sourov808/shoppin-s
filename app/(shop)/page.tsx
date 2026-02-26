import Link from "next/link";
import { AutoScrollCarousel } from "@/components/ui/auto-scroll-carousel";

export default function Home() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
      
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden min-h-[500px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          data-alt="Woman in stylish coat walking with shopping bags" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCr0fP3YZ3qWWZBsR0NFyWBf2p7aWcER60qyt6UFis5Prauwac0SZDVObtl2pa6f-XEkjdzSGHn19ClfxDuz7kra7zL7GGEOwj7Yol0QkaXNFCSe-YpS7LMtHMAgOAay2ex6_yuaqlU6npIjp_wwCEqMEYOg3L641nKSu-TZXk59LgmMy6ZgBsH4aWT3jzeQNSJ8BAnN3Wk9u6GqQ4qpk6UBXDkIPgxEZlaveBt7MSjGz3InvHJ890o4Dl0i01JCAxuIV3ZKin_ko4')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-transparent z-10"></div>
        <div className="relative z-20 max-w-2xl px-8 md:px-12 py-12">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium mb-6 border border-white/10">Summer Collection 2024</span>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            Redefine Your <br/>
            <span className="text-primary">Everyday Style</span>
          </h1>
          <p className="text-lg text-neutral-200 mb-8 max-w-lg leading-relaxed">
            Discover the latest trends in fashion and comfort with our exclusive summer release. Premium quality materials for your best look yet.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-lg font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/30 flex items-center gap-2">
              Shop Now
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-lg font-bold transition-all">
              View Lookbook
            </button>
          </div>
        </div>
      </section>
      
      {/* Featured Products Carousel */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Featured Products</h2>
            <p className="text-neutral-500 mt-1">Handpicked selection just for you</p>
          </div>
          <div className="flex gap-2">
            <button className="size-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors text-neutral-600">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="size-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors text-neutral-600">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
        
        <AutoScrollCarousel>
          
          {/* Product Card 1 */}
          <div className="min-w-[280px] w-[280px] snap-start group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 mb-4">
              <img alt="White t-shirt mockup" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Man wearing white t-shirt" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_tQyNSuYlk78oN6z81TJ3FaMLcsjf9SQ9n91PP6PsknVZHFUbS8oAXhVp3IQsjTWGRxTNA8uVsci_N5r4YnOf8k3GMYaSplJVxy384Qy_vrI6FJAm4EYu7a5iU6UU8i56nrlMpEho9EoM1ajjRbG-RxMtV7T_tzCutK4z2oZ9Hg_FPDhT4Tx1icktD9Jd0xl0vPA7RIK3E-kGISJyPpcIJ6pG8NxB2up6gINYXXvrk0WlKcZ-OCGvj7FowHDTHbUdDuN9672WZv4"/>
              <div className="absolute top-3 right-3">
                <button className="size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px] text-neutral-800">favorite</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-full bg-white text-neutral-900 font-bold py-3 rounded-lg shadow-lg hover:bg-neutral-50 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Add to Cart
                </button>
              </div>
            </div>
            <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors">Classic White Tee</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-neutral-500 font-medium">$25.00</span>
              <div className="flex items-center gap-1">
                <span className="size-3 rounded-full bg-white border border-neutral-200"></span>
                <span className="size-3 rounded-full bg-neutral-900 border border-neutral-200"></span>
                <span className="size-3 rounded-full bg-blue-800 border border-neutral-200"></span>
              </div>
            </div>
          </div>
          
          {/* Product Card 2 */}
          <div className="min-w-[280px] w-[280px] snap-start group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 mb-4">
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-20%</span>
              <img alt="Stylish sneakers" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Pair of modern running shoes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrRjhjNGyKu5M9CRO77-6k_frYwVMZeJHV6oiKlaylwgsaE6PLGyUeGlgINEZjTBoqPrvR-LCvo8Bon2nAjtDk5LU_3ChQCZ2C8q_eUQAApbTuzmrQDZPZn69Ak6HrHtNm9hjSUh1ZbQ4lW_j5gvz0j7HIr9-K0bvTGw5cnCPEi0sWz4-9lnyVdNvy2GXKssLTcz8cplLd-Bj3P2HWu3hSgDhfB_xuofue_CmCLXI2lqtAePzzhNZfHafh5OxhoRBFzK2ZbWEu04Y"/>
              <div className="absolute top-3 right-3">
                <button className="size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px] text-neutral-800">favorite</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-full bg-white text-neutral-900 font-bold py-3 rounded-lg shadow-lg hover:bg-neutral-50 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Add to Cart
                </button>
              </div>
            </div>
            <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors">Urban Sneakers</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-primary font-bold">$85.00</span>
              <span className="text-neutral-400 text-sm line-through">$105.00</span>
            </div>
          </div>
          
          {/* Product Card 3 */}
          <div className="min-w-[280px] w-[280px] snap-start group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 mb-4">
              <img alt="Denim jeans" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Blue denim jeans folded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiAwyQgU_pqhuq1n0PwGuVJMJrEXNLZ2n1_NTINF7rgh_AeZijq9t5iO30CtfzifG89xoONGGk1rib84BfSbm8BMfhSwE7O6IjiYFR_Yo1CA_b-XVKhhSeEiAygeuuRmRq36KDL7wZcwCE5IWQgOxsLj984fO22QmglauuaAa0oIMuPV2J4C-NqENk8wTjy-dtTZPNyevIz5MnzfMmq7iutFNsUpWXgfe7qAWPPCugaP5c2ZGiaTqOdMPbXmUvHhD4yxiMUkYX2eg"/>
              <div className="absolute top-3 right-3">
                <button className="size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px] text-neutral-800">favorite</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-full bg-white text-neutral-900 font-bold py-3 rounded-lg shadow-lg hover:bg-neutral-50 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Add to Cart
                </button>
              </div>
            </div>
            <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors">Denim Essential</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-neutral-500 font-medium">$60.00</span>
            </div>
          </div>
          
          {/* Product Card 4 */}
          <div className="min-w-[280px] w-[280px] snap-start group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 mb-4">
              <img alt="Leather bag" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Brown leather weekend bag" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBefcGYy8Ll-CdqjvIToQinTnn9kgu4XG8DtZu_jCJO7BIon_VnQAWPkhy-7sBH0dTh96RwNoWULRfONYrmb5bceBshTNRc3tGvHNJ6-kNznIyny5aEytv228Kga0w_19niZ96GJE38_0gOz8lpZJMIbOaZsE65MKsnVu7S18qlKcyOTdWwUTksupyHlqxAA6NPwKkM2GkcsCzgeq7N4d8bM7eM4etxUFout1hGS1V1IQXE3GKvbdKJH2vfYBKrRmY527FeOmJxWY"/>
              <div className="absolute top-3 right-3">
                <button className="size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px] text-neutral-800">favorite</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-full bg-white text-neutral-900 font-bold py-3 rounded-lg shadow-lg hover:bg-neutral-50 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Add to Cart
                </button>
              </div>
            </div>
            <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors">Weekend Bag</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-neutral-500 font-medium">$120.00</span>
            </div>
          </div>
          
          {/* Product Card 5 */}
          <div className="min-w-[280px] w-[280px] snap-start group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 mb-4">
              <img alt="Jacket" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Olive green jacket on hanger" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhsAyUi4KBGQIMDk-XBYvMQILy9M8aEVsaZjzdz7vQxZ982sHUywc6-qC-KFYkFrExuMac3no2g3iX2Z0CLsdHhjX8IYcAQVYch4VJHRRAzElxNt_jWO-S_06PEGkzrklN-A8VPkEUfxL2LCF_IPZerVXYtg9aQt9PmCQ4v70cG_n6sJXL29X7LlsV9pNTLugEK4OeOrTVUgvcS1OMc1W_oh7XhgiRX8k_1ET28sF7mYRErQJVxmG8UPGINoW07CFeU5FX6Q11OGo"/>
              <div className="absolute top-3 right-3">
                <button className="size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[18px] text-neutral-800">favorite</span>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button className="w-full bg-white text-neutral-900 font-bold py-3 rounded-lg shadow-lg hover:bg-neutral-50 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Add to Cart
                </button>
              </div>
            </div>
            <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary transition-colors">Field Jacket</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-neutral-500 font-medium">$150.00</span>
            </div>
          </div>
          
        </AutoScrollCarousel>
      </section>
      
      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          <Link className="group relative rounded-xl overflow-hidden md:col-span-2 lg:col-span-1" href="/products?category=HEADPHONES">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/30 transition-colors z-10"></div>
            <img alt="Headphones" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Man wearing casual business attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5st4D9tAtBWGgzLJXGZJ8mPL3Do9Kiz2gyNKruYz30KO4RSo4SfT5F5jpi7CNf84O6dX4sH0NyTNHAfY6dCz9YbqhydD4oBVQLeLhmmn_wkCiylmNsMosoByN4eCmEYs1CGjOllv3KkSzijCwNxJF963u9EjWL8aTm0PBRiDYSRZad52oNv0Haob7JoueVtos-bluULAMdWT6y3Cv5tVT6WiL5XHcfGAx5eyZ25auBxC2c8rBiThwmLYWqNZUPuC-e0IrEPqRc_8"/>
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">Headphones</h3>
              <span className="text-white/90 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Explore <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
            </div>
          </Link>
          <Link className="group relative rounded-xl overflow-hidden lg:col-span-2" href="/products?category=WEARABLES">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/30 transition-colors z-10"></div>
            <img alt="Wearables" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Women posing in floral dresses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjA7o_Ir5EwHQhLcesGIanCI64wzCM146ToGkNf-3wg_FK8yl0mQ_bgrtmfTYmmp9fjRutShGeEJkWy0aurzAeeX-_I1LIejuiyNVYSvhMsDcntmsf5W83jOpNC-2WzyIljhbL7oC6LiwchHaxs2CswErEp77u7Yr810kPDPiDq_2DQEOx3m-PtTvDbIDkqh349rU7v-4v-L-IrpsvS34C-YVAq34YMbjG2K_GtwDaIg7oG899HHcW2aqgYomUrkHXwRnf9Q0BdRk"/>
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">Wearables</h3>
              <span className="text-white/90 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Explore <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
            </div>
          </Link>
          <Link className="group relative rounded-xl overflow-hidden lg:col-span-2" href="/products?category=ACCESSORIES">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/30 transition-colors z-10"></div>
            <img alt="Accessories" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Flat lay of sunglasses watch and wallet" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqbZhHfWd3Qn0k8PrfEy1aq5lWbLgwR2jq91dHgYqiUtY_79YszBma2de5vbS10sdAtyBs6rKcsTcEcUSOWVgXAbb7knk7VDfwnxzhG-eTjMX2F01mm6rXcgpe01F7DqmaWb46wIZZ8jLabbWzZxanAKvGBqgx-IslfTJjWYsUfvk_xfXHXsTkruo_gZwYT9CppZrR0lj9KvrRnT7R_YVVURo_eAktnHJDteCdiWdyPRxCipyR2Q2lY9ySrmZFjpczpSsURVmJVZ0"/>
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">Accessories</h3>
              <span className="text-white/90 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Explore <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
            </div>
          </Link>
          <Link className="group relative rounded-xl overflow-hidden md:col-span-2 lg:col-span-1" href="/products?category=SMARTPHONES">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/30 transition-colors z-10"></div>
            <img alt="Smartphones" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Red running shoe suspended in air" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7uZeVun0HK4upnzjnIUXlOtMxwIQFVXTP6IE8ogHDJyU61W-wklh1PTNcfySu21iO029NNG8LPWHU20TaaZgYJGhBR0z7LTXB4HJd5w6kAVNYFYBiUGhtouBgb2YjefzxofghIPMEPZTGeBXp9tPQERwL9KVXRsJe4g1Hcg7Vtxu2nUdg67Y2e9J7mZHEpbIkb1n2nAtOj9grMg81pOdyqo14yyIRpnziHjjTN2WMQyMgyqNNvD4DHwIMDmbvWc9xT5T5eeKuOUY"/>
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">Smartphones</h3>
              <span className="text-white/90 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Explore <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="bg-neutral-100 rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">What our customers say</h2>
            <p className="text-neutral-600 mb-6">We pride ourselves on providing the best quality and service to our valued customers.</p>
            <div className="flex gap-2">
              <button className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-neutral-600">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-neutral-600">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex gap-1 text-yellow-400 mb-3">
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
              </div>
              <p className="text-neutral-700 italic mb-4">"The quality of the clothes is absolutely amazing. I've bought three items so far and they fit perfectly."</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-neutral-200 overflow-hidden">
                  <img alt="User avatar" data-alt="Portrait of a smiling woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXO68RZOKadaSyj7UBK0boXxRMuMBMzgqVZpteNXMbpXqretG9Ah7_3wl3QB2V5-HL1gx7WjzBz0PMS3qwSgx3Dwc_4QtJ5EYDmXnOVF3Q6xp7EwW5raLFobpkDAVmGBMa1Hv_iFXxQyxZVB0bsZGSXveFei_FwAHqxrBTtvApUkMvF44rRJjrRJju1oXpwOyO8D_qPk1_jbBoBplSDZIKWX2Taimv5G32rhXADAbtf50w6ysptJICGqB0gPR7L2ptTy7qnzf23AM"/>
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900">Sarah Johnson</p>
                  <p className="text-xs text-neutral-500">Verified Buyer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hidden md:block">
              <div className="flex gap-1 text-yellow-400 mb-3">
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star</span>
                <span className="material-symbols-outlined fill-current text-sm">star_half</span>
              </div>
              <p className="text-neutral-700 italic mb-4">"Super fast shipping and the customer service team was very helpful when I needed to make a return."</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-neutral-200 overflow-hidden">
                  <img alt="User avatar" data-alt="Portrait of a man with glasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBziUmKtCCTxc6AqgAekduv2JGdE2YVGpWomb-HoavFlz80kCaokjt0guH2L2ox9Cupt5eiCQcJdP_-zwbQTIuXB6FSjMDy-8vyw8OnFlYQ2hvws8Yzt8di594CiKmFE3w_dHvGsGcHfq7HwWEQIZ59oU8PKgDXAznJhGwrn8jGAVawxUr_eLybwDiwVJC8WJpRDvT2fG1q-B96kiD_S56CC8LlvGL_XSYF89v1pjCV9ovzJOUBs9HfiKWjVIxDacSXAuQ5BTSfpwY"/>
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900">Michael Brown</p>
                  <p className="text-xs text-neutral-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 border-t border-neutral-200">
        <div className="bg-neutral-900 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Abstract pattern background */}
          <div className="absolute inset-0 opacity-10" data-alt="Subtle dot pattern on dark background" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to our newsletter</h2>
            <p className="text-neutral-400 mb-8">Get the latest updates on new products and upcoming sales directly to your inbox. No spam, we promise.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input className="flex-1 rounded-lg border-none px-4 py-3 text-neutral-900 focus:ring-2 focus:ring-primary/50" placeholder="Your email address" type="email"/>
              <button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
