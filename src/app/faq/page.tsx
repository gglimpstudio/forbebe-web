import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { Container } from "@/components/ui/Container";
import { FaqFilter } from "@/components/ui/FaqFilter";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFaqPage, getFaqs } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "FAQ",
  description: "포베베 세탁 기간, 방문 여부, 세탁 가능 품목, 얼룩 제거, 사용 가능 시점 등 자주 묻는 질문입니다.",
};

export const revalidate = 300;

export default async function FaqPage() {
  const [faqs, page] = await Promise.all([getFaqs(), getFaqPage()]);
  const hero = page?.hero;

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow={hero?.eyebrow || "FAQ"}
            title={hero?.title || "자주 묻는 질문"}
            description={hero?.description || "예약 전 궁금한 내용을 확인하세요. 제품 상태가 다르면 가까운 지점 상담을 권장합니다."}
          />
        </Container>
      </section>
      <section className="bg-background-light py-10 sm:py-14 lg:py-16">
        <Container className="max-w-4xl">
          <FaqFilter faqs={faqs} />
        </Container>
      </section>
      {page?.finalCta?.isVisible === false ? null : <FinalCtaSection finalCta={page?.finalCta} />}
    </>
  );
}
