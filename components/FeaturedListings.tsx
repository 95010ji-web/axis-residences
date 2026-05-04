"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, MapPin, ArrowRight, ArrowUpRight } from "lucide-react";
import { listings, formatPrice } from "@/lib/listings";

export default function FeaturedListings() {
  const featured = listings.filter((l) => l.featured).slice(0, 4);

  return (
    <section className="py-20 lg:py-32">
      <div className="page-frame">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div>
            <div className="tag text-gold border-gold/30 mb-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
              CURATED SELECTION
            </div>
            <h2 className="text-display-l text-earth">
              FEATURED<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                PROPERTIES
              </span>
            </h2>
          </div>
          <Link href="/listings" className="btn-ghost-dark w-fit group">
            VIEW ALL LISTINGS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featured.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/listings/${listing.id}`}
                className="group bg-cream-2 card-shadow overflow-hidden block"
              >
                <div className="relative h-64 lg:h-72 overflow-hidden">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-cream font-mono text-xs font-bold px-3 py-1.5 tracking-wider">
                      FEATURED
                    </span>
                  </div>
                  <motion.div
                    className="absolute top-4 right-4 w-10 h-10 bg-cream flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-earth" />
                  </motion.div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-earth/80 backdrop-blur-sm text-cream font-display text-lg px-4 py-2">
                      {formatPrice(listing.price)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-earth mb-2 group-hover:text-gold transition-colors">
                    {listing.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-stone mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-mono text-xs tracking-wider">
                      {listing.city}, {listing.state}
                    </span>
                  </div>
                  <div className="flex gap-6 pt-4 border-t border-earth/10">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-gold" />
                      <span className="font-mono text-xs text-earth/70">{listing.bedrooms} BD</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-gold" />
                      <span className="font-mono text-xs text-earth/70">{listing.bathrooms} BA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4 text-gold" />
                      <span className="font-mono text-xs text-earth/70">{listing.sqft.toLocaleString()} SF</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
