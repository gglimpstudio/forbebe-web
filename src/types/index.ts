export type SanityImage = {
  asset?: {
    _ref?: string;
    url?: string;
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
  ctaLabel?: string;
  ctaHref?: string;
  isVisible?: boolean;
};

export type SloganItem = {
  text?: string;
  subText?: string;
};

export type SloganSection = {
  sectionLabel?: string;
  slogans?: SloganItem[];
  displayType?: "fade" | "slide" | "static";
  backgroundImage?: SanityImage;
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
  ctaLabel?: string;
  ctaHref?: string;
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
  tertiaryCtaLabel?: string;
  tertiaryCtaHref?: string;
  note?: string;
  backgroundImage?: SanityImage;
  isVisible?: boolean;
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
  links?: Cta[];
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
