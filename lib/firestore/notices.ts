import { getDocs, limit, orderBy, query, where } from "firebase/firestore";

import type { Notice } from "@/types/home";
import { collections, isRecord, readBoolean, readString } from "@/lib/firestore";

const fallbackTopBannerNotice: Notice = {
  id: "fallback-top-banner",
  title: "Consultations are available by reservation.",
  summary: "Please call or leave an inquiry to book a visit.",
  href: "/contact",
  publishedAt: "",
  isTopBanner: true,
  isVisible: true,
};

export async function getTopBannerNotice(): Promise<Notice> {
  try {
    const noticesQuery = query(
      collections.notices,
      where("isTopBanner", "==", true),
      where("isVisible", "==", true),
      orderBy("publishedAt", "desc"),
      limit(1),
    );

    const snapshot = await getDocs(noticesQuery);
    const document = snapshot.docs[0];

    if (!document) {
      return fallbackTopBannerNotice;
    }

    const data = document.data();

    if (!isRecord(data)) {
      return fallbackTopBannerNotice;
    }

    return {
      id: document.id,
      title: readString(data.title, fallbackTopBannerNotice.title),
      summary: readString(data.summary, fallbackTopBannerNotice.summary),
      href: readString(data.href, fallbackTopBannerNotice.href),
      publishedAt: readString(data.publishedAt),
      isTopBanner: readBoolean(data.isTopBanner, true),
      isVisible: readBoolean(data.isVisible, true),
    };
  } catch {
    return fallbackTopBannerNotice;
  }
}
