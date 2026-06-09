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
      className="relative flex flex-col overflow-hidden bg-[#F7F3E6] sm:min-h-[620px] lg:min-h-[calc(100vh-4rem)]"
      aria-label="포베베 메인 히어로"
    >
      <div
        className="relative h-[32vh] min-h-[230px] max-h-[300px] w-full overflow-hidden bg-[#F3EEDC] sm:hidden"
        aria-hidden
      >
        <div
          className="hero-image-fade absolute inset-0 scale-[1.02] bg-cover bg-no-repeat [background-position:right_bottom]"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F7F3E6] to-[rgba(247,243,230,0)]" />
      </div>
      <div
        className="hero-image-fade absolute inset-0 hidden scale-[1.02] bg-no-repeat [background-position:70%_center] [background-size:auto_118%] sm:block md:[background-position:72%_center] md:[background-size:auto_124%] lg:[background-position:center_center] lg:[background-size:cover]"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        aria-hidden
      />
      <Container className="relative flex flex-1 items-start px-6 pb-[calc(72px+env(safe-area-inset-bottom))] pt-7 sm:items-center sm:px-6 sm:py-24 lg:px-8 lg:py-32 xl:px-10">
        <div className="hero-copy-reveal max-w-[620px]">
          {hero.eyebrow ? <p className="mb-3 text-sm font-semibold text-brand-primary sm:mb-6 sm:text-base">{hero.eyebrow}</p> : null}
          <h1 className="cms-lines-mobile-wrap text-[42px] font-semibold leading-[1.08] text-green-dark sm:text-[clamp(2.05rem,1.35rem+2.8vw,3.85rem)] sm:leading-[1.12]">
            {hero.title}
          </h1>
          {hero.highlightText ? <p className="mt-4 text-base font-semibold text-brand-primary sm:mt-4 sm:text-xl">{hero.highlightText}</p> : null}
          <p className="cms-lines-mobile-wrap fluid-body-lg mt-5 font-medium leading-7 text-hero-body sm:mt-7 sm:leading-9">
            {hero.description}
          </p>
          <div className="hero-cta-reveal mt-7 flex flex-col items-start gap-2 sm:mt-10 sm:flex-row sm:gap-3">
            {serviceHref ? (
              <Button href={serviceHref} size="lg" className="min-h-12 w-full max-w-[320px] gap-2 px-6 py-3 text-sm sm:min-h-12 sm:w-auto sm:max-w-none sm:px-7 sm:text-base">
                {hero.primaryCtaLabel || hero.primaryButtonLabel || "서비스 보기"} <ArrowRight className="h-5 w-5" aria-hidden />
              </Button>
            ) : null}
            {pricingHref ? (
              <Button
                href={pricingHref}
                variant="outline"
                size="md"
                className="min-h-12 px-7 py-3 text-sm sm:text-base"
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
