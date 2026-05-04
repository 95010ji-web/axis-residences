"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  Heart,
  Target,
  Phone,
  Mail,
  MapPin,
  Star,
  Briefcase,
  GraduationCap,
  Languages,
  ArrowRight,
} from "lucide-react";

// Inline SVG icons for social brands (lucide v1 removed these)
const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
import { useReveal } from "@/lib/useReveal";

const team = [
  { name: "Alexander Merritt", role: "Senior Agent", specialty: "Luxury Estates" },
  { name: "Priya Chakraborty", role: "Senior Agent", specialty: "Waterfront Properties" },
  { name: "Marcus Reed", role: "Investment Specialist", specialty: "Commercial & Multi-Family" },
  { name: "Olivia Santos", role: "Client Relations Director", specialty: "First-Time Buyers" },
];

const values = [
  {
    icon: Heart,
    title: "INTEGRITY",
    desc: "Honest guidance and transparent communication at every step of your journey.",
  },
  {
    icon: Target,
    title: "PRECISION",
    desc: "Data-driven market analysis and strategic positioning for optimal outcomes.",
  },
  {
    icon: TrendingUp,
    title: "RESULTS",
    desc: "Proven track record of exceeding client expectations and market benchmarks.",
  },
  {
    icon: Award,
    title: "EXCELLENCE",
    desc: "Uncompromising standards in service delivery and property curation.",
  },
];

const timeline = [
  { year: "2018", event: "Founded in Dallas, TX with a vision for premium real estate" },
  { year: "2019", event: "Surpassed $100M in total transaction volume" },
  { year: "2020", event: "Expanded to Arizona, Idaho, and Washington markets" },
  { year: "2022", event: "Named Top 50 Luxury Brokerage by RealTrends" },
  { year: "2024", event: "Launched digital-first buying experience platform" },
  { year: "2026", event: "200+ properties sold, $850M+ in lifetime transactions" },
];

const realtorStats = [
  { value: "200+", label: "Homes Sold" },
  { value: "$850M+", label: "Volume Closed" },
  { value: "8 yrs", label: "Experience" },
  { value: "98%", label: "Client Rating" },
];

const credentials = [
  { icon: Briefcase, label: "Licensed Realtor", detail: "TX & MB Licensed" },
  { icon: GraduationCap, label: "Real Estate Diploma", detail: "RECO Certified" },
  { icon: Award, label: "Top Producer 2024", detail: "Axis Residences" },
  { icon: Languages, label: "Languages", detail: "English, Punjabi, Hindi" },
];

