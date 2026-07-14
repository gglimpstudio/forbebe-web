export type SanityImage = {
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
  alt?: string;
};

export type Cta = {
  label?: string;
  href?: string;
};

export type SiteSettings = {
  title: string;
  description?: string;
  logo?: SanityImage;
  headerLogo?: SanityImage;
  footerLogo?: SanityImage;
  favicon?: SanityImage;
  ogImage?: SanityImage;
  phone?: string;
  kakaoUrl?: string;
  blogUrl?: string;
  instagramUrl?: string;
  businessInfo?: string;
  footerText?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  homeFooter?: FooterData;
};

export type Hero = {
  eyebrow?: string;
  title: string;
  highlightText?: string;
  description: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image?: SanityImage;
  backgroundImage?: SanityImage;
  isVisible?: boolean;
};

export type HomeCard = {
  title?: string;
  description?: string;
  image?: SanityImage;
  icon?: string;
};

export type IntroSection = {
  sectionLabel?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
  items?: HomeCard[];
  isVisible?: boolean;
};

export type NecessitySection = {
  sectionLabel?: string;
  title?: string;
  description?: string;
  cards?: HomeCard[];
  signalsLabel?: string;
  signalsTitle?: string;
  signals?: string[];
  isVisible?: boolean;
};

export type SloganItem = {
  text?: string;
  subText?: string;
};

export type SloganSection = {
  sectionLabel?: string;
  slogans?: SloganItem[];
  isVisible?: boolean;
};

export type BeforeAfterItem = {
  beforeImage?: SanityImage;
  afterImage?: SanityImage;
  title?: string;
  description?: string;
};

export type BeforeAfterSection = {
  sectionLabel?: string;
  title?: string;
  description?: string;
  items?: BeforeAfterItem[];
  isVisible?: boolean;
};

export type ProcessSummaryStep = {
  stepNumber?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
};

export type ProcessSummarySection = {
  sectionLabel?: string;
  title?: string;
  description?: string;
  steps?: ProcessSummaryStep[];
  note?: string;
  ctaLabel?: string;
  ctaHref?: string;
  isVisible?: boolean;
};

export type FinalCtaSection = {
  label?: string;
  title?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  note?: string;
  isVisible?: boolean;
};

export type PageHero = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: SanityImage;
};

export type ContentCard = {
  title: string;
  description?: string;
  icon?: string;
  image?: SanityImage;
};

export type InfoCard = {
  title: string;
  description?: string;
};

export type PageSection = {
  isVisible?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export type PageCta = Pick<
  FinalCtaSection,
  "isVisible" | "title" | "description" | "primaryCtaLabel" | "primaryCtaHref" | "secondaryCtaLabel" | "secondaryCtaHref"
>;

export type ServicesPage = {
  hero?: PageHero;
  reservationNote?: {
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  finalCta?: PageCta;
};

export type ProcessPage = {
  hero?: PageHero;
  coreCareItems?: ContentCard[];
  detailSection?: PageSection;
  finalCta?: PageCta;
};

export type PricingPage = {
  hero?: PageHero;
  priceImage?: SanityImage;
  note?: string;
};

export type BranchesPage = {
  hero?: PageHero;
  summary?: {
    label?: string;
    title?: string;
    description?: string;
  };
  finder?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };
  finalCta?: PageCta;
};

export type CasesPage = {
  hero?: PageHero;
  finalCta?: PageCta;
};

export type FaqPage = {
  hero?: PageHero;
  finalCta?: PageCta;
};

export type WhyForbebePage = {
  hero?: PageHero;
  strengths?: ContentCard[];
  branchCta?: {
    title?: string;
    description?: string;
    primaryCtaLabel?: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  finalCta?: PageCta;
};

export type FranchisePage = {
  hero?: PageHero;
  benefits?: ContentCard[];
  notice?: InfoCard;
  formTitle?: string;
};

export type PartnershipPage = {
  hero?: PageHero;
  partnershipTypes?: ContentCard[];
  formTitle?: string;
};

export type FloatingCtaActionType = "phone" | "booking" | "kakao";

export type FloatingCtaAction = {
  actionType?: FloatingCtaActionType;
  iconImage?: SanityImage;
  order?: number;
  isVisible?: boolean;
};

export type FloatingCtaSettings = {
  isVisible?: boolean;
  emptyMessage?: string;
  actions?: FloatingCtaAction[];
};

export type FooterBusinessInfo = {
  companyName?: string;
  representative?: string;
  businessNumber?: string;
  address?: string;
  phone?: string;
  email?: string;
};

export type FooterData = {
  brandName?: string;
  description?: string;
  businessInfo?: FooterBusinessInfo;
  copyright?: string;
};

export type HomePage = {
  hero?: Hero;
  intro?: IntroSection;
  necessity?: NecessitySection;
  slogan?: SloganSection;
  beforeAfter?: BeforeAfterSection;
  processSummary?: ProcessSummarySection;
  finalCta?: FinalCtaSection;
  floatingCta?: FloatingCtaSettings;
  footer?: FooterData;
};

export type Service = {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  image?: SanityImage;
  icon?: string;
  order?: number;
  isFeatured?: boolean;
  carePoints?: string[];
  cautions?: string[];
};

export type ProcessStep = {
  title: string;
  description?: string;
  image?: SanityImage;
  order?: number;
};

export type PricingItem = {
  title: string;
  category?: string;
  price?: number;
  priceText?: string;
  description?: string;
  order?: number;
  cautions?: string[];
  isFeatured?: boolean;
};

export type Branch = {
  name: string;
  region: string;
  serviceArea?: string;
  address?: string;
  phone?: string;
  operatingHours?: string;
  naverMapUrl?: string;
  naverBookingUrl?: string;
  kakaoMapUrl?: string;
  kakaoUrl?: string;
  blogUrl?: string;
  bookingUrl?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
};

export type CleaningCase = {
  title: string;
  slug: string;
  itemType?: string;
  branch?: Branch;
  beforeImage?: SanityImage;
  afterImage?: SanityImage;
  problemType?: string;
  description?: string;
  publishedAt?: string;
  isFeatured?: boolean;
};

export type Testimonial = {
  content: string;
  customerName?: string;
  itemType?: string;
  branchName?: string;
  order?: number;
  isFeatured?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
  category?: string;
  order?: number;
  isFeatured?: boolean;
};

export type NavigationItem = {
  title: string;
  href: string;
  order?: number;
  isExternal?: boolean;
};

export type HomeData = {
  homePage?: HomePage | null;
  settings: SiteSettings;
  hero: Hero;
  navigation: NavigationItem[];
  services: Service[];
  processSteps: ProcessStep[];
  pricingItems: PricingItem[];
  branches: Branch[];
  cases: CleaningCase[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
};
