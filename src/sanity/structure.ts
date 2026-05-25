import type { StructureResolver } from "sanity/structure";

const listedTypes = [
  "siteSettings",
  "homePage",
  "service",
  "processStep",
  "pricingItem",
  "branch",
  "beforeAfterCase",
  "cleaningCase",
  "testimonial",
  "faq",
  "navigation",
  "legalPage",
];

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("포베베 콘텐츠")
    .items([
      S.listItem().id("siteSettings").title("사이트 설정").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem().id("homePage").title("홈페이지").child(S.document().schemaType("homePage").documentId("homePage")),
      S.divider(),
      S.documentTypeListItem("service").title("서비스"),
      S.documentTypeListItem("processStep").title("세탁 과정"),
      S.documentTypeListItem("pricingItem").title("가격"),
      S.documentTypeListItem("branch").title("지점"),
      S.documentTypeListItem("beforeAfterCase").title("전후 사진 사례"),
      S.documentTypeListItem("cleaningCase").title("세탁 사례"),
      S.documentTypeListItem("testimonial").title("후기"),
      S.documentTypeListItem("faq").title("FAQ"),
      S.documentTypeListItem("navigation").title("내비게이션"),
      S.documentTypeListItem("legalPage").title("법적 페이지"),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return Boolean(id && !listedTypes.includes(id));
      }),
    ]);
