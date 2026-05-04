"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/interior.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/75 to-obsidian/60" />

      <div className="page-frame relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="tag text-gold border-gold/30 mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
            READY TO MOVE?
          </div>
          <h2 className="text-display-l text-cream mb-6">
            YOUR NEXT CHAPTER
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
              STARTS HERE.
            </span>
          </h2>
          <p className="font-mono text-sm text-cream/60 leading-relaxed mb-8 max-w-md">
            Whether you&apos;re buying your first home or upgrading to a luxury
            estate, Gunavjander and the Axis team are ready to make it happen.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/listings" className="btn-primary group">
              BROWSE PROPERTIES
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/mortgage-calculator" className="btn-ghost">
              CALCULATE MORTGAGE
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
