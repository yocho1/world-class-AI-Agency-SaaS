import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-[#7C3AED] to-[#5B21F6] text-white shadow-[0_4px_14px_rgba(91,33,246,0.35)] hover:from-[#7C3AED] hover:to-[#7C3AED] hover:shadow-[0_8px_24px_rgba(91,33,246,0.45)] active:scale-[0.98] focus-visible:ring-brand",
  secondary:
    "border border-[rgba(91,33,246,0.35)] bg-transparent text-[#5B21F6] hover:bg-[rgba(91,33,246,0.06)] focus-visible:ring-brand",
  ghost: "bg-transparent text-primary-400 hover:text-primary-600 focus-visible:ring-primary-600",
};

export function Button({
  className,
  children,
  variant = "primary",
  leadingIcon,
  trailingIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
}