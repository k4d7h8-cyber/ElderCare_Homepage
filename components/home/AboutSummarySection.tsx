import type { AboutOverview } from "@/types/home";

import { ButtonLink } from "@/components/ui/Button";

type AboutSummarySectionProps = {
  about: AboutOverview;
};

export function AboutSummarySection({ about }: AboutSummarySectionProps) {
  const stats = about.stats.slice(0, 2);

  return (
    <section id="about" className="border-t border-slate-200 bg-white px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-textSub">기관 소개</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain md:text-3xl">{about.title}</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-textSub">{about.description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-surface px-6 py-7 text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-textSub">{stat.label}</p>
            </div>
          ))}
        </div>

        <ButtonLink href="#about" variant="outline" className="mt-8">
          자세히 보기
        </ButtonLink>
      </div>
    </section>
  );
}
