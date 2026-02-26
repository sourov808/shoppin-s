"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AccountMobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/account", icon: "dashboard" },
    { name: "Orders", href: "/account/orders", icon: "package_2" },
    { name: "Wishlist", href: "/account/wishlist", icon: "favorite" },
  ];

  return (
    <div className="lg:hidden w-full overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
      <nav className="flex gap-2 min-w-max p-2 bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-[#3a2522] shadow-sm">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                isActive 
                  ? "text-primary bg-primary/10 shadow-sm" 
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#2a1d1a]"
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
