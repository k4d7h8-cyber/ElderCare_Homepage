import type { AboutOverview } from "@/types/home";

import { collections, getDocumentRecord, readArray, readString } from "@/lib/firestore";

const fallbackAboutOverview: AboutOverview = {
  title: "Trusted daily living support",
  description: "Experienced staff and structured care programs support a stable daily routine.",
  stats: [
    { label: "Care team", value: "24/7 on site" },
    { label: "Daily support", value: "Personalized plans" },
    { label: "Family updates", value: "Regular reports" },
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
