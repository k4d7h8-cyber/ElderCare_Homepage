import Image from "next/image";

import type { GalleryItem } from "@/types/home";

import { ButtonLink } from "@/components/ui/Button";

type GalleryPreviewSectionProps = {
  galleryItems: GalleryItem[];
};

export function GalleryPreviewSection({ galleryItems }: GalleryPreviewSectionProps) {
  return (
    <section id="gallery" className="border-t border-slate-200 bg-white px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-textSub">요양원 일상·갤러리</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain md:text-3xl">
          오늘의 프로그램 사진
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {galleryItems.slice(0, 3).map((item, index) => (
            <article key={item.id} className="overflow-hidden rounded-2xl bg-surface">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.imageUrl}
                  alt={item.title || `갤러리 사진 ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-textMain">{item.title}</h3>
                {item.description ? (
                  <p className="mt-1 text-sm text-textSub">{item.description}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <ButtonLink href="#gallery" variant="outline" className="mt-8">
          전체 갤러리
        </ButtonLink>
      </div>
    </section>
  );
}
