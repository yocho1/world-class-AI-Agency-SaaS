"use client";

interface PricingToggleProps {
  value: "monthly" | "annual";
  onChange: (value: "monthly" | "annual") => void;
}

export function PricingToggle({ value, onChange }: PricingToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-border-default p-1">
      {["monthly", "annual"].map((option) => (
        <button
          className={option === value ? "rounded-full bg-primary-600 px-4 py-2 text-xs text-white" : "rounded-full px-4 py-2 text-xs text-text-secondary"}
          key={option}
          onClick={() => onChange(option as "monthly" | "annual")}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}