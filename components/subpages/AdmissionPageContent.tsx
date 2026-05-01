import type { AdmissionPageContent as AdmissionPageContentType } from "@/types/subpage";

import { EmptyState } from "@/components/common/PageStates";

type AdmissionPageContentProps = {
  data: AdmissionPageContentType;
};

export function AdmissionPageContent({ data }: AdmissionPageContentProps) {
  return (
    <>
      <section id="targets" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Target</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">입소 대상</h2>
        {data.targets.length > 0 ? (
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {data.targets.map((target) => (
              <article key={target.title} className="rounded-2xl bg-primary/5 p-5">
                <h3 className="font-bold text-textMain">{target.title}</h3>
                <p className="mt-2 text-sm leading-6 text-textSub">{target.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState />
          </div>
        )}
      </section>

      <section id="process" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Process</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">입소 절차</h2>
        {data.steps.length > 0 ? (
          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {data.steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-bold text-textMain">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-textSub">{step.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState />
          </div>
        )}
      </section>

      <section id="documents" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Documents</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">준비 서류</h2>
        {data.documents.length > 0 ? (
          <ul className="mt-7 grid gap-3 md:grid-cols-2">
            {data.documents.map((document) => (
              <li
                key={document}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                  ✓
                </span>
                <span className="text-sm font-semibold leading-6 text-textMain">{document}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6">
            <EmptyState />
          </div>
        )}
      </section>

      <section id="costs" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">Cost</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain">비용 안내</h2>
        {data.costs.length > 0 ? (
          <div className="mt-7 overflow-hidden rounded-2xl border border-slate-100">
            <div className="hidden grid-cols-[160px_1fr_220px] bg-surface text-sm font-bold text-textMain md:grid">
              <div className="p-4">구분</div>
              <div className="p-4">내용</div>
              <div className="p-4">비고</div>
            </div>
            <div className="divide-y divide-slate-100">
              {data.costs.map((cost) => (
                <article
                  key={cost.category}
                  className="grid gap-2 p-4 text-sm md:grid-cols-[160px_1fr_220px] md:gap-0"
                >
                  <p className="font-bold text-primary">{cost.category}</p>
                  <p className="leading-6 text-textSub">{cost.description}</p>
                  <p className="leading-6 text-textSub">{cost.note}</p>
                </article>
              ))}
            </div>
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
