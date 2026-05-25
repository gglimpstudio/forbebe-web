import { MapPin, MessageCircle, Phone } from "lucide-react";

import type { SiteSettings } from "@/types";

export function MobileBottomCta({ settings }: { settings: SiteSettings }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border-soft bg-background-light/95 p-2 shadow-[0_-10px_30px_rgba(27,89,74,0.12)] backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a href={`tel:${settings.phone || ""}`} className="flex h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-background-soft text-xs font-bold text-brand-primary">
          <Phone className="h-4 w-4" /> 전화
        </a>
        <a href={settings.kakaoUrl || "/contact"} target={settings.kakaoUrl ? "_blank" : undefined} rel={settings.kakaoUrl ? "noopener noreferrer" : undefined} className="flex h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-brand-secondary text-xs font-bold text-brand-primary">
          <MessageCircle className="h-4 w-4" /> 카카오톡
        </a>
        <a href="/branches" className="flex h-12 flex-col items-center justify-center gap-1 rounded-2xl bg-brand-primary text-xs font-bold text-text-inverse">
          <MapPin className="h-4 w-4" /> 지점 찾기
        </a>
      </div>
    </div>
  );
}
