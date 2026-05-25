import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { Container } from "@/components/ui/Container";
import { RegionFilter } from "@/components/ui/RegionFilter";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBranches } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "지점소개",
  description: "가까운 포베베 지점을 찾고 주소, 전화번호, 운영시간, 네이버지도, 카카오맵 링크를 확인하세요.",
};

export const revalidate = 300;

export default async function BranchesPage() {
  const branches = await getBranches();

  return (
    <>
      <section className="bg-background-main py-14 sm:py-20">
        <Container>
          <SectionHeader eyebrow="Branches" title="가까운 포베베 지점을 찾으세요." description="지역 필터와 검색으로 가까운 지점을 확인하고 상담 채널로 바로 연결할 수 있습니다." />
        </Container>
      </section>
      <section className="bg-background-light py-12 sm:py-16">
        <Container>
          <RegionFilter branches={branches} searchable />
        </Container>
      </section>
      <FinalCtaSection />
    </>
  );
}
