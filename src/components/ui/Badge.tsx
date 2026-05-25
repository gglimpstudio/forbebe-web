import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex rounded-full bg-background-soft px-3 py-1 text-xs font-bold text-brand-primary", className)}>{children}</span>;
}
