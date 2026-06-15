import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { urlForImage } from "@/lib/sanity/image";
import type { FinalCtaSection as FinalCtaSectionData, PageCta } from "@/types";

const FINAL_CTA_BACKGROUND_IMAGE = "";

export function FinalCtaSection({ finalCta }: { finalCta?: PageCta } = {}) {
  const title = finalCta?.title || "아이에게 닿는 용품, 이제 전문 세탁으로 관리하세요.";
  const description = finalCta?.description || "가까운 포베베 지점으로 간편하게 문의하세요.";
  const primaryCtaLabel = finalCta?.primaryCtaLabel || "가까운 지점 확인하기";
  const primaryCtaHref = finalCta?.primaryCtaHref || "/branches";
  const secondaryCtaLabel = finalCta?.secondaryCtaLabel || "가까운 지점 찾기";
  const secondaryCtaHref = finalCta?.secondaryCtaHref || "/branches";

  return (
    <section className="bg-[radial-gradient(circle_at_center,#1E584A_0%,#123F35_45%,#0B3029_100%)] py-12 text-text-inverse sm:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="cms-lines fluid-panel-title font-semibold leading-tight">{title}</h2>
          <p className="mt-4 text-base leading-7 text-brand-secondary">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {primaryCtaHref ? (
              <Button href={primaryCtaHref} variant="secondary" size="lg" className="!bg-[#DFD9B3] !text-[#123F35] hover:!bg-[#F3EFE2]">
                {primaryCtaLabel}
              </Button>
            ) : null}
            {secondaryCtaHref ? (
              <Button href={secondaryCtaHref} variant="outline" size="lg" className="!border-[rgba(223,217,179,0.55)] !text-[#DFD9B3] hover:bg-text-inverse/10">
                {secondaryCtaLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FinalCTASection({ finalCta }: { finalCta?: FinalCtaSectionData }) {
  const backgroundImage = urlForImage(finalCta?.backgroundImage)?.width(1600).height(1000).fit("crop").url() || FINAL_CTA_BACKGROUND_IMAGE;
  const label = finalCta?.label || "CONTACT FORBEBE";
  const title = finalCta?.title || "카시트와 유모차 케어,\n가까운 포베베에서 시작하세요.";
  const description = finalCta?.description || "제품 상태가 궁금하다면 가까운 지점에서\n가격 안내와 상담을 먼저 확인해보세요.";
  const primaryCtaLabel = finalCta?.primaryCtaLabel || "가까운 지점 확인하기";
  const primaryCtaHref = finalCta?.primaryCtaHref || "/branches";
  const secondaryCtaLabel = finalCta?.secondaryCtaLabel || "가격 안내 보기";
  const secondaryCtaHref = finalCta?.secondaryCtaHref || "/pricing";
  const note = finalCta?.note || "제품 상태와 지점 상황에 따라 상담 내용은 달라질 수 있습니다.";

  return (
    <section
      id="final-cta"
      className="final-cta-reveal relative overflow-hidden bg-[#0B3029] py-12 sm:py-16 lg:py-24"
      aria-labelledby="final-cta-title"
    >
      {backgroundImage ? (
        <div
          className="absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center opacity-16 lg:block"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
          aria-hidden
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1E584A_0%,#123F35_45%,#0B3029_100%)]" aria-hidden />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-secondary">{label}</p>
          <h2 id="final-cta-title" className="cms-lines fluid-section-title mx-auto mt-4 max-w-3xl font-semibold leading-tight text-text-inverse">
            {title}
          </h2>
          <p className="cms-lines fluid-body mx-auto mt-5 max-w-2xl leading-7 text-brand-secondary sm:leading-8">
            {description}
          </p>

          <div className="mx-auto mt-9 flex w-full max-w-xl flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
            {primaryCtaHref ? (
              <Button href={primaryCtaHref} variant="secondary" size="lg" className="min-h-[48px] w-full gap-2 !bg-[#DFD9B3] px-5 text-sm !text-[#123F35] shadow-sm hover:!bg-[#F3EFE2] sm:min-h-[52px] sm:w-auto sm:px-8 sm:text-base">
                {primaryCtaLabel} <ArrowRight className="h-5 w-5" aria-hidden />
              </Button>
            ) : null}
            {secondaryCtaHref ? (
              <Button href={secondaryCtaHref} variant="outline" size="lg" className="min-h-[48px] w-full !border-[rgba(223,217,179,0.55)] px-5 text-sm !text-[#DFD9B3] hover:bg-text-inverse/10 sm:min-h-[52px] sm:w-auto sm:px-8 sm:text-base">
                {secondaryCtaLabel}
              </Button>
            ) : null}
          </div>

          <p className="mt-4 text-sm leading-6 text-text-inverse/70">{note}</p>
        </div>
      </Container>
    </section>
  );
}
