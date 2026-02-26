"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useSession, signOut } from "@/lib/auth-client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogIn, UserPlus } from "lucide-react";
import { SearchTypeahead } from "@/components/search-typeahead";

export function Header() {
  const { cartCount } = useCart();
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">shopping_bag</span>
            </div>
            <h2 className="text-neutral-900 text-xl font-bold tracking-tight">ShopModern</h2>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-neutral-600 hover:text-primary font-medium transition-colors" href="/products">New Arrivals</Link>
            <Link className="text-primary font-medium transition-colors" href="/products?sale=true">Sale</Link>
            <Link className="text-neutral-600 hover:text-primary font-medium transition-colors" href="/products">Products</Link>

          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <SearchTypeahead />
            
            <div className="relative group">
              <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-800 flex items-center justify-center">
                <span className="material-symbols-outlined">person</span>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 origin-top-right">
                {isPending ? (
                   <div className="px-4 py-3 text-sm text-neutral-500">Loading...</div>
                ) : session?.user ? (
                  <>
                    <div className="px-4 py-3 border-b border-neutral-100 mb-1">
                      <p className="text-sm font-semibold text-neutral-900 truncate">{session.user.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{session.user.email}</p>
                    </div>
                    <Link href="/account" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors">My Account</Link>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(session.user as any).role === "ADMIN" && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors">Admin Dashboard</Link>
                    )}
                    <div className="h-px bg-neutral-100 my-1"></div>
                    <button onClick={handleSignOut} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors">Sign In</Link>
                    <Link href="/signup" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors">Create Account</Link>
                  </>
                )}
              </div>
            </div>
            
            <Link href="/cart">
              <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative text-neutral-800 flex items-center justify-center">
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-0.5 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cartCount}</span>
                )}
              </button>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-800 flex items-center justify-center">
                  <span className="material-symbols-outlined">menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">New Arrivals</Link>
                  <Link href="/products?sale=true" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Sale</Link>
                  <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Products</Link>
                  <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">Other Stuffs</Link>
                  
                  <div className="h-px bg-neutral-200 my-2"></div>
                  
                  {!session?.user ? (
                    <>
                      <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"><LogIn className="h-4 w-4" /> Sign In</Link>
                      <Link href="/signup" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"><UserPlus className="h-4 w-4" /> Create Account</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/signup" className="text-sm font-medium hover:text-primary transition-colors">Create Account</Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </div>
    </div>
  );
}
