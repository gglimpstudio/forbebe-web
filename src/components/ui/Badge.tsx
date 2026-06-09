import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex rounded-full bg-background-soft px-2.5 py-1 text-xs font-medium leading-tight text-brand-primary sm:px-3", className)}>{children}</span>;
}
