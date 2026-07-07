import { Baby, MapPin, PackageCheck, ShieldCheck, Sparkles, Waves } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Service } from "@/types";

const icons = { Baby, MapPin, PackageCheck, ShieldCheck, Sparkles, Waves };

export function ServiceCard({ service, showImage = true }: { service: Service; showImage?: boolean }) {
  const Icon = icons[(service.icon as keyof typeof icons) || "ShieldCheck"] || ShieldCheck;

  return (
    <Card className="flex h-full flex-col">
      {showImage ? <SanityImage image={service.image} alt={service.title} className="mb-4 aspect-[4/3] sm:mb-5" sizes="(min-width: 1024px) 33vw, 100vw" /> : null}
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background-soft text-brand-primary sm:mb-4 sm:h-11 sm:w-11 sm:rounded-2xl">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="cms-lines text-lg font-medium text-brand-primary">{service.title}</h3>
      <p className="cms-lines mt-2 flex-1 text-sm leading-6 text-text-sub">{service.shortDescription || service.description}</p>
      <Button href="/services" variant="ghost" size="sm" className="mt-4 w-fit px-0 hover:bg-transparent">
        자세히 보기
      </Button>
    </Card>
  );
}
