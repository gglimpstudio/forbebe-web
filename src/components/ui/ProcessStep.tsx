import { Card } from "@/components/ui/Card";
import type { ProcessStep as ProcessStepType } from "@/types";
import { BadgeCheck, BrushCleaning, ClipboardCheck, Droplets, PackageCheck, ScanSearch, ShieldCheck, Wind, type LucideIcon } from "lucide-react";

const processIcons: LucideIcon[] = [ClipboardCheck, ScanSearch, BrushCleaning, Droplets, Wind, ShieldCheck, PackageCheck];

export function ProcessStep({ step, index }: { step: ProcessStepType; index: number }) {
  const Icon = processIcons[index] || BadgeCheck;

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-medium text-text-inverse">
          {index + 1}
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background-soft text-brand-primary ring-1 ring-border-soft sm:h-14 sm:w-14">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
        </span>
      </div>
      <h3 className="cms-lines mt-3 text-lg font-medium text-brand-primary sm:mt-4 sm:text-xl">{step.title}</h3>
      <p className="cms-lines mt-2 text-sm leading-7 text-text-sub">{step.description}</p>
    </Card>
  );
}
