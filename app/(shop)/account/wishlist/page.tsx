import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export default async function WishlistPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch saved items (wishlist)
  const savedItems = await db.savedItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-800 dark:text-white tracking-tight">Your Wishlist</h1>
        <p className="text-[#8a6760] dark:text-slate-400 mt-1">Products you&apos;ve saved for later consideration.</p>
      </div>

      <div className="bg-white dark:bg-[#1a0f0d] rounded-xl border border-slate-200 dark:border-[#3a2522] shadow-sm overflow-hidden min-h-[400px]">
        {savedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {savedItems.map((item) => (
              <div key={item.id} className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <Link href={`/products/${item.product.id}`} className="block relative aspect-square">
                  <Image
                    src={item.product.images[0] || "/placeholder-image.jpg"}
                    alt={item.product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white line-clamp-1 mb-1">
                    {item.product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-lg text-slate-900 dark:text-white">
                      ${item.product.salePrice || item.product.price}
                    </span>
                    <button className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center h-full min-h-[400px]">
            <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-slate-400">favorite_border</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
              You haven&apos;t saved any items yet. Start browsing to add items you love!
            </p>
            <Link 
              href="/products" 
              className="bg-primary hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/25 transition-all"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
