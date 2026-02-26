"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/cart-context";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 mt-6">
      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg h-12 w-32">
        <button 
          className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-primary dark:hover:text-primary transition-colors disabled:opacity-50"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <span className="material-symbols-outlined text-sm">remove</span>
        </button>
        <input 
          className="w-full h-full text-center border-none bg-transparent focus:ring-0 text-slate-900 dark:text-white font-medium p-0 outline-none" 
          type="text" 
          value={quantity}
          readOnly
        />
        <button 
          className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-primary dark:hover:text-primary transition-colors"
          onClick={increaseQuantity}
        >
          <span className="material-symbols-outlined text-sm">add</span>
        </button>
      </div>
      <button 
        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-lg transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none"
        disabled={!product.inStock}
        onClick={() => addToCart(product, quantity)}
      >
        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
      <button className="w-12 h-12 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
        <span className="material-symbols-outlined text-[24px]">favorite</span>
      </button>
    </div>
  );
}
