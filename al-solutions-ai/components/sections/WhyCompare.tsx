"use client";

import React, { useState } from "react";
import Link from "next/link";

const FEATURES = [
  "Launch speed",
  "Accountability for KPIs",
  "Multilingual support",
  "CRM integration",
  "Post-launch optimization",
  "Pricing transparency",
];

export function WhyCompare() {
  const [showAll, setShowAll] = useState(false);

  const columns = [
    {
      key: "inhouse",
      title: "In-house hire",
      icon: (
        <svg className="h-7 w-7 text-text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="4" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 20v-3a3 3 0 013-3h4a3 3 0 013 3v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      values: [
        "Slow",
        "Risky — hard KPIs",
        "Limited",
        "Depends on internal stack",
        "Hard to scale",
        "Expensive / opaque",
      ],
    },

    {
      key: "alsolutions",
      title: "AL Solutions AI",
      icon: (
        <svg className="h-8 w-8 text-accent-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M3 12l4-2 4 1 4-4 6 3v6l-6 2-6-3-4 1-4-3V12z" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      values: [
        "Production-ready in 30 days",
        "Accountable — KPI-driven reviews",
        "Native Arabic / English / French",
        "HubSpot, Salesforce, custom CRMs",
        "Continuous post-launch optimization",
        "Transparent pricing & SLAs",
      ],
    },

    {
      key: "freelancer",
      title: "Freelancer",
      icon: (
        <svg className="h-7 w-7 text-text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4 20c0-2 4-4 8-4s8 2 8 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      values: [
        "Fast (prototype)",
        "No accountability",
        "Limited",
        "Integration risk",
        "No optimization guarantee",
        "Pricing unclear / one-off",
      ],
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Why AL Solutions?</h2>
        <div className="hidden sm:block text-sm text-text-secondary">Compare AL Solutions against common alternatives</div>
      </div>

      <div className="mb-4 sm:hidden">
        <button
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
          className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-surface px-3 py-2 text-sm font-medium shadow-sm transition-colors duration-200"
        >
          <span className="text-sm">{showAll ? "Hide alternatives" : "Compare alternatives"}</span>
          <svg className={`h-4 w-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {columns.map((col) => {
          const isAL = col.key === "alsolutions";

          // Mobile-first: show AL column always; other columns collapsed on mobile until `showAll` true.
          const mobileCollapse = isAL
            ? ""
            : `${showAll ? "max-h-[1000px] opacity-100 translate-y-0 scale-100" : "max-h-0 opacity-0 translate-y-2 scale-95"} overflow-hidden transform-gpu transition-all duration-300 ease-in-out`;

          return (
            <div
              key={col.key}
              className={`rounded-2xl border bg-bg-default/0 p-4 ${isAL ? "border-2 border-accent-400 shadow-sm" : "border border-border-subtle"} ${mobileCollapse} sm:opacity-100 sm:max-h-none`}
            >
              <div className={`mb-4 flex items-center gap-3 ${isAL ? "pb-4" : "pb-3"}`}>
                <div className={`${isAL ? "text-accent-400" : "text-text-secondary"}`}>{col.icon}</div>
                <div className={`text-lg font-semibold ${isAL ? "text-text-primary" : "text-text-primary"}`}>{col.title}</div>
              </div>

              <div className="space-y-3">
                {FEATURES.map((f, i) => {
                  const val = col.values[i] || "";
                  const positive = /production-ready|Accountable|Native|HubSpot|Continuous|Transparent|Fast/i.test(val);
                  return (
                    <div key={f} className="flex items-start gap-3">
                      <div className="mt-0.5 text-lg flex-shrink-0">
                        {positive ? (
                          <span className={isAL ? "text-accent-600" : "text-emerald-600"}>✓</span>
                        ) : (
                          <span className="text-red-600">✗</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-primary">{f}</div>
                        <div className="text-sm text-text-secondary">{val}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-text-secondary">
        120+ companies chose us over both alternatives.{' '}
        <Link href="/case-studies" className="text-accent-400 font-medium">See case studies</Link>
      </p>
    </section>
  );
}

export default WhyCompare;
