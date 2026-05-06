"use client";

import { TestimonialGrid, type TestimonialGridProps } from "./TestimonialGrid";

interface TestimonialItem {
  readonly id: number;
  readonly quote: string;
  readonly name: string;
  readonly title: string;
  readonly company: string;
  readonly initials: string;
  readonly linkedinUrl?: string;
  readonly metric: string;
  readonly metricNote: string;
  readonly avatarSrc?: string;
}

interface TestimonialsProps {
  readonly items?: TestimonialItem[];
}

const DEFAULT_ITEMS: TestimonialItem[] = [
  {
    id: 1,
    quote:
      "Before AL Solutions, we had three vendors, none of them talking to each other. Within 28 days we had a single AI system live on our website and WhatsApp that we can actually measure.",
    name: "Amina Nasser",
    title: "Chief Marketing Officer",
    company: "Nexora Hotels Group",
    initials: "AN",
    linkedinUrl: "https://www.linkedin.com",
    metric: "+62% faster first response",
    metricNote: "Nexora Hotels, 60 days post-launch",
    avatarSrc: "/images/testimonial-amina.svg",
  },
  {
    id: 2,
    quote:
      "We were six months into a chatbot project with another vendor when we called AL Solutions. They had something live and working in 22 days.",
    name: "Sara Mensah",
    title: "VP of Operations",
    company: "FinEdge",
    initials: "SM",
    linkedinUrl: "https://www.linkedin.com",
    metric: "22-day deployment",
    metricNote: "after 6 months of stall with previous vendor",
    avatarSrc: "/images/testimonial-sara.svg",
  },
  {
    id: 3,
    quote:
      "The team understood our business model immediately. They didn't over-engineer the solution—just built exactly what we needed, on time, under budget.",
    name: "Khaled Al-Rashid",
    title: "Founder & CEO",
    company: "Atlas Retail",
    initials: "KR",
    linkedinUrl: "https://www.linkedin.com",
    metric: "-40% operational cost",
    metricNote: "after automation deployment",
    avatarSrc: "/images/testimonial-khaled.svg",
  },
  {
    id: 4,
    quote:
      "Most agencies promise fast delivery. AL Solutions actually delivered—live system in production, not a prototype. We saw ROI in week 2.",
    name: "Fatima Al-Zahra",
    title: "Head of Digital Strategy",
    company: "Zain Mobility",
    initials: "FZ",
    linkedinUrl: "https://www.linkedin.com",
    metric: "+150% lead qualified rate",
    metricNote: "first 30 days post-launch",
    avatarSrc: "/images/testimonial-fatima.svg",
  },
  {
    id: 5,
    quote:
      "The support doesn't end at deployment. They stayed close through the first month, optimized the system based on real data, and gave us a playbook to run it ourselves.",
    name: "Mohammed Hassan",
    title: "Operations Director",
    company: "Sahara Foods",
    initials: "MH",
    linkedinUrl: "https://www.linkedin.com",
    metric: "+3x support capacity",
    metricNote: "same team size post-deployment",
    avatarSrc: "/images/testimonial-mohammed.svg",
  },
];

export function Testimonials({ items = DEFAULT_ITEMS }: TestimonialsProps) {
  const gridItems = items.map((item) => ({
    id: item.id,
    quote: item.quote,
    name: item.name,
    title: item.title,
    company: item.company,
    initials: item.initials,
    linkedinUrl: item.linkedinUrl,
    metric: item.metric,
    metricNote: item.metricNote,
    avatarSrc: item.avatarSrc,
  }));

  return (
    <TestimonialGrid
      items={gridItems}
      title="What Our Clients Say"
      description="Real results from teams that shipped customer-facing AI systems in production."
    />
  );
}
