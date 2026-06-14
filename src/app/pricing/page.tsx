import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "가격 안내",
  description: "카시트, 유모차, 세트 케어 등 포베베 세탁 가격 기준과 추가 비용 안내를 확인하세요.",
};

export const revalidate = 300;

export default function PricingPage() {
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
          <p className="mx-auto max-w-2xl whitespace-normal rounded-[16px] border border-brand-primary/15 bg-background-main px-4 py-4 text-center text-sm font-semibold leading-7 text-brand-primary shadow-[0_12px_32px_rgba(27,89,74,0.08)] [overflow-wrap:anywhere] [word-break:normal] sm:rounded-[20px] sm:px-8 sm:py-5 sm:text-lg">
            옵션을 잘 모르실 경우, 지점에 문의 주세요.
          </p>
        </Container>
      </section>
    </>
  );
}
