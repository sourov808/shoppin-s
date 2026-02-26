
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { Prisma, Category } from "@prisma/client";

// Generate static params for typical searches or revalidate tags if needed
export const revalidate = 1800; // optionally cache the page for 60 seconds

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const categoryParam = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const searchString = typeof searchParams.search === "string" ? searchParams.search : undefined;
  const isSaleOnly = searchParams.sale === "true";

  // Build the Prisma query
  const whereClause: Prisma.ProductWhereInput = {
    isArchived: false,
  };

  if (categoryParam && categoryParam !== "All") {
    // Assuming category enum values match the strings exactly (e.g. "HEADPHONES")
    whereClause.category = categoryParam as Category;
  }

  if (searchString) {
    whereClause.name = {
      contains: searchString,
      mode: "insensitive",
    };
  }

  if (isSaleOnly) {
    whereClause.salePrice = {
      not: null,
    };
  }

  // Fetch products
  const products = await db.product.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground/90 selection:bg-primary/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(0,0,0,0))]"></div>
      
      <main className="container mx-auto px-4 py-8 md:px-8 lg:py-12">
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col gap-4">
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-foreground to-foreground/60 sm:text-5xl">
            Our Collection
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Discover premium audio, sleek wearables, and powerful smart devices designed to elevate your everyday experience.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 sticky top-20 z-10 transition-shadow max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
          <ProductFilters />
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between text-sm font-medium text-muted-foreground">
          <p>
            Showing <span className="font-bold text-foreground">{products.length}</span>{" "}
            {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <span className="text-4xl" aria-hidden="true">🕵️</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">No products found</h3>
            <p className="mt-2 max-w-md text-muted-foreground">
              We couldn&apos;t find any products matching your current filters. Try changing your search query or selecting a different category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
