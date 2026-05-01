import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/Header";
import { NoticeBanner } from "@/components/common/NoticeBanner";
import { SubPageLayout } from "@/components/common/SubPageLayout";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { NoticeDetailPageContent } from "@/components/subpages/NoticeDetailPageContent";
import { getNoticeDetailData, getTopBannerNotice } from "@/lib/firestore/notices";
import { getSiteConfig } from "@/lib/firestore/siteConfig";
import type { SubPageNavItem } from "@/types/subpage";

type NoticeDetailPageProps = {
  params: {
    id: string;
  };
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: NoticeDetailPageProps): Promise<Metadata> {
  const notice = await getNoticeDetailData(params.id);

  return {
    title: notice ? `${notice.title} | 공지사항` : "공지사항 상세 | 안안 요양원",
    description: notice?.summary ?? "요양원 공지사항 상세 내용입니다.",
  };
}

const navItems: SubPageNavItem[] = [{ label: "공지사항 목록", targetId: "notice-detail" }];

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const [topNotice, siteConfig, notice] = await Promise.all([
    getTopBannerNotice(),
    getSiteConfig(),
    getNoticeDetailData(params.id),
  ]);

  if (!notice) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <NoticeBanner notice={topNotice} />
      <Header />
      <SubPageLayout
        label="Notice"
        title="공지사항"
        description="공지사항 상세 내용을 확인하실 수 있습니다."
        navItems={navItems}
      >
        <section id="notice-detail" className="scroll-mt-28">
          <NoticeDetailPageContent notice={notice} />
        </section>
      </SubPageLayout>
      <ContactCTASection siteConfig={siteConfig} />
    </main>
  );
}
