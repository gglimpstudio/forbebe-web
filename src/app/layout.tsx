import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { defaultNavigation } from "@/lib/constants";
import { getSiteSettings } from "@/lib/sanity/queries";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.title || "포베베";
  const title = settings.defaultSeoTitle || "포베베 | 카시트 & 유모차 전문 세탁";
  const description =
    settings.defaultSeoDescription ||
    settings.description ||
    "포베베는 카시트와 유모차를 전문적으로 세탁·살균 케어하는 유아용품 세탁 브랜드입니다. 가까운 지점에서 간편하게 예약 문의하세요.";

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: getSiteUrl(),
      siteName,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteName }],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full flex-col bg-background-main text-text-main antialiased">
        <SiteChrome navigation={defaultNavigation} settings={settings}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
