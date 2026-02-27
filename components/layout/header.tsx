"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { useSession, signOut } from "@/lib/auth-client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LogIn, UserPlus } from "lucide-react";
import { SearchTypeahead } from "@/components/search-typeahead";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

function MobileNavContent({
  session,
  isPending,
  handleSignOut,
  mounted
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  isPending: boolean;
  handleSignOut: () => void;
  mounted: boolean;
}) {
  const userName = session?.user?.name || session?.user?.email || "User";

  return (
    <nav className="flex flex-col gap-4 mt-8">
      <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">New Arrivals</Link>
      <Link href="/products?sale=true" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Sale</Link>
      <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Products</Link>
      <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">Other Stuffs</Link>

      <div className="h-px bg-neutral-200 my-2"></div>

      {!mounted || isPending ? (
        <div className="text-sm text-neutral-500">Loading...</div>
      ) : session?.user ? (
        <>
          <div className="px-2 py-3 border-b border-neutral-100 dark:border-neutral-800 mb-1">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">{userName}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{session.user.email}</p>
          </div>
          <Link href="/account" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 dark:text-neutral-300 dark:hover:text-primary">
            <span className="material-symbols-outlined text-lg">person</span> My Account
          </Link>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(session as any)?.user?.role === "ADMIN" && (
            <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">admin_panel_settings</span> Admin Panel
            </Link>
          )}
          <button onClick={handleSignOut} className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 text-left">
            <span className="material-symbols-outlined text-lg">logout</span> Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"><LogIn className="h-4 w-4" /> Sign In</Link>
          <Link href="/signup" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"><UserPlus className="h-4 w-4" /> Create Account</Link>
        </>
      )}
      <ThemeToggle />
    </nav>
  );
}

export function Header() {
  const { cartCount } = useCart();
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Use useEffect only for hydration safety
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    await refetch();
    router.push("/");
    router.refresh();
  };

  const userName = session?.user?.name || session?.user?.email || "User";
  const userInitial = userName?.charAt(0).toUpperCase() || "U";

  return (
    <div className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">shopping_bag</span>
            </div>
            <h2 className="text-neutral-900 dark:text-neutral-100 text-xl font-bold tracking-tight">ShopModern</h2>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-neutral-600 dark:text-neutral-400 hover:text-primary font-medium transition-colors" href="/products">New Arrivals</Link>
            <Link className="text-primary font-medium transition-colors" href="/products?sale=true">Sale</Link>
            <Link className="text-neutral-600 dark:text-neutral-400 hover:text-primary font-medium transition-colors" href="/products">Products</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <SearchTypeahead />

            {/* User Dropdown */}
            <div className="relative group hidden sm:block">
              <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2">
                {!mounted || isPending ? (
                  <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse"></div>
                ) : session?.user?.image ? (
                  <NextImage
                    src={session.user.image}
                    alt={userName}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                  />
                ) : session?.user ? (
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm border border-neutral-200">
                    {userInitial}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                    <span className="material-symbols-outlined text-xl">person</span>
                  </div>
                )}
              </button>
<div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1 origin-top-right z-50">
                {!mounted || isPending ? (
                   <div className="px-4 py-3 text-sm text-neutral-500">Loading...</div>
                ) : session?.user ? (
                  <>
                    <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">{userName}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{session.user.email}</p>
                    </div>
                    <Link href="/account" className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">person</span> My Account
                    </Link>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(session.user as any).role === "ADMIN" && (
                      <Link href="/admin" className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">admin_panel_settings</span> Admin Dashboard
                      </Link>
                    )}
                    <div className="h-px bg-neutral-100 my-1"></div>
                    <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">logout</span> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary transition-colors flex items-center gap-2">
                      <LogIn className="h-4 w-4" /> Sign In
                    </Link>
                    <Link href="/signup" className="px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-primary transition-colors flex items-center gap-2">
                      <UserPlus className="h-4 w-4" /> Create Account
                    </Link>
                  </>
                )}
                <ThemeToggle />
              </div>
            </div>

            {/* Cart */}
            <Link href="/cart">
              <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors relative text-neutral-800 dark:text-neutral-200 flex items-center justify-center">
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-0.5 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cartCount}</span>
                )}
              </button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-800 dark:text-neutral-200 flex items-center justify-center">
                  <span className="material-symbols-outlined">menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white dark:bg-neutral-950 border-r dark:border-neutral-800">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Mobile navigation links and account settings.</SheetDescription>
                </SheetHeader>
                <MobileNavContent
                  session={session}
                  isPending={isPending}
                  handleSignOut={handleSignOut}
                  mounted={mounted}
                />
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </div>
    </div>
  );
}
