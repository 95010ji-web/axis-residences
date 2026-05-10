"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Building2,
  LogOut,
  ExternalLink,
  Globe,
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

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/crm/login");
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-earth text-cream h-screen sticky top-0 border-r border-cream/10">
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
      <nav className="flex-1 p-4 space-y-1">
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
                <link.icon className="w-4 h-4" />
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
          <Globe className="w-3.5 h-3.5" />
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
          <LogOut className="w-3.5 h-3.5" />
          <span className="font-mono text-xs tracking-wider uppercase">
            Sign out
          </span>
        </button>
      </div>
    </aside>
  );
}
