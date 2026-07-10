import type { Metadata } from "next";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { urlForImage } from "@/lib/sanity/image";
import { getBranches, getHomePage, getNavigation, getSiteSettings } from "@/lib/sanity/queries";
import { defaultAuthor, defaultCategory, defaultKeywords, defaultOgImage, defaultSeoDescription, defaultSeoTitle } from "@/lib/seo";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const publicSiteUrl = "https://www.forbebe.co.kr";
const googleSiteVerification = "A-0Atu75qkSaT_eFn-ZKQAibVndHSCV6A0jIGUQkvG0";
const naverSiteVerification = "10c34eb7fd07f593dbd2e6941bd611f49abc4a31";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings.title || "포베베";
  const title = settings.defaultSeoTitle || defaultSeoTitle;
  const description = settings.defaultSeoDescription || settings.description || defaultSeoDescription;
  const faviconUrl = urlForImage(settings.favicon)?.width(64).height(64).fit("crop").url();
  const ogImageUrl = urlForImage(settings.ogImage)?.width(1200).height(630).fit("crop").url() || defaultOgImage;

  return {
    metadataBase: new URL(publicSiteUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    icons: {
      icon: faviconUrl || "/favicon.ico",
      shortcut: faviconUrl || "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    description,
    authors: [defaultAuthor],
    creator: siteName,
    publisher: siteName,
    category: defaultCategory,
    keywords: defaultKeywords,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: googleSiteVerification,
      other: {
        "naver-site-verification": naverSiteVerification,
      },
    },
  };
}

function structuredDataJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, branches, homePage, navigation] = await Promise.all([getSiteSettings(), getBranches(), getHomePage(), getNavigation()]);
  const siteUrl = getSiteUrl();
  const siteTitle = settings.title || "포베베";
  const siteDescription = settings.defaultSeoDescription || settings.description || defaultSeoDescription;
  const logoUrl = urlForImage(settings.logo || settings.headerLogo)?.width(512).height(512).fit("max").url() || `${siteUrl}/forbebe-logo.png`;
  const sameAs = [settings.blogUrl, settings.instagramUrl, settings.kakaoUrl].filter(Boolean);
  const primaryBranch = branches.find((branch) => branch.region === "본사") || branches[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteTitle,
        url: siteUrl,
        logo: logoUrl,
        description: siteDescription,
        telephone: settings.phone || primaryBranch?.phone,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteTitle,
        description: siteDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "ko-KR",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: primaryBranch?.name || siteTitle,
        url: siteUrl,
        image: `${siteUrl}${defaultOgImage}`,
        telephone: primaryBranch?.phone || settings.phone,
        address: primaryBranch?.address,
        areaServed: branches.map((branch) => branch.region).filter(Boolean),
        openingHours: primaryBranch?.operatingHours,
        parentOrganization: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full flex-col bg-background-main text-text-main antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson(jsonLd) }} />
        <SiteChrome navigation={navigation} settings={settings} branches={branches} floatingCta={homePage?.floatingCta}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
