import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import type { SiteSettings } from "@/types";

type FooterLink = {
  label: string;
  href: string;
};

const footerMenus: { title: string; links: FooterLink[] }[] = [
  {
    title: "서비스",
    links: [
      { label: "포베베 소개", href: "/" },
      { label: "왜 포베베에 맡겨야 하나요", href: "/why-forbebe" },
      { label: "세탁과정", href: "/process" },
      { label: "가격안내", href: "/pricing" },
      { label: "지점소개", href: "/branches" },
    ],
  },
  {
    title: "문의",
    links: [
      { label: "창업문의", href: "/franchise" },
      { label: "제휴문의", href: "/partnership" },
    ],
  },
  {
    title: "안내",
    links: [
      { label: "개인정보처리방침", href: "/privacy" },
      { label: "서비스 안내", href: "/services" },
    ],
  },
];

const contactInfo = [
  { label: "대표번호", value: "준비중" },
  { label: "이메일", value: "contact@forbebe.co.kr" },
  { label: "운영시간", value: "지점별 상이" },
  { label: "사업자정보", value: "추후 입력" },
];

const FALLBACK_LOGO_SRC = "/forbebe-logo.png";

export function Footer({ settings }: { settings: SiteSettings }) {
  const homeFooter = settings.homeFooter;
  const footerText = homeFooter?.description || settings.footerText || "아이의 이동 공간을 더 산뜻하고 안심할 수 있게 케어합니다.";
  const footerLogo = settings.footerLogo || settings.logo;
  const footerLogoSrc = urlForImage(footerLogo)?.width(486).height(100).fit("max").url() || FALLBACK_LOGO_SRC;
  const footerLogoClassName = footerLogo
    ? "h-8 w-auto object-contain sm:h-10"
    : "h-8 w-auto object-contain [filter:brightness(0)_saturate(100%)_invert(90%)_sepia(15%)_saturate(419%)_hue-rotate(10deg)_brightness(95%)_contrast(87%)] sm:h-10";
  const businessInfo = homeFooter?.businessInfo;
  const contactItems = businessInfo
    ? [
        { label: "상호명", value: businessInfo.companyName },
        { label: "대표자", value: businessInfo.representative },
        { label: "사업자등록번호", value: businessInfo.businessNumber },
        { label: "주소", value: businessInfo.address },
        { label: "대표번호", value: businessInfo.phone },
        { label: "이메일", value: businessInfo.email },
      ].filter((item): item is { label: string; value: string } => Boolean(item.value))
    : contactInfo;
  const extraLinks = homeFooter?.links?.filter((link) => link.label && link.href) || [];
  const compactFooterLinks = [...footerMenus.flatMap((menu) => menu.links), ...extraLinks];

  return (
    <footer className="border-t border-[rgba(223,217,179,0.12)] bg-[#082B25] pb-20 pt-8 text-[#F3EFE2] sm:pb-24 sm:pt-14 md:pb-14" aria-label="사이트 푸터">
      <Container>
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.15fr_1.35fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="포베베 홈으로 이동">
              <Image
                src={footerLogoSrc}
                alt={imageAlt(footerLogo, settings.title || "포베베")}
                width={243}
                height={50}
                className={footerLogoClassName}
              />
            </Link>
            <p className="mt-4 text-sm font-medium leading-6 text-[#F3EFE2] sm:mt-6 sm:text-lg sm:leading-7">{homeFooter?.brandName || "유모차와 카시트를 위한 프리미엄 세탁 케어 서비스"}</p>
            <p className="mt-3 hidden max-w-md text-sm leading-7 text-[rgba(243,239,226,0.68)] sm:block">{footerText}</p>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-[rgba(243,239,226,0.68)] sm:mt-8 sm:gap-3 sm:text-sm">
              {contactItems.map((item) => (
                <div key={item.label} className="min-w-0">
                  <dt className="font-medium leading-5 text-[#F3EFE2]">{item.label}</dt>
                  <dd className="mt-0.5 break-keep leading-5 sm:mt-1">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav className="flex flex-wrap gap-x-3 gap-y-2 border-t border-[rgba(223,217,179,0.12)] pt-4 sm:hidden" aria-label="푸터 메뉴">
            {compactFooterLinks.map((link) => (
              <Link key={`${link.href}-${link.label}`} href={link.href || "/"} className="inline-flex min-h-8 items-center text-[13px] font-medium text-[rgba(243,239,226,0.82)] transition hover:text-[#DFD9B3]">
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="hidden gap-8 sm:grid sm:grid-cols-3" aria-label="푸터 메뉴">
            {footerMenus.map((menu) => (
              <div key={menu.title}>
                <p className="text-sm font-medium text-[#F3EFE2]">{menu.title}</p>
                <ul className="mt-4 grid gap-2.5">
                  {menu.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex min-h-9 items-center text-sm font-semibold text-[rgba(243,239,226,0.82)] transition hover:text-[#DFD9B3]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {extraLinks.length ? (
              <div>
                <p className="text-sm font-medium text-[#F3EFE2]">바로가기</p>
                <ul className="mt-4 grid gap-2.5">
                  {extraLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href || "/"} className="inline-flex min-h-9 items-center text-sm font-semibold text-[rgba(243,239,226,0.82)] transition hover:text-[#DFD9B3]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[rgba(223,217,179,0.12)] pt-4 text-xs text-[rgba(243,239,226,0.55)] sm:mt-12 sm:pt-6 sm:text-sm lg:flex-row lg:items-center lg:justify-between">
          <p>{homeFooter?.copyright || "© 2026 Forbebe. All rights reserved."}</p>
        </div>
      </Container>
    </footer>
  );
}
