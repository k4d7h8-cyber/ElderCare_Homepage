import type { Service } from "@/types/home";

import { collections, getDocumentRecord, readArray, readBoolean, readNumber, readString } from "@/lib/firestore";

const fallbackServices: Service[] = [
  {
    id: "care",
    title: "Daily Living Support",
    description: "Meals, hygiene, and rest routines are managed with close attention.",
    icon: "heart",
    imageUrl: "",
    order: 1,
    isVisible: true,
  },
  {
    id: "nursing",
    title: "Health Monitoring",
    description: "Medication and condition checks help the team respond quickly to changes.",
    icon: "stethoscope",
    imageUrl: "",
    order: 2,
    isVisible: true,
  },
  {
    id: "program",
    title: "Activity Programs",
    description: "Physical and emotional support programs keep residents engaged.",
    icon: "sparkles",
    imageUrl: "",
    order: 3,
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
