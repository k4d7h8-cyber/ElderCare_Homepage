"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/common/PageStates";
import type { GalleryCategory, GalleryPageItem } from "@/types/subpage";

type GalleryPageContentProps = {
  items: GalleryPageItem[];
};

const categories: Array<{
  id: GalleryCategory;
  title: string;
  description: string;
}> = [
  {
    id: "daily",
    title: "함께하는 일상",
    description: "생활 모습 사진",
  },
  {
    id: "program",
    title: "신나는 프로그램",
    description: "프로그램 활동 사진",
  },
  {
    id: "event",
    title: "특별한 날들",
    description: "생신잔치, 행사, 명절 등",
  },
  {
    id: "facility",
    title: "우리의 보금자리",
    description: "시설 사진, 생활 공간, 프로그램실, 외부 전경",
  },
];

export function GalleryPageContent({ items }: GalleryPageContentProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryPageItem | null>(null);

  const groupedItems = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        items: items.filter((item) => item.category === category.id),
      })),
    [items],
  );

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {groupedItems.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Gallery</p>
          <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-textMain">{category.title}</h2>
              <p className="mt-2 text-sm text-textSub">{category.description}</p>
            </div>
            <p className="text-sm font-semibold text-primary">{category.items.length}장</p>
          </div>

          {category.items.length > 0 ? (
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {category.items.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <div className="relative aspect-[4/3] bg-surface">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-textSub">{item.date}</p>
                    <h3 className="mt-2 font-bold text-textMain">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-textSub">
                      {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState title="등록된 사진이 없습니다" description="해당 카테고리 사진을 준비 중입니다." />
            </div>
          )}
        </section>
      ))}

      {selectedItem ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-textMain/70 px-4 py-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-full w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-4">
              <div>
                <p className="text-xs font-semibold text-textSub">{selectedItem.date}</p>
                <h3 className="text-lg font-bold text-textMain">{selectedItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-bold text-textMain transition hover:bg-primary/10 hover:text-primary"
                aria-label="닫기"
              >
                X
              </button>
            </div>
            <div className="relative aspect-[4/3] max-h-[70vh] bg-surface">
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="p-4 text-sm leading-6 text-textSub">{selectedItem.description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
