"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useSession } from "@/lib/auth-client";
import { useCart } from "@/context/cart-context";
import { createOrder } from "@/lib/actions/checkout-actions";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { cartTotal, cartCount, clearCart, cart } = useCart();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "California",
    zipCode: "",
    country: "United States",
    phone: "",
  });

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 150 ? 0 : 15.00;
  const finalTotal = cartTotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const orderItems = cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));

      const result = await createOrder({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
        items: orderItems,
        subtotal: cartTotal,
        shippingCost: shipping,
        taxAmount: tax,
        totalAmount: finalTotal,
        userId: session?.user?.id,
      });

      if (result.success) {
        setOrderNum(result.orderId?.slice(0, 8).toUpperCase() || "ORD-" + Math.floor(Math.random() * 10000));
        setIsSuccess(true);
        clearCart();
      } else {
        setError(result.error || "Failed to create order");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="grow w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-40 py-24 flex flex-col items-center justify-center text-center">
        <div className="bg-primary/10 p-6 rounded-full inline-block mb-6 text-primary">
          <span className="material-symbols-outlined text-[64px]">check_circle</span>
        </div>
        <h1 className="text-3xl font-extrabold text-neutral-800 dark:text-white tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-[#8a6760] dark:text-slate-400 mb-2 max-w-md">
          Thank you for your purchase. Your order #{orderNum} is currently being processed and will be shipped soon.
        </p>
        <p className="text-sm text-[#8a6760] dark:text-slate-400 mb-8 max-w-md">
          A confirmation email has been sent to {formData.email}
        </p>
        <Link href="/products" className="bg-primary hover:bg-red-600 text-white rounded-lg px-8 py-4 text-sm font-bold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="grow w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-40 py-24 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full inline-block mb-6 text-slate-400">
          <span className="material-symbols-outlined text-[48px]">shopping_cart</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Your cart is empty</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
          Add some products to your cart before checking out.
        </p>
        <Link href="/products" className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grow flex justify-center w-full px-4 py-8 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-12">
        {/* Left Column: Checkout Form */}
        <div className="flex-1 flex flex-col">
          {/* Stepper */}
          <nav aria-label="Progress" className="mb-10">
            <ol className="flex items-center space-x-4" role="list">
              <li className="flex items-center">
                <Link href="/cart" className="text-primary flex items-center gap-2 text-sm font-medium hover:underline">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  Cart
                </Link>
                <span className="material-symbols-outlined text-[#e6dddb] mx-2 text-lg">chevron_right</span>
              </li>
              <li className="flex items-center">
                <span aria-current="page" className="text-primary flex items-center gap-2 text-sm font-bold">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">2</span>
                  Shipping
                </span>
                <span className="material-symbols-outlined text-[#e6dddb] dark:text-slate-700 mx-2 text-lg">chevron_right</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#8a6760] dark:text-slate-500 flex items-center gap-2 text-sm font-medium">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#8a6760] dark:border-slate-600 text-[10px]">3</span>
                  Payment
                </span>
                <span className="material-symbols-outlined text-[#e6dddb] dark:text-slate-700 mx-2 text-lg">chevron_right</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#8a6760] dark:text-slate-500 flex items-center gap-2 text-sm font-medium">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#8a6760] dark:border-slate-600 text-[10px]">4</span>
                  Review
                </span>
              </li>
            </ol>
          </nav>
          
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-white mb-8">Shipping Details</h1>
          
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            {/* Contact Info Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-slate-100">Contact Information</h2>
                <div className="text-sm text-[#8a6760] dark:text-slate-400">
                  {!session?.user && (
                    <>Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Log in</Link></>
                  )}
                </div>
              </div>
              <input 
                required
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none mb-3" 
                placeholder="Email address" 
                type="email"
              />
              <input 
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none mb-3" 
                placeholder="Phone number (optional)" 
                type="tel"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input className="rounded border-gray-300 text-primary focus:ring-primary bg-transparent" type="checkbox" />
                <span className="text-sm text-[#5c4540] dark:text-slate-400">Email me with news and offers</span>
              </label>
            </div>
            
            {/* Shipping Address Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-slate-100 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-neutral-800 dark:text-slate-200 mb-1" htmlFor="first-name">First name</label>
                  <input required id="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" type="text" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-neutral-800 dark:text-slate-200 mb-1" htmlFor="last-name">Last name</label>
                  <input required id="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" type="text" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-800 dark:text-slate-200 mb-1" htmlFor="address">Address</label>
                  <input required id="address" value={formData.address} onChange={handleInputChange} className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" type="text" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-800 dark:text-slate-200 mb-1" htmlFor="apartment">Apartment, suite, etc. (optional)</label>
                  <input id="apartment" value={formData.apartment} onChange={handleInputChange} className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" type="text" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-neutral-800 dark:text-slate-200 mb-1" htmlFor="city">City</label>
                  <input required id="city" value={formData.city} onChange={handleInputChange} className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" type="text" />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-neutral-800 dark:text-slate-200 mb-1" htmlFor="country">Country/Region</label>
                  <select id="country" value={formData.country} onChange={handleInputChange} className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-neutral-800 dark:text-slate-200 mb-1" htmlFor="state">State</label>
                  <select id="state" value={formData.state} onChange={handleInputChange} className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none">
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                    <option>Florida</option>
                    <option>Illinois</option>
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-neutral-800 dark:text-slate-200 mb-1" htmlFor="zip">ZIP code</label>
                  <input required id="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full rounded-lg border border-[#e6dddb] bg-white dark:bg-[#1a0f0d] dark:border-[#3a2522] dark:text-white px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" type="text" />
                </div>
              </div>
            </div>
            
            {/* Shipping Method */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-slate-100 mb-4">Shipping Method</h2>
              <div className="rounded-lg border border-[#e6dddb] dark:border-[#3a2522] overflow-hidden">
                <label className="relative flex cursor-pointer p-4 border-b border-[#e6dddb] dark:border-[#3a2522] hover:bg-background-light dark:hover:bg-[#3a2522] transition-colors">
                  <input defaultChecked className="mt-0.5 h-4 w-4 border-gray-300 text-primary focus:ring-primary bg-transparent" name="shipping-method" type="radio" value="standard" />
                  <span className="ml-3 flex flex-col">
                    <span className="block text-sm font-medium text-neutral-800 dark:text-white">Standard Shipping</span>
                    <span className="block text-sm text-[#8a6760] dark:text-slate-400">4-5 Business Days</span>
                  </span>
                  <span className="ml-auto font-medium text-neutral-800 dark:text-white">Free</span>
                </label>
                <label className="relative flex cursor-pointer p-4 hover:bg-background-light dark:hover:bg-[#3a2522] transition-colors">
                  <input className="mt-0.5 h-4 w-4 border-gray-300 text-primary focus:ring-primary bg-transparent" name="shipping-method" type="radio" value="express" />
                  <span className="ml-3 flex flex-col">
                    <span className="block text-sm font-medium text-neutral-800 dark:text-white">Express Shipping</span>
                    <span className="block text-sm text-[#8a6760] dark:text-slate-400">1-2 Business Days</span>
                  </span>
                  <span className="ml-auto font-medium text-neutral-800 dark:text-white">$15.00</span>
                </label>
              </div>
            </div>
            
            {/* Navigation Actions */}
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#e6dddb] dark:border-[#3a2522]">
              <Link className="flex items-center gap-2 text-sm font-medium text-[#8a6760] hover:text-neutral-800 dark:text-slate-400 dark:hover:text-white transition-colors" href="/cart">
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Return to Cart
              </Link>
              <button 
                type="submit"
                disabled={isPending || cartCount === 0}
                className="bg-primary hover:bg-red-600 text-white rounded-lg px-8 py-3 text-sm font-bold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-slate-400 flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Right Column: Order Summary Sidebar */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="sticky top-8 rounded-xl bg-white dark:bg-[#1a0f0d] border border-[#e6dddb] dark:border-[#3a2522] shadow-sm p-6">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-white mb-6">Order Summary</h2>
            
            {/* Items List */}
            <div className="space-y-6 mb-6 max-h-[300px] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="relative h-20 w-20 shrink-0 rounded-lg border border-[#e6dddb] bg-background-light dark:border-[#3a2522] dark:bg-[#2c1c19] overflow-hidden">
                    <img className="h-full w-full object-cover object-center" alt={item.name} src={item.image} />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-xs text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium text-neutral-800 dark:text-white line-clamp-2 leading-tight">{item.name}</span>
                    <span className="text-xs text-[#8a6760] dark:text-slate-400 mt-1">Category: {item.category}</span>
                  </div>
                  <span className="text-sm font-medium text-neutral-800 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            {/* Cost Breakdown */}
            <div className="space-y-3 border-t border-[#e6dddb] dark:border-[#3a2522] pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#5c4540] dark:text-slate-400">Subtotal ({cartCount} items)</span>
                <span className="font-medium text-neutral-800 dark:text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#5c4540] dark:text-slate-400">Shipping</span>
                <span className="text-sm font-medium text-neutral-800 dark:text-white">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#5c4540] dark:text-slate-400">Taxes</span>
                <span className="font-medium text-neutral-800 dark:text-white">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="flex items-center justify-between border-t border-[#e6dddb] dark:border-[#3a2522] pt-6 mt-6">
              <span className="text-base font-semibold text-neutral-800 dark:text-white">Total</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-[#8a6760] dark:text-slate-400">USD</span>
                <span className="text-2xl font-bold text-neutral-800 dark:text-white">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-8 flex justify-center gap-4 text-[#8a6760] dark:text-slate-500 opacity-60">
              <span className="material-symbols-outlined text-3xl">lock</span>
              <span className="material-symbols-outlined text-3xl">verified_user</span>
              <span className="material-symbols-outlined text-3xl">local_shipping</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
