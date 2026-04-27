import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600",
  secondary: "border border-border-default bg-transparent text-text-primary hover:bg-bg-elevated focus-visible:ring-primary-600",
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
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40",
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