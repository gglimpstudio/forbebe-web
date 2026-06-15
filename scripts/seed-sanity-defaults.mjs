import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createClient } from "next-sanity";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

loadEnvFile(path.join(rootDir, ".env.local"));
loadEnvFile(path.join(rootDir, ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-18";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  console.error("Create a Sanity token with write permissions and add it to .env.local as SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const services = [
  {
    title: "카시트",
    slug: "car-seat",
    shortDescription: "벨트, 쿠션, 틈새 오염을 제품 구조에 맞춰 확인합니다.",
    description: "아이 피부와 옷에 직접 닿는 시트와 벨트 주변 오염을 중심으로 위생 케어를 진행합니다.",
    icon: "ShieldCheck",
    order: 1,
    isFeatured: true,
    carePoints: ["시트 틈 먼지 제거", "벨트 주변 오염 확인", "쿠션 분리 가능 여부 확인"],
    cautions: ["제품 구조와 오염도에 따라 세탁 범위가 달라질 수 있습니다."],
  },
  {
    title: "바구니 카시트",
    slug: "infant-car-seat",
    shortDescription: "신생아 용품 특성에 맞춰 부드럽고 꼼꼼하게 케어합니다.",
    description: "패브릭과 쿠션의 상태를 확인하고 민감한 사용 시기를 고려해 세심하게 진행합니다.",
    icon: "Baby",
    order: 2,
    isFeatured: true,
    carePoints: ["패드 상태 확인", "손잡이 주변 오염 확인", "건조 상태 검수"],
    cautions: ["소재 손상 우려가 있는 부위는 상담 후 진행합니다."],
  },
  {
    title: "주니어 카시트",
    slug: "junior-car-seat",
    shortDescription: "음식물, 땀, 먼지가 쌓이기 쉬운 좌면을 집중 케어합니다.",
    description: "사용 기간이 긴 제품의 누적 오염을 확인하고 좌면과 등받이 중심으로 세척합니다.",
    icon: "Sparkles",
    order: 3,
    isFeatured: true,
    carePoints: ["좌면 집중 케어", "등받이 먼지 제거", "냄새 원인 오염 확인"],
    cautions: ["오래된 얼룩은 완전히 사라지지 않을 수 있습니다."],
  },
  {
    title: "디럭스 유모차",
    slug: "deluxe-stroller",
    shortDescription: "시트, 차양막, 프레임 주변 오염을 함께 점검합니다.",
    description: "외부 사용으로 쌓이는 먼지와 생활 오염을 부위별로 확인해 관리합니다.",
    icon: "Waves",
    order: 4,
    isFeatured: true,
    carePoints: ["시트 패브릭 케어", "프레임 닦음 케어", "차양막 오염 확인"],
    cautions: ["프레임 스크래치와 변색은 세탁으로 복구되지 않습니다."],
  },
  {
    title: "휴대용 유모차",
    slug: "portable-stroller",
    shortDescription: "접히는 구조의 틈새와 시트 오염을 꼼꼼히 확인합니다.",
    description: "휴대가 잦은 제품의 외부 먼지, 시트 오염, 접힘 부위 이물질을 점검합니다.",
    icon: "MapPin",
    order: 5,
    isFeatured: true,
    carePoints: ["접힘 부위 점검", "시트 얼룩 확인", "이물질 제거"],
    cautions: ["분해 가능 범위는 제품별로 다릅니다."],
  },
  {
    title: "기타 유아용품",
    slug: "baby-gear",
    shortDescription: "하이체어, 아기띠 등은 지점 상담 후 가능 여부를 안내합니다.",
    description: "품목과 소재에 따라 세탁 가능 여부가 달라 가까운 지점 상담을 권장합니다.",
    icon: "PackageCheck",
    order: 6,
    isFeatured: true,
    carePoints: ["품목별 가능 여부 확인", "소재 확인", "오염 상태 상담"],
    cautions: ["일부 제품은 안전상 세탁이 어려울 수 있습니다."],
  },
];

const processSteps = [
  "제품 접수|품목, 브랜드, 모델명, 오염 부위를 확인하고 진행 가능 범위와 예상 일정을 안내합니다.",
  "분해 및 사전 점검|제품 구조와 소재 상태를 확인한 뒤 제조사 메뉴얼에 맞춰서 분리 가능한 부위를 분해합니다.",
  "오염 제거|먼지, 음식물, 땀, 침, 틈새 이물질을 먼저 제거하고 오염 부위를 구분합니다.",
  "세탁 진행|패브릭과 쿠션 상태에 맞춰 부위별 세척을 진행하고 오래된 얼룩은 손상 없이 가능한 범위에서 관리합니다.",
  "건조 및 살균 관리|충분한 건조 상태 확인 후 1차 UV+오존 살균 합니다.",
  "조립 및 최종 확인|분해했던 부위를 조립하고 안전벨트, 체결부, 건조 상태, 주요 오염 부위를 다시 확인합니다. 오염 부위 다시 확인 후 2차 UV+오존 살균으로 마지막까지 확실하게 살균합니다.",
  "고객 인도|최종 상태와 사용 전 확인사항을 안내한 뒤 고객에게 제품을 전달합니다.",
].map((value, index) => {
  const [title, description] = value.split("|");
  return { title, description, order: index + 1 };
});

const pricingItems = [
  ["바구니형 / 휴대용", "카시트", 45000, "바구니형 또는 휴대용 카시트 기본 케어", true],
  ["일반 / 주니어 / 회전형", "카시트", 50000, "일반, 주니어, 회전형 카시트 기본 케어", true],
  ["휴대용 / 자전거형", "유모차", 50000, "휴대용 또는 자전거형 유모차 기본 케어", true],
  ["절충형 / 디럭스", "유모차", 65000, "절충형 또는 디럭스 유모차 기본 케어", true],
  ["쌍둥이 / 왜건 일반", "유모차", 85000, "쌍둥이 유모차 또는 왜건 일반형 케어", false],
  ["왜건 대형 / 고급 가족형", "유모차", 100000, "대형 왜건 또는 고급 가족형 제품 케어", false],
  ["시트, 햇빛가리개", "옵션", 5000, "보호매트, 커버류, 가방, 우산 포함", false],
  ["풋머프 / 위머 / 방한커버", "옵션", 10000, "쌍둥이 또는 왜건 커버류 포함", false],
  ["베시넷", "옵션", 20000, "베시넷 단품 케어", false],
  ["아기띠", "옵션", 35000, "아기띠 단품 케어", false],
].map(([title, category, price, description, isFeatured], index) => ({
  title,
  category,
  price,
  description,
  order: index + 1,
  isFeatured,
}));

const faqs = [
  ["세탁 기간은 얼마나 걸리나요?", "지점 일정과 제품 상태에 따라 달라집니다. 예약 상담 시 예상 일정을 안내드립니다.", "예약"],
  ["직접 방문해야 하나요?", "지점별 운영 방식이 다를 수 있습니다. 가까운 지점에 방문, 픽업 가능 여부를 문의해주세요.", "예약"],
  ["모든 제품이 세탁 가능한가요?", "제품 구조, 소재, 노후 상태에 따라 진행이 어려울 수 있습니다. 상담 시 사진을 보내주시면 확인이 빠릅니다.", "서비스"],
  ["오래된 얼룩도 제거되나요?", "오래된 얼룩은 소재에 스며들어 결과가 달라질 수 있습니다. 무리한 세척으로 제품을 손상시키지 않는 범위에서 진행합니다.", "서비스"],
  ["고가 유모차도 맡길 수 있나요?", "가능 여부와 주의사항을 먼저 확인합니다. 브랜드와 모델명, 제품 사진을 상담 시 알려주세요.", "서비스"],
  ["세탁 후 바로 사용할 수 있나요?", "건조와 최종 검수 후 전달드립니다. 수령 후에는 지점 안내에 따라 상태를 확인하고 사용해주세요.", "이용"],
].map(([question, answer, category], index) => ({ question, answer, category, order: index + 1, isFeatured: true }));

const cases = [
  {
    title: "카시트 음식물 얼룩 케어",
    slug: "car-seat-food-stain",
    itemType: "카시트",
    problemType: "음식물 얼룩",
    description: "좌면과 벨트 주변 오염을 확인하고 집중 세척을 진행한 사례입니다.",
    publishedAt: "2026-01-01",
    isFeatured: true,
  },
  {
    title: "유모차 먼지와 생활 오염 케어",
    slug: "stroller-dust-care",
    itemType: "유모차",
    problemType: "먼지와 생활 오염",
    description: "외부 사용 후 쌓인 먼지와 시트 오염을 부위별로 관리한 사례입니다.",
    publishedAt: "2026-01-02",
    isFeatured: true,
  },
];

const testimonials = [
  {
    content: "예시 후기입니다. 실제 운영 시 Sanity Studio에서 고객 동의를 받은 후기만 입력하세요.",
    customerName: "예시 고객",
    itemType: "카시트",
    branchName: "서울점",
    order: 1,
    isFeatured: true,
  },
  {
    content: "예시 후기입니다. 제품 상태 설명과 결과 안내가 자세했다는 내용으로 교체할 수 있습니다.",
    customerName: "예시 고객",
    itemType: "유모차",
    branchName: "경기점",
    order: 2,
    isFeatured: true,
  },
];

const navigation = [
  ["포베베에 맡겨야하는 이유", "/why-forbebe", 2],
  ["세탁과정", "/process", 3],
  ["가격안내", "/pricing", 4],
  ["지점소개", "/branches", 5],
  ["창업문의", "/franchise", 6],
  ["제휴문의", "/partnership", 7],
].map(([title, href, order]) => ({ title, href, order, isExternal: false }));

const finalCta = {
  isVisible: true,
  title: "아이에게 닿는 용품, 이제 전문 세탁으로 관리하세요.",
  description: "가까운 포베베 지점으로 간편하게 문의하세요.",
  primaryCtaLabel: "가까운 지점 확인하기",
  primaryCtaHref: "/branches",
  secondaryCtaLabel: "가까운 지점 찾기",
  secondaryCtaHref: "/branches",
};

const pageDocuments = [
  {
    _id: "servicesPage",
    _type: "servicesPage",
    hero: {
      eyebrow: "Services",
      title: "카시트와 유모차 구조에 맞춘 전문 케어",
      description: "품목별 소재, 분해 가능 범위, 오염 상태를 먼저 확인하고 제품에 무리가 가지 않는 방식으로 진행합니다.",
    },
    reservationNote: {
      title: "예약 전 확인사항",
      description: "브랜드와 모델명, 오염 부위 사진을 함께 보내주시면 세탁 가능 여부와 예상 금액을 더 정확하게 안내할 수 있습니다.",
      ctaLabel: "가까운 지점 확인",
      ctaHref: "/branches",
    },
    finalCta,
  },
  {
    _id: "processPage",
    _type: "processPage",
    hero: {
      eyebrow: "Process",
      title: "제품 상태를 확인하고 단계별로 케어합니다.",
      description: "분해 가능한 범위와 소재 상태를 먼저 확인한 뒤 세척, 살균 케어, 건조, 검수 순서로 진행합니다.",
    },
    noticeCards: [
      { title: "세탁 전 확인사항", description: "제품의 파손, 변색, 소재 약화, 분해 가능 여부를 확인합니다. 오래된 얼룩은 오염도에 따라 결과가 달라질 수 있습니다." },
      { title: "고객 전달 전 검수", description: "건조 상태, 주요 오염 부위, 조립 상태를 확인한 뒤 고객에게 전달합니다. 사용 전 최종 상태 확인을 권장합니다." },
    ],
    finalCta,
  },
  {
    _id: "pricingPage",
    _type: "pricingPage",
    hero: {
      eyebrow: "Pricing",
      title: "가격 안내",
      description: "전 지점 동일 기준으로 안내되며 제품 종류, 오염도, 추가 케어 범위에 따라 최종 금액이 달라질 수 있습니다.",
    },
    note: "옵션을 잘 모르실 경우, 지점에 문의 주세요.",
  },
  {
    _id: "casesPage",
    _type: "casesPage",
    hero: {
      eyebrow: "Cases",
      title: "세탁 전후 사례",
      description: "Before/After 이미지는 실제 제품 상태와 오염도에 따라 결과가 달라질 수 있습니다.",
    },
    finalCta,
  },
  {
    _id: "faqPage",
    _type: "faqPage",
    hero: {
      eyebrow: "FAQ",
      title: "자주 묻는 질문",
      description: "예약 전 궁금한 내용을 확인하세요. 제품 상태가 다르면 가까운 지점 상담을 권장합니다.",
    },
    finalCta,
  },
  {
    _id: "whyForbebePage",
    _type: "whyForbebePage",
    hero: {
      eyebrow: "Why Forbebe",
      title: "아이에게 닿는 제품이라, 세탁 기준도 달라야 합니다.",
      description: "포베베는 단순 세탁보다 제품 상태 확인, 오염 원인 분리, 건조 후 검수까지 이어지는 관리 흐름을 중요하게 봅니다.",
    },
    strengths: [
      { title: "전문 품목 집중", description: "카시트와 유모차처럼 구조가 복잡한 유아 이동용품에 집중합니다.", icon: "ShieldCheck" },
      { title: "제품별 사전 점검", description: "분해 가능 범위, 소재 약화, 오염도를 먼저 확인하고 진행합니다.", icon: "ScanSearch" },
      { title: "오염 부위 집중 관리", description: "아이 피부에 닿는 패브릭, 벨트, 쿠션과 틈새를 중점적으로 확인합니다.", icon: "Sparkles" },
      { title: "건조와 검수", description: "세탁 후 건조 상태와 조립 상태를 확인해 고객 인도 전 한 번 더 점검합니다.", icon: "ClipboardCheck" },
    ],
    branchCta: {
      title: "가까운 지점에서 제품 상태를 상담하세요.",
      description: "실제 세탁 범위와 비용은 제품 모델, 오염도, 소재 상태에 따라 달라질 수 있습니다. 가까운 지점에서 사진과 함께 상담하면 더 정확합니다.",
      primaryCtaLabel: "세탁과정 보기",
      primaryCtaHref: "/process",
      secondaryCtaLabel: "지점소개 보기",
      secondaryCtaHref: "/branches",
    },
    finalCta,
  },
  {
    _id: "franchisePage",
    _type: "franchisePage",
    hero: {
      eyebrow: "Franchise",
      title: "포베베 창업문의",
      description: "유아용품 위생 관리 수요가 있는 지역에서 포베베 지점 운영을 검토하고 있다면 희망 지역과 상담 내용을 남겨주세요.",
    },
    benefits: [
      { title: "전문 품목 중심", description: "카시트와 유모차 세탁 수요에 집중한 운영 구조를 지향합니다.", icon: "ShieldCheck" },
      { title: "지역 기반 상담", description: "희망 지역과 상권 특성에 맞춰 개설 가능성을 검토합니다.", icon: "MapPinned" },
      { title: "운영 프로세스", description: "접수, 세탁, 건조, 검수 흐름을 기준으로 지점 운영을 설계합니다.", icon: "BarChart3" },
    ],
    notice: {
      title: "상담 안내",
      description: "상담 신청 후 담당자가 지역, 운영 형태, 준비 상황을 확인해 순차적으로 연락드립니다.",
    },
    formTitle: "창업문의 폼",
  },
  {
    _id: "partnershipPage",
    _type: "partnershipPage",
    hero: {
      eyebrow: "Partnership",
      title: "포베베 제휴문의",
      description: "유아용품 위생 케어가 필요한 고객 접점이 있다면 포베베와 함께할 수 있는 제휴 방식을 문의해주세요.",
    },
    partnershipTypes: [
      { title: "기업 복지", description: "임직원 육아 복지와 유아용품 케어 혜택을 함께 설계합니다.", icon: "Gift" },
      { title: "산후조리원", description: "신생아 가정의 카시트, 유모차 케어 안내와 연계할 수 있습니다.", icon: "Building2" },
      { title: "유아용품 매장", description: "고객 구매 후 관리 서비스와 상담 채널을 연결합니다.", icon: "Store" },
      { title: "브랜드 제휴", description: "캠페인, 프로모션, 콘텐츠 협업 등 다양한 형태를 검토합니다.", icon: "Handshake" },
    ],
    formTitle: "제휴문의 폼",
  },
];

try {
  await seed();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Sanity seed failed: ${message}`);
  process.exit(1);
}

async function seed() {
  const priceImage = await uploadPriceImage();
  const docs = [
    ...pageDocuments.map((doc) => (doc._id === "pricingPage" && priceImage ? { ...doc, priceImage } : doc)),
    ...services.map((doc) => ({ _id: `service.${doc.slug}`, _type: "service", ...doc, slug: { _type: "slug", current: doc.slug } })),
    ...processSteps.map((doc, index) => ({ _id: `processStep.${index + 1}`, _type: "processStep", ...doc })),
    ...pricingItems.map((doc, index) => ({ _id: `pricingItem.${index + 1}`, _type: "pricingItem", ...doc })),
    ...cases.map((doc) => ({ _id: `cleaningCase.${doc.slug}`, _type: "cleaningCase", ...doc, slug: { _type: "slug", current: doc.slug } })),
    ...testimonials.map((doc, index) => ({ _id: `testimonial.${index + 1}`, _type: "testimonial", ...doc })),
    ...faqs.map((doc, index) => ({ _id: `faq.${index + 1}`, _type: "faq", ...doc })),
    ...navigation.map((doc, index) => ({ _id: `navigation.${index + 1}`, _type: "navigation", ...doc })),
  ];

  for (const doc of docs) {
    const { _id, _type, ...fields } = doc;
    await client.createIfNotExists({ _id, _type });
    await client.patch(_id).setIfMissing(fields).commit();
    console.log(`seeded ${_type}: ${_id}`);
  }

  console.log(`Done. Seeded ${docs.length} documents without overwriting existing fields.`);
}

async function uploadPriceImage() {
  const imagePath = path.join(rootDir, "public", "forbebe-price.png");
  if (!fs.existsSync(imagePath)) return null;

  const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: "forbebe-price.png",
    title: "포베베 가격표",
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
    alt: "포베베 카시트, 유모차, 옵션 가격표",
  };
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}
