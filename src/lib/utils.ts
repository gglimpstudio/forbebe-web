import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("tel:") || href.startsWith("sms:") || href.startsWith("mailto:");
}

export function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.forbebe.co.kr");

  const normalizedUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;
  return normalizedUrl.replace(/\/$/, "");
}

export function hasText(value: string | null | undefined) {
  return Boolean(value && value.trim().length > 0);
}
