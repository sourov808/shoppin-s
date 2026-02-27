"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/lib/constants/index";

export function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative rounded-3xl overflow-hidden min-h-[600px] flex items-center group/hero bg-neutral-900"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={heroContent.backgroundImage}
          alt="Hero Background"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-neutral-950/90 via-neutral-900/60 to-transparent z-10"></div>

      {/* Animated Background Highlights */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] z-10 animate-pulse"></div>

      {/* Content with faster Parallax and Fade */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-3xl px-8 md:px-16 lg:px-20 py-16"
      >
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 mb-8"
        >
          <span className="size-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-widest">{heroContent.badge}</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8"
        >
          {heroContent.title.split(' ').slice(0, 2).join(' ')} <br/>
          <span className="gradient-text">{heroContent.title.split(' ').slice(2).join(' ')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-neutral-200/90 mb-10 max-w-lg leading-relaxed"
        >
          {heroContent.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-5 items-center"
        >
          <Link 
            href="/products" 
            className="group/btn btn-premium flex items-center gap-3"
          >
            {heroContent.ctaPrimary}
            <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
          </Link>
          
          <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-xl font-bold transition-all hover:border-white/30 text-sm">
            {heroContent.ctaSecondary}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