export default function AboutPage() {
  const heroRef = useReveal();
  const teamRef = useReveal();
  const valuesRef = useReveal();
  const timelineRef = useReveal();

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-earth text-cream overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 border border-gold/30 rounded-full" />
          <div className="absolute bottom-0 left-10 w-72 h-72 border border-gold/20 rounded-full" />
        </div>

        <div className="page-frame relative z-10">
          <div className="reveal">
            <div className="tag text-gold border-gold/30 mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
              OUR STORY
            </div>
            <h1 className="text-display-l text-cream mb-6 max-w-4xl">
              BUILT ON TRUST,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                DRIVEN BY RESULTS.
              </span>
            </h1>
            <p className="font-mono text-sm text-cream/60 max-w-xl leading-relaxed">
              Since 2018, Axis Residences has been connecting discerning buyers
              with exceptional properties. Our team combines deep market expertise
              with personalized service to deliver outcomes that exceed
              expectations.
            </p>
          </div>
        </div>
      </section>

      {/* MEET YOUR REALTOR */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-cream-2">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
          <div className="font-display text-[20rem] text-earth leading-none -mr-20 -mt-10 select-none">
            G
          </div>
        </div>

        <div className="page-frame relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="tag text-gold border-gold/30 mb-4 mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
              YOUR DEDICATED REALTOR
            </div>
            <h2 className="text-display-l text-earth">
              MEET
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                GUNAVJANDER
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Realtor portrait card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <div className="relative">
                <div
                  className="absolute -top-4 -left-4 right-4 bottom-4 bg-gold"
                  aria-hidden="true"
                />
                <div className="relative h-[480px] lg:h-[600px] overflow-hidden bg-earth">
                  <Image
                    src="/images/realtor-bg.jpg"
                    alt="Gunavjander Saing — Senior Realtor"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth via-earth/40 to-transparent" />

                  {/* Initials placeholder over the image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 lg:w-52 lg:h-52 rounded-full bg-cream/95 backdrop-blur-sm flex items-center justify-center shadow-2xl border-4 border-gold/30">
                      <span className="font-display text-7xl lg:text-8xl text-earth">GS</span>
                    </div>
                  </div>

                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                      ))}
                      <span className="font-caption text-[10px] text-cream/70 tracking-[0.15em] ml-1">
                        4.9 / 5.0
                      </span>
                    </div>
                    <p className="font-display text-xl lg:text-2xl text-cream leading-tight">
                      GUNAVJANDER SAING
                    </p>
                    <p className="font-caption text-[10px] text-gold tracking-[0.2em] uppercase mt-1">
                      Senior Realtor · Founder
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-earth flex items-center justify-center text-cream hover:bg-gold transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-earth flex items-center justify-center text-cream hover:bg-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-earth flex items-center justify-center text-cream hover:bg-gold transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <span className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase ml-2">
                  Connect with me
                </span>
              </div>
            </motion.div>

            {/* Realtor info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="space-y-5 mb-8">
                <p className="font-mono text-base text-earth/85 leading-relaxed">
                  Hi, I&apos;m <span className="font-bold text-earth">Gunavjander Saing</span> —
                  founder of Axis Residences and a passionate real estate professional with
                  over 8 years of experience helping families and investors find homes
                  they truly love.
                </p>
                <p className="font-mono text-sm text-earth/70 leading-relaxed">
                  I built Axis on a simple promise: every client deserves the same
                  attention, honesty, and tireless advocacy I&apos;d want for my own
                  family. Whether you&apos;re a first-time buyer stepping into the market
                  or a seasoned investor scaling a portfolio, I&apos;ll guide you with
                  data, integrity, and care.
                </p>
                <p className="font-mono text-sm text-earth/70 leading-relaxed">
                  My specialties include luxury residential properties, new
                  construction, and helping international clients navigate North American
                  real estate. I&apos;m fluent in English, Punjabi, and Hindi — and I make
                  myself available when you need me.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-6 bg-earth text-cream">
                {realtorStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="text-center"
                  >
                    <p className="font-display text-xl lg:text-2xl text-gold">{stat.value}</p>
                    <p className="font-caption text-[9px] text-cream/50 tracking-[0.15em] uppercase mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Credentials grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {credentials.map((cred, i) => (
                  <motion.div
                    key={cred.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3 p-4 bg-cream border border-earth/10"
                  >
                    <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <cred.icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold text-earth">{cred.label}</p>
                      <p className="font-caption text-[10px] text-stone tracking-[0.1em] uppercase mt-0.5">
                        {cred.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+14376920988" className="btn-primary flex-1 justify-center">
                  <Phone className="w-4 h-4" />
                  CALL DIRECT
                </a>
                <Link href="/contact" className="btn-ghost-dark flex-1 justify-center">
                  <Mail className="w-4 h-4" />
                  SEND MESSAGE
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2 text-stone">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span className="font-mono text-xs">
                  Serving Texas, Manitoba & Greater Toronto Area
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section ref={teamRef as React.RefObject<HTMLElement>} className="py-20 lg:py-32">
        <div className="page-frame">
          <div className="reveal mb-12">
            <div className="tag text-gold border-gold/30 mb-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
              THE TEAM
            </div>
            <h2 className="text-display-l text-earth">
              SUPPORTING<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                CAST
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="reveal stagger-1 relative h-[400px] lg:h-[500px] overflow-hidden card-shadow">
              <Image
                src="/images/about-team.jpg"
                alt="Axis Residences Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/60 to-transparent" />
            </div>
            <div className="space-y-4">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="p-6 bg-cream-2 border border-earth/10 hover:border-gold/30 transition-all group"
                >
                  <h3 className="font-display text-sm text-earth group-hover:text-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-stone tracking-wider mt-1">
                    {member.role}
                  </p>
                  <p className="font-caption text-[10px] text-gold tracking-[0.15em] uppercase mt-2">
                    {member.specialty}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section ref={valuesRef as React.RefObject<HTMLElement>} className="py-20 lg:py-32 bg-earth text-cream">
        <div className="page-frame">
          <div className="reveal text-center mb-16">
            <div className="tag text-gold border-gold/30 mb-4 mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
              OUR VALUES
            </div>
            <h2 className="text-display-l text-cream">
              WHAT DRIVES
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                OUR MISSION
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-8 border border-cream/10 hover:border-gold/40 transition-all group text-center"
              >
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-gold/20 transition-colors">
                  <v.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-sm tracking-wider text-cream mb-3">
                  {v.title}
                </h3>
                <p className="font-mono text-xs text-cream/50 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section ref={timelineRef as React.RefObject<HTMLElement>} className="py-20 lg:py-32">
        <div className="page-frame">
          <div className="reveal text-center mb-16">
            <div className="tag text-gold border-gold/30 mb-4 mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
              MILESTONES
            </div>
            <h2 className="text-display-l text-earth">
              OUR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                JOURNEY
              </span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gold flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-xs text-cream">{item.year}</span>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px h-full bg-gold/20 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="font-mono text-sm text-earth leading-relaxed">
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <Link href="/contact" className="btn-primary">
              START YOUR JOURNEY
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
