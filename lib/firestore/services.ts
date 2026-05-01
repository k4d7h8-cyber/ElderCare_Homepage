import type { Service } from "@/types/home";

import { collections, getDocumentRecord, readArray, readBoolean, readNumber, readString } from "@/lib/firestore";

const fallbackServices: Service[] = [
  {
    id: "daily-support",
    title: "일상생활 지원",
    description: "이동·목욕·세면 도움",
    icon: "heart",
    imageUrl: "",
    order: 1,
    isVisible: true,
  },
  {
    id: "health-care",
    title: "건강관리",
    description: "투약·혈압 등 24시간 케어",
    icon: "stethoscope",
    imageUrl: "",
    order: 2,
    isVisible: true,
  },
  {
    id: "meal-hygiene",
    title: "식사·위생관리",
    description: "영양식 제공·청결 관리",
    icon: "sparkles",
    imageUrl: "",
    order: 3,
    isVisible: true,
  },
  {
    id: "emotional-program",
    title: "여가·정서 프로그램",
    description: "음악·미술·종합 활동",
    icon: "music",
    imageUrl: "",
    order: 4,
    isVisible: true,
  },
  {
    id: "guardian-communication",
    title: "보호자 소통",
    description: "소식지 알림·사진 공유·수시 면담",
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
