import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import type { NavigationItem, SiteSettings } from "@/types";

const FALLBACK_LOGO_SRC = "/forbebe-logo.png";

export function Header({ navigation, settings }: { navigation: NavigationItem[]; settings: SiteSettings }) {
  const logo = settings.headerLogo || settings.logo;
  const logoSrc = urlForImage(logo)?.width(486).height(100).fit("max").url() || FALLBACK_LOGO_SRC;
  const logoAlt = imageAlt(logo, settings.title || "포베베");

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft/80 bg-background-main/90 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={243}
            height={50}
            className="h-7 w-auto object-contain sm:h-10"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-text-sub transition hover:text-brand-primary">
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/branches" size="sm" className="hidden sm:inline-flex">
            지점 안내
          </Button>
          <MobileNav items={navigation} logoSrc={logoSrc} logoAlt={logoAlt} />
        </div>
      </Container>
    </header>
  );
}
