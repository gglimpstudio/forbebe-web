import { groq } from "next-sanity";

import {
  defaultBranches,
  defaultCases,
  defaultFaqs,
  defaultHero,
  defaultNavigation,
  defaultPricingItems,
  defaultProcessSteps,
  defaultServices,
  defaultSettings,
  defaultTestimonials,
} from "@/lib/constants";
import { fetchSanity } from "@/lib/sanity/client";
import type {
  Branch,
  BranchesPage,
  CasesPage,
  CleaningCase,
  FaqPage,
  FaqItem,
  FranchisePage,
  HomeData,
  HomePage,
  NavigationItem,
  PartnershipPage,
  PricingPage,
  PricingItem,
  ProcessPage,
  ProcessStep,
  Service,
  ServicesPage,
  SiteSettings,
  Testimonial,
  WhyForbebePage,
} from "@/types";

const imageFields = `{
  ...,
  "alt": alt,
  asset->
}`;

const homeCardFields = `{
  title,
  description,
  icon,
  image ${imageFields}
}`;

const pageFields = `{
  ...,
  hero {
    eyebrow,
    title,
    description,
    image ${imageFields}
  },
  priceImage ${imageFields},
  strengths[] ${homeCardFields},
  benefits[] ${homeCardFields},
  partnershipTypes[] ${homeCardFields}
}`;

const homePageFields = `{
  hero {
    eyebrow,
    title,
    highlightText,
    description,
    backgroundImage ${imageFields},
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    isVisible
  },
  intro {
    sectionLabel,
    title,
    description,
    image ${imageFields},
    items[] ${homeCardFields},
    isVisible
  },
  necessity {
    sectionLabel,
    title,
    description,
    cards[] ${homeCardFields},
    signalsLabel,
    signalsTitle,
    signals,
    ctaLabel,
    ctaHref,
    isVisible
  },
  slogan {
    sectionLabel,
    slogans[] {
      text,
      subText
    },
    displayType,
    backgroundImage ${imageFields},
    isVisible
  },
  beforeAfter {
    sectionLabel,
    title,
    description,
    items[] {
      beforeImage ${imageFields},
      afterImage ${imageFields},
      title,
      description
    },
    ctaLabel,
    ctaHref,
    isVisible
  },
  processSummary {
    sectionLabel,
    title,
    description,
    steps[] {
      stepNumber,
      title,
      description,
      image ${imageFields}
    },
    note,
    ctaLabel,
    ctaHref,
    isVisible
  },
  finalCta {
    label,
    title,
    description,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    tertiaryCtaLabel,
    tertiaryCtaHref,
    note,
    backgroundImage ${imageFields},
    isVisible
  },
  floatingCta {
    isVisible,
    emptyMessage,
    actions[] {
      actionType,
      iconImage ${imageFields},
      order,
      isVisible
    }
  },
  footer {
    brandName,
    description,
    businessInfo,
    links[] {
      label,
      href
    },
    copyright
  }
}`;

export const homeQuery = groq`{
  "homePage": *[_type == "homePage"][0] ${homePageFields},
  "settings": *[_type == "siteSettings"][0],
  "navigation": *[_type == "navigation"] | order(order asc),
  "services": *[_type == "service"] | order(order asc){..., "slug": slug.current, image ${imageFields}},
  "processSteps": *[_type == "processStep"] | order(order asc){..., image ${imageFields}},
  "pricingItems": *[_type == "pricingItem"] | order(order asc),
  "branches": *[_type == "branch" && isActive != false] | order(order asc),
  "cases": *[_type in ["cleaningCase", "beforeAfterCase"]] | order(publishedAt desc, _createdAt desc){
    ..., "slug": slug.current, beforeImage ${imageFields}, afterImage ${imageFields}, branch->
  },
  "testimonials": *[_type == "testimonial"] | order(order asc),
  "faqs": *[_type == "faq"] | order(order asc)
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){..., "slug": slug.current, image ${imageFields}}`;
export const navigationQuery = groq`*[_type == "navigation"] | order(order asc)`;
export const processStepsQuery = groq`*[_type == "processStep"] | order(order asc){..., image ${imageFields}}`;
export const pricingItemsQuery = groq`*[_type == "pricingItem"] | order(order asc)`;
export const branchesQuery = groq`*[_type == "branch" && isActive != false] | order(order asc)`;
export const casesQuery = groq`*[_type in ["cleaningCase", "beforeAfterCase"]] | order(publishedAt desc, _createdAt desc){
  ..., "slug": slug.current, beforeImage ${imageFields}, afterImage ${imageFields}, branch->
}`;
export const faqsQuery = groq`*[_type == "faq"] | order(order asc)`;
export const settingsQuery = groq`{
  "settings": *[_type == "siteSettings"][0],
  "homeFooter": *[_type == "homePage"][0].footer
}`;
export const homePageQuery = groq`*[_type == "homePage"][0] ${homePageFields}`;
export const servicesPageQuery = groq`*[_type == "servicesPage"][0] ${pageFields}`;
export const processPageQuery = groq`*[_type == "processPage"][0] ${pageFields}`;
export const pricingPageQuery = groq`*[_type == "pricingPage"][0] ${pageFields}`;
export const branchesPageQuery = groq`*[_type == "branchesPage"][0] ${pageFields}`;
export const casesPageQuery = groq`*[_type == "casesPage"][0] ${pageFields}`;
export const faqPageQuery = groq`*[_type == "faqPage"][0] ${pageFields}`;
export const whyForbebePageQuery = groq`*[_type == "whyForbebePage"][0] ${pageFields}`;
export const franchisePageQuery = groq`*[_type == "franchisePage"][0] ${pageFields}`;
export const partnershipPageQuery = groq`*[_type == "partnershipPage"][0] ${pageFields}`;

