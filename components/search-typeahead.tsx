"use client";

import { useState, useEffect, useRef } from "react";
import { searchProducts } from "@/app/actions/search";
import Link from "next/link";
import Image from "next/image";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOnClickOutside } from "usehooks-ts";

export function SearchTypeahead() {
  const [query, setQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef as React.RefObject<HTMLElement>, () => setIsOpen(false));

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchProducts(query);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative hidden lg:flex items-center w-64 z-50">
      <form onSubmit={handleSubmit} className="w-full relative flex items-center bg-neutral-100 rounded-full px-4 h-10 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <Search className="text-neutral-500 w-5 h-5 mr-2" />
        <input 
          className="bg-transparent border-none text-sm w-full focus:ring-0 placeholder:text-neutral-500 text-neutral-900 outline-none" 
          placeholder="Search products..." 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 w-4 h-4 animate-spin text-neutral-400" />
        )}
      </form>

      {/* Dropdown Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 z-50">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-neutral-500">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <>
              {results.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 transition-colors"
                >
                  <div className="relative size-10 rounded-md overflow-hidden bg-neutral-100 shrink-0">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-neutral-900 truncate">{product.name}</h4>
                    <p className="text-xs text-neutral-500 truncate">{product.category}</p>
                  </div>
                  <div className="text-sm font-bold text-primary">
                    ${product.price ? product.price.toFixed(2) : "0.00"}
                  </div>
                </Link>
              ))}
              <div className="px-4 py-2 border-t border-neutral-100 mt-2">
                <button 
                  onClick={handleSubmit}
                  className="text-sm text-primary font-medium hover:underline w-full text-center"
                >
                  View all results
                </button>
              </div>
            </>
          ) : query.trim().length >= 2 ? (
            <div className="p-4 text-center">
              <p className="text-sm text-neutral-500">No products found for &quot;{query}&quot;</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
