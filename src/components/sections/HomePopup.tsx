import { ImagePopup } from "@/components/ui/ImagePopup";
import { preparePopupSlides } from "@/lib/homePopup";
import { getSiteUrl } from "@/lib/utils";
import type { HomePopupSettings } from "@/types";

export function HomePopup({ settings }: { settings?: HomePopupSettings | null }) {
  const slides = preparePopupSlides(settings, getSiteUrl());
  if (!slides.length) return null;
  return <ImagePopup key={JSON.stringify(slides)} slides={slides} />;
}
