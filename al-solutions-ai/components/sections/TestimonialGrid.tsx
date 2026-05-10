import { TestimonialCard, type TestimonialCardData } from "./TestimonialCard";
import { Reveal } from "@/components/ui";

interface TestimonialGridProps {
  readonly items: TestimonialCardData[];
  readonly title?: string;
  readonly description?: string;
}

export function TestimonialGrid({
  items,
  title = "What Our Clients Say",
  description,
}: TestimonialGridProps) {
    return (
      <section className="section-padding container">
      <Reveal>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl">{title}</h2>
          {description && (
            <p className="mt-4 text-lg text-text-secondary sm:mt-6">{description}</p>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {items.map((item) => (
            <TestimonialCard key={item.id} data={item} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
