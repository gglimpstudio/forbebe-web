import type { Metadata } from "next";

import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { CleaningNeedSection } from "@/components/sections/CleaningNeedSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProcessPreviewSection } from "@/components/sections/ProcessPreviewSection";
import { SloganSection } from "@/components/sections/SloganSection";
import { getHomeData, getSiteSettings } from "@/lib/sanity/queries";
import { defaultAuthor, defaultCategory, defaultKeywords, defaultOgImage, defaultSeoDescription } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.defaultSeoTitle || "포베베 | 카시트 & 유모차 전문 세탁";

  return {
    title: {
      absolute: title,
    },
    description: settings.defaultSeoDescription || defaultSeoDescription,
    authors: [defaultAuthor],
    creator: settings.title || "포베베",
    publisher: settings.title || "포베베",
    category: defaultCategory,
    keywords: defaultKeywords,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description: settings.defaultSeoDescription || defaultSeoDescription,
      url: "/",
      siteName: settings.title || "포베베",
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: "포베베 카시트·유모차 세탁 케어" }],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: settings.defaultSeoDescription || defaultSeoDescription,
      images: [defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
    },
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
