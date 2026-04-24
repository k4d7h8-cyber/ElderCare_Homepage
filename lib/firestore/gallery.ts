import { getDocs, limit, orderBy, query, where } from "firebase/firestore";

import type { GalleryItem } from "@/types/home";
import { collections, isRecord, readBoolean, readNumber, readString } from "@/lib/firestore";

const fallbackGalleryPreview: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Shared Lounge",
    description: "A bright and comfortable community space.",
    imageUrl: "",
    order: 1,
    isVisible: true,
  },
  {
    id: "gallery-2",
    title: "Rehab Room",
    description: "A dedicated room for physical activity programs.",
    imageUrl: "",
    order: 2,
    isVisible: true,
  },
  {
    id: "gallery-3",
    title: "Garden Walkway",
    description: "An outdoor area for light walks and fresh air.",
    imageUrl: "",
    order: 3,
    isVisible: true,
  },
];

export async function getGalleryPreview(): Promise<GalleryItem[]> {
  try {
    const galleryQuery = query(
      collections.gallery,
      where("isVisible", "==", true),
      orderBy("order", "asc"),
      limit(6),
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

    return items.length > 0 ? items : fallbackGalleryPreview;
  } catch {
    return fallbackGalleryPreview;
  }
}
