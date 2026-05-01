import { Header } from "@/components/common/Header";
import { NoticeBanner } from "@/components/common/NoticeBanner";
import { AboutSummarySection } from "@/components/home/AboutSummarySection";
import { AdmissionSummarySection } from "@/components/home/AdmissionSummarySection";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { GalleryPreviewSection } from "@/components/home/GalleryPreviewSection";
import { HomeHero } from "@/components/home/home-hero";
import { LocationSection } from "@/components/home/LocationSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { getAboutOverview } from "@/lib/firestore/about";
import { getAdmissionInfo } from "@/lib/firestore/admission";
import { getGalleryPreview } from "@/lib/firestore/gallery";
import { getLocationInfo } from "@/lib/firestore/location";
import { getTopBannerNotice } from "@/lib/firestore/notices";
import { getVisibleServices } from "@/lib/firestore/services";
import { getSiteConfig } from "@/lib/firestore/siteConfig";
import type { HomePageData } from "@/types/home";

export const revalidate = 300;

export default async function Home() {
  const [
    notice,
    siteConfig,
    about,
    admission,
    services,
    galleryItems,
    location,
  ] = await Promise.all([
    getTopBannerNotice(),
    getSiteConfig(),
    getAboutOverview(),
    getAdmissionInfo(),
    getVisibleServices(),
    getGalleryPreview(),
    getLocationInfo(),
  ]);

  const homeData: HomePageData = {
    hero: {
      title: "따뜻한 돌봄, 믿을 수 있는 공간",
      description: "어르신의 편안한 일상을 함께합니다",
      primaryActionLabel: "입소 상담 신청",
      secondaryActionLabel: "시설 둘러보기",
      backgroundImageUrl: "",
    },
    highlights: [
      {
        id: "care",
        title: "24/7 Professional Care",
        description: "Dedicated staff monitor each resident closely throughout the day.",
      },
      {
        id: "meal",
        title: "Personalized Meal Planning",
        description: "Balanced meals are planned around health conditions and preferences.",
      },
      {
        id: "program",
        title: "Rehab and Activity Programs",
        description: "Physical and emotional support programs help maintain an active routine.",
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <NoticeBanner notice={notice} />
      <Header />
      <HomeHero data={homeData} />
      <AboutSummarySection about={about} />
      <AdmissionSummarySection admission={admission} />
      <ServicesSection services={services} />
      <GalleryPreviewSection galleryItems={galleryItems} />
      <LocationSection location={location} />
      <ContactCTASection siteConfig={siteConfig} />
    </main>
  );
}
