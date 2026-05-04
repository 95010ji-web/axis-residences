"use client";

import { useState, useMemo } from "react";
import { Calculator, DollarSign, Percent, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

export default function MortgageCalculatorPage() {
  const heroRef = useReveal();
  const calcRef = useReveal();

  const [homePrice, setHomePrice] = useState(750000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const result = useMemo(() => {
    const principal = homePrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const n = loanTerm * 12;

    if (monthlyRate === 0) {
      return { monthly: principal / n, totalPayment: principal, totalInterest: 0, principal };
    }

    const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - principal;

    return { monthly, totalPayment, totalInterest, principal };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const principalPct = result.principal / (result.principal + result.totalInterest) * 100;
  const interestPct = 100 - principalPct;

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
              FINANCIAL TOOLS
            </div>
            <h1 className="text-display-l text-cream mb-6">
              MORTGAGE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#E8B954]">
                CALCULATOR
              </span>
            </h1>
            <p className="font-mono text-sm text-cream/60 max-w-lg leading-relaxed">
              Plan your home purchase with confidence. Adjust the parameters below
              to estimate your monthly mortgage payment.
            </p>
          </div>
        </div>
      </section>

      <section ref={calcRef as React.RefObject<HTMLElement>} className="py-12 lg:py-20">
        <div className="page-frame">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="reveal">
              <h2 className="font-display text-lg text-earth mb-8 flex items-center gap-3">
                <Calculator className="w-5 h-5 text-gold" />
                ADJUST PARAMETERS
              </h2>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-gold" />
                      Home Price
                    </label>
                    <span className="font-display text-sm text-earth">{formatCurrency(homePrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={5000000}
                    step={25000}
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full h-2 bg-earth/10 rounded-none appearance-none cursor-pointer accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="font-mono text-[10px] text-stone">$100K</span>
                    <span className="font-mono text-[10px] text-stone">$5M</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase flex items-center gap-2">
                      <Percent className="w-3.5 h-3.5 text-gold" />
                      Down Payment
                    </label>
                    <span className="font-display text-sm text-earth">{downPayment}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-earth/10 rounded-none appearance-none cursor-pointer accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="font-mono text-[10px] text-stone">0%</span>
                    <span className="font-mono text-[10px] text-stone">50%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase flex items-center gap-2">
                      <Percent className="w-3.5 h-3.5 text-gold" />
                      Interest Rate
                    </label>
                    <span className="font-display text-sm text-earth">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={12}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-earth/10 rounded-none appearance-none cursor-pointer accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="font-mono text-[10px] text-stone">1%</span>
                    <span className="font-mono text-[10px] text-stone">12%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-caption text-[10px] text-stone tracking-[0.15em] uppercase flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      Loan Term
                    </label>
                    <span className="font-display text-sm text-earth">{loanTerm} Years</span>
                  </div>
                  <div className="flex gap-3">
                    {[15, 20, 25, 30].map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`flex-1 py-3 font-mono text-xs tracking-wider transition-all ${
                          loanTerm === term
                            ? "bg-gold text-cream"
                            : "bg-cream-2 text-earth border border-earth/10 hover:border-gold/30"
                        }`}
                      >
                        {term} YR
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal stagger-2">
              <div className="bg-earth text-cream p-8 lg:p-10">
                <h2 className="font-display text-lg text-gold mb-8">PAYMENT SUMMARY</h2>

                <div className="text-center mb-8 pb-8 border-b border-cream/10">
                  <p className="font-caption text-[10px] text-cream/40 tracking-[0.15em] uppercase mb-2">
                    Monthly Payment
                  </p>
                  <p className="font-display text-5xl lg:text-6xl text-cream">
                    {formatCurrency(Math.round(result.monthly))}
                  </p>
                  <p className="font-mono text-xs text-cream/40 mt-2">/ month</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-cream/60 tracking-wider">LOAN AMOUNT</span>
                    <span className="font-display text-sm text-cream">{formatCurrency(Math.round(result.principal))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-cream/60 tracking-wider">DOWN PAYMENT</span>
                    <span className="font-display text-sm text-cream">{formatCurrency(Math.round(homePrice * downPayment / 100))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-cream/60 tracking-wider">TOTAL INTEREST</span>
                    <span className="font-display text-sm text-gold">{formatCurrency(Math.round(result.totalInterest))}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-cream/10">
                    <span className="font-mono text-xs text-cream/60 tracking-wider">TOTAL COST</span>
                    <span className="font-display text-sm text-cream">{formatCurrency(Math.round(result.totalPayment + homePrice * downPayment / 100))}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="font-caption text-[10px] text-cream/40 tracking-[0.15em] uppercase mb-3">
                    PAYMENT BREAKDOWN
                  </p>
                  <div className="h-4 flex overflow-hidden">
                    <div
                      className="bg-cream transition-all duration-500"
                      style={{ width: `${principalPct}%` }}
                    />
                    <div
                      className="bg-gold transition-all duration-500"
                      style={{ width: `${interestPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cream" />
                      <span className="font-mono text-[10px] text-cream/60">Principal ({principalPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gold" />
                      <span className="font-mono text-[10px] text-cream/60">Interest ({interestPct.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>

                <Link href="/contact" className="btn-primary w-full justify-center">
                  GET PRE-QUALIFIED
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
