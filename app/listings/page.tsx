"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Bed, Bath, Maximize, MapPin, SlidersHorizontal, X, ArrowUpRight } from "lucide-react";
import { listings, formatPrice } from "@/lib/listings";
import { useReveal } from "@/lib/useReveal";

export default function ListingsPage() {
  const heroRef = useReveal();
  const gridRef = useReveal();
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [bedroomsFilter, setBedroomsFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchesSearch =
        search === "" ||
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.city.toLowerCase().includes(search.toLowerCase()) ||
        l.state.toLowerCase().includes(search.toLowerCase()) ||
        l.address.toLowerCase().includes(search.toLowerCase());

      const matchesPrice = l.price >= priceRange[0] && l.price <= priceRange[1];
      const matchesBedrooms = bedroomsFilter === 0 || l.bedrooms >= bedroomsFilter;

      return matchesSearch && matchesPrice && matchesBedrooms;
    });
  }, [search, priceRange, bedroomsFilter]);

  return (
    <>
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-earth text-cream"
      >
        <div className="page-frame">
          <div className="reveal">
            <div className="tag text-gold border-gold/30 mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
              PROPERTY COLLECTION
            </div>
            <h1 className="text-display-l text-cream mb-6">
              ALL
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                LISTINGS
              </span>
            </h1>
            <p className="font-mono text-sm text-cream/60 max-w-lg leading-relaxed">
              Browse our curated collection of premium properties. Use filters
              to find your perfect match.
            </p>
          </div>
        </div>
      </section>

      <section ref={gridRef as React.RefObject<HTMLElement>} className="py-12 lg:py-20">
        <div className="page-frame">
          <div className="reveal flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
              <input
                type="text"
                placeholder="SEARCH BY CITY, STATE, OR ADDRESS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-12"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-ghost-dark flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              FILTERS
              {(bedroomsFilter > 0 || priceRange[0] > 0 || priceRange[1] < 5000000) && (
                <span className="w-2 h-2 rounded-full bg-gold" />
              )}
            </button>
          </div>

          {showFilters && (
            <div className="reveal bg-cream-2 p-6 mb-8 border border-earth/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm text-earth">FILTER PROPERTIES</h3>
                <button
                  onClick={() => {
                    setPriceRange([0, 5000000]);
                    setBedroomsFilter(0);
                    setSearch("");
                  }}
                  className="font-mono text-xs text-gold hover:text-earth transition-colors tracking-wider flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> CLEAR ALL
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase block mb-2">
                    Min Price
                  </label>
                  <select
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="form-input"
                  >
                    <option value={0}>No Min</option>
                    <option value={500000}>$500,000</option>
                    <option value={750000}>$750,000</option>
                    <option value={1000000}>$1,000,000</option>
                    <option value={1500000}>$1,500,000</option>
                    <option value={2000000}>$2,000,000</option>
                  </select>
                </div>
                <div>
                  <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase block mb-2">
                    Max Price
                  </label>
                  <select
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="form-input"
                  >
                    <option value={5000000}>No Max</option>
                    <option value={750000}>$750,000</option>
                    <option value={1000000}>$1,000,000</option>
                    <option value={1500000}>$1,500,000</option>
                    <option value={2000000}>$2,000,000</option>
                    <option value={3000000}>$3,000,000</option>
                  </select>
                </div>
                <div>
                  <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase block mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={bedroomsFilter}
                    onChange={(e) => setBedroomsFilter(Number(e.target.value))}
                    className="form-input"
                  >
                    <option value={0}>Any</option>
                    <option value={3}>3+</option>
                    <option value={4}>4+</option>
                    <option value={5}>5+</option>
                    <option value={6}>6+</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="reveal mb-6">
            <p className="font-mono text-xs text-stone tracking-wider">
              {filtered.length} {filtered.length === 1 ? "PROPERTY" : "PROPERTIES"} FOUND
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((listing, i) => (
              <Link
                href={`/listings/${listing.id}`}
                key={listing.id}
                className={`reveal stagger-${(i % 4) + 1} group bg-cream-2 card-shadow overflow-hidden block`}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {listing.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold text-cream font-mono text-[10px] font-bold px-2 py-1 tracking-wider">
                        FEATURED
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 w-9 h-9 bg-earth/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-cream" />
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-earth/80 backdrop-blur-sm text-cream font-display text-base px-3 py-1.5">
                      {formatPrice(listing.price)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-sm text-earth mb-1.5 group-hover:text-gold transition-colors">
                    {listing.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-stone mb-3">
                    <MapPin className="w-3 h-3" />
                    <span className="font-mono text-[11px] tracking-wider">
                      {listing.address}, {listing.city}, {listing.state}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-earth/50 leading-relaxed mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="flex gap-5 pt-3 border-t border-earth/10">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-gold" />
                      <span className="font-mono text-[11px] text-earth/70">{listing.bedrooms} BD</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-gold" />
                      <span className="font-mono text-[11px] text-earth/70">{listing.bathrooms} BA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-gold" />
                      <span className="font-mono text-[11px] text-earth/70">{listing.sqft.toLocaleString()} SF</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-display text-lg text-earth/40 mb-2">NO PROPERTIES FOUND</p>
              <p className="font-mono text-xs text-stone">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
