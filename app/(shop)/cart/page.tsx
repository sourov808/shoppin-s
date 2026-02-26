"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const handleQuantityChange = (productId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex-grow w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-40 py-24 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full inline-block mb-6 text-slate-400 dark:text-slate-500">
          <span className="material-symbols-outlined text-[48px]">shopping_bag</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Your cart is empty</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
          Looks like you haven't added any items to your cart yet. Browse our products and find something you love.
        </p>
        <Link href="/products" className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">
          Start Shopping
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>
      </div>
    );
  }

  const tax = cartTotal * 0.08; // 8% tax
  const shipping = cartTotal > 150 ? 0 : 15.00; // Free shipping over $150
  const finalTotal = cartTotal + tax + shipping;

  return (
    <div className="flex-grow w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-40 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Your Shopping Cart</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">You have {cartCount} items in your cart ready for checkout.</p>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Cart Items List */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Header for list (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Price</div>
          </div>
          
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="col-span-6 w-full flex gap-4">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight hover:text-primary transition-colors line-clamp-2">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Category: {item.category}</p>
                      <p className="text-xs text-emerald-600 font-medium mt-1">In Stock</p>
                    </div>
                    <div className="flex gap-4 mt-2 md:mt-0">
                      <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group hidden sm:flex">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                        <span className="underline decoration-transparent group-hover:decoration-primary">Save for later</span>
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-sm font-medium text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-1 group"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        <span className="underline decoration-transparent group-hover:decoration-red-500">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-3 w-full flex md:justify-center items-center">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#2a1d1a] overflow-hidden h-10 w-32">
                    <button 
                      onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <input 
                      readOnly
                      type="number" 
                      className="w-12 text-center border-none p-0 text-slate-900 dark:text-white bg-transparent focus:ring-0 font-medium outline-none appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                      value={item.quantity}
                    />
                    <button 
                      onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
                      className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
                
                <div className="col-span-3 w-full flex md:justify-end items-center justify-between md:gap-2">
                  <span className="md:hidden text-slate-500 font-medium">Price:</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Link href="/products" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <div className="bg-white dark:bg-[#2a1d1a] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-slate-900 dark:text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>Shipping estimate</span>
                <span className="font-semibold text-slate-900 dark:text-white">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                <span>Tax estimate</span>
                <span className="font-semibold text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-slate-900 dark:text-white">Order Total</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="block w-full">
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">
                Proceed to Checkout
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </Link>
            
            <div className="flex justify-center items-center gap-3 mt-6 mb-6 opacity-60 grayscale hover:grayscale-0 transition-all">
              <div className="h-6 w-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-[8px] font-bold text-slate-500">VISA</div>
              <div className="h-6 w-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-[8px] font-bold text-slate-500">MC</div>
              <div className="h-6 w-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-[8px] font-bold text-slate-500">PAYPAL</div>
              <div className="h-6 w-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-[8px] font-bold text-slate-500">AMEX</div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Secure SSL Encrypted Transaction
            </div>
          </div>
          
          {/* Promo Code Component */}
          <div className="mt-6">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Promo code" 
                className="flex-1 bg-white dark:bg-[#2a1d1a] border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              />
              <button className="bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved for Later Section */}
      <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Saved for Later (1)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Saved Item Card */}
          <div className="group bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img 
                alt="Classic button down shirt folded" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt5p3yYZbvEejJR92YXTCub7qlbg3i1TEh8XpvC9dEpLUVa9nR8XdOAsCkRfVNNsER4vdsvpkAx5G2wC9bFbfwkNxkyMF_m8sjAc1tCtqgBlC4f3vTvLfLweOz3tdWtzaxmtaFf752STSD3Y3R690ApMZaBCV0CsyKXmUOLkk2gzx32vodMWGeJcG67Dkctn5pZmaC8e7W9KJMB-I9kcpIx9jnnNBwUJr9vIf7_2oRzDc6-9KrufC7l5BwuwWwWb1MPYkPj6kdVMQ"
              />
              <button className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full text-slate-900 dark:text-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900 dark:text-white truncate">Oxford Cotton Shirt</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Size: L | Color: Blue</p>
              <div className="flex justify-between items-end">
                <span className="font-bold text-slate-900 dark:text-white">$45.00</span>
                <button className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors">Move to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
