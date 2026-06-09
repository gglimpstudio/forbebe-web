import { Card } from "@/components/ui/Card";
import type { ProcessStep as ProcessStepType } from "@/types";

export function ProcessStep({ step, index }: { step: ProcessStepType; index: number }) {
  return (
    <Card className="h-full">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-sm font-medium text-text-inverse">
        {index + 1}
      </span>
      <h3 className="mt-3 text-lg font-medium text-brand-primary sm:mt-4 sm:text-xl">{step.title}</h3>
      <p className="mt-2 text-sm leading-7 text-text-sub">{step.description}</p>
    </Card>
  );
}
