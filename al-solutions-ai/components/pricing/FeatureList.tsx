interface FeatureListProps {
  features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li className="text-sm text-text-secondary" key={feature}>
          - {feature}
        </li>
      ))}
    </ul>
  );
}