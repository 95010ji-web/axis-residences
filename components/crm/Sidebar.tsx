"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Building2,
  LogOut,
  ExternalLink,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

const links = [
  { href: "/crm", label: "Dashboard", icon: LayoutDashboard },
  { href: "/crm/leads", label: "Leads", icon: Users },
  { href: "/crm/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/crm/listings", label: "Listings", icon: Building2 },
];

export default function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/crm/login");
    router.refresh();
  };

  const SidebarBody = (
    <>
      {/* Brand */}
      <div className="p-6 border-b border-cream/10">
        <Link href="/crm" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-9 h-9 bg-gold flex items-center justify-center"
          >
            <Building2 className="w-5 h-5 text-cream" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display text-base tracking-wider text-cream leading-none">
              AXIS · CRM
            </span>
            <span className="font-caption text-[8px] tracking-[0.2em] text-gold/80 uppercase mt-1">
              Realtor Workspace
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link, i) => {
          const isActive =
            link.href === "/crm"
              ? pathname === "/crm"
              : pathname.startsWith(link.href);
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 transition-all ${
                  isActive
                    ? "bg-gold text-cream"
                    : "text-cream/60 hover:text-cream hover:bg-cream/5"
                }`}
              >
                <link.icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-mono text-xs tracking-wider uppercase">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-cream/10">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-cream/40 hover:text-gold transition-colors mb-3"
        >
          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="font-caption text-[10px] tracking-[0.15em] uppercase">
            View public site
          </span>
          <ExternalLink className="w-3 h-3 ml-auto" />
        </Link>

        <div className="px-3 py-3 bg-cream/5 mb-3">
          <p className="font-caption text-[9px] text-cream/40 tracking-[0.15em] uppercase mb-1">
            Signed in as
          </p>
          <p className="font-mono text-xs text-cream/80 break-all">{userEmail}</p>
        </div>

        <button
          onClick={signOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-cream/60 hover:text-terracotta hover:bg-terracotta/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="font-mono text-xs tracking-wider uppercase">
            Sign out
          </span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-earth text-cream h-screen sticky top-0 border-r border-cream/10">
        {SidebarBody}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-earth text-cream border-b border-cream/10 flex items-center justify-between px-4 py-3">
        <Link href="/crm" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold flex items-center justify-center">
            <Building2 className="w-4 h-4 text-cream" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm tracking-wider text-cream leading-none">
              AXIS · CRM
            </span>
            <span className="font-caption text-[8px] tracking-[0.15em] text-gold/80 uppercase mt-0.5">
              {currentLabel(pathname)}
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="w-10 h-10 flex items-center justify-center hover:bg-cream/5"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-[85vw] max-w-xs bg-earth text-cream flex flex-col overflow-hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-cream/60 hover:text-cream hover:bg-cream/5 z-10"
              >
                <X className="w-5 h-5" />
              </button>
              {SidebarBody}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function currentLabel(pathname: string): string {
  if (pathname === "/crm") return "Dashboard";
  if (pathname.startsWith("/crm/leads")) return "Leads";
  if (pathname.startsWith("/crm/tasks")) return "Tasks";
  if (pathname.startsWith("/crm/listings")) return "Listings";
  return "Workspace";
}
