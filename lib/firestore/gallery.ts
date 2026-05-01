import { getDocs, limit, orderBy, query, where } from "firebase/firestore";

import type { GalleryItem } from "@/types/home";
import { collections, isRecord, readBoolean, readNumber, readString } from "@/lib/firestore";

const fallbackImageUrls = [
  "https://picsum.photos/seed/eldercare-program-1/640/480",
  "https://picsum.photos/seed/eldercare-program-2/640/480",
  "https://picsum.photos/seed/eldercare-program-3/640/480",
];

const fallbackGalleryPreview: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "사진 1",
    description: "프로그램 활동 사진",
    imageUrl: fallbackImageUrls[0],
    order: 1,
    isVisible: true,
  },
  {
    id: "gallery-2",
    title: "사진 2",
    description: "어르신 일상 사진",
    imageUrl: fallbackImageUrls[1],
    order: 2,
    isVisible: true,
  },
  {
    id: "gallery-3",
    title: "사진 3",
    description: "시설 생활 사진",
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
