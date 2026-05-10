import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Bed, Bath, Maximize, MapPin } from "lucide-react";
import { listings, formatPrice } from "@/lib/listings";

export const dynamic = "force-dynamic";

export default function CRMListingsPage() {
  const featured = listings.filter((l) => l.featured);
  const total = listings.length;
  const totalValue = listings.reduce((sum, l) => sum + l.price, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <div className="mb-6 lg:mb-10">
        <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-2">
          Listings
        </p>
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-earth tracking-tight">
          PROPERTY PORTFOLIO
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-earth text-cream p-3 sm:p-5">
          <p className="font-caption text-[9px] sm:text-[10px] text-cream/50 tracking-[0.12em] uppercase mb-1.5 sm:mb-2 leading-tight">
            Active Listings
          </p>
          <p className="font-display text-xl sm:text-3xl text-cream">{total}</p>
        </div>
        <div className="bg-earth text-cream p-3 sm:p-5">
          <p className="font-caption text-[9px] sm:text-[10px] text-cream/50 tracking-[0.12em] uppercase mb-1.5 sm:mb-2 leading-tight">
            Total Volume
          </p>
          <p className="font-display text-base sm:text-3xl text-gold leading-tight">
            {formatPrice(totalValue)}
          </p>
        </div>
        <div className="bg-earth text-cream p-3 sm:p-5">
          <p className="font-caption text-[9px] sm:text-[10px] text-cream/50 tracking-[0.12em] uppercase mb-1.5 sm:mb-2 leading-tight">
            Featured
          </p>
          <p className="font-display text-xl sm:text-3xl text-cream">{featured.length}</p>
        </div>
      </div>

      {/* Listings */}
      <div className="bg-cream border border-earth/10 mb-6 p-4 flex items-center justify-between">
        <p className="font-mono text-xs text-stone tracking-wider">
          {total} PROPERTIES IN PORTFOLIO
        </p>
        <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase">
          Edit listings in <code className="text-gold">lib/listings.ts</code>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.id}`}
            target="_blank"
            rel="noopener"
            className="group bg-cream border border-earth/10 hover:border-gold/40 transition-all overflow-hidden block"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {listing.featured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-gold text-cream font-mono text-[9px] font-bold px-2 py-0.5 tracking-wider">
                    FEATURED
                  </span>
                </div>
              )}
              <div className="absolute bottom-2 right-2">
                <span className="bg-earth/90 backdrop-blur-sm text-cream font-display text-sm px-2 py-1">
                  {formatPrice(listing.price)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-display text-sm text-earth mb-1 group-hover:text-gold transition-colors line-clamp-1">
                {listing.title}
              </h3>
              <div className="flex items-center gap-1 text-stone mb-3">
                <MapPin className="w-3 h-3" />
                <span className="font-mono text-[11px] tracking-wider truncate">
                  {listing.city}, {listing.state}
                </span>
              </div>
              <div className="flex gap-3 pt-3 border-t border-earth/10 text-[10px] text-earth/70 font-mono">
                <span>
                  <Bed className="w-3 h-3 text-gold inline mr-0.5" />
                  {listing.bedrooms}
                </span>
                <span>
                  <Bath className="w-3 h-3 text-gold inline mr-0.5" />
                  {listing.bathrooms}
                </span>
                <span>
                  <Maximize className="w-3 h-3 text-gold inline mr-0.5" />
                  {listing.sqft.toLocaleString()}
                </span>
                <ExternalLink className="w-3 h-3 ml-auto text-stone group-hover:text-gold transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
