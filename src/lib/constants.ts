import type {
  Branch,
  CleaningCase,
  FaqItem,
  Hero,
  NavigationItem,
  PricingItem,
  ProcessStep,
  Service,
  SiteSettings,
  Testimonial,
} from "@/types";

export const regions = ["전체", "본사", "충남", "인천", "경기도 북부", "경기도 남부"] as const;

export const defaultNavigation: NavigationItem[] = [
  { title: "포베베에 맡겨야하는 이유", href: "/why-forbebe", order: 2 },
  { title: "세탁과정", href: "/process", order: 3 },
  { title: "가격안내", href: "/pricing", order: 4 },
  { title: "지점소개", href: "/branches", order: 5 },
  { title: "창업문의", href: "/franchise", order: 6 },
  { title: "제휴문의", href: "/partnership", order: 7 },
];

export const defaultSettings: SiteSettings = {
  title: "포베베",
  description: "카시트와 유모차를 전문적으로 세탁·살균 케어하는 유아용품 세탁 브랜드",
  phone: "010-0000-0000",
  kakaoUrl: "https://pf.kakao.com/",
  blogUrl: "https://blog.naver.com/",
  instagramUrl: "https://instagram.com/",
  businessInfo: "상호명 포베베 | 대표자명 입력 | 사업자등록번호 입력 | 주소 입력",
  footerText: "아이에게 닿는 용품을 더 안심할 수 있도록 꼼꼼하게 케어합니다.",
  defaultSeoTitle: "포베베 | 카시트 & 유모차 전문 세탁",
  defaultSeoDescription:
    "포베베는 카시트와 유모차를 전문적으로 세탁·살균 케어하는 유아용품 세탁 브랜드입니다. 가까운 지점의 네이버 예약과 전화번호를 확인하세요.",
};

export const defaultHero: Hero = {
  eyebrow: "유모차·카시트 전문 케어",
  title: "세탁을 넘어,\n아이의 이동을 다시 안심하게.",
  description:
    "유모차와 카시트에 남은 생활 오염까지\n전문 장비와 섬세한 공정으로 케어합니다.",
  primaryButtonLabel: "서비스 보기",
  primaryButtonUrl: "/process",
  secondaryButtonLabel: "가격 안내",
  secondaryButtonUrl: "/pricing",
};

