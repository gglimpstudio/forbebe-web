import { defineArrayMember, defineField, defineType } from "sanity";

import { normalizePopupUrl } from "@/lib/homePopup";
import { PopupSettingsInput } from "../components/PopupSettingsInput";

const popupItem = defineArrayMember({
  name: "popupItem",
  title: "팝업",
  type: "object",
  initialValue: () => ({ enabled: true, id: crypto.randomUUID(), version: 1 }),
  fields: [
    defineField({ name: "title", title: "관리자용 제목", type: "string", description: "관리 화면에서만 표시됩니다.", validation: (rule) => rule.required() }),
    defineField({ name: "enabled", title: "개별 활성화", type: "boolean", initialValue: true }),
    defineField({ name: "id", title: "고유 식별자", type: "string", readOnly: true, description: "자동 생성됩니다. 내용 수정 시 유지되며, 항목 복제 시 새로 발급됩니다.", validation: (rule) => rule.required() }),
    defineField({ name: "version", title: "노출 버전", type: "number", initialValue: 1, description: "기존 숨김 기록을 초기화하려면 이전에 쓰지 않은 더 큰 정수로 올리세요. 일반적인 내용 수정에서는 유지합니다.", validation: (rule) => rule.required().integer().min(1) }),
    defineField({
      name: "image", title: "팝업 이미지", type: "image", options: { hotspot: false },
      description: "원본 비율로 표시합니다. 긴 이미지는 모달 안에서 스크롤할 수 있습니다.",
      fields: [defineField({ name: "alt", title: "이미지 대체 텍스트", type: "string", description: "선택 항목입니다. 이미지에 담긴 안내 내용과 주요 문구를 설명하세요. 비워두면 ‘포베베 안내’를 사용합니다." })],
      validation: (rule) => rule.custom((value, context) =>
        (context.parent as { enabled?: boolean })?.enabled && !value?.asset ? "활성화하려면 이미지를 등록하세요." : true,
      ),
    }),
    defineField({ name: "buttonLabel", title: "이전 버튼 문구", type: "string", hidden: true, readOnly: true }),
    defineField({
      name: "url", title: "이미지 연결 URL", type: "string",
      description: "이미지 클릭 시 이동합니다. /pricing 같은 내부 경로 또는 http://, https:// 주소만 허용합니다. 외부 주소는 새 탭에서 열립니다.",
      validation: (rule) => rule.custom((value, context) => {
        if (!value?.trim() && !(context.parent as { enabled?: boolean })?.enabled) return true;
        return normalizePopupUrl(value) ? true : "내부 경로(/로 시작) 또는 올바른 http/https 주소를 입력하세요.";
      }),
    }),
  ],
  preview: {
    select: { title: "title", enabled: "enabled", media: "image" },
    prepare: ({ title, enabled, media }) => ({ title: title || "제목 없는 팝업", subtitle: enabled ? "활성화" : "비활성화", media }),
  },
});

export const homePopup = defineType({
  name: "homePopup",
  title: "팝업 설정",
  type: "document",
  description: "전체 활성화 후 표시할 팝업을 목록에 추가하세요. 목록 순서대로 하나의 모달에서 표시합니다.",
  initialValue: { enabled: false, items: [], listVersion: 1 },
  components: { input: PopupSettingsInput },
  fields: [
    defineField({ name: "enabled", title: "전체 팝업 활성화", type: "boolean", initialValue: false }),
    defineField({
      name: "items", title: "팝업 목록", type: "array", of: [popupItem], options: { sortable: true },
      description: "추가·삭제하거나 드래그로 순서를 바꿀 수 있습니다. 각 항목의 노출 버전을 올리면 해당 팝업을 다시 노출합니다.",
      validation: (rule) => rule.custom((items) => {
        const ids = (items || []).map((item) => (item as { id?: string }).id?.trim()).filter(Boolean);
        return new Set(ids).size === ids.length ? true : "팝업 식별자가 중복되었습니다. 자동 재발급이 완료된 뒤 게시하세요.";
      }),
    }),
    defineField({ name: "listVersion", title: "목록 데이터 버전", type: "number", hidden: true, readOnly: true }),
    // Keep legacy fields registered and untouched, including their original values.
    defineField({ name: "id", title: "이전 단일 팝업 식별자", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "image", title: "이전 단일 팝업 이미지", type: "image", fields: [defineField({ name: "alt", type: "string", title: "대체 텍스트" })], hidden: true, readOnly: true }),
    defineField({ name: "buttonLabel", title: "이전 단일 팝업 버튼 문구", type: "string", hidden: true, readOnly: true }),
    defineField({ name: "url", title: "이전 단일 팝업 URL", type: "string", hidden: true, readOnly: true }),
  ],
  preview: { prepare: () => ({ title: "팝업 설정" }) },
});
