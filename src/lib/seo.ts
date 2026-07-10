import type { Metadata } from "next";

export const siteName = "포베베";
export const defaultSeoTitle = "포베베 | 카시트·유모차 전문 세탁 케어";
export const defaultSeoDescription =
  "포베베는 카시트와 유모차를 전문적으로 세탁·살균 케어하는 유아용품 세탁 브랜드입니다. 가까운 지점의 예약과 전화 상담 정보를 확인하세요.";
export const defaultAuthor = { name: siteName, url: "https://www.forbebe.co.kr" };
export const defaultCategory = "유아용품 세탁 서비스";
export const defaultKeywords = [
  "포베베",
  "카시트 세탁",
  "유모차 세탁",
  "유아용품 세탁",
  "카시트 살균",
  "유모차 살균",
  "유아용품 케어",
  "아기용품 세탁",
];
export const defaultOgImage = "/images/hero-forbebe.jpg";

export const indexableRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/why-forbebe", priority: 0.85, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/process", priority: 0.85, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.85, changeFrequency: "weekly" },
  { path: "/branches", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cases", priority: 0.8, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/franchise", priority: 0.65, changeFrequency: "monthly" },
  { path: "/partnership", priority: 0.65, changeFrequency: "monthly" },
] as const;

type SeoMetadataInput = {
  title: string;
  description: string;
  path: (typeof indexableRoutes)[number]["path"];
  keywords?: string[];
};

export function createSeoMetadata({ title, description, path, keywords = [] }: SeoMetadataInput): Metadata {
  return {
    title,
    description,
    authors: [defaultAuthor],
    creator: siteName,
    publisher: siteName,
    category: defaultCategory,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: `${siteName} 카시트·유모차 세탁 케어` }],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
