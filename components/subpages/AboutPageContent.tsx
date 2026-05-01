import type { AboutPageContent as AboutPageContentType } from "@/types/subpage";

import { EmptyState } from "@/components/common/PageStates";

type AboutPageContentProps = {
  data: AboutPageContentType;
};

export function AboutPageContent({ data }: AboutPageContentProps) {
  const hasHistory = data.history.length > 0;
  const hasSpaces = data.facility.spaces.length > 0;
  const hasProfessionals = data.organization.professionals.length > 0;
  const hasStrengths = data.strengths.length > 0;

  return (
    <>
      <section id="greeting" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Greeting</p>
        <div className="mt-5 grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-textMain md:text-3xl">
              {data.greeting.title}
            </h2>
            <p className="mt-4 leading-7 text-textSub">{data.greeting.message}</p>
            <p className="mt-5 text-sm font-bold text-primary">{data.greeting.directorName}</p>
          </div>
          <div className="rounded-2xl bg-primary/5 p-5">
            <p className="text-lg font-bold text-textMain">{data.greeting.philosophyTitle}</p>
            <p className="mt-3 text-sm leading-6 text-textSub">
              {data.greeting.philosophyDescription}
            </p>
          </div>
        </div>
      </section>

      <section id="history" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">History</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">연혁</h2>
        {hasHistory ? (
          <div className="mt-7 space-y-6 border-l-2 border-primary/20 pl-5">
            {data.history.map((item) => (
              <article key={`${item.year}-${item.title}`} className="relative">
                <span className="absolute -left-[30px] top-1 h-4 w-4 rounded-full border-4 border-white bg-primary shadow-sm" />
                <p className="text-sm font-bold text-primary">{item.year}</p>
                <h3 className="mt-1 text-lg font-bold text-textMain">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-textSub">{item.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState />
          </div>
        )}
      </section>

      <section
        id="facility-status"
        className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8"
      >
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Facility</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">시설현황</h2>
        <p className="mt-3 rounded-2xl bg-surface p-5 text-sm leading-6 text-textSub">
          {data.facility.scale}
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {data.facility.floors.map((floor) => (
            <article key={floor.floor} className="rounded-2xl border border-slate-100 p-5">
              <p className="text-lg font-bold text-primary">{floor.floor}</p>
              <p className="mt-2 text-sm leading-6 text-textSub">{floor.description}</p>
            </article>
          ))}
        </div>

        {hasSpaces ? (
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {data.facility.spaces.map((space) => (
              <article key={space.title} className="rounded-2xl bg-primary/5 p-5">
                <h3 className="font-bold text-textMain">{space.title}</h3>
                <p className="mt-2 text-sm leading-6 text-textSub">{space.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState />
          </div>
        )}
      </section>

      <section id="organization" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Organization</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">조직도 및 전문 인력</h2>

        <div className="mt-7 grid gap-3 md:grid-cols-4">
          {data.organization.chart.map((node, index) => (
            <article
              key={node.role}
              className={`rounded-2xl border p-5 text-center ${
                index === 0
                  ? "border-primary/30 bg-primary/10 md:col-span-4"
                  : "border-slate-100 bg-white"
              }`}
            >
              <p className="font-bold text-textMain">{node.role}</p>
              <p className="mt-1 text-sm text-textSub">{node.name}</p>
            </article>
          ))}
        </div>

        {hasProfessionals ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {data.organization.professionals.map((professional) => (
              <article key={professional.title} className="rounded-2xl bg-surface p-5">
                <h3 className="font-bold text-textMain">{professional.title}</h3>
                <p className="mt-2 text-sm leading-6 text-textSub">{professional.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState />
          </div>
        )}
      </section>

      <section id="strengths" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Strengths</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">기관 특장점</h2>
        {hasStrengths ? (
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {data.strengths.map((strength) => (
              <article
                key={strength.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-xl">
                  {strength.icon}
                </span>
                <h3 className="mt-4 font-bold text-textMain">{strength.title}</h3>
                <p className="mt-2 text-sm leading-6 text-textSub">{strength.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState />
          </div>
        )}
      </section>
    </>
  );
}
