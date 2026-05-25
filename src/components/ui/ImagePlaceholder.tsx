import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function ImagePlaceholder({ label, className, children }: { label: string; className?: string; children?: ReactNode }) {
  return (
    <div className={cn("flex min-h-48 items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,var(--brand-secondary)_0%,var(--background-soft)_55%,var(--background-light)_100%)] text-center shadow-sm", className)}>
      <div className="px-6">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-background-light/80 shadow-inner" />
        <p className="text-sm font-semibold text-text-sub">{label}</p>
        {children}
      </div>
    </div>
  );
}
