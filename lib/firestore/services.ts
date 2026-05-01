import type { Service } from "@/types/home";
import type { ServicePageContent } from "@/types/subpage";

import { collections, getDocumentRecord, readArray, readBoolean, readNumber, readString } from "@/lib/firestore";

const fallbackServices: Service[] = [
  {
    id: "daily-support",
    title: "일상생활 지원",
    description: "이동, 목욕, 세면 등 기본 생활을 돕습니다.",
    icon: "heart",
    imageUrl: "",
    order: 1,
    isVisible: true,
  },
  {
    id: "health-care",
    title: "건강관리",
    description: "복약, 혈압 확인 등 24시간 케어를 제공합니다.",
    icon: "stethoscope",
    imageUrl: "",
    order: 2,
    isVisible: true,
  },
  {
    id: "meal-hygiene",
    title: "식사 및 위생관리",
    description: "균형 잡힌 식사와 청결 관리를 지원합니다.",
    icon: "sparkles",
    imageUrl: "",
    order: 3,
    isVisible: true,
  },
  {
    id: "emotional-program",
    title: "여가 및 정서 프로그램",
    description: "음악, 미술, 인지 활동을 운영합니다.",
    icon: "music",
    imageUrl: "",
    order: 4,
    isVisible: true,
  },
  {
    id: "guardian-communication",
    title: "보호자 소통",
    description: "생활 소식 공유와 수시 상담을 제공합니다.",
    icon: "message",
    imageUrl: "",
    order: 5,
    isVisible: true,
  },
];

export async function getVisibleServices(): Promise<Service[]> {
  const data = await getDocumentRecord(collections.homeContent, "services");

  if (!data) {
    return fallbackServices;
  }

  const services = readArray(data.items)
    .map((item, index) => ({
      id: readString(item.id, `service-${index + 1}`),
      title: readString(item.title, fallbackServices[index]?.title ?? ""),
      description: readString(item.description, fallbackServices[index]?.description ?? ""),
      icon: readString(item.icon, fallbackServices[index]?.icon ?? "heart"),
      imageUrl: readString(item.imageUrl),
      order: readNumber(item.order, index + 1),
      isVisible: readBoolean(item.isVisible, true),
    }))
    .filter((service) => service.isVisible && service.title.length > 0)
    .sort((left, right) => left.order - right.order);

  return services.length > 0 ? services : fallbackServices;
}

const fallbackServicesPageData: ServicePageContent = [
  {
    id: "daily-life",
    title: "일상생활 지원",
    description: "이동, 세면, 목욕, 옷 갈아입기 등 어르신의 하루를 편안하게 돕습니다.",
    icon: "생활",
    imageUrl: "https://picsum.photos/seed/daily-care/640/420",
  },
  {
    id: "health-care",
    title: "건강관리",
    description: "건강 상태 확인, 복약 관리, 협력 의료기관 연계로 안정적인 생활을 지원합니다.",
    icon: "건강",
    imageUrl: "https://picsum.photos/seed/health-care/640/420",
  },
  {
    id: "meal-hygiene",
    title: "식사 및 위생관리",
    description: "균형 잡힌 식사와 청결한 위생 관리로 건강한 생활 리듬을 유지합니다.",
    icon: "식사",
    imageUrl: "https://picsum.photos/seed/meal-care/640/420",
  },
  {
    id: "emotional-support",
    title: "여가 및 정서지원",
    description: "음악, 미술, 회상 활동 등 다양한 프로그램으로 정서적 활력을 돕습니다.",
    icon: "정서",
    imageUrl: "https://picsum.photos/seed/emotional-care/640/420",
  },
  {
    id: "family-communication",
    title: "보호자 소통",
    description: "상담과 생활 소식 공유를 통해 보호자께 어르신의 일상을 전달합니다.",
    icon: "소통",
    imageUrl: "https://picsum.photos/seed/family-talk/640/420",
  },
];

export async function getServicesPageData(): Promise<ServicePageContent> {
  const data = await getDocumentRecord(collections.homeContent, "servicesPage");

  if (!data) {
    return fallbackServicesPageData;
  }

  return fallbackServicesPageData;
}
