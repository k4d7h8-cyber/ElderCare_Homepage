import type { Metadata } from "next";

import { Header } from "@/components/common/Header";
import { NoticeBanner } from "@/components/common/NoticeBanner";
import { SubPageLayout } from "@/components/common/SubPageLayout";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { NoticesListPageContent } from "@/components/subpages/NoticesListPageContent";
import { getNoticesPageData, getTopBannerNotice } from "@/lib/firestore/notices";
import { getSiteConfig } from "@/lib/firestore/siteConfig";
import type { SubPageNavItem } from "@/types/subpage";

export const revalidate = 300;

export function generateMetadata(): Metadata {
  return {
    title: "공지사항 | 안안 요양원",
    description: "요양원 공지사항과 운영 안내를 확인하세요.",
  };
}

const navItems: SubPageNavItem[] = [{ label: "공지사항", targetId: "notice-list" }];

export default async function NoticesPage() {
  const [notice, siteConfig, notices] = await Promise.all([
    getTopBannerNotice(),
    getSiteConfig(),
    getNoticesPageData(),
  ]);

  return (
    <main className="min-h-screen">
      <NoticeBanner notice={notice} />
      <Header />
      <SubPageLayout
        label="Notice"
        title="공지사항"
        description="보호자께 필요한 운영 소식과 안내사항을 빠르게 전해드립니다."
        navItems={navItems}
      >
        <NoticesListPageContent notices={notices} />
      </SubPageLayout>
      <ContactCTASection siteConfig={siteConfig} />
    </main>
  );
}
