import type { SiteConfig } from "@/types/home";

import { collections, getDocumentRecord, readString } from "@/lib/firestore";

const fallbackSiteConfig: SiteConfig = {
  siteName: "편안한 요양원",
  siteDescription: "어르신의 편안한 일상을 함께합니다.",
  phone: "000-0000-0000",
  email: "hello@eldercare-homepage.com",
  address: "○○시 ○○구 ○○로 123",
  consultationHours: "평일 09:00-18:00",
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
