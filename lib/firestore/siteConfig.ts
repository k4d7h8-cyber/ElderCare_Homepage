import type { SiteConfig } from "@/types/home";

import { collections, getDocumentRecord, readString } from "@/lib/firestore";

const fallbackSiteConfig: SiteConfig = {
  siteName: "Eldercare Home",
  siteDescription: "Starter site settings for an eldercare homepage.",
  phone: "02-0000-0000",
  email: "hello@eldercare-homepage.com",
  address: "100 Teheran-ro, Gangnam-gu, Seoul",
  consultationHours: "Mon-Fri 09:00-18:00",
};

export async function getSiteConfig(): Promise<SiteConfig> {
  const data = await getDocumentRecord(collections.siteConfig, "main");

  if (!data) {
    return fallbackSiteConfig;
  }

  return {
    siteName: readString(data.siteName, fallbackSiteConfig.siteName),
    siteDescription: readString(data.siteDescription, fallbackSiteConfig.siteDescription),
    phone: readString(data.phone, fallbackSiteConfig.phone),
    email: readString(data.email, fallbackSiteConfig.email),
    address: readString(data.address, fallbackSiteConfig.address),
    consultationHours: readString(data.consultationHours, fallbackSiteConfig.consultationHours),
  };
}
