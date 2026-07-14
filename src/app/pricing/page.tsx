import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPricingPage } from "@/lib/sanity/queries";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "가격 안내",
  description: "카시트, 유모차, 세트 케어 등 포베베 세탁 가격 기준과 추가 비용 안내를 확인하세요.",
  path: "/pricing",
  keywords: ["가격 안내", "카시트 세탁 가격", "유모차 세탁 가격"],
});

export const revalidate = 300;

export default async function PricingPage() {
  const page = await getPricingPage();
  const hero = page?.hero;
  const priceImageBuilder = urlForImage(page?.priceImage);
  const priceImageSrc = priceImageBuilder?.width(1684).fit("max").url();
  const priceImageDimensions = page?.priceImage?.asset?.metadata?.dimensions;
  const priceImageWidth = priceImageDimensions?.width || 1684;
  const priceImageHeight = priceImageDimensions?.height || 2384;

  return (
    <>
      <section className="bg-background-main py-12 sm:py-16 lg:py-20">
        <Container>
          <SectionHeader
            eyebrow={hero?.eyebrow || "Pricing"}
            title={hero?.title || "가격 안내"}
            description={hero?.description || "전 지점 동일 기준으로 안내되며 제품 종류, 오염도, 추가 케어 범위에 따라 최종 금액이 달라질 수 있습니다."}
            headingLevel="h1"
          />
        </Container>
      </section>
      <section className="bg-background-light py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="mb-8 overflow-hidden rounded-[20px] bg-brand-primary shadow-[0_22px_60px_rgba(27,89,74,0.16)] sm:mb-10 sm:rounded-[28px]">
            {priceImageSrc ? (
              <Image
                src={priceImageSrc}
                alt={imageAlt(page?.priceImage, "포베베 카시트, 유모차, 옵션 가격표")}
                width={priceImageWidth}
                height={priceImageHeight}
                className="h-auto w-full"
                sizes="100vw"
                priority
              />
            ) : (
              <Image
                src="/forbebe-price.png"
                alt="포베베 카시트, 유모차, 옵션 가격표"
                width={1684}
                height={2384}
                className="h-auto w-full"
                priority
              />
            )}
          </div>
          <p className="cms-lines mx-auto max-w-2xl rounded-[16px] border border-brand-primary/15 bg-background-main px-4 py-4 text-center text-sm font-semibold leading-7 text-brand-primary shadow-[0_12px_32px_rgba(27,89,74,0.08)] sm:rounded-[20px] sm:px-8 sm:py-5 sm:text-lg">
            {page?.note || "옵션을 잘 모르실 경우, 지점에 문의 주세요."}
          </p>
        </Container>
      </section>
    </>
  );
}
