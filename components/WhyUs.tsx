"use client";

import { motion } from "framer-motion";
import { Shield, Award, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "TRUSTED EXPERTISE",
    description:
      "Over 200 successful transactions and deep market knowledge across premium residential markets.",
  },
  {
    icon: Award,
    title: "AWARD WINNING",
    description:
      "Recognized by the National Association of Realtors for excellence in luxury property sales.",
  },
  {
    icon: Clock,
    title: "24/7 AVAILABILITY",
    description:
      "Our team is always accessible. Schedule viewings, get market updates, or ask questions anytime.",
  },
  {
    icon: Users,
    title: "PERSONALIZED SERVICE",
    description:
      "Every client receives a tailored strategy, from first consultation to closing day celebrations.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 lg:py-32 bg-earth text-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-96 h-96 border border-gold/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-20 w-64 h-64 border border-gold/20 rounded-full"
        />
      </div>

      <div className="page-frame relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="tag text-gold border-gold/30 mb-4 mx-auto w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
            WHY CHOOSE US
          </div>
          <h2 className="text-display-l text-cream">
            THE AXIS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
              ADVANTAGE
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group p-8 border border-cream/10 hover:border-gold/40 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors"
              >
                <feature.icon className="w-6 h-6 text-gold" />
              </motion.div>
              <h3 className="font-display text-sm tracking-wider text-cream mb-3">
                {feature.title}
              </h3>
              <p className="font-mono text-xs text-cream/50 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
