import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="container pt-20 md:pt-32">
      <p className="text-sm text-accent-400">Production AI shipped in 30 days</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-medium tracking-tight text-text-primary md:text-6xl">
        Launch a real AI product, not another strategy deck.
      </h1>
      <p className="mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
        AL Solutions AI designs, builds, and deploys AI chatbots and automation systems for growth-stage teams across MENA and Europe.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button>Get Free AI Audit</Button>
        <Button variant="secondary">See Live Demo</Button>
      </div>
    </section>
  );
}