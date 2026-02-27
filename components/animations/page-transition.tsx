"use client";

import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }}
      className="flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
}
