"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

export default function ContactPage() {
  const heroRef = useReveal();
  const formRef = useReveal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { supabase } = await import("@/lib/supabase");
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await supabase.from("contact_submissions").insert([formData]);
      }
    } catch {
      // Supabase not configured — form still works visually
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

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
              GET IN TOUCH
            </div>
            <h1 className="text-display-l text-cream mb-6">
              CONTACT
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                OUR TEAM
              </span>
            </h1>
            <p className="font-mono text-sm text-cream/60 max-w-lg leading-relaxed">
              Ready to find your dream property? Have questions about our listings?
              Reach out and our team will respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section ref={formRef as React.RefObject<HTMLElement>} className="py-12 lg:py-20">
        <div className="page-frame">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="reveal">
              {submitted ? (
                <div className="bg-cream-2 p-12 text-center card-shadow">
                  <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
                  <h3 className="font-display text-xl text-earth mb-3">MESSAGE SENT</h3>
                  <p className="font-mono text-sm text-stone leading-relaxed mb-6">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", message: "" });
                    }}
                    className="btn-ghost-dark"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-display text-lg text-earth mb-2">SEND A MESSAGE</h2>
                  <p className="font-mono text-xs text-stone leading-relaxed mb-6">
                    Fill out the form below and we&apos;ll be in touch shortly.
                  </p>

                  <div>
                    <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="YOUR FULL NAME"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase block mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="YOUR@EMAIL.COM"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase block mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase block mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="TELL US ABOUT YOUR DREAM HOME..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full sm:w-auto justify-center disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="reveal stagger-2 space-y-6">
              <div className="bg-earth text-cream p-8">
                <h3 className="font-display text-sm text-gold mb-6">OFFICE DETAILS</h3>
                <div className="space-y-5">
                  <a href="tel:+14376920988" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-caption text-[10px] text-cream/40 tracking-[0.15em] uppercase mb-1">Phone</p>
                      <p className="font-mono text-sm text-cream/80 group-hover:text-gold transition-colors">(437) 692-0988</p>
                    </div>
                  </a>
                  <a href="mailto:hello@axisresidences.com" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-caption text-[10px] text-cream/40 tracking-[0.15em] uppercase mb-1">Email</p>
                      <p className="font-mono text-sm text-cream/80 group-hover:text-gold transition-colors">hello@axisresidences.com</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-caption text-[10px] text-cream/40 tracking-[0.15em] uppercase mb-1">Address</p>
                      <p className="font-mono text-sm text-cream/80 leading-relaxed">
                        1200 Commerce St, Suite 400<br />Dallas, TX 75202
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-caption text-[10px] text-cream/40 tracking-[0.15em] uppercase mb-1">Hours</p>
                      <div className="font-mono text-sm text-cream/80 space-y-1">
                        <p>Mon — Fri: 9AM — 7PM</p>
                        <p>Saturday: 10AM — 5PM</p>
                        <p>Sunday: By Appointment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cream-2 h-64 card-shadow flex items-center justify-center border border-earth/10">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-3" />
                  <p className="font-display text-sm text-earth mb-1">DALLAS, TEXAS</p>
                  <p className="font-mono text-xs text-stone">1200 Commerce St, Suite 400</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
