import type { Metadata } from "next";

import { Header } from "@/components/common/Header";
import { NoticeBanner } from "@/components/common/NoticeBanner";
import { SubPageLayout } from "@/components/common/SubPageLayout";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { GalleryPageContent } from "@/components/subpages/GalleryPageContent";
import { getGalleryPageData } from "@/lib/firestore/gallery";
import { getTopBannerNotice } from "@/lib/firestore/notices";
import { getSiteConfig } from "@/lib/firestore/siteConfig";
import type { SubPageNavItem } from "@/types/subpage";

export const revalidate = 300;

export function generateMetadata(): Metadata {
  return {
    title: "포토 앨범 | 안안 요양원",
    description: "함께하는 일상, 프로그램, 행사와 시설 사진을 확인하세요.",
  };
}

const navItems: SubPageNavItem[] = [
  { label: "함께하는 일상", targetId: "daily" },
  { label: "신나는 프로그램", targetId: "program" },
  { label: "특별한 날들", targetId: "event" },
  { label: "우리의 보금자리", targetId: "facility" },
];

export default async function GalleryPage() {
  const [notice, siteConfig, galleryItems] = await Promise.all([
    getTopBannerNotice(),
    getSiteConfig(),
    getGalleryPageData(),
  ]);

  return (
    <main className="min-h-screen">
      <NoticeBanner notice={notice} />
      <Header />
      <SubPageLayout
        label="Gallery"
        title="포토 앨범"
        description="어르신의 일상과 프로그램, 특별한 날의 기록을 사진으로 전합니다."
        navItems={navItems}
      >
        <GalleryPageContent items={galleryItems} />
      </SubPageLayout>
      <ContactCTASection siteConfig={siteConfig} />
    </main>
  );
}
