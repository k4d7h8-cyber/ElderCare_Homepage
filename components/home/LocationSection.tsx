import type { LocationContent } from "@/types/home";

import { ButtonLink } from "@/components/ui/Button";

type LocationSectionProps = {
  location: LocationContent;
};

export function LocationSection({ location }: LocationSectionProps) {
  return (
    <section id="location" className="border-t border-slate-200 bg-white px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-textSub">오시는 길</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain md:text-3xl">
          {location.address}
        </h2>

        <div className="mt-8 flex min-h-40 items-center justify-center rounded-2xl bg-surface text-sm font-medium text-textSub">
          지도 영역 (카카오맵 / 구글맵)
        </div>

        <ButtonLink href="#location" variant="outline" className="mt-8">
          상세 안내
        </ButtonLink>
      </div>
    </section>
  );
}