export const defaultServices: Service[] = [
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

export const defaultProcessSteps: ProcessStep[] = [
  {
    title: "제품 접수",
    description: "품목, 브랜드, 모델명, 오염 부위를 확인하고 진행 가능 범위와 예상 일정을 안내합니다.",
  },
  {
    title: "분해 및 사전 점검",
    description: "제품 구조와 소재 상태를 확인한 뒤 제조사 메뉴얼에 맞춰서 분리 가능한 부위를 분해합니다.",
  },
  {
    title: "오염 제거",
    description: "먼지, 음식물, 땀, 침, 틈새 이물질을 먼저 제거하고 오염 부위를 구분합니다.",
  },
  {
    title: "세탁 진행",
    description: "패브릭과 쿠션 상태에 맞춰 부위별 세척을 진행하고 오래된 얼룩은 손상 없이 가능한 범위에서 관리합니다.",
  },
  {
    title: "건조 및 살균 관리",
    description: "충분한 건조 상태 확인 후 1차 UV+오존 살균 합니다.",
  },
  {
    title: "조립 및 최종 확인",
    description: "분해했던 부위를 조립하고 안전벨트, 체결부, 건조 상태, 주요 오염 부위를 다시 확인합니다. 오염 부위 다시 확인 후 2차 UV+오존 살균으로 마지막까지 확실하게 살균합니다.",
  },
  {
    title: "고객 인도",
    description: "최종 상태와 사용 전 확인사항을 안내한 뒤 고객에게 제품을 전달합니다.",
  },
].map((step, index) => ({
  ...step,
  order: index + 1,
}));

export const defaultPricingItems: PricingItem[] = [
  { title: "바구니형 / 휴대용", category: "카시트", price: 45000, description: "바구니형 또는 휴대용 카시트 기본 케어", order: 1, isFeatured: true },
  { title: "일반 / 주니어 / 회전형", category: "카시트", price: 50000, description: "일반, 주니어, 회전형 카시트 기본 케어", order: 2, isFeatured: true },
  { title: "휴대용 / 자전거형", category: "유모차", price: 50000, description: "휴대용 또는 자전거형 유모차 기본 케어", order: 3, isFeatured: true },
  { title: "절충형 / 디럭스", category: "유모차", price: 65000, description: "절충형 또는 디럭스 유모차 기본 케어", order: 4, isFeatured: true },
  { title: "쌍둥이 / 왜건 일반", category: "유모차", price: 85000, description: "쌍둥이 유모차 또는 왜건 일반형 케어", order: 5, isFeatured: false },
  { title: "왜건 대형 / 고급 가족형", category: "유모차", price: 100000, description: "대형 왜건 또는 고급 가족형 제품 케어", order: 6, isFeatured: false },
  { title: "시트, 햇빛가리개", category: "옵션", price: 5000, description: "보호매트, 커버류, 가방, 우산 포함", order: 7, isFeatured: false },
  { title: "풋머프 / 위머 / 방한커버", category: "옵션", price: 10000, description: "쌍둥이 또는 왜건 커버류 포함", order: 8, isFeatured: false },
  { title: "베시넷", category: "옵션", price: 20000, description: "베시넷 단품 케어", order: 9, isFeatured: false },
  { title: "아기띠", category: "옵션", price: 35000, description: "아기띠 단품 케어", order: 10, isFeatured: false },
];

export const defaultBranches: Branch[] = [
  {
    name: "포베베 충남점",
    region: "충남",
    serviceArea: "충남 주요 지역 상담",
    address: "충남 주소 입력",
    phone: "010-0000-0000",
    operatingHours: "평일 10:00-18:00",
    naverMapUrl: "https://map.naver.com/",
    kakaoMapUrl: "https://map.kakao.com/",
    kakaoUrl: "https://pf.kakao.com/",
    blogUrl: "https://blog.naver.com/",
    bookingUrl: "/branches",
    description: "방문 및 예약 가능 여부는 지점 상담으로 확인해주세요.",
    order: 1,
    isActive: true,
  },
  {
    name: "포베베 인천점",
    region: "인천",
    serviceArea: "인천 주요 지역 상담",
    address: "인천 주소 입력",
    phone: "010-0000-0000",
    operatingHours: "평일 10:00-18:00",
    naverMapUrl: "https://map.naver.com/",
    kakaoMapUrl: "https://map.kakao.com/",
    kakaoUrl: "https://pf.kakao.com/",
    blogUrl: "https://blog.naver.com/",
    bookingUrl: "/branches",
    description: "제품 사진을 보내주시면 상담이 더 정확합니다.",
    order: 2,
    isActive: true,
  },
];

export const defaultCases: CleaningCase[] = [
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

export const defaultTestimonials: Testimonial[] = [
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

export const defaultFaqs: FaqItem[] = [
  { question: "세탁 기간은 얼마나 걸리나요?", answer: "지점 일정과 제품 상태에 따라 달라집니다. 예약 상담 시 예상 일정을 안내드립니다.", category: "예약", order: 1, isFeatured: true },
  { question: "직접 방문해야 하나요?", answer: "지점별 운영 방식이 다를 수 있습니다. 가까운 지점에 방문, 픽업 가능 여부를 문의해주세요.", category: "예약", order: 2, isFeatured: true },
  { question: "모든 제품이 세탁 가능한가요?", answer: "제품 구조, 소재, 노후 상태에 따라 진행이 어려울 수 있습니다. 상담 시 사진을 보내주시면 확인이 빠릅니다.", category: "서비스", order: 3, isFeatured: true },
  { question: "오래된 얼룩도 제거되나요?", answer: "오래된 얼룩은 소재에 스며들어 결과가 달라질 수 있습니다. 무리한 세척으로 제품을 손상시키지 않는 범위에서 진행합니다.", category: "서비스", order: 4, isFeatured: true },
  { question: "고가 유모차도 맡길 수 있나요?", answer: "가능 여부와 주의사항을 먼저 확인합니다. 브랜드와 모델명, 제품 사진을 상담 시 알려주세요.", category: "서비스", order: 5, isFeatured: true },
  { question: "세탁 후 바로 사용할 수 있나요?", answer: "건조와 최종 검수 후 전달드립니다. 수령 후에는 지점 안내에 따라 상태를 확인하고 사용해주세요.", category: "이용", order: 6, isFeatured: true },
];
