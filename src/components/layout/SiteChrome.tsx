"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomCta } from "@/components/layout/MobileBottomCta";
import type { NavigationItem, SiteSettings } from "@/types";

export function SiteChrome({
  children,
  navigation,
  settings,
}: {
  children: React.ReactNode;
  navigation: NavigationItem[];
  settings: SiteSettings;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header navigation={navigation} settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <MobileBottomCta settings={settings} />
    </>
  );
}
