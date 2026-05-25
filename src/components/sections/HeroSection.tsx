import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { urlForImage } from "@/lib/sanity/image";
import type { Hero } from "@/types";

const HERO_BACKGROUND_IMAGE = "/images/hero-forbebe.jpg";

export function HeroSection({ hero }: { hero: Hero }) {
  const serviceHref = hero.primaryCtaHref || hero.primaryButtonUrl || "/process";
  const pricingHref = hero.secondaryCtaHref || hero.secondaryButtonUrl || "/pricing";
  const backgroundImage = urlForImage(hero.backgroundImage || hero.image)?.width(2200).height(1400).fit("crop").url() || HERO_BACKGROUND_IMAGE;

  return (
    <section
      className="relative flex min-h-[620px] overflow-hidden bg-background-main lg:min-h-[calc(100vh-4rem)]"
      aria-label="포베베 메인 히어로"
    >
      <div
        className="hero-image-fade absolute inset-0 scale-[1.02] bg-cover bg-no-repeat [background-position:64%_center] sm:[background-position:60%_center] lg:[background-position:center_center]"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        aria-hidden
      />
      <Container className="relative flex items-center py-24 sm:py-28 lg:py-32">
        <div className="hero-copy-reveal max-w-[620px]">
          {hero.eyebrow ? <p className="mb-6 text-sm font-bold text-brand-primary sm:text-base">{hero.eyebrow}</p> : null}
          <h1 className="whitespace-pre-line text-[clamp(2.25rem,5vw,3.5rem)] font-black leading-[1.12] text-green-dark">
            {hero.title}
          </h1>
          {hero.highlightText ? <p className="mt-4 text-xl font-black text-brand-primary">{hero.highlightText}</p> : null}
          <p className="mt-7 whitespace-pre-line text-lg font-medium leading-8 text-hero-body sm:text-xl sm:leading-9">
            {hero.description}
          </p>
          <div className="hero-cta-reveal mt-10 flex flex-col gap-3 sm:flex-row">
            {serviceHref ? (
              <Button href={serviceHref} variant="secondary" size="lg" className="w-full gap-2 bg-brand-secondary px-7 text-green-dark hover:bg-beige-medium sm:w-auto">
                {hero.primaryCtaLabel || hero.primaryButtonLabel || "서비스 보기"} <ArrowRight className="h-5 w-5" aria-hidden />
              </Button>
            ) : null}
            {pricingHref ? (
              <Button
                href={pricingHref}
                variant="outline"
                size="lg"
                className="w-full border-[rgba(30,88,74,0.35)] bg-[rgba(255,254,250,0.35)] px-7 text-brand-primary hover:border-brand-primary hover:bg-[rgba(223,217,179,0.45)] sm:w-auto"
              >
                {hero.secondaryCtaLabel || hero.secondaryButtonLabel || "가격 안내"}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
