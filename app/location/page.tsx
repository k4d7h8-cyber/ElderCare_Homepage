import type { Metadata } from "next";

import { Header } from "@/components/common/Header";
import { NoticeBanner } from "@/components/common/NoticeBanner";
import { SubPageLayout } from "@/components/common/SubPageLayout";
import NaverMap from "@/components/location/NaverMap";
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
        <>
          <section id="address" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Address</p>
            <h2 className="mt-3 text-2xl font-bold text-textMain">주소</h2>
            <div className="mt-5 rounded-2xl bg-primary/5 p-5">
              <p className="text-lg font-bold text-textMain">{location.address}</p>
              {location.detailAddress ? (
                <p className="mt-2 text-sm leading-6 text-textSub">{location.detailAddress}</p>
              ) : null}
            </div>
          </section>

          <section id="map" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Map</p>
            <h2 className="mt-3 text-2xl font-bold text-textMain">지도</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-surface">
              <NaverMap />
            </div>
          </section>

          <section id="parking" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Parking</p>
            <h2 className="mt-3 text-2xl font-bold text-textMain">주차 안내</h2>
            <p className="mt-5 rounded-2xl bg-surface p-5 text-sm leading-6 text-textSub">
              {location.parking}
            </p>
          </section>
        </>
      </SubPageLayout>
    </main>
  );
}
