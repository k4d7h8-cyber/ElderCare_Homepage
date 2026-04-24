import { HomeHero } from "@/components/home/home-hero";
import type { HomePageData } from "@/types/home";

export default function Home() {
  const homeData: HomePageData = {
    hero: {
      title: "Warm daily care your family can trust",
      description:
        "This starter homepage introduces nursing, lifestyle support, and rehabilitation programs in one place.",
      primaryActionLabel: "Book a Consultation",
      secondaryActionLabel: "View Facilities",
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
      <HomeHero data={homeData} />
    </main>
  );
}
