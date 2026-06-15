import { beforeAfterCase } from "./beforeAfterCase";
import { branch } from "./branch";
import { cleaningCase } from "./cleaningCase";
import { faq } from "./faq";
import { homePage } from "./homePage";
import { legalPage } from "./legalPage";
import { navigation } from "./navigation";
import {
  casesPage,
  faqPage,
  franchisePage,
  partnershipPage,
  pricingPage,
  processPage,
  servicesPage,
  whyForbebePage,
} from "./pageDocuments";
import { pricingItem } from "./pricingItem";
import { processStep } from "./processStep";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

export const schemaTypes = [
  siteSettings,
  homePage,
  service,
  processStep,
  pricingItem,
  branch,
  servicesPage,
  processPage,
  pricingPage,
  casesPage,
  faqPage,
  whyForbebePage,
  franchisePage,
  partnershipPage,
  beforeAfterCase,
  cleaningCase,
  testimonial,
  faq,
  navigation,
  legalPage,
];