function withFallback<T>(data: T[] | null | undefined, fallback: T[]) {
  return data && data.length > 0 ? data : fallback;
}

export async function getSiteSettings() {
  const data = await fetchSanity<{ settings?: SiteSettings; homeFooter?: SiteSettings["homeFooter"] }>(settingsQuery);
  return { ...(data?.settings || defaultSettings), homeFooter: data?.homeFooter };
}

export async function getHomeData(): Promise<HomeData> {
  const data = await fetchSanity<Partial<HomeData>>(homeQuery);

  return {
    homePage: data?.homePage || null,
    settings: data?.settings || defaultSettings,
    hero: defaultHero,
    navigation: withFallback<NavigationItem>(data?.navigation, defaultNavigation),
    services: withFallback<Service>(data?.services, defaultServices),
    processSteps: withFallback<ProcessStep>(data?.processSteps, defaultProcessSteps),
    pricingItems: withFallback<PricingItem>(data?.pricingItems, defaultPricingItems),
    branches: withFallback<Branch>(data?.branches, defaultBranches),
    cases: withFallback<CleaningCase>(data?.cases, defaultCases),
    testimonials: withFallback<Testimonial>(data?.testimonials, defaultTestimonials),
    faqs: withFallback<FaqItem>(data?.faqs, defaultFaqs),
  };
}

export async function getHomePage() {
  return fetchSanity<HomePage>(homePageQuery);
}

export async function getServicesPage() {
  return fetchSanity<ServicesPage>(servicesPageQuery);
}

export async function getProcessPage() {
  return fetchSanity<ProcessPage>(processPageQuery);
}

export async function getPricingPage() {
  return fetchSanity<PricingPage>(pricingPageQuery);
}

export async function getBranchesPage() {
  return fetchSanity<BranchesPage>(branchesPageQuery);
}

export async function getCasesPage() {
  return fetchSanity<CasesPage>(casesPageQuery);
}

export async function getFaqPage() {
  return fetchSanity<FaqPage>(faqPageQuery);
}

export async function getWhyForbebePage() {
  return fetchSanity<WhyForbebePage>(whyForbebePageQuery);
}

export async function getFranchisePage() {
  return fetchSanity<FranchisePage>(franchisePageQuery);
}

export async function getPartnershipPage() {
  return fetchSanity<PartnershipPage>(partnershipPageQuery);
}

export async function getNavigation() {
  return withFallback<NavigationItem>(await fetchSanity<NavigationItem[]>(navigationQuery), defaultNavigation);
}

export async function getServices() {
  return withFallback<Service>(await fetchSanity<Service[]>(servicesQuery), defaultServices);
}

export async function getProcessSteps() {
  return withFallback<ProcessStep>(await fetchSanity<ProcessStep[]>(processStepsQuery), defaultProcessSteps);
}

export async function getPricingItems() {
  return withFallback<PricingItem>(await fetchSanity<PricingItem[]>(pricingItemsQuery), defaultPricingItems);
}

export async function getBranches() {
  return withFallback<Branch>(await fetchSanity<Branch[]>(branchesQuery), defaultBranches);
}

export async function getCases() {
  return withFallback<CleaningCase>(await fetchSanity<CleaningCase[]>(casesQuery), defaultCases);
}

export async function getFaqs() {
  return withFallback<FaqItem>(await fetchSanity<FaqItem[]>(faqsQuery), defaultFaqs);
}
