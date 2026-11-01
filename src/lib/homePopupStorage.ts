import { popupIdentity, popupLocalDate } from "./homePopup";

type PopupIdentity = { id: string; version: number };
type Scope = "session" | "day";
const sessionFallback = new Set<string>();
const dayFallback = new Map<string, string>();

export function popupStorageKey(item: PopupIdentity, scope: Scope) {
  return `forbebe:home-popup:${popupIdentity(item.id, item.version)}:${scope}`;
}

export function isPopupHidden(item: PopupIdentity, date = popupLocalDate()): boolean {
  const identity = popupIdentity(item.id, item.version);
  if (sessionFallback.has(identity) || dayFallback.get(identity) === date) return true;
  if (typeof window === "undefined") return false;
  const sessionKeys = [popupStorageKey(item, "session")];
  const dayKeys = [popupStorageKey(item, "day")];
  // Honor records written by the single-popup implementation only in version 1.
  if (item.version === 1) {
    sessionKeys.push(`forbebe:home-popup:${encodeURIComponent(item.id)}:session`);
    dayKeys.push(`forbebe:home-popup:${encodeURIComponent(item.id)}:day`);
  }
  try {
    if (sessionKeys.some((key) => window.sessionStorage.getItem(key) === "1")) return true;
  } catch { /* Storage may be denied. The other scope is checked independently. */ }
  try {
    if (dayKeys.some((key) => window.localStorage.getItem(key) === date)) return true;
  } catch { /* Use the in-memory record for client navigation in this tab. */ }
  return false;
}

export function hidePopup(item: PopupIdentity, scope: Scope, date = popupLocalDate()) {
  const identity = popupIdentity(item.id, item.version);
  if (scope === "session") sessionFallback.add(identity);
  else dayFallback.set(identity, date);
  try {
    const storage = scope === "session" ? window.sessionStorage : window.localStorage;
    storage.setItem(popupStorageKey(item, scope), scope === "session" ? "1" : date);
  } catch { /* Closing and navigation must work even if persistence is denied. */ }
}
