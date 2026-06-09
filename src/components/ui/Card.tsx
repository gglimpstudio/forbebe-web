import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[18px] border border-border-soft bg-background-light p-4 shadow-[0_14px_40px_rgba(18,58,50,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(18,58,50,0.09)] sm:rounded-[22px] sm:p-5 lg:p-6", className)}>
      {children}
    </div>
  );
}
