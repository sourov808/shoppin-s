"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-full bg-neutral-100 animate-pulse rounded-md" />;
  }

  return (
    <div className="px-4 py-2 border-t border-neutral-100 mt-1">
      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Theme</p>
      <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
        <button
          onClick={() => setTheme("light")}
          className={`flex-1 flex items-center justify-center py-1.5 rounded-md transition-all ${
            theme === "light" 
              ? "bg-white text-primary shadow-sm" 
              : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
          }`}
          title="Light Mode"
        >
          <Sun className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`flex-1 flex items-center justify-center py-1.5 rounded-md transition-all ${
            theme === "dark" 
              ? "bg-neutral-900 text-primary shadow-sm" 
              : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-700/50"
          }`}
          title="Dark Mode"
        >
          <Moon className="h-4 w-4" />
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`flex-1 flex items-center justify-center py-1.5 rounded-md transition-all ${
            theme === "system" 
              ? "bg-white dark:bg-neutral-700 text-primary shadow-sm" 
              : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50"
          }`}
          title="System Preference"
        >
          <Monitor className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
