import type { AdmissionContent } from "@/types/home";

import { ButtonLink } from "@/components/ui/Button";

type AdmissionSummarySectionProps = {
  admission: AdmissionContent;
};

export function AdmissionSummarySection({ admission }: AdmissionSummarySectionProps) {
  return (
    <section id="admission" className="border-t border-slate-200 bg-white px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-textSub">입소안내</p>

        <div className="mt-5 space-y-3">
          {admission.steps.slice(0, 4).map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-textMain sm:text-base">
                <span className={index === 0 ? "whitespace-nowrap" : undefined}>{step}</span>
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-textSub">{admission.description}</p>

        <ButtonLink href="#admission" variant="outline" className="mt-8">
          입소 절차 자세히
        </ButtonLink>
      </div>
    </section>
  );
}
