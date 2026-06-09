import type { Metadata } from "next";
import Image from "next/image";

import { FinalCtaSection } from "@/components/sections/FinalCTASection";
import { Container } from "@/components/ui/Container";
import { PricingTable } from "@/components/ui/PricingTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPricingItems } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "가격 안내",
  description: "카시트, 유모차, 세트 케어 등 포베베 세탁 가격 기준과 추가 비용 안내를 확인하세요.",
};

export const revalidate = 300;

export default async function PricingPage() {
  const items = await getPricingItems();

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeader eyebrow="Pricing" title="가격 안내" description="전 지점 동일 기준으로 안내되며 제품 종류, 오염도, 추가 케어 범위에 따라 최종 금액이 달라질 수 있습니다." />
        </Container>
      </section>
      <section className="bg-background-light py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="mb-8 overflow-hidden rounded-[20px] bg-brand-primary shadow-[0_22px_60px_rgba(27,89,74,0.16)] sm:mb-10 sm:rounded-[28px]">
            <Image
              src="/forbebe-price.png"
              alt="포베베 카시트, 유모차, 옵션 가격표"
              width={1684}
              height={2384}
              className="h-auto w-full"
              priority
            />
          </div>
          <PricingTable items={items} />
          <div className="mt-8 rounded-[18px] bg-background-main p-4 text-sm leading-7 text-text-sub sm:rounded-[22px] sm:p-6">
            <p className="font-medium text-brand-primary">추가 비용 및 주의사항</p>
            <p className="mt-2">심한 오염, 곰팡이, 장기 보관 제품, 특수 소재 제품은 상담 후 추가 비용 또는 진행 불가 안내가 있을 수 있습니다. 정확한 금액은 제품 상태 확인 후 안내드립니다.</p>
          </div>
        </Container>
      </section>
      <FinalCtaSection />
    </>
  );
}
