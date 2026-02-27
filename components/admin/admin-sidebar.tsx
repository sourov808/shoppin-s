"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  ShoppingBag,
  Users,
  Settings,
  PackagePlus,
  LayoutDashboard,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/products/new", label: "Add Product", icon: PackagePlus },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex h-full flex-col bg-muted/30 border-r w-64 pt-4 pb-6">
      <div className="flex h-14 items-center px-6 mb-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-primary">Stitch</span> Admin
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-2 flex flex-col gap-1 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="px-4 mt-auto space-y-2">
        <Link href="/">
          <Button variant="outline" className="w-full justify-start text-muted-foreground">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Back to Store
          </Button>
        </Link>
        <Button variant="destructive" onClick={handleSignOut} className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
