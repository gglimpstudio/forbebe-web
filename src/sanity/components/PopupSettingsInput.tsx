"use client";

import { useEffect } from "react";
import { set, setIfMissing, type ObjectInputProps } from "sanity";

import { legacyPopupItem, popupIdRepairs } from "@/lib/homePopup";
import type { HomePopupSettings } from "@/types";

/** Add list fields to the draft; never remove or overwrite legacy content. */
export function PopupSettingsInput(props: ObjectInputProps) {
  const { value, onChange, readOnly } = props;
  useEffect(() => {
    if (readOnly || !value) return;
    const settings = value as HomePopupSettings;
    if (!settings.listVersion) {
      const legacy = legacyPopupItem(settings);
      onChange([
        setIfMissing(Array.isArray(settings.items) ? settings.items : legacy ? [legacy] : [], ["items"]),
        setIfMissing(1, ["listVersion"]),
      ]);
    }
    if (Array.isArray(settings.items)) {
      const repairs = popupIdRepairs(settings.items);
      if (repairs.length) onChange(repairs.map(({ key, id }) => set(id, ["items", { _key: key }, "id"])));
    }
  }, [value, onChange, readOnly]);
  return props.renderDefault(props);
}
