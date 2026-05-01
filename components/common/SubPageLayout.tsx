"use client";

import type { ReactNode } from "react";

import type { SubPageNavItem } from "@/types/subpage";

type SubPageLayoutProps = {
  label: string;
  title: string;
  description: string;
  navItems: SubPageNavItem[];
  children: ReactNode;
};

export function SubPageLayout({
  label,
  title,
  description,
  navItems,
  children,
}: SubPageLayoutProps) {
  const handleMobileNavigate = (targetId: string) => {
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <section className="border-b border-slate-200 bg-white px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">{label}</p>
          <h1 className="mt-4 text-3xl font-bold text-textMain md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-textSub md:text-lg">
            {description}
          </p>
        </div>
      </section>

      <section className="bg-surface px-4 py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="px-3 pb-3 text-xs font-bold uppercase tracking-widest text-primary">
                Menu
              </p>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.targetId}
                    href={`#${item.targetId}`}
                    className="block rounded-xl px-3 py-3 text-sm font-semibold text-textSub transition hover:bg-primary/5 hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <div className="lg:hidden">
            <label className="block">
              <span className="sr-only">서브 메뉴</span>
              <select
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-textMain shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                defaultValue=""
                onChange={(event) => handleMobileNavigate(event.target.value)}
              >
                <option value="" disabled>
                  메뉴 선택
                </option>
                {navItems.map((item) => (
                  <option key={item.targetId} value={item.targetId}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="min-w-0 space-y-10">{children}</div>
        </div>
      </section>
    </>
  );
}
