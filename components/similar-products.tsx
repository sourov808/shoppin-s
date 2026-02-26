import { db } from "@/lib/db";
import { ProductCard } from "./product-card";
import { Category } from "@prisma/client";

interface SimilarProductsProps {
  currentProductId: string;
  category: string;
}

export async function SimilarProducts({ currentProductId, category }: SimilarProductsProps) {
  const similarProducts = await db.product.findMany({
    where: {
      category: category as Category,
      id: { not: currentProductId },
      isArchived: false,
    },
    take: 4,
    orderBy: {
      rating: 'desc'
    }
  });

  if (similarProducts.length === 0) return null;

  return (
    <section className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">You Might Also Like</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
