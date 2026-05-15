import type { LocationPageContent as LocationPageContentType } from "@/types/subpage";
import { NaverMap } from "@/components/location/NaverMap";

type LocationPageContentProps = {
  data: LocationPageContentType;
};

export function LocationPageContent({ data }: LocationPageContentProps) {
  return (
    <>
      <section id="address" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Address</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">주소</h2>
        <div className="mt-5 rounded-2xl bg-primary/5 p-5">
          <p className="text-lg font-bold text-textMain">{data.address}</p>
          {data.detailAddress ? (
            <p className="mt-2 text-sm leading-6 text-textSub">{data.detailAddress}</p>
          ) : null}
        </div>
      </section>

      <section id="map" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Map</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">지도</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-surface">
          <NaverMap />
        </div>
      </section>

      <section id="parking" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Parking</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">주차 안내</h2>
        <p className="mt-5 rounded-2xl bg-surface p-5 text-sm leading-6 text-textSub">
          {data.parking}
        </p>
      </section>
    </>
  );
}
