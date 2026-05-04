"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & Michael Chen",
    role: "Homebuyers — Burlington, ON",
    text: "Gunavjander made our dream home a reality. His market knowledge and negotiation skills saved us time and money. We couldn't be happier with our new estate.",
    rating: 5,
  },
  {
    name: "David Okonkwo",
    role: "Property Investor — Mississauga, ON",
    text: "As an investor, I need a team that understands ROI and market timing. Axis consistently delivers premium properties with strong appreciation potential.",
    rating: 5,
  },
  {
    name: "Emily & James Rodriguez",
    role: "Homebuyers — Brampton, ON",
    text: "From our first viewing to closing day, the experience was seamless. The attention to detail and personalized service set Axis apart from every other agency.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32">
      <div className="page-frame">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="tag text-gold border-gold/30 mb-4 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
            TESTIMONIALS
          </div>
          <h2 className="text-display-l text-earth">
            CLIENT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
              STORIES
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-cream-2 p-8 card-shadow relative"
            >
              <Quote className="w-8 h-8 text-gold/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.05, duration: 0.3 }}
                  >
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  </motion.div>
                ))}
              </div>
              <p className="font-mono text-sm text-earth/70 leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t border-earth/10 pt-4">
                <p className="font-display text-sm text-earth">{t.name}</p>
                <p className="font-caption text-[10px] text-stone tracking-[0.1em] uppercase mt-1">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
