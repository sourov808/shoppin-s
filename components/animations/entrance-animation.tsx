"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function EntranceAnimation({ children }: { children: React.ReactNode }) {
  const [showEntrance, setShowEntrance] = useState(true);

  useEffect(() => {
    // Hide entrance after 2.5 seconds
    const timer = setTimeout(() => {
      setShowEntrance(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showEntrance && (
          <motion.div
            key="entrance-overlay"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-white dark:bg-neutral-950 overflow-hidden"
          >
            <div className="relative overflow-hidden flex flex-col items-center">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: 0.2 
                }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="size-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-2xl shadow-primary/20">
                  <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tighter">ShopModern</h1>
              </motion.div>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="h-[2px] bg-primary absolute bottom-0 left-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showEntrance ? 0 : 1, 
          y: showEntrance ? 20 : 0 
        }}
        transition={{ 
          duration: 1, 
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 0.2
        }}
        className={showEntrance ? "h-screen overflow-hidden" : ""}
      >
        {children}
      </motion.div>
    </>
  );
}
