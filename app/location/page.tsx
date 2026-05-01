import type { Metadata } from "next";

import { Header } from "@/components/common/Header";
import { NoticeBanner } from "@/components/common/NoticeBanner";
import { SubPageLayout } from "@/components/common/SubPageLayout";
import { LocationPageContent } from "@/components/subpages/LocationPageContent";
import { getLocationPageData } from "@/lib/firestore/location";
import { getTopBannerNotice } from "@/lib/firestore/notices";
import type { SubPageNavItem } from "@/types/subpage";

export const revalidate = 300;

export function generateMetadata(): Metadata {
  return {
    title: "오시는 길 | 안안 요양원",
    description: "요양원 주소, 지도와 주차 안내를 확인하세요.",
  };
}

const navItems: SubPageNavItem[] = [
  { label: "주소", targetId: "address" },
  { label: "지도", targetId: "map" },
  { label: "주차 안내", targetId: "parking" },
];

export default async function LocationPage() {
  const [notice, location] = await Promise.all([
    getTopBannerNotice(),
    getLocationPageData(),
  ]);

  return (
    <main className="min-h-screen">
      <NoticeBanner notice={notice} />
      <Header />
      <SubPageLayout
        label="Location"
        title="오시는 길"
        description="방문 전 주소와 주차 안내를 확인해주세요."
        navItems={navItems}
      >
        <LocationPageContent data={location} />
      </SubPageLayout>
    </main>
  );
}
