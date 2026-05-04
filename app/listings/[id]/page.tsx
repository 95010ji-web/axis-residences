"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Car,
  TreePine,
  ArrowLeft,
  Phone,
  Mail,
  Calculator,
  Check,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { getListing, listings, formatPrice } from "@/lib/listings";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const listing = getListing(id);

  const [activeImage, setActiveImage] = useState(0);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-32">
        <div className="text-center">
          <h1 className="font-display text-4xl text-earth mb-4">404</h1>
          <p className="font-mono text-sm text-stone mb-6">Listing not found</p>
          <Link href="/listings" className="btn-primary">
            VIEW ALL LISTINGS
          </Link>
        </div>
      </div>
    );
  }

  const relatedListings = listings
    .filter((l) => l.id !== listing.id)
    .slice(0, 3);

  return (
    <>
      {/* Image gallery hero */}
      <section className="relative pt-24 lg:pt-32 bg-earth">
        <div className="page-frame">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 font-mono text-xs text-cream/60 hover:text-gold transition-colors tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              BACK TO LISTINGS
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 relative h-[400px] lg:h-[600px] overflow-hidden card-shadow"
            >
              <Image
                src={listing.images[activeImage]}
                alt={listing.title}
                fill
                priority
                className="object-cover transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {listing.featured && (
                  <span className="bg-gold text-cream font-mono text-[10px] font-bold px-3 py-1.5 tracking-wider">
                    FEATURED
                  </span>
                )}
                <span
                  className={`font-mono text-[10px] font-bold px-3 py-1.5 tracking-wider ${
                    listing.status === "Active"
                      ? "bg-leaf text-cream"
                      : listing.status === "Pending"
                      ? "bg-gold text-cream"
                      : "bg-stone text-cream"
                  }`}
                >
                  {listing.status.toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="bg-earth/90 backdrop-blur-sm text-cream font-display text-2xl px-5 py-2.5">
                  {formatPrice(listing.price)}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4">
              {listing.images.slice(0, 3).map((img, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-32 lg:h-[195px] overflow-hidden transition-all ${
                    activeImage === i ? "ring-2 ring-gold ring-offset-2 ring-offset-earth" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main details */}
      <section className="py-12 lg:py-16">
        <div className="page-frame">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="tag text-gold border-gold/30 mb-4 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
                  {listing.propertyType.toUpperCase()}
                </div>
                <h1 className="text-display-l text-earth mb-4">{listing.title}</h1>
                <div className="flex items-center gap-2 text-stone mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-mono text-sm">
                    {listing.address}, {listing.city}, {listing.state} {listing.zip}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 p-6 bg-cream-2 border border-earth/10"
              >
                {[
                  { icon: Bed, label: "Beds", value: listing.bedrooms },
                  { icon: Bath, label: "Baths", value: listing.bathrooms },
                  { icon: Maximize, label: "Sq Ft", value: listing.sqft.toLocaleString() },
                  { icon: Car, label: "Garage", value: listing.garage },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                    <p className="font-display text-xl text-earth">{item.value}</p>
                    <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <h2 className="font-display text-lg text-earth mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  PROPERTY OVERVIEW
                </h2>
                <div className="space-y-4">
                  {listing.longDescription.map((para, i) => (
                    <p key={i} className="font-mono text-sm text-earth/80 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="font-display text-lg text-earth mb-6">PROPERTY DETAILS</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 p-6 bg-cream-2 border border-earth/10">
                  {[
                    { label: "Property Type", value: listing.propertyType },
                    { label: "Year Built", value: listing.yearBuilt, icon: Calendar },
                    { label: "Lot Size", value: listing.lotSize, icon: TreePine },
                    { label: "Status", value: listing.status },
                    { label: "ZIP Code", value: listing.zip },
                    { label: "Price/Sqft", value: formatPrice(Math.round(listing.price / listing.sqft)) },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center pb-2 border-b border-earth/10"
                    >
                      <span className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase">
                        {item.label}
                      </span>
                      <span className="font-mono text-sm text-earth font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="font-display text-lg text-earth mb-6">KEY FEATURES</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {listing.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-start gap-3 p-3"
                    >
                      <div className="w-5 h-5 bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-gold" strokeWidth={3} />
                      </div>
                      <span className="font-mono text-sm text-earth/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="font-display text-lg text-earth mb-6">AMENITIES</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity, i) => (
                    <motion.span
                      key={amenity}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="tag text-earth border-earth/30"
                    >
                      {amenity.toUpperCase()}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28 h-fit"
            >
              <div className="bg-earth text-cream p-6 lg:p-8">
                <div className="mb-6 pb-6 border-b border-cream/10">
                  <p className="font-caption text-[10px] text-cream/40 tracking-[0.15em] uppercase mb-2">
                    Listed at
                  </p>
                  <p className="font-display text-3xl text-cream mb-1">
                    {formatPrice(listing.price)}
                  </p>
                  <p className="font-mono text-xs text-gold">
                    {formatPrice(Math.round(listing.price / listing.sqft))} / sq ft
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-display text-sm text-gold mb-4">CONTACT AGENT</h3>
                  <div className="space-y-3">
                    <a
                      href="tel:+14376920988"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Phone className="w-4 h-4 text-gold" />
                      </div>
                      <span className="font-mono text-sm text-cream/80 group-hover:text-gold transition-colors">
                        (437) 692-0988
                      </span>
                    </a>
                    <a
                      href="mailto:hello@axisresidences.com"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Mail className="w-4 h-4 text-gold" />
                      </div>
                      <span className="font-mono text-xs text-cream/80 group-hover:text-gold transition-colors break-all">
                        hello@axisresidences.com
                      </span>
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="btn-primary w-full justify-center"
                  >
                    SCHEDULE A TOUR
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/mortgage-calculator"
                    className="btn-ghost w-full justify-center"
                  >
                    <Calculator className="w-4 h-4" />
                    CALCULATE PAYMENT
                  </Link>
                </div>
              </div>

              <div className="mt-6 p-6 bg-cream-2 border border-earth/10">
                <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-3">
                  Estimated monthly payment
                </p>
                <p className="font-display text-2xl text-earth mb-1">
                  {formatPrice(Math.round((listing.price * 0.8 * 0.0064 * Math.pow(1.0064, 360)) / (Math.pow(1.0064, 360) - 1)))}
                </p>
                <p className="font-mono text-[11px] text-stone leading-relaxed">
                  Based on 20% down, 6.5% APR, 30-year fixed.{" "}
                  <Link href="/mortgage-calculator" className="text-gold underline">
                    Customize →
                  </Link>
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Related Listings */}
      <section className="py-16 lg:py-20 bg-earth/5 border-t border-earth/10">
        <div className="page-frame">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end mb-10"
          >
            <h2 className="text-display-l text-earth">
              MORE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                PROPERTIES
              </span>
            </h2>
            <Link href="/listings" className="btn-ghost-dark hidden sm:flex">
              VIEW ALL
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedListings.map((rel, i) => (
              <motion.div
                key={rel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/listings/${rel.id}`} className="block group bg-cream-2 card-shadow overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={rel.images[0]}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-earth/80 backdrop-blur-sm text-cream font-display text-base px-3 py-1.5">
                        {formatPrice(rel.price)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-sm text-earth mb-1.5 group-hover:text-gold transition-colors">
                      {rel.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-stone mb-3">
                      <MapPin className="w-3 h-3" />
                      <span className="font-mono text-[11px] tracking-wider">
                        {rel.city}, {rel.state}
                      </span>
                    </div>
                    <div className="flex gap-4 pt-3 border-t border-earth/10 text-[11px] text-earth/70">
                      <span><Bed className="w-3 h-3 text-gold inline mr-1" />{rel.bedrooms} BD</span>
                      <span><Bath className="w-3 h-3 text-gold inline mr-1" />{rel.bathrooms} BA</span>
                      <span><Maximize className="w-3 h-3 text-gold inline mr-1" />{rel.sqft.toLocaleString()} SF</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
