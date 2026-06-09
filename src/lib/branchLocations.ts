export type BranchRegion = "본사·충남" | "인천" | "경기도 북부" | "경기도 남부";

export type BranchLocation = {
  id: string;
  region: BranchRegion;
  name: string;
  phone: string;
  description: string;
  address?: string;
  naverBookingUrl?: string;
  naverMapUrl?: string;
  isHeadOffice?: boolean;
};

export const branchRegionOrder: BranchRegion[] = ["본사·충남", "인천", "경기도 북부", "경기도 남부"];

export const branchFilterOptions = ["전체", ...branchRegionOrder] as const;

export type BranchFilter = (typeof branchFilterOptions)[number];

export const branchLocations: BranchLocation[] = [
  {
    id: "head-office",
    region: "본사·충남",
    name: "본사",
    phone: "010-4445-4880",
    description: "포베베 대표번호로 서비스와 지점 문의 안내 가능",
    isHeadOffice: true,
  },
  {
    id: "cheonan-asan-1",
    region: "본사·충남",
    name: "천안아산 1호점",
    phone: "010-6492-4880",
    description: "천안·아산 인근 카시트·유모차 세탁 상담 가능",
  },
  {
    id: "cheonan-asan-2",
    region: "본사·충남",
    name: "천안아산 2호점",
    phone: "010-8673-0480",
    description: "천안·아산 인근 카시트·유모차 세탁 상담 가능",
  },
  {
    id: "incheon-yeongjong",
    region: "인천",
    name: "인천 영종",
    phone: "010-5454-4880",
    description: "인천 영종 인근 카시트·유모차 세탁 상담 가능",
  },
  {
    id: "incheon-songdo",
    region: "인천",
    name: "인천 송도",
    phone: "010-4460-4880",
    description: "인천 송도 인근 카시트·유모차 세탁 상담 가능",
  },
  {
    id: "incheon-bupyeong",
    region: "인천",
    name: "인천 부평",
    phone: "010-4965-7451",
    description: "인천 부평 인근 카시트·유모차 세탁 상담 가능",
  },
  {
    id: "incheon-geomdan",
    region: "인천",
    name: "인천 검단",
    phone: "010-7789-7857",
    description: "인천 검단 인근 카시트·유모차 세탁 상담 가능",
  },
  {
    id: "gimpo",
    region: "경기도 북부",
    name: "경기도 김포",
    phone: "010-4999-4880",
    description: "경기도 김포 인근 카시트·유모차 세탁 상담 가능",
  },
  {
    id: "ilsan",
    region: "경기도 북부",
    name: "경기도 일산",
    phone: "010-8612-6130",
    description: "경기도 일산 인근 카시트·유모차 세탁 상담 가능",
  },
  {
    id: "deogyang",
    region: "경기도 북부",
    name: "경기도 덕양",
    phone: "010-8643-4881",
    description: "경기도 덕양 인근 카시트·유모차 세탁 상담 가능",
  },
  {
    id: "gwanggyo-suji",
    region: "경기도 남부",
    name: "경기도 광교수지",
    phone: "010-5938-4880",
    description: "광교·수지 인근 카시트·유모차 세탁 상담 가능",
  },
];

export const primaryBranchPhone = branchLocations[0]?.phone;
