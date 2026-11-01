import type { HomePopupItem, HomePopupSettings, PopupSlide } from "@/types";

/** Only root-relative paths and explicit HTTP(S) URLs are valid popup links. */
export function normalizePopupUrl(value?: string): string | null {
  const href = value?.trim();
  if (!href || /[\u0000-\u0020\u007f\\]/.test(href)) return null;

  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (!/^https?:\/\//i.test(href)) return null;

  try {
    const url = new URL(href);
    return url.hostname && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

/** Use the visitor's calendar date, including their local time zone and DST. */
export function popupLocalDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function popupIdentity(id: string, version: number) {
  return `${encodeURIComponent(id)}:v${version}`;
}

/** Copy legacy fields without changing/removing the original document fields. */
export function legacyPopupItem(settings?: HomePopupSettings | null): HomePopupItem | null {
  if (!settings || (!settings.id && !settings.image && !settings.url)) return null;
  return {
    _type: "popupItem",
    _key: "legacy-popup",
    title: "기존 팝업",
    enabled: settings.enabled === true,
    id: settings.id,
    version: 1,
    image: settings.image ? { ...settings.image, alt: settings.image.alt?.trim() || "포베베 안내" } : undefined,
    ...(settings.buttonLabel === undefined ? {} : { buttonLabel: settings.buttonLabel }),
    url: settings.url,
  };
}

export function popupSourceItems(settings?: HomePopupSettings | null): HomePopupItem[] {
  if (!settings) return [];
  if (Array.isArray(settings.items)) return settings.items;
  if ((settings.listVersion || 0) >= 1) return [];
  const legacy = legacyPopupItem(settings);
  return legacy ? [legacy] : [];
}

/** Used by the CMS for both newly inserted items and Sanity's Duplicate action. */
export function popupIdRepairs(items: HomePopupItem[], generateId = () => crypto.randomUUID()): { key: string; id: string }[] {
  const reserved = new Set(items.map((item) => item.id?.trim()).filter(Boolean));
  const seen = new Set<string>();
  const repairs: { key: string; id: string }[] = [];
  for (const item of items) {
    const id = item.id?.trim();
    if (id && !seen.has(id)) {
      seen.add(id);
    } else if (item._key) {
      let newId: string;
      do { newId = generateId(); } while (reserved.has(newId));
      reserved.add(newId);
      seen.add(newId);
      repairs.push({ key: item._key, id: newId });
    }
  }
  return repairs;
}

/** Only complete, enabled, uniquely identified items reach the client. */
export function preparePopupSlides(settings: HomePopupSettings | null | undefined, siteUrl: string): PopupSlide[] {
  if (settings?.enabled !== true) return [];
  const seen = new Set<string>();
  return popupSourceItems(settings).flatMap((item) => {
    const id = item.id?.trim();
    const alt = item.image?.alt?.trim() || "포베베 안내";
    const asset = item.image?.asset;
    const src = normalizePopupUrl(asset?.url);
    const version = item.version ?? 1;
    let href = normalizePopupUrl(item.url);
    if (item.enabled !== true || !id || !src || !href || !Number.isInteger(version) || version < 1 || seen.has(id)) return [];
    seen.add(id);
    if (/^https?:/.test(href)) {
      const url = new URL(href);
      if (url.origin === new URL(siteUrl).origin) {
        const path = url.pathname.startsWith("//") ? `/./${url.pathname.slice(1)}` : url.pathname;
        href = `${path}${url.search}${url.hash}`;
      }
    }
    const dimensions = asset?.metadata?.dimensions;
    return [{
      key: popupIdentity(id, version), id, version, src, alt,
      width: dimensions?.width && dimensions.width > 0 ? dimensions.width : 1200,
      height: dimensions?.height && dimensions.height > 0 ? dimensions.height : 1200,
      href,
    }];
  });
}
