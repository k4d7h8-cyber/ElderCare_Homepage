import type { Service } from "@/types/home";

import { ButtonLink } from "@/components/ui/Button";

type ServicesSectionProps = {
  services: Service[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="border-t border-slate-200 bg-white px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-textSub">주요서비스</p>
        <h2 className="mt-3 text-2xl font-bold text-textMain md:text-3xl">
          어르신의 하루를 함께합니다
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.slice(0, 5).map((service) => (
            <article key={service.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-bold text-textMain">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-textSub">{service.description}</p>
            </article>
          ))}
        </div>

        <ButtonLink href="#services" variant="outline" className="mt-8">
          서비스 전체 보기
        </ButtonLink>
      </div>
    </section>
  );
}
