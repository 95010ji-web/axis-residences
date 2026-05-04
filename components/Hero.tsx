"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Star, Play } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const bg = el.querySelector(".hero-bg") as HTMLElement;
      const text = el.querySelector(".hero-text") as HTMLElement;
      if (bg) bg.style.transform = `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.15}px)`;
      if (text) text.style.transform = `translateY(${scrollY * 0.3}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => setVideoLoaded(true);
    video.addEventListener("loadeddata", onLoaded);
    return () => video.removeEventListener("loadeddata", onLoaded);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Static fallback image (always present, fades out when video loads) */}
      <div
        className={`hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform transition-opacity duration-1000 ${
          videoLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url('/images/hero.jpg')` }}
      />

      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero.jpg"
        className={`hero-bg absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/hero-villa.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/65 to-obsidian/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-transparent" />

      {/* Top corner decorations */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-24 left-8 hidden lg:block z-10"
      >
        <div className="flex items-center gap-3 text-cream/40">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse-dot" />
          <span className="font-caption text-[10px] tracking-[0.2em] uppercase">
            Est. 2018
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute top-24 right-8 hidden lg:block z-10"
      >
        <div className="flex items-center gap-1 text-cream/40">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-gold text-gold" />
          ))}
          <span className="font-caption text-[10px] tracking-[0.2em] uppercase ml-2">
            4.9 / 5.0
          </span>
        </div>
      </motion.div>

      {/* Live indicator showing video is playing */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute top-24 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 bg-obsidian/40 backdrop-blur-md px-3 py-1.5 z-10 border border-cream/10"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta" />
        </span>
        <span className="font-caption text-[10px] text-cream/70 tracking-[0.2em] uppercase">
          Live Tour
        </span>
        <Play className="w-3 h-3 text-cream/70 ml-1" fill="currentColor" />
      </motion.div>

      <div className="hero-text relative z-10 page-frame pb-20 lg:pb-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="tag text-gold border-gold/30 mb-8 w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
          LUXURY REAL ESTATE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-display-xl text-cream mb-6 max-w-5xl"
        >
          FIND YOUR
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#E8B954] to-gold">
            DREAM HOME.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-mono text-sm text-cream/60 max-w-lg mb-10 leading-relaxed"
        >
          From stunning estates to modern masterpieces. We curate the finest
          properties and deliver exceptional real estate experiences tailored
          to your lifestyle.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          <Link href="/listings" className="btn-primary group">
            EXPLORE LISTINGS
            <ArrowDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact" className="btn-ghost">
            SCHEDULE VIEWING
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 pt-8 border-t border-cream/10 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {[
            { value: "200+", label: "Properties Sold" },
            { value: "$850M", label: "In Transactions" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "24hr", label: "Response Time" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
            >
              <p className="text-display-m text-cream">{stat.value}</p>
              <p className="font-caption text-[10px] text-cream/40 tracking-[0.15em] uppercase mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-caption text-[9px] text-cream/30 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-cream/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
