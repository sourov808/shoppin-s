import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signOutAction } from "@/lib/actions/auth-actions";
import { db } from "@/lib/db";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch user from database to get the role
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });

  // Redirect non-admin users to user dashboard
  if (!user || user.role !== "ADMIN") {
    redirect("/account");
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <div className="flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 px-6 py-4 bg-white dark:bg-[#1a0f0d]/50 sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-3xl">shopping_cart_checkout</span>
              <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">Admin Dashboard</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Dashboard</Link>
              <Link href="/admin/orders" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Orders</Link>
              <Link href="/admin/products/new" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Products</Link>
              <Link href="/admin/analytics" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Analytics</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-[#221310] text-slate-700 dark:text-slate-300 hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-[#221310] text-slate-700 dark:text-slate-300 hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user.name || "Admin"}</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <div className="bg-primary/20 rounded-full h-10 w-10 flex items-center justify-center text-primary font-bold overflow-hidden">
                {user.image ? (
                  <img src={user.image} alt={user.name || "Admin"} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined max-w-full">person</span>
                )}
              </div>
            </div>
            <form action={async () => {
              "use server";
              await signOutAction();
            }}>
              <button
                type="submit"
                className="ml-2 flex items-center justify-center rounded-lg h-10 w-10 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                title="Sign out"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </form>
          </div>
        </header>
        {children}

        <footer className="mt-auto px-6 py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a0f0d]/50">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2024 Store Admin. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="text-sm text-slate-500 hover:text-primary transition-colors">Help Center</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
