import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary-600/50 bg-primary-600/10 px-3 py-1 text-xs font-medium text-primary-100",
        className,
      )}
      {...props}
    />
  );
}