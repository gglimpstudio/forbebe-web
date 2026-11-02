import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Card({ children, className, padding = "default" }: { children: ReactNode; className?: string; padding?: "default" | "compact" }) {
  return (
    <div className={cn("rounded-[18px] border border-border-soft bg-background-light shadow-[0_14px_40px_rgba(18,58,50,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(18,58,50,0.09)] sm:rounded-[22px]", padding === "compact" ? "p-2 sm:p-2.5 lg:p-3" : "p-4 sm:p-5 lg:p-6", className)}>
      {children}
    </div>
  );
}
