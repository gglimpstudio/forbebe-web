import type { StructureResolver } from "sanity/structure";

const listedTypes = [
  "siteSettings",
  "homePage",
  "servicesPage",
  "processPage",
  "pricingPage",
  "casesPage",
  "faqPage",
  "whyForbebePage",
  "franchisePage",
  "partnershipPage",
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

const singletonItem = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().id(type).title(title).child(S.document().schemaType(type).documentId(type));

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("포베베 콘텐츠")
    .items([
      singletonItem(S, "siteSettings", "사이트 설정"),
      singletonItem(S, "homePage", "홈페이지"),
      S.divider(),
      S.listItem()
        .id("pages")
        .title("페이지 관리")
        .child(
          S.list()
            .id("pages")
            .title("페이지 관리")
            .items([
              singletonItem(S, "whyForbebePage", "왜 포베베인가"),
              singletonItem(S, "servicesPage", "서비스"),
              singletonItem(S, "processPage", "세탁 과정"),
              singletonItem(S, "pricingPage", "가격 안내"),
              singletonItem(S, "casesPage", "세탁 사례"),
              singletonItem(S, "faqPage", "FAQ"),
              singletonItem(S, "franchisePage", "창업문의"),
              singletonItem(S, "partnershipPage", "제휴문의"),
            ]),
        ),
      S.listItem()
        .id("content")
        .title("콘텐츠 관리")
        .child(
          S.list()
            .id("content")
            .title("콘텐츠 관리")
            .items([
              S.documentTypeListItem("service").title("서비스 항목"),
              S.documentTypeListItem("processStep").title("세탁 단계"),
              S.documentTypeListItem("pricingItem").title("가격 항목"),
              S.documentTypeListItem("beforeAfterCase").title("전후 사진 사례"),
              S.documentTypeListItem("cleaningCase").title("세탁 사례"),
              S.documentTypeListItem("testimonial").title("후기"),
              S.documentTypeListItem("faq").title("FAQ 항목"),
              S.documentTypeListItem("navigation").title("내비게이션"),
              S.documentTypeListItem("legalPage").title("법적 페이지"),
            ]),
        ),
      S.documentTypeListItem("branch").title("지점"),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return Boolean(id && !listedTypes.includes(id));
      }),
    ]);
