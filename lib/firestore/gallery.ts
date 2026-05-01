import { getDocs, limit, orderBy, query, where } from "firebase/firestore";

import type { GalleryItem } from "@/types/home";
import type { GalleryCategory, GalleryPageItem } from "@/types/subpage";
import { collections, isRecord, readBoolean, readNumber, readString } from "@/lib/firestore";

const fallbackImageUrls = [
  "https://picsum.photos/seed/eldercare-program-1/640/480",
  "https://picsum.photos/seed/eldercare-program-2/640/480",
  "https://picsum.photos/seed/eldercare-program-3/640/480",
];

const fallbackGalleryPreview: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "프로그램 활동",
    description: "어르신과 함께한 프로그램 사진",
    imageUrl: fallbackImageUrls[0],
    order: 1,
    isVisible: true,
  },
  {
    id: "gallery-2",
    title: "일상 모습",
    description: "편안한 하루를 보내는 생활 사진",
    imageUrl: fallbackImageUrls[1],
    order: 2,
    isVisible: true,
  },
  {
    id: "gallery-3",
    title: "시설 공간",
    description: "밝고 쾌적한 생활 공간",
    imageUrl: fallbackImageUrls[2],
    order: 3,
    isVisible: true,
  },
];

function fillGalleryPreview(items: GalleryItem[]) {
  const previewItems = items.slice(0, 3).map((item, index) => ({
    ...item,
    imageUrl: item.imageUrl || fallbackImageUrls[index],
  }));

  while (previewItems.length < 3) {
    const index = previewItems.length;
    previewItems.push(fallbackGalleryPreview[index]);
  }

  return previewItems;
}

export async function getGalleryPreview(): Promise<GalleryItem[]> {
  try {
    const galleryQuery = query(
      collections.gallery,
      where("isVisible", "==", true),
      orderBy("order", "asc"),
      limit(3),
    );

    const snapshot = await getDocs(galleryQuery);
    const items = snapshot.docs
      .map((document) => {
        const data = document.data();

        if (!isRecord(data)) {
          return null;
        }

        return {
          id: document.id,
          title: readString(data.title),
          description: readString(data.description),
          imageUrl: readString(data.imageUrl),
          order: readNumber(data.order),
          isVisible: readBoolean(data.isVisible, true),
        } satisfies GalleryItem;
      })
      .filter((item): item is GalleryItem => item !== null && item.title.length > 0);

    return fillGalleryPreview(items);
  } catch {
    return fallbackGalleryPreview;
  }
}

const fallbackGalleryPageData: GalleryPageItem[] = [
  {
    id: "daily-1",
    title: "오전 산책 시간",
    description: "햇살 좋은 날 함께 산책하며 보낸 일상입니다.",
    imageUrl: "https://picsum.photos/seed/eldercare-daily-1/900/700",
    category: "daily",
    date: "2026.04.12",
    isVisible: true,
  },
  {
    id: "program-1",
    title: "미술 프로그램",
    description: "색칠 활동으로 손 움직임과 집중력을 돕는 시간입니다.",
    imageUrl: "https://picsum.photos/seed/eldercare-program-4/900/700",
    category: "program",
    date: "2026.04.16",
    isVisible: true,
  },
  {
    id: "event-1",
    title: "생신 축하 모임",
    description: "어르신의 생신을 함께 축하한 따뜻한 날입니다.",
    imageUrl: "https://picsum.photos/seed/eldercare-event-1/900/700",
    category: "event",
    date: "2026.04.20",
    isVisible: true,
  },
  {
    id: "facility-1",
    title: "밝은 프로그램실",
    description: "활동과 휴식을 함께할 수 있는 프로그램 공간입니다.",
    imageUrl: "https://picsum.photos/seed/eldercare-facility-1/900/700",
    category: "facility",
    date: "2026.04.22",
    isVisible: true,
  },
  {
    id: "daily-2",
    title: "함께하는 차 시간",
    description: "담소를 나누며 편안하게 쉬는 오후 시간입니다.",
    imageUrl: "https://picsum.photos/seed/eldercare-daily-2/900/700",
    category: "daily",
    date: "2026.04.24",
    isVisible: true,
  },
  {
    id: "program-2",
    title: "음악 활동",
    description: "익숙한 노래를 함께 부르며 정서적 활력을 더합니다.",
    imageUrl: "https://picsum.photos/seed/eldercare-program-5/900/700",
    category: "program",
    date: "2026.04.26",
    isVisible: true,
  },
];

function readGalleryCategory(value: unknown): GalleryCategory {
  if (value === "daily" || value === "program" || value === "event" || value === "facility") {
    return value;
  }

  return "daily";
}

export async function getGalleryPageData(): Promise<GalleryPageItem[]> {
  try {
    const galleryQuery = query(
      collections.gallery,
      where("isVisible", "==", true),
      orderBy("date", "desc"),
      limit(24),
    );

    const snapshot = await getDocs(galleryQuery);
    const items = snapshot.docs
      .map((document) => {
        const data = document.data();

        if (!isRecord(data)) {
          return null;
        }

        return {
          id: document.id,
          title: readString(data.title),
          description: readString(data.description),
          imageUrl: readString(data.imageUrl),
          category: readGalleryCategory(data.category),
          date: readString(data.date),
          isVisible: readBoolean(data.isVisible, true),
        } satisfies GalleryPageItem;
      })
      .filter(
        (item): item is GalleryPageItem =>
          item !== null && item.title.length > 0 && item.imageUrl.length > 0,
      );

    return items.length > 0 ? items : fallbackGalleryPageData;
  } catch {
    return fallbackGalleryPageData;
  }
}
