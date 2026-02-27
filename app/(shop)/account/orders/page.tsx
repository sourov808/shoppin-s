import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { recentOrders } from "@/lib/constants";

export default async function OrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/login");
  }

  // TODO: Fetch real orders from the database
  // const orders = await db.order.findMany({ where: { userId: session.user.id } });
  
  const orders = recentOrders;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-800 dark:text-white tracking-tight">Order History</h1>
        <p className="text-[#8a6760] dark:text-slate-400 mt-1">Review your past purchases and track current shipments.</p>
      </div>

      <div className="bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-[#3a2522] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-[#2a1d1a]/50 text-[#8a6760] dark:text-slate-400 text-xs uppercase font-semibold tracking-wider">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#3a2522]">
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-[#2a1d1a]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-800 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4 text-[#8a6760] dark:text-slate-400">{order.date}</td>
                  <td className="px-6 py-4">
                    {order.status === 'Delivered' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {order.status}
                      </span>
                    ) : order.status === 'Processing' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        {order.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-neutral-800 dark:text-white">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            You haven&apos;t placed any orders yet.
          </div>
        )}
      </div>
    </div>
  );
}
