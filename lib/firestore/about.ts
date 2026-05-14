import type { AboutOverview } from "@/types/home";
import type { AboutPageContent } from "@/types/subpage";

import { collections, getDocumentRecord, readArray, readString } from "@/lib/firestore";

const fallbackAboutOverview: AboutOverview = {
  title: "30년 경력의 전문 요양 시설",
  description:
    "어르신 한 분 한 분을 가족처럼 모십니다. 숙련된 간호사와 요양보호사가 24시간 함께합니다.",
  stats: [
    { label: "입소 정원", value: "29명" },
    { label: "전문 케어", value: "24시간" },
  ],
};

export async function getAboutOverview(): Promise<AboutOverview> {
  const data = await getDocumentRecord(collections.homeContent, "trust");

  if (!data) {
    return fallbackAboutOverview;
  }

  const stats = readArray(data.stats)
    .map((item) => ({
      label: readString(item.label),
      value: readString(item.value),
    }))
    .filter((item) => item.label.length > 0 && item.value.length > 0);

  return {
    title: readString(data.title, fallbackAboutOverview.title),
    description: readString(data.description, fallbackAboutOverview.description),
    stats: stats.length > 0 ? stats : fallbackAboutOverview.stats,
  };
}

const fallbackAboutPageData: AboutPageContent = {
  greeting: {
    directorName: "시설장 김하늘",
    title: "어르신의 하루가 편안하도록 진심을 다하겠습니다",
    message:
      "저희 기관은 어르신을 가족처럼 모시는 마음으로 생활, 건강, 정서 케어를 함께 제공합니다. 보호자께는 안심을, 어르신께는 존중받는 일상을 드리는 공간이 되겠습니다.",
    philosophyTitle: "설립이념",
    philosophyDescription:
      "존엄한 돌봄, 따뜻한 소통, 전문적인 케어를 바탕으로 어르신의 삶의 질을 높이는 것을 가장 중요한 가치로 삼습니다.",
  },
  history: [
    {
      year: "2021",
      title: "기관 설립",
      description: "지역 어르신을 위한 전문 요양 서비스를 시작했습니다.",
    },
    {
      year: "2022",
      title: "생활 케어 프로그램 확대",
      description: "인지, 신체, 정서 지원 프로그램을 정기 운영하기 시작했습니다.",
    },
    {
      year: "2024",
      title: "보호자 소통 체계 강화",
      description: "상담과 생활 소식 공유 프로세스를 정비했습니다.",
    },
  ],
  facility: {
    scale: "생활실, 프로그램실, 물리치료 공간, 상담실을 갖춘 쾌적한 요양 공간",
    floors: [
      { floor: "1층", description: "상담실, 사무실, 공용 라운지" },
      { floor: "2층", description: "생활실, 간호 스테이션, 휴게 공간" },
      { floor: "3층", description: "프로그램실, 재활 활동 공간, 식당" },
    ],
    spaces: [
      {
        title: "생활 공간",
        description: "채광과 이동 동선을 고려한 편안한 생활실",
      },
      {
        title: "프로그램 공간",
        description: "인지 활동과 여가 프로그램을 위한 다목적 공간",
      },
      {
        title: "건강관리 공간",
        description: "건강 체크와 기본 케어가 가능한 간호 지원 공간",
      },
    ],
  },
  organization: {
    chart: [
      { role: "시설장", name: "운영 총괄" },
      { role: "간호팀", name: "건강관리" },
      { role: "요양보호팀", name: "생활지원" },
      { role: "프로그램팀", name: "정서지원" },
    ],
    professionals: [
      {
        title: "요양보호사",
        description: "일상생활 지원과 안전한 생활 환경을 돕습니다.",
      },
      {
        title: "간호 인력",
        description: "건강 상태 확인과 복약 관리를 지원합니다.",
      },
      {
        title: "사회복지 인력",
        description: "상담, 프로그램, 보호자 소통을 담당합니다.",
      },
    ],
  },
  strengths: [
    {
      title: "보호자 소통",
      description: "생활 소식과 상담을 통해 보호자와 꾸준히 소통합니다.",
      icon: "소통",
    },
    {
      title: "전문 케어",
      description: "어르신 상태에 맞춘 생활 및 건강 케어를 제공합니다.",
      icon: "케어",
    },
    {
      title: "프로그램 운영",
      description: "인지, 신체, 정서 활동을 균형 있게 운영합니다.",
      icon: "활동",
    },
    {
      title: "쾌적한 환경",
      description: "안전하고 밝은 생활 공간을 지속적으로 관리합니다.",
      icon: "환경",
    },
  ],
};

export async function getAboutPageData(): Promise<AboutPageContent> {
  const data = await getDocumentRecord(collections.homeContent, "aboutPage");

  if (!data) {
    return fallbackAboutPageData;
  }

  return fallbackAboutPageData;
}
