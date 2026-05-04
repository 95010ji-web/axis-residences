"use client";

export default function Marquee() {
  const items = [
    "LUXURY ESTATES",
    "MODERN HOMES",
    "WATERFRONT VILLAS",
    "URBAN PENTHOUSES",
    "MOUNTAIN RETREATS",
    "GATED COMMUNITIES",
    "CUSTOM BUILDS",
    "INVESTMENT PROPERTIES",
  ];

  return (
    <div className="py-6 bg-earth overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="font-display text-sm tracking-[0.2em] text-cream/20 mx-8 flex items-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
