import type { StructureResolver } from "sanity/structure";

const listedTypes = [
  "siteSettings",
  "homePage",
  "servicesPage",
  "processPage",
  "pricingPage",
  "branchesPage",
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
      singletonItem(S, "whyForbebePage", "포베베에 맡겨야하는 이유"),
      singletonItem(S, "processPage", "세탁과정"),
      singletonItem(S, "pricingPage", "가격안내"),
      singletonItem(S, "branchesPage", "지점소개"),
      singletonItem(S, "franchisePage", "창업문의"),
      singletonItem(S, "partnershipPage", "제휴문의"),
      S.documentTypeListItem("branch").title("지점"),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return Boolean(id && !listedTypes.includes(id));
      }),
    ]);
