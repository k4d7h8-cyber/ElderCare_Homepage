import type { AboutOverview } from "@/types/home";

import { collections, getDocumentRecord, readArray, readString } from "@/lib/firestore";

const fallbackAboutOverview: AboutOverview = {
  title: "30년 경력의 전문 요양 시설",
  description:
    "어르신 한 분 한 분을 가족처럼 모십니다. 숙련된 요양보호사와 의료진이 24시간 함께합니다.",
  stats: [
    { label: "입소 정원", value: "200+" },
    { label: "전문 케어", value: "24시간" },
  ],
};

export async function getAboutOverview(): Promise<AboutOverview> {
  const data = await getDocumentRecord(collections.homeContent, "trust");

  if (!data) {
    return fallbackAboutOverview;
  }

  const stats = readArray(data.stats)
    .map((item) => ({
      label: readString(item.label),
      value: readString(item.value),
    }))
    .filter((item) => item.label.length > 0 && item.value.length > 0);

  return {
    title: readString(data.title, fallbackAboutOverview.title),
    description: readString(data.description, fallbackAboutOverview.description),
    stats: stats.length > 0 ? stats : fallbackAboutOverview.stats,
  };
}
