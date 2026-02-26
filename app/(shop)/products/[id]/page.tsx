import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, CheckCircle, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ReviewSection } from "@/components/review-section";
import { SimilarProducts } from "@/components/similar-products";

// Revalidates every 60 seconds
export const revalidate = 60;

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await db.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black/95">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[50vw] h-[50vw] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 flex flex-col pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <span className="text-slate-400">No Image Available</span>
                </div>
              )}
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isFeatured && (
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    Featured
                  </span>
                )}
                {hasDiscount && (
                  <span className="bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    Sale
                  </span>
                )}
                {product.stock <= 0 && (
                  <span className="bg-slate-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 text-sm font-semibold text-primary uppercase tracking-wider">
              {product.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? "fill-current" : "text-slate-300 dark:text-slate-700"}
                  />
                ))}
              </div>
              <span className="font-medium text-slate-700 dark:text-slate-300 ml-1">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                ({product.reviews} reviews)
              </span>
            </div>
            
            <div className="flex items-end gap-3 mb-8">
              {hasDiscount ? (
                <>
                  <span className="text-4xl font-black text-slate-900 dark:text-white leading-none">
                    ${product.salePrice?.toFixed(2)}
                  </span>
                  <span className="text-xl font-semibold text-slate-400 line-through pb-1">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-red-500 bg-red-100 dark:bg-red-500/10 px-2 py-1 rounded-md mb-1 ml-2">
                    Save ${((product.price - (product.salePrice || 0))).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-black text-slate-900 dark:text-white leading-none">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              {product.description}
            </p>
            
            {/* Action Area */}
            <div className="flex flex-col gap-6 mb-10 pb-10 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.stock > 0 && (
                  <span className="text-slate-500 dark:text-slate-400">— Ready to ship</span>
                )}
              </div>
              
              <AddToCartButton 
                product={product as any} 
                className="w-full h-14 text-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-shadow disabled:shadow-none"
              />
            </div>
            
            {/* Logistics info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Free Shipping</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">On orders over $150</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <RefreshCw size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Free Returns</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Within 30 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">2 Year Warranty</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Top Quality</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReviewSection 
          productName={product.name} 
          rating={product.rating} 
          reviewsCount={product.reviews} 
        />
        
        <SimilarProducts 
          currentProductId={product.id} 
          category={product.category} 
        />
        
      </div>
    </div>
  );
}
