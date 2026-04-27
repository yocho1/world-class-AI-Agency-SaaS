import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-subtle bg-bg-surface p-7 transition-all duration-200",
        className,
      )}
      {...props}
    />
  );
}