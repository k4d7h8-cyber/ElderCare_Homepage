import type { Metadata } from "next";

import { Header } from "@/components/common/Header";
import { NoticeBanner } from "@/components/common/NoticeBanner";
import { SubPageLayout } from "@/components/common/SubPageLayout";
import { AboutPageContent } from "@/components/subpages/AboutPageContent";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { getAboutPageData } from "@/lib/firestore/about";
import { getTopBannerNotice } from "@/lib/firestore/notices";
import { getSiteConfig } from "@/lib/firestore/siteConfig";
import type { SubPageNavItem } from "@/types/subpage";

export const revalidate = 300;

export function generateMetadata(): Metadata {
  return {
    title: "기관 소개 | 안안 요양원",
    description: "인사말, 연혁, 시설현황, 조직도와 기관 특장점을 안내합니다.",
  };
}

const navItems: SubPageNavItem[] = [
  { label: "인사말", targetId: "greeting" },
  { label: "연혁", targetId: "history" },
  { label: "시설현황", targetId: "facility-status" },
  { label: "조직도 및 전문 인력", targetId: "organization" },
  { label: "기관 특장점", targetId: "strengths" },
];

export default async function AboutPage() {
  const [notice, siteConfig, aboutPage] = await Promise.all([
    getTopBannerNotice(),
    getSiteConfig(),
    getAboutPageData(),
  ]);

  return (
    <main className="min-h-screen">
      <NoticeBanner notice={notice} />
      <Header />
      <SubPageLayout
        label="About"
        title="기관 소개"
        description="어르신을 존중하는 돌봄 철학과 쾌적한 생활 환경, 전문 인력의 케어 체계를 소개합니다."
        navItems={navItems}
      >
        <AboutPageContent data={aboutPage} />
      </SubPageLayout>
      <ContactCTASection siteConfig={siteConfig} />
    </main>
  );
}
