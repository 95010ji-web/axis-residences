"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Building2 } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings" },
  { label: "About", href: "/about" },
  { label: "Calculator", href: "/mortgage-calculator" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCrm = pathname.startsWith("/crm");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Hide on CRM routes (CRM has its own sidebar) — AFTER all hooks
  if (isCrm) return null;

  // Solid bg on all non-home pages OR when scrolled
  const useSolidBg = !isHome || scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          useSolidBg
            ? "bg-earth/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="page-frame flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 90, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-9 h-9 bg-gold rounded-sm flex items-center justify-center"
            >
              <Building2 className="w-5 h-5 text-cream" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-wider text-cream leading-none">
                AXIS
              </span>
              <span className="font-caption text-[8px] tracking-[0.2em] text-gold/80 uppercase">
                Residences
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className={`nav-link text-cream/80 hover:text-cream ${
                    pathname === link.href ? "active text-cream" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+14376920988"
              className="flex items-center gap-2 text-gold font-mono text-xs tracking-wider hover:text-cream transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              (437) 692-0988
            </a>
            <Link href="/contact" className="btn-primary text-xs">
              SCHEDULE VIEWING
            </Link>
          </div>

          <button
            className="lg:hidden text-cream p-2 z-50 relative"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-40 bg-earth"
          >
            <div className="h-full flex flex-col justify-center items-center px-6 py-20">
              <div className="w-full max-w-sm space-y-2">
                {links.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-4 border-b border-cream/10 font-display text-2xl tracking-wider transition-colors ${
                        pathname === link.href
                          ? "text-gold"
                          : "text-cream hover:text-gold"
                      }`}
                    >
                      {link.label.toUpperCase()}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="w-full max-w-sm mt-12 space-y-5"
              >
                <a
                  href="tel:+14376920988"
                  className="flex items-center gap-3 text-gold font-mono text-sm tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  (437) 692-0988
                </a>
                <Link
                  href="/contact"
                  className="btn-primary text-xs w-full justify-center"
                >
                  SCHEDULE VIEWING
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
