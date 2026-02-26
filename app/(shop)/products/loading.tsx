import { ProductFilters } from "@/components/product-filters";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground/90 selection:bg-primary/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(0,0,0,0))]"></div>
      
      <main className="container mx-auto px-4 py-8 md:px-8 lg:py-12">
        {/* Header Section Skeleton */}
        <div className="mb-10 flex flex-col gap-4">
          <div className="h-14 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse"></div>
          <div className="h-6 w-full max-w-2xl bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse delay-75"></div>
          <div className="h-6 w-3/4 max-w-xl bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse delay-100"></div>
        </div>

        {/* Filters Section (Actual component as it doesn't need to be skeletonized fully, or we just render it disabled) */}
        <div className="mb-8 sticky top-4 z-10 opacity-70 pointer-events-none">
          <ProductFilters />
        </div>

        {/* Results Info Skeleton */}
        <div className="mb-6 h-5 w-40 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
              {/* Image Skeleton */}
              <div className="aspect-3/4 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800"></div>
              {/* Content Skeleton */}
              <div className="space-y-2 mt-2">
                <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
