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
  CleaningCase,
  FaqItem,
  HomeData,
  HomePage,
  NavigationItem,
  PricingItem,
  ProcessStep,
  Service,
  SiteSettings,
  Testimonial,
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
