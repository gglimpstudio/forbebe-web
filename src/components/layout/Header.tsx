import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { NavigationItem } from "@/types";

export function Header({ navigation }: { navigation: NavigationItem[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft/80 bg-background-main/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/포베베_로고투명.png"
            alt="포베베"
            width={243}
            height={50}
            className="h-8 w-auto object-contain sm:h-10"
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
          <Button href="/contact" size="sm" className="hidden sm:inline-flex">
            예약 문의
          </Button>
          <MobileNav items={navigation} />
        </div>
      </Container>
    </header>
  );
}
