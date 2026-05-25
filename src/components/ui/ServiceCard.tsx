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
      {showImage ? <SanityImage image={service.image} alt={service.title} className="mb-5 aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 100vw" /> : null}
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-background-soft text-brand-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="text-lg font-bold text-brand-primary">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-text-sub">{service.shortDescription || service.description}</p>
      <Button href="/services" variant="ghost" size="sm" className="mt-4 w-fit px-0 hover:bg-transparent">
        자세히 보기
      </Button>
    </Card>
  );
}
