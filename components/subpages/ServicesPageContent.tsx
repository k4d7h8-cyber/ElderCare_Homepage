import Image from "next/image";

import { EmptyState } from "@/components/common/PageStates";
import type { ServicePageContent as ServicePageContentType } from "@/types/subpage";

type ServicesPageContentProps = {
  services: ServicePageContentType;
};

export function ServicesPageContent({ services }: ServicesPageContentProps) {
  if (services.length === 0) {
    return <EmptyState />;
  }

  return (
    <section id="service-list" className="scroll-mt-28">
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article
            id={service.id}
            key={service.id}
            className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
          >
            <div className="relative aspect-[16/9] bg-surface">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              ) : null}
            </div>
            <div className="p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-xl">
                {service.icon}
              </span>
              <h2 className="mt-4 text-xl font-bold text-textMain">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-textSub">{service.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
