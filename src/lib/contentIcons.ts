import {
  BarChart3,
  Building2,
  ClipboardCheck,
  Gift,
  Handshake,
  MapPinned,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

export const contentIcons = {
  BarChart3,
  Building2,
  ClipboardCheck,
  Gift,
  Handshake,
  MapPinned,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Store,
};

export type ContentIconName = keyof typeof contentIcons;

export function getContentIcon(name?: string) {
  return name && name in contentIcons ? contentIcons[name as ContentIconName] : Sparkles;
}
