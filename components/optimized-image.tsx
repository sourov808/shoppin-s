"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  placeholderBlur?: boolean;
  fadeIn?: boolean;
}

/**
 * Optimized Image Component with lazy loading and fade-in effect
 */
export function OptimizedImage({
  placeholderBlur = true,
  fadeIn = true,
  alt,
  className = "",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imgRef, setImgRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!imgRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );

    observer.observe(imgRef);
    return () => observer.disconnect();
  }, [imgRef]);

  return (
    <div
      ref={setImgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ contain: "layout" }}
    >
      {/* Placeholder */}
      {placeholderBlur && !isLoaded && isInView && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      )}

      {/* Actual Image */}
      {isInView && (
        <Image
          {...props}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`${fadeIn ? `transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}` : ""}`}
          loading="lazy"
          quality={80}
          placeholder={placeholderBlur ? "blur" : undefined}
        />
      )}
    </div>
  );
}

/**
 * Responsive Image Component for product cards
 */
export function ProductImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={priority}
        quality={80}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

/**
 * Avatar Image Component with fallback
 */
export function Avatar({
  src,
  alt,
  size = "md",
  className = "",
}: {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-14",
    xl: "size-20",
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-700 ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizeClasses[size]}
          className="object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-400">
          <span className="material-symbols-outlined">person</span>
        </div>
      )}
    </div>
  );
}

/**
 * Background Image Component for hero sections
 */
export function HeroBackground({
  src,
  alt,
  children,
  overlay = true,
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
  overlay?: boolean;
}) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
        quality={90}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-900/60 to-transparent" />
      )}
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}
