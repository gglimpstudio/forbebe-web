import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("tel:") || href.startsWith("mailto:");
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
}

export function hasText(value: string | null | undefined) {
  return Boolean(value && value.trim().length > 0);
}
