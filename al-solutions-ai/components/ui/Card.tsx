import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-subtle bg-bg-surface p-7 transition-all duration-300 hover:border-accent-400/20 hover:bg-bg-elevated hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-400/5",
        className,
      )}
      {...props}
    />
  );
}