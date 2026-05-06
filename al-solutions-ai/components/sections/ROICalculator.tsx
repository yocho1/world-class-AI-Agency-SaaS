"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui";

export function ROICalculator() {
  // State for inputs
  const [visitors, setVisitors] = useState(5000);
  const [conversionRate, setConversionRate] = useState(2);
  const [dealValue, setDealValue] = useState(3000);

  // Calculate metrics
  const metrics = useMemo(() => {
    const currentLeads = Math.floor((visitors * conversionRate) / 100);
    const projectedLeads = Math.floor(currentLeads * 1.44); // +44% improvement
    const extraLeads = projectedLeads - currentLeads;
    const extraRevenue = extraLeads * dealValue;

    return {
      currentLeads,
      projectedLeads,
      extraLeads,
      extraRevenue,
    };
  }, [visitors, conversionRate, dealValue]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Build query params for CTA
  const auditUrl = `/free-ai-audit?visitors=${visitors}&conversion=${conversionRate}&dealValue=${dealValue}`;

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-bg-default to-bg-surface border-y border-border-subtle">
      <div className="container">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
                Calculate your revenue potential
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                See how AI chatbots and automation can transform your lead conversion and revenue.
              </p>
            </div>

            {/* Main Grid: Inputs (left) + Results (right) */}
            <div className="grid gap-8 lg:grid-cols-2 mb-8">
              {/* LEFT: Input Section */}
              <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-text-primary mb-6">Your metrics</h3>

                {/* Visitors Slider */}
                <div className="mb-8">
                  <label className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-text-primary">Monthly website visitors</span>
                    <span className="text-accent-400 font-semibold">{visitors.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={visitors}
                    onChange={(e) => setVisitors(Number(e.target.value))}
                    className="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-accent-400"
                  />
                  <div className="flex justify-between text-xs text-text-tertiary mt-2">
                    <span>500</span>
                    <span>50,000</span>
                  </div>
                </div>

                {/* Conversion Rate Slider */}
                <div className="mb-8">
                  <label className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-text-primary">Current lead conversion rate</span>
                    <span className="text-accent-400 font-semibold">{conversionRate.toFixed(1)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-accent-400"
                  />
                  <div className="flex justify-between text-xs text-text-tertiary mt-2">
                    <span>0.5%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* Deal Value Input */}
                <div className="mb-2">
                  <label className="text-sm font-medium text-text-primary mb-3 block">Average deal value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">$</span>
                    <input
                      type="number"
                      value={dealValue}
                      onChange={(e) => setDealValue(Number(e.target.value) || 0)}
                      className="w-full pl-7 pr-4 py-3 rounded-lg border border-border-subtle bg-bg-default text-text-primary focus:outline-none focus:border-accent-400 transition-colors"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT: Results Section */}
              <div className="bg-gradient-to-br from-accent-400/10 to-accent-400/5 border border-accent-400/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-6">Potential impact</h3>

                  {/* Current Monthly Leads */}
                  <div className="mb-6 pb-6 border-b border-border-subtle">
                    <p className="text-sm text-text-tertiary mb-1">Current monthly leads</p>
                    <p className="text-3xl sm:text-4xl font-bold text-text-primary">
                      {metrics.currentLeads.toLocaleString()}
                    </p>
                  </div>

                  {/* Projected Leads (Green highlight) */}
                  <div className="mb-6 pb-6 border-b border-border-subtle bg-green-500/10 -mx-6 px-6 py-4">
                    <p className="text-sm text-green-600 font-semibold mb-1">Projected leads with AI (+44%)</p>
                    <p className="text-3xl sm:text-4xl font-bold text-green-600">
                      {metrics.projectedLeads.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                      <span className="font-semibold">+{metrics.extraLeads.toLocaleString()}</span> extra leads/month
                    </p>
                  </div>

                  {/* Extra Revenue */}
                  <div>
                    <p className="text-sm text-text-tertiary mb-2">Extra monthly revenue potential</p>
                    <p className="text-4xl sm:text-5xl font-bold text-accent-400">
                      {formatCurrency(metrics.extraRevenue)}
                    </p>
                    <p className="text-sm text-text-tertiary mt-2">
                      = {metrics.extraLeads} extra leads × {formatCurrency(dealValue)} avg deal
                    </p>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-text-tertiary mt-8 pt-6 border-t border-border-subtle italic">
                  Based on average across 12 client deployments. Individual results vary.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Link
                href={auditUrl}
                className="inline-flex h-12 items-center rounded-lg bg-accent-400 px-8 font-semibold text-bg-default transition-all hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
              >
                Get your free estimate
              </Link>
              <p className="text-xs text-text-tertiary mt-4">
                We'll tailor a solution based on your specific metrics.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
