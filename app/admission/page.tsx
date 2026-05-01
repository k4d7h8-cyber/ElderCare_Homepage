import type { Metadata } from "next";

import { Header } from "@/components/common/Header";
import { NoticeBanner } from "@/components/common/NoticeBanner";
import { SubPageLayout } from "@/components/common/SubPageLayout";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { AdmissionPageContent } from "@/components/subpages/AdmissionPageContent";
import { getAdmissionPageData } from "@/lib/firestore/admission";
import { getTopBannerNotice } from "@/lib/firestore/notices";
import { getSiteConfig } from "@/lib/firestore/siteConfig";
import type { SubPageNavItem } from "@/types/subpage";

export const revalidate = 300;

export function generateMetadata(): Metadata {
  return {
    title: "입소안내 | 안안 요양원",
    description: "입소 대상, 입소 절차, 준비 서류와 비용 안내를 확인하세요.",
  };
}

const navItems: SubPageNavItem[] = [
  { label: "입소 대상", targetId: "targets" },
  { label: "입소 절차", targetId: "process" },
  { label: "준비 서류", targetId: "documents" },
  { label: "비용 안내", targetId: "costs" },
];

export default async function AdmissionPage() {
  const [notice, siteConfig, admissionPage] = await Promise.all([
    getTopBannerNotice(),
    getSiteConfig(),
    getAdmissionPageData(),
  ]);

  return (
    <main className="min-h-screen">
      <NoticeBanner notice={notice} />
      <Header />
      <SubPageLayout
        label="Admission"
        title="입소안내"
        description="입소 상담부터 서류 준비, 비용 안내까지 보호자께 필요한 정보를 차근차근 안내합니다."
        navItems={navItems}
      >
        <AdmissionPageContent data={admissionPage} />
      </SubPageLayout>
      <ContactCTASection siteConfig={siteConfig} />
    </main>
  );
}
