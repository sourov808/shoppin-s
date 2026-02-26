"use client";

import { useCart } from "@/context/cart-context";
import { Product } from "@prisma/client";
import { Product as CartProduct } from "@/types";
import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  showText?: boolean;
}

export function AddToCartButton({ 
  product, 
  className = "", 
  showText = true 
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // crucial to prevent Next.js Link from navigating if nested
    e.stopPropagation();
    addToCart(product as unknown as CartProduct, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded || product.stock <= 0}
      className={`flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-80 ${
        isAdded
          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
          : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
      } ${product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {isAdded ? (
        <>
          <Check size={showText ? 18 : 16} />
          {showText && <span>Added</span>}
        </>
      ) : (
        <>
          <ShoppingCart size={showText ? 18 : 16} />
          {showText && <span>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</span>}
        </>
      )}
    </button>
  );
}
