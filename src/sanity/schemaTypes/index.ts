import { beforeAfterCase } from "./beforeAfterCase";
import { branch } from "./branch";
import { cleaningCase } from "./cleaningCase";
import { faq } from "./faq";
import { homePage } from "./homePage";
import { homePopup } from "./homePopup";
import { legalPage } from "./legalPage";
import { navigation } from "./navigation";
import {
  branchesPage,
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
import { youtubeVideo } from "./youtubeVideo";

export const schemaTypes = [
  siteSettings,
  homePage,
  homePopup,
  service,
  processStep,
  pricingItem,
  branch,
  servicesPage,
  processPage,
  pricingPage,
  branchesPage,
  casesPage,
  faqPage,
  whyForbebePage,
  franchisePage,
  partnershipPage,
  beforeAfterCase,
  cleaningCase,
  testimonial,
  youtubeVideo,
  faq,
  navigation,
  legalPage,
];
