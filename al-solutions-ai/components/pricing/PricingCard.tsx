import { Button } from "@/components/ui";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
}

export function PricingCard({ title, price, description }: PricingCardProps) {
  return (
    <div className="rounded-[20px] border border-border-subtle bg-bg-surface p-8">
      <h3 className="text-xl font-medium text-text-primary">{title}</h3>
      <p className="mt-3 text-4xl font-medium text-text-primary">{price}</p>
      <p className="mt-3 text-sm text-text-secondary">{description}</p>
      <Button className="mt-6 w-full">Choose {title}</Button>
    </div>
  );
}