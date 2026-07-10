import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { CaseFilter } from "@/components/ui/CaseFilter";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCases, getCasesPage } from "@/lib/sanity/queries";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "세탁 사례",
  description: "포베베의 카시트와 유모차 세탁 전후 사례를 품목과 오염 유형별로 확인하세요.",
  path: "/cases",
  keywords: ["세탁 사례", "세탁 전후", "카시트 세탁 사례", "유모차 세탁 사례"],
});

export const revalidate = 300;

export default async function CasesPage() {
  const [cases, page] = await Promise.all([getCases(), getCasesPage()]);
  const hero = page?.hero;

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow={hero?.eyebrow || "Cases"}
            title={hero?.title || "세탁 전후 사례"}
            description={hero?.description || "Before/After 이미지는 실제 제품 상태와 오염도에 따라 결과가 달라질 수 있습니다."}
            headingLevel="h1"
          />
        </Container>
      </section>
      <section className="bg-background-light py-10 sm:py-14 lg:py-16">
        <Container>
          <CaseFilter cases={cases} />
        </Container>
      </section>
      {page?.finalCta?.isVisible === false ? null : <FinalCtaSection finalCta={page?.finalCta} />}
    </>
  );
}
