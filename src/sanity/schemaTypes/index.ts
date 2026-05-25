import { beforeAfterCase } from "./beforeAfterCase";
import { branch } from "./branch";
import { cleaningCase } from "./cleaningCase";
import { faq } from "./faq";
import { homePage } from "./homePage";
import { legalPage } from "./legalPage";
import { navigation } from "./navigation";
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
  beforeAfterCase,
  cleaningCase,
  testimonial,
  faq,
  navigation,
  legalPage,
];
