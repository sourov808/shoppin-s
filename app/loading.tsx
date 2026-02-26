"use client";

import { useEffect, useState } from "react";
import { Shirt, Smartphone, Headphones, Watch, ShoppingBag } from "lucide-react";

const icons = [
  { icon: Shirt, label: "Fashion" },
  { icon: Smartphone, label: "Tech" },
  { icon: Headphones, label: "Audio" },
  { icon: Watch, label: "Accessories" },
  { icon: ShoppingBag, label: "Shopping" },
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = icons[index].icon;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-md z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-pulse"></div>
          
          <div className="bg-primary/10 p-5 rounded-full shadow-inner">
            <CurrentIcon className="h-10 w-10 text-primary animate-in fade-in zoom-in duration-500" />
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
            ShopModern
          </h3>
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Loading {icons[index].label}...
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-progress origin-left"></div>
        </div>
      </div>
    </div>
  );
}
