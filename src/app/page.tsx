import type { Metadata } from "next";

import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { CleaningNeedSection } from "@/components/sections/CleaningNeedSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProcessPreviewSection } from "@/components/sections/ProcessPreviewSection";
import { SloganSection } from "@/components/sections/SloganSection";
import { getHomeData, getSiteSettings } from "@/lib/sanity/queries";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.defaultSeoTitle || "포베베 | 카시트 & 유모차 전문 세탁";

  return {
    title: {
      absolute: title,
    },
    description:
      settings.defaultSeoDescription ||
      "카시트와 유모차를 전문적으로 세탁, 살균 관리하는 포베베의 서비스와 지점, 가격 정보를 확인하세요.",
  };
}

export default async function Home() {
  const data = await getHomeData();
  const homePage = data.homePage;

  return (
    <>
      {homePage?.hero?.isVisible === false ? null : <HeroSection hero={{ ...data.hero, ...homePage?.hero }} />}
      {homePage?.intro?.isVisible === false ? null : <IntroSection intro={homePage?.intro} />}
      {homePage?.necessity?.isVisible === false ? null : <CleaningNeedSection necessity={homePage?.necessity} />}
      {homePage?.slogan?.isVisible === false ? null : <SloganSection slogan={homePage?.slogan} />}
      {homePage?.beforeAfter?.isVisible === false ? null : <BeforeAfterSection beforeAfter={homePage?.beforeAfter} />}
      {homePage?.processSummary?.isVisible === false ? null : <ProcessPreviewSection processSummary={homePage?.processSummary} />}
      {homePage?.finalCta?.isVisible === false ? null : <FinalCTASection finalCta={homePage?.finalCta} />}
    </>
  );
}
