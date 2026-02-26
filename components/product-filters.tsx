"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "All",
  "HEADPHONES",
  "SPEAKERS",
  "ACCESSORIES",
  "WEARABLES",
  "SMARTPHONES",
  "TABLETS",
];

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || "";
  const saleOnly = searchParams.get("sale") === "true";

  const [searchValue, setSearchValue] = useState(currentSearch);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryClick = (category: string) => {
    const newQuery = createQueryString("category", category === "All" ? "" : category);
    router.push(`${pathname}?${newQuery}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuery = createQueryString("search", searchValue);
    router.push(`${pathname}?${newQuery}`);
  };

  const handleSaleToggle = () => {
    const newQuery = createQueryString("sale", saleOnly ? "" : "true");
    router.push(`${pathname}?${newQuery}`);
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between rounded-xl bg-white/5 p-4 backdrop-blur-md border border-white/10 dark:bg-black/20">
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={currentCategory === cat ? "default" : "secondary"}
            size="sm"
            onClick={() => handleCategoryClick(cat)}
            className="rounded-full transition-all duration-300 ease-in-out hover:scale-105"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase()}
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <Button
          variant={saleOnly ? "default" : "outline"}
          size="sm"
          onClick={handleSaleToggle}
          className="rounded-full transition-all duration-300 ease-in-out hover:scale-105"
        >
          Sale Items Only
        </Button>

        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64 group">
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-9 rounded-full bg-background/50 border-input transition-all duration-300 group-hover:border-primary/50 focus-visible:ring-primary"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
        </form>
      </div>
    </div>
  );
}
