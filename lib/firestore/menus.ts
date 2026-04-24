import type { MenuItem } from "@/types/home";

import { collections, getDocumentRecord, readArray, readBoolean, readNumber, readString } from "@/lib/firestore";

const fallbackGnbMenus: MenuItem[] = [
  { id: "home", label: "Home", href: "/", order: 1, isVisible: true },
  { id: "about", label: "About", href: "/about", order: 2, isVisible: true },
  { id: "admission", label: "Admission", href: "/admission", order: 3, isVisible: true },
  { id: "services", label: "Services", href: "/services", order: 4, isVisible: true },
  { id: "location", label: "Location", href: "/location", order: 5, isVisible: true },
];

const fallbackLnbMenus: MenuItem[] = [
  { id: "notice", label: "Notices", href: "/notices", order: 1, isVisible: true },
  { id: "gallery", label: "Gallery", href: "/gallery", order: 2, isVisible: true },
];

function mapMenuItems(value: unknown, fallback: MenuItem[]): MenuItem[] {
  const items = readArray(value)
    .map((item, index) => ({
      id: readString(item.id, `menu-${index + 1}`),
      label: readString(item.label, fallback[index]?.label ?? ""),
      href: readString(item.href, fallback[index]?.href ?? "/"),
      order: readNumber(item.order, index + 1),
      isVisible: readBoolean(item.isVisible, true),
    }))
    .filter((item) => item.isVisible && item.label.length > 0)
    .sort((left, right) => left.order - right.order);

  return items.length > 0 ? items : fallback;
}

export async function getGnbMenus(): Promise<MenuItem[]> {
  const data = await getDocumentRecord(collections.menus, "gnb");
  return data ? mapMenuItems(data.items, fallbackGnbMenus) : fallbackGnbMenus;
}

export async function getLnbMenus(): Promise<MenuItem[]> {
  const data = await getDocumentRecord(collections.menus, "lnb");
  return data ? mapMenuItems(data.items, fallbackLnbMenus) : fallbackLnbMenus;
}
