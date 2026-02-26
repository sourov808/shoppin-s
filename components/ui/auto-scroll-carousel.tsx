"use client";

import { useEffect, useRef, ReactNode, useState } from "react";

export function AutoScrollCarousel({ children, className = "" }: { children: ReactNode, className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isHovered) return;

    const interval = setInterval(() => {
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollContainer.scrollLeft >= maxScroll - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll exactly one card width + gap (280px + 24px = 304px)
        scrollContainer.scrollBy({ left: 304, behavior: "smooth" }); 
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      ref={scrollRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      className={`flex overflow-x-auto gap-6 pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x ${className}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
      {children}
    </div>
  );
}
