import Link from "next/link";
import Image from "next/image";
import { AutoScrollCarousel } from "@/components/ui/auto-scroll-carousel";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { categories, testimonials, features } from "@/lib/constants/index";
import { ParallaxHero } from "@/components/animations/parallax-hero";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { EntranceAnimation } from "@/components/animations/entrance-animation";

export const revalidate = 1800; // 30 minutes cache

export default async function Home() {
  const [products, session] = await Promise.all([
    db.product.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    auth.api.getSession({
      headers: await headers()
    })
  ]);

  let savedProductIds: string[] = [];
  if (session?.user) {
    const savedItems = await db.savedItem.findMany({
      where: { userId: session.user.id },
      select: { productId: true }
    });
    savedProductIds = savedItems.map(item => item.productId);
  }

  return (
    <EntranceAnimation>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">

        {/* Hero Section */}
        <ParallaxHero />

        {/* Featured Products Carousel */}
        <ScrollReveal>
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Featured Products</h2>
                <p className="text-neutral-500 dark:text-neutral-400 mt-1">Handpicked selection just for you</p>
              </div>
              <div className="flex gap-2">
                <button className="size-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button className="size-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400">
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
        </ScrollReveal>

        {/* Categories Grid */}
        <ScrollReveal>
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
              {categories.slice(0, 5).map((category, index) => (
                <Link 
                  key={category.id}
                  className={`group relative rounded-xl overflow-hidden ${
                    index === 0 || index === 4 ? 'md:col-span-2 lg:col-span-1' : 
                    index === 2 || index === 3 ? 'lg:col-span-2' : ''
                  }`}
                  href={category.href}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-neutral-900/20 to-transparent z-10"></div>
                  <Image 
                    fill 
                    alt={category.name} 
                    src={category.image}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                    <span className="text-white/90 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={index}>
              <div className="card-premium p-6 flex flex-col items-center text-center group">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-primary">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </section>

        {/* Testimonial Section */}
        <ScrollReveal>
          <section className="bg-linear-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">What our customers say</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">We pride ourselves on providing the best quality and service to our valued customers.</p>
                <div className="flex gap-2">
                  <button className="size-10 rounded-full bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-neutral-600 dark:text-neutral-400">
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  <button className="size-10 rounded-full bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-neutral-600 dark:text-neutral-400">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm card-premium">
                    <div className="flex gap-1 text-yellow-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`material-symbols-outlined text-sm ${
                            i < Math.floor(testimonial.rating) ? 'fill-current' : 'text-neutral-300'
                          }`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 italic mb-4">&quot;{testimonial.content}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden relative">
                        <Image 
                          fill 
                          alt={testimonial.name} 
                          src={testimonial.avatar}
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-neutral-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Newsletter Section */}
        <ScrollReveal>
          <section className="py-12 border-t border-neutral-200 dark:border-neutral-800">
            <div className="bg-linear-to-br from-neutral-900 to-neutral-950 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">Subscribe to our newsletter</h2>
                <p className="text-neutral-400 mb-8">Get the latest updates on new products and upcoming sales directly to your inbox. No spam, we promise.</p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    className="flex-1 rounded-xl border border-neutral-700 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all" 
                    placeholder="Your email address" 
                    type="email"
                  />
                  <button className="btn-premium py-3 px-6" type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </EntranceAnimation>
  );
}
