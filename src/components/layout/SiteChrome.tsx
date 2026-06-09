"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomCta } from "@/components/layout/MobileBottomCta";
import type { Branch, FloatingCtaSettings, NavigationItem, SiteSettings } from "@/types";

export function SiteChrome({
  children,
  navigation,
  settings,
  branches,
  floatingCta,
}: {
  children: React.ReactNode;
  navigation: NavigationItem[];
  settings: SiteSettings;
  branches: Branch[];
  floatingCta?: FloatingCtaSettings;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <div className="site-selection contents">
      <Header navigation={navigation} settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <MobileBottomCta settings={settings} branches={branches} floatingCta={floatingCta} />
    </div>
  );
}
