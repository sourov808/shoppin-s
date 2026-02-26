"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface AccountSidebarProps {
  user: {
    name: string;
    email: string;
    image: string | null;
    createdAt: Date;
  };
}

export function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/account", icon: "dashboard" },
    { name: "Orders", href: "/account/orders", icon: "package_2" },
    { name: "Wishlist", href: "/account/wishlist", icon: "favorite" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 gap-6 shrink-0 sticky top-28 h-fit">
      {/* User Profile Summary - Premium Glassmorphic Card */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-white/60 dark:bg-[#1a0f0d]/60 backdrop-blur-xl border border-white/40 dark:border-[#3a2522]/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        {/* Subtle mesh gradient background */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="size-24 rounded-full overflow-hidden bg-gradient-to-tr from-primary/30 to-blue-500/20 p-1 flex items-center justify-center shrink-0 shadow-lg">
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#181211] flex items-center justify-center text-3xl font-bold text-slate-700 dark:text-slate-300">
              {user.image ? (
                 <Image 
                  alt={user.name} 
                  className="w-full h-full object-cover" 
                  src={user.image}
                  width={96}
                  height={96}
                />
              ) : (
                <span>{user.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col overflow-hidden items-center w-full">
            <h3 className="text-xl text-neutral-800 dark:text-white font-bold truncate leading-tight tracking-tight max-w-full px-2">{user.name}</h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate max-w-full px-2 mt-1">{user.email}</p>
            <p className="text-slate-400 dark:text-slate-500 text-xs truncate mt-2">Joined {new Date(user.createdAt).getFullYear()}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Links - Interactive Glass Menu */}
      <nav className="flex flex-col gap-1.5 p-3 bg-white/60 dark:bg-[#1a0f0d]/60 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-[#3a2522]/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-4 pt-3 pb-2">Menu</h4>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 relative group overflow-hidden ${
                isActive 
                  ? "text-primary bg-primary/10 shadow-sm" 
                  : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-[#2a1d1a] hover:text-primary dark:hover:text-primary hover:shadow-sm"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-primary rounded-r-full shadow-[0_0_10px_rgba(235,56,43,0.5)]"></div>
              )}
              <span className={`material-symbols-outlined transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
              {item.name}
              
              {isActive && (
                <span className="material-symbols-outlined ml-auto text-[18px] opacity-40">arrow_forward_ios</span>
              )}
            </Link>
          );
        })}
        
        <hr className="my-3 border-slate-200 dark:border-[#3a2522]/50 mx-4" />
        
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-4 pt-1 pb-2">Actions</h4>
        <form action="/api/auth/signout" method="POST">
          <button type="submit" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500/90 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/20 font-medium transition-all duration-300 w-full text-left group">
            <span className="material-symbols-outlined transition-transform duration-300 group-hover:-translate-x-1">logout</span>
            Log Out
          </button>
        </form>
      </nav>
    </aside>
  );
}
