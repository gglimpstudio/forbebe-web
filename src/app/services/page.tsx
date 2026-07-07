import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getServices, getServicesPage } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "서비스",
  description: "포베베의 카시트, 유모차, 유아 이동용품 전문 세탁·살균 케어 서비스를 안내합니다.",
};

export const revalidate = 300;

export default async function ServicesPage() {
  const [services, page] = await Promise.all([getServices(), getServicesPage()]);
  const hero = page?.hero;
  const reservationNote = page?.reservationNote;

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow={hero?.eyebrow || "Services"}
            title={hero?.title || "카시트와 유모차 구조에 맞춘 전문 케어"}
            description={hero?.description || "품목별 소재, 분해 가능 범위, 오염 상태를 먼저 확인하고 제품에 무리가 가지 않는 방식으로 진행합니다."}
          />
        </Container>
      </section>
      <section className="bg-background-light py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <Card key={service.slug} className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
                <SanityImage image={service.image} alt={service.title} className="aspect-[4/3]" sizes="(min-width: 1024px) 35vw, 100vw" />
                <div>
                  <Badge>{service.title}</Badge>
                  <h2 className="cms-lines mt-3 text-xl font-medium text-brand-primary sm:text-2xl">{service.title}</h2>
                  <p className="cms-lines mt-3 text-sm leading-7 text-text-sub">{service.description}</p>
                  <div className="mt-5">
                    <p className="text-sm font-medium text-brand-primary">추천 관리 포인트</p>
                    <ul className="mt-2 space-y-2 text-sm text-text-sub">
                      {(service.carePoints || []).map((point) => (
                        <li key={point}>· {point}</li>
                      ))}
                    </ul>
                  </div>
                  {service.cautions?.length ? <p className="cms-lines mt-4 text-xs leading-5 text-text-sub">{service.cautions.join("\n")}</p> : null}
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 rounded-[18px] bg-background-main p-4 sm:mt-10 sm:rounded-[22px] sm:p-6">
            <h2 className="cms-lines text-xl font-medium text-brand-primary">{reservationNote?.title || "예약 전 확인사항"}</h2>
            <p className="cms-lines mt-3 text-sm leading-7 text-text-sub">
              {reservationNote?.description || "브랜드와 모델명, 오염 부위 사진을 함께 보내주시면 세탁 가능 여부와 예상 금액을 더 정확하게 안내할 수 있습니다."}
            </p>
            <Button href={reservationNote?.ctaHref || "/branches"} className="mt-5">{reservationNote?.ctaLabel || "가까운 지점 확인"}</Button>
          </div>
        </Container>
      </section>
      {page?.finalCta?.isVisible === false ? null : <FinalCtaSection finalCta={page?.finalCta} />}
    </>
  );
}
