"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";

type HeaderMenu = {
  key: string;
  label: string;
  href: string;
  children: {
    label: string;
    href: string;
  }[];
};

const menus: HeaderMenu[] = [
  {
    key: "about",
    label: "요양원 소개",
    href: "/#about",
    children: [
      { label: "인사말", href: "/about#greeting" },
      { label: "연혁", href: "/about#history" },
      { label: "시설현황", href: "/about#facility" },
      { label: "기관 특징 및 장점", href: "/about#strengths" },
      { label: "시설 사진", href: "/gallery" },
      { label: "조직도 및 인력현황", href: "/about#organization" },
    ],
  },
  {
    key: "admission",
    label: "입소 안내",
    href: "/#admission",
    children: [
      { label: "입소 대상", href: "/admission#targets" },
      { label: "입소 절차", href: "/admission#steps" },
      { label: "준비 서류", href: "/admission#documents" },
      { label: "비용 안내", href: "/admission#costs" },
      { label: "상담 안내 CTA", href: "/admission#consultation" },
    ],
  },
  {
    key: "services",
    label: "서비스",
    href: "/#services",
    children: [
      { label: "일상생활 지원", href: "/services#daily-support" },
      { label: "건강관리", href: "/services#health-care" },
      { label: "식사/위생관리", href: "/services#meal-hygiene" },
      { label: "여가/정서 프로그램", href: "/services#emotional-program" },
      { label: "보호자 소통 방식", href: "/services#guardian-communication" },
    ],
  },
  {
    key: "gallery",
    label: "갤러리",
    href: "/#gallery",
    children: [
      { label: "일별 프로그램 사진", href: "/gallery?category=daily" },
      { label: "행사 사진", href: "/gallery?category=event" },
      { label: "생활 모습 갤러리", href: "/gallery?category=program" },
      { label: "간단한 설명글", href: "/gallery" },
      { label: "시설 사진", href: "/gallery?category=facility" },
    ],
  },
  {
    key: "notice",
    label: "공지",
    href: "/#notices",
    children: [
      { label: "일반 공지", href: "/notices" },
      { label: "일정 안내", href: "/notices" },
      { label: "면회/운영 관련 안내", href: "/notices" },
      { label: "긴급 공지", href: "/notices" },
    ],
  },
  {
    key: "location",
    label: "오시는길",
    href: "/#location",
    children: [
      { label: "지도", href: "/location#map" },
      { label: "주소 CTA(네이버 지도)", href: "/location#address" },
      { label: "전화번호 CTA", href: "/location#parking" },
    ],
  },
];

export function Header() {
  const [activeMenuKey, setActiveMenuKey] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        hasScrolled ? "shadow-md" : "shadow-sm"
      }`}
      onMouseLeave={() => setActiveMenuKey(null)}
    >
      <header className="relative z-50 border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4">
          <Link href="/" className="flex items-center gap-3" aria-label="홈으로 이동">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
              요
            </span>
            <span className="whitespace-nowrap text-lg font-bold text-textMain">
              편안한 요양원
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
            {menus.map((menu) => (
              <div key={menu.key} className="relative">
                <Link
                  href={menu.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeMenuKey === menu.key
                      ? "bg-primary/10 text-primary"
                      : "text-textMain hover:bg-surface hover:text-primary"
                  }`}
                  onClick={() => setActiveMenuKey(null)}
                  onMouseEnter={() => setActiveMenuKey(menu.key)}
                >
                  {menu.label}
                </Link>

                {activeMenuKey === menu.key ? (
                  <div
                    className="absolute left-1/2 top-full z-40 mt-3 flex min-w-44 -translate-x-1/2 flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-lg"
                    onMouseEnter={() => setActiveMenuKey(menu.key)}
                    onMouseLeave={() => setActiveMenuKey(null)}
                  >
                    {menu.children.map((child) => (
                      <Link
                        key={`${menu.key}-${child.href}-${child.label}`}
                        href={child.href}
                        className="rounded-2xl border border-slate-100 bg-surface px-4 py-3 text-center text-sm font-semibold leading-relaxed text-textMain transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                        onClick={() => setActiveMenuKey(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink href="/login" variant="text-link" className="hidden sm:inline-flex">
              로그인
            </ButtonLink>
            <ButtonLink href="#contact-cta" variant="primary">
              상담문의
            </ButtonLink>
          </div>
        </div>
      </header>
    </div>
  );
}
