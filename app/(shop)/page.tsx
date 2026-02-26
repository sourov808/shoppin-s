import Link from "next/link";
import Image from "next/image";
import { AutoScrollCarousel } from "@/components/ui/auto-scroll-carousel";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const revalidate = 1800; // 30 minutes cache

export default async function Home() {
  const products = await db.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  const session = await auth.api.getSession({
    headers: await headers()
  });

  let savedProductIds: string[] = [];
  if (session?.user) {
    const savedItems = await db.savedItem.findMany({
      where: { userId: session.user.id },
      select: { productId: true }
    });
    savedProductIds = savedItems.map(item => item.productId);
  }
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden min-h-[600px] flex items-center group/hero bg-neutral-900">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 group-hover/hero:scale-105" 
          data-alt="Woman in stylish coat walking with shopping bags" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCr0fP3YZ3qWWZBsR0NFyWBf2p7aWcER60qyt6UFis5Prauwac0SZDVObtl2pa6f-XEkjdzSGHn19ClfxDuz7kra7zL7GGEOwj7Yol0QkaXNFCSe-YpS7LMtHMAgOAay2ex6_yuaqlU6npIjp_wwCEqMEYOg3L641nKSu-TZXk59LgmMy6ZgBsH4aWT3jzeQNSJ8BAnN3Wk9u6GqQ4qpk6UBXDkIPgxEZlaveBt7MSjGz3InvHJ890o4Dl0i01JCAxuIV3ZKin_ko4')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-900/60 to-transparent z-10"></div>
        
        {/* Animated background highlights */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-primary/10 rounded-full blur-[100px] z-10"></div>

        <div className="relative z-20 max-w-3xl px-8 md:px-16 lg:px-20 py-16">
          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest">Summer Collection 2024</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Style Beyond <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-foreground/80">Expectation.</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-200/90 mb-10 max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Experience the perfect blend of premium craftsmanship and contemporary design. Elevate your wardrobe with our latest curated essentials.
          </p>

          <div className="flex flex-wrap gap-5 items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link href="/products" className="group/btn bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 flex items-center gap-3">
              Explore Now
              <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
            </Link>
            <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-xl font-bold transition-all hover:border-white/30 text-sm">
              View Lookbook
            </button>
            <div className="flex -space-x-3 ml-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="size-9 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center overflow-hidden">
                  <div className="size-full bg-linear-to-br from-neutral-700 to-neutral-800"></div>
                </div>
              ))}
              <div className="flex items-center justify-center pl-6">
                <p className="text-xs font-medium text-neutral-400">
                  <span className="text-white font-bold">12k+</span> happy customers
                </p>
              </div>
            </div>
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
          {products.map((product) => (
            <div key={product.id} className="min-w-[280px] w-[280px] snap-start">
              <ProductCard 
                product={product} 
                isWishlisted={savedProductIds.includes(product.id)}
              />
            </div>
          ))}
        </AutoScrollCarousel>
      </section>
      
      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          <Link className="group relative rounded-xl overflow-hidden md:col-span-2 lg:col-span-1" href="/products?category=HEADPHONES">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/30 transition-colors z-10"></div>
            <Image fill alt="Headphones" className="object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5st4D9tAtBWGgzLJXGZJ8mPL3Do9Kiz2gyNKruYz30KO4RSo4SfT5F5jpi7CNf84O6dX4sH0NyTNHAfY6dCz9YbqhydD4oBVQLeLhmmn_wkCiylmNsMosoByN4eCmEYs1CGjOllv3KkSzijCwNxJF963u9EjWL8aTm0PBRiDYSRZad52oNv0Haob7JoueVtos-bluULAMdWT6y3Cv5tVT6WiL5XHcfGAx5eyZ25auBxC2c8rBiThwmLYWqNZUPuC-e0IrEPqRc_8"/>
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">Headphones</h3>
              <span className="text-white/90 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Explore <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
            </div>
          </Link>
          <Link className="group relative rounded-xl overflow-hidden lg:col-span-2" href="/products?category=WEARABLES">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/30 transition-colors z-10"></div>
            <Image fill alt="Wearables" className="object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjA7o_Ir5EwHQhLcesGIanCI64wzCM146ToGkNf-3wg_FK8yl0mQ_bgrtmfTYmmp9fjRutShGeEJkWy0aurzAeeX-_I1LIejuiyNVYSvhMsDcntmsf5W83jOpNC-2WzyIljhbL7oC6LiwchHaxs2CswErEp77u7Yr810kPDPiDq_2DQEOx3m-PtTvDbIDkqh349rU7v-4v-L-IrpsvS34C-YVAq34YMbjG2K_GtwDaIg7oG899HHcW2aqgYomUrkHXwRnf9Q0BdRk"/>
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">Wearables</h3>
              <span className="text-white/90 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Explore <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
            </div>
          </Link>
          <Link className="group relative rounded-xl overflow-hidden lg:col-span-2" href="/products?category=ACCESSORIES">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/30 transition-colors z-10"></div>
            <Image fill alt="Accessories" className="object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqbZhHfWd3Qn0k8PrfEy1aq5lWbLgwR2jq91dHgYqiUtY_79YszBma2de5vbS10sdAtyBs6rKcsTcEcUSOWVgXAbb7knk7VDfwnxzhG-eTjMX2F01mm6rXcgpe01F7DqmaWb46wIZZ8jLabbWzZxanAKvGBqgx-IslfTJjWYsUfvk_xfXHXsTkruo_gZwYT9CppZrR0lj9KvrRnT7R_YVVURo_eAktnHJDteCdiWdyPRxCipyR2Q2lY9ySrmZFjpczpSsURVmJVZ0"/>
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-white text-2xl font-bold mb-2">Accessories</h3>
              <span className="text-white/90 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Explore <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
            </div>
          </Link>
          <Link className="group relative rounded-xl overflow-hidden md:col-span-2 lg:col-span-1" href="/products?category=SMARTPHONES">
            <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/30 transition-colors z-10"></div>
            <Image fill alt="Smartphones" className="object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7uZeVun0HK4upnzjnIUXlOtMxwIQFVXTP6IE8ogHDJyU61W-wklh1PTNcfySu21iO029NNG8LPWHU20TaaZgYJGhBR0z7LTXB4HJd5w6kAVNYFYBiUGhtouBgb2YjefzxofghIPMEPZTGeBXp9tPQERwL9KVXRsJe4g1Hcg7Vtxu2nUdg67Y2e9J7mZHEpbIkb1n2nAtOj9grMg81pOdyqo14yyIRpnziHjjTN2WMQyMgyqNNvD4DHwIMDmbvWc9xT5T5eeKuOUY"/>
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
              <p className="text-neutral-700 italic mb-4">&quot;The quality of the clothes is absolutely amazing. I&apos;ve bought three items so far and they fit perfectly.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-neutral-200 overflow-hidden relative">
                  <Image fill alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXO68RZOKadaSyj7UBK0boXxRMuMBMzgqVZpteNXMbpXqretG9Ah7_3wl3QB2V5-HL1gx7WjzBz0PMS3qwSgx3Dwc_4QtJ5EYDmXnOVF3Q6xp7EwW5raLFobpkDAVmGBMa1Hv_iFXxQyxZVB0bsZGSXveFei_FwAHqxrBTtvApUkMvF44rRJjrRJju1oXpwOyO8D_qPk1_jbBoBplSDZIKWX2Taimv5G32rhXADAbtf50w6ysptJICGqB0gPR7L2ptTy7qnzf23AM"/>
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
              <p className="text-neutral-700 italic mb-4">&quot;Super fast shipping and the customer service team was very helpful when I needed to make a return.&quot;</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-neutral-200 overflow-hidden relative">
                  <Image fill alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBziUmKtCCTxc6AqgAekduv2JGdE2YVGpWomb-HoavFlz80kCaokjt0guH2L2ox9Cupt5eiCQcJdP_-zwbQTIuXB6FSjMDy-8vyw8OnFlYQ2hvws8Yzt8di594CiKmFE3w_dHvGsGcHfq7HwWEQIZ59oU8PKgDXAznJhGwrn8jGAVawxUr_eLybwDiwVJC8WJpRDvT2fG1q-B96kiD_S56CC8LlvGL_XSYF89v1pjCV9ovzJOUBs9HfiKWjVIxDacSXAuQ5BTSfpwY"/>
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
