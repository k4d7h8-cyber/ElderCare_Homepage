import type { Metadata } from "next";

import { Header } from "@/components/common/Header";
import { NoticeBanner } from "@/components/common/NoticeBanner";
import { SubPageLayout } from "@/components/common/SubPageLayout";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { ServicesPageContent } from "@/components/subpages/ServicesPageContent";
import { getTopBannerNotice } from "@/lib/firestore/notices";
import { getServicesPageData } from "@/lib/firestore/services";
import { getSiteConfig } from "@/lib/firestore/siteConfig";
import type { SubPageNavItem } from "@/types/subpage";

export const revalidate = 300;

export function generateMetadata(): Metadata {
  return {
    title: "주요서비스 | 안안 요양원",
    description: "일상생활 지원, 건강관리, 식사 및 위생관리, 정서지원, 보호자 소통 서비스를 안내합니다.",
  };
}

const navItems: SubPageNavItem[] = [
  { label: "일상생활 지원", targetId: "daily-life" },
  { label: "건강관리", targetId: "health-care" },
  { label: "식사 및 위생관리", targetId: "meal-hygiene" },
  { label: "여가 및 정서지원", targetId: "emotional-support" },
  { label: "보호자 소통", targetId: "family-communication" },
];

export default async function ServicesPage() {
  const [notice, siteConfig, services] = await Promise.all([
    getTopBannerNotice(),
    getSiteConfig(),
    getServicesPageData(),
  ]);

  return (
    <main className="min-h-screen">
      <NoticeBanner notice={notice} />
      <Header />
      <SubPageLayout
        label="Services"
        title="주요서비스"
        description="어르신의 생활, 건강, 식사, 정서, 보호자 소통까지 균형 있게 지원합니다."
        navItems={navItems}
      >
        <ServicesPageContent services={services} />
      </SubPageLayout>
      <ContactCTASection siteConfig={siteConfig} />
    </main>
  );
}
