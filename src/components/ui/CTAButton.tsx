import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/Button";

export function CTAButton({ children, className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button className={className} {...props}>
      {children}
      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
    </Button>
  );
}
