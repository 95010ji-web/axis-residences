"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Lock, Mail, ArrowRight, CircleAlert } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params?.get("redirectTo") || "/crm";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-earth flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-96 h-96 border border-gold/30 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] border border-gold/20 rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 group mb-6"
          >
            <motion.div
              whileHover={{ rotate: 90, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-12 h-12 bg-gold flex items-center justify-center"
            >
              <Building2 className="w-6 h-6 text-cream" />
            </motion.div>
          </Link>
          <h1 className="font-display text-3xl tracking-wider text-cream mb-2">
            REALTOR WORKSPACE
          </h1>
          <p className="font-caption text-[10px] text-gold tracking-[0.2em] uppercase">
            Axis Residences · Internal CRM
          </p>
        </div>

        {/* Card */}
        <div className="bg-cream p-8 lg:p-10 card-shadow">
          <div className="mb-8">
            <p className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase mb-2">
              Sign in to continue
            </p>
            <h2 className="font-display text-xl text-earth">WELCOME BACK</h2>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase block mb-2 flex items-center gap-1.5">
                <Mail className="w-3 h-3" /> Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOU@AXISRESIDENCES.COM"
                className="form-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase block mb-2 flex items-center gap-1.5">
                <Lock className="w-3 h-3" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 bg-terracotta/10 border-l-2 border-terracotta"
              >
                <CircleAlert className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <span className="font-mono text-xs text-terracotta">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  SIGNING IN...
                </>
              ) : (
                <>
                  SIGN IN
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-earth/10">
            <Link
              href="/"
              className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase hover:text-gold transition-colors"
            >
              ← Back to public site
            </Link>
          </div>
        </div>

        {/* Help */}
        <p className="text-center mt-6 font-caption text-[10px] text-cream/40 tracking-[0.15em] uppercase">
          Need access? Contact your administrator
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-earth" />}>
      <LoginForm />
    </Suspense>
  );
}
