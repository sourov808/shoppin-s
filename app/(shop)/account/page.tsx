import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch the user's details and address from the database
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      createdAt: true,
    }
  });

  if (!user) {
    redirect("/login");
  }

  const address = await db.address.findFirst({
    where: { userId: session.user.id, isDefault: true }
  });

  return (
    <>
      <DashboardClient user={user} address={address} />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1a0f0d] p-5 rounded-xl border border-slate-200 dark:border-[#3a2522] shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <div>
            <p className="text-[#8a6760] dark:text-slate-400 text-sm font-medium">Total Orders</p>
            <p className="text-2xl font-bold text-neutral-800 dark:text-white">0</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a0f0d] p-5 rounded-xl border border-slate-200 dark:border-[#3a2522] shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center">
            <span className="material-symbols-outlined">local_shipping</span>
          </div>
          <div>
            <p className="text-[#8a6760] dark:text-slate-400 text-sm font-medium">In Transit</p>
            <p className="text-2xl font-bold text-neutral-800 dark:text-white">0</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a0f0d] p-5 rounded-xl border border-slate-200 dark:border-[#3a2522] shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart_checkout</span>
          </div>
          <div>
            <p className="text-[#8a6760] dark:text-slate-400 text-sm font-medium">Saved Items</p>
            <p className="text-2xl font-bold text-neutral-800 dark:text-white">0</p>
          </div>
        </div>
      </div>
    </>
  );
}
