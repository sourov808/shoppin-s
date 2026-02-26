"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { Star } from "lucide-react";
import { AddToCartButton } from "./add-to-cart-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-4 shadow-lg backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-primary/20 hover:border-primary/50 dark:border-white/10 dark:bg-black/20">
        
        {/* Image Container with subtle zoom on hover */}
        <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800/50">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.salePrice && (
            <div className="absolute top-2 left-2 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold tracking-wide text-primary-foreground shadow-sm">
              Sale
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {/* Category Tag */}
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </span>
          
          {/* Title */}
          <h3 className="line-clamp-2 text-lg font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-foreground">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Pricing & CTA */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-col">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-black text-foreground">
                    $\{(product.salePrice).toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground line-through">
                    $\{(product.price).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-black text-foreground">
                  $\{(product.price).toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Add to Cart Button */}
            <div className="z-10 relative">
              <AddToCartButton 
                product={product} 
                showText={false}
                className="h-10 w-10 !p-0 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5" 
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
