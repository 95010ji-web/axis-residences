"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/crm")) return null;

  return (
    <footer className="bg-earth text-cream">
      <div className="gradient-stripe h-1" />
      <div className="page-frame py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-gold rounded-sm flex items-center justify-center">
                <Building2 className="w-5 h-5 text-cream" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg tracking-wider text-cream leading-none">
                  AXIS
                </span>
                <span className="font-caption text-[8px] tracking-[0.2em] text-gold/80 uppercase">
                  Residences
                </span>
              </div>
            </div>
            <p className="font-mono text-sm text-cream/50 leading-relaxed">
              Premium real estate experiences. We connect discerning buyers with
              exceptional properties across North America.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-wider mb-6 text-gold">
              NAVIGATE
            </h4>
            <div className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Listings", href: "/listings" },
                { label: "About Us", href: "/about" },
                { label: "Mortgage Calculator", href: "/mortgage-calculator" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-xs text-cream/50 hover:text-gold transition-colors tracking-wider uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-wider mb-6 text-gold">
              CONTACT
            </h4>
            <div className="space-y-4">
              <a href="tel:+14376920988" className="flex items-center gap-3 text-cream/50 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="font-mono text-xs tracking-wider">(437) 692-0988</span>
              </a>
              <a href="mailto:hello@axisresidences.com" className="flex items-center gap-3 text-cream/50 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="font-mono text-xs tracking-wider">hello@axisresidences.com</span>
              </a>
              <div className="flex items-start gap-3 text-cream/50">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="font-mono text-xs tracking-wider leading-relaxed">
                  1200 Commerce St, Suite 400<br />
                  Dallas, TX 75202
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-wider mb-6 text-gold">
              HOURS
            </h4>
            <div className="space-y-2 font-mono text-xs text-cream/50 tracking-wider">
              <div className="flex justify-between">
                <span>MON — FRI</span>
                <span>9AM — 7PM</span>
              </div>
              <div className="flex justify-between">
                <span>SATURDAY</span>
                <span>10AM — 5PM</span>
              </div>
              <div className="flex justify-between">
                <span>SUNDAY</span>
                <span>BY APPT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-caption text-[10px] text-cream/30 tracking-[0.15em] uppercase">
            &copy; 2026 Axis Residences. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="font-caption text-[10px] text-cream/30 tracking-[0.15em] uppercase cursor-pointer hover:text-gold transition-colors">
              Privacy
            </span>
            <span className="font-caption text-[10px] text-cream/30 tracking-[0.15em] uppercase cursor-pointer hover:text-gold transition-colors">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
