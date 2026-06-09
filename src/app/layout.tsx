import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { defaultNavigation } from "@/lib/constants";
import { urlForImage } from "@/lib/sanity/image";
import { getBranches, getHomePage, getSiteSettings } from "@/lib/sanity/queries";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.title || "포베베";
  const title = settings.defaultSeoTitle || "포베베 | 카시트 & 유모차 전문 세탁";
  const description =
    settings.defaultSeoDescription ||
    settings.description ||
    "포베베는 카시트와 유모차를 전문적으로 세탁·살균 케어하는 유아용품 세탁 브랜드입니다. 가까운 지점의 네이버 예약과 전화번호를 확인하세요.";
  const siteUrl = getSiteUrl();
  const faviconUrl = urlForImage(settings.favicon)?.width(64).height(64).fit("crop").url();
  const ogImageUrl = urlForImage(settings.ogImage)?.width(1200).height(630).fit("crop").url() || `${siteUrl}/images/hero-forbebe.jpg`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    icons: {
      icon: faviconUrl || "/favicon.ico",
      shortcut: faviconUrl || "/favicon.ico",
      apple: faviconUrl || "/favicon.ico",
    },
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: siteName }],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, branches, homePage] = await Promise.all([getSiteSettings(), getBranches(), getHomePage()]);

  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full flex-col bg-background-main text-text-main antialiased">
        <SiteChrome navigation={defaultNavigation} settings={settings} branches={branches} floatingCta={homePage?.floatingCta}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
