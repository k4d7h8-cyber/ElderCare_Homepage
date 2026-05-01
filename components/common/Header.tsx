"use client";

import { useEffect, useState } from "react";

import { LNB, type LnbMenu } from "@/components/common/LNB";
import { ButtonLink } from "@/components/ui/Button";

const menus: LnbMenu[] = [
  {
    id: "about",
    label: "소개",
    items: [
      { label: "인사말", targetId: "about" },
      { label: "연혁", targetId: "history" },
      { label: "설립이념(기관장의 운영 철학 및 비전)", targetId: "philosophy" },
      { label: "시설현황(건물 규모, 층별 안내, 병상(침실) 수", targetId: "facility-status" },
      { label: "직원/서비스 강점", targetId: "service-strength" },
      {
        label: "시설 사진(전경, 생활실, 프로그램실, 식당, 목욕실 등)",
        targetId: "gallery",
      },
      {
        label: "조직도 및 전문 인력: 기관의 조직 구성, 직원 수 및 자격 현황 (전문성 어필).",
        targetId: "organization",
      },
    ],
  },
  {
    id: "admission",
    label: "입소안내",
    items: [
      { label: "입소 대상", targetId: "admission" },
      { label: "입소 절차", targetId: "admission" },
      { label: "준비 서류", targetId: "admission" },
      { label: "비용 안내", targetId: "admission" },
      { label: "상담 안내 CTA", targetId: "contact-cta" },
    ],
  },
  {
    id: "services",
    label: "서비스",
    items: [
      { label: "일상생활 지원", targetId: "services" },
      { label: "건강관리", targetId: "services" },
      { label: "식사/위생관리", targetId: "services" },
      { label: "여가/정서 프로그램", targetId: "services" },
      { label: "보호자 소통 방식", targetId: "services" },
    ],
  },
  {
    id: "gallery",
    label: "갤러리",
    items: [
      { label: "일별 프로그램 사진", targetId: "gallery" },
      { label: "행사 사진", targetId: "gallery" },
      { label: "생활 모습 갤러리", targetId: "gallery" },
      { label: "간단한 설명글", targetId: "gallery" },
      { label: "시설 사진", targetId: "gallery" },
    ],
  },
  {
    id: "notice",
    label: "공지",
    items: [
      { label: "일반 공지", targetId: "notice" },
      { label: "일정 안내", targetId: "notice" },
      { label: "면회/운영 관련 안내", targetId: "notice" },
      { label: "긴급 공지", targetId: "notice" },
    ],
  },
  {
    id: "location",
    label: "오시는길",
    items: [
      { label: "지도", targetId: "location" },
      { label: "주소 CTA(네이버 지도)", targetId: "location" },
      { label: "전화번호 CTA", targetId: "contact-cta" },
    ],
  },
];

export function Header() {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeMenu = menus.find((menu) => menu.id === activeMenuId) ?? null;

  const handleNavigate = (targetId: string) => {
    const target = document.getElementById(targetId);
    setActiveMenuId(null);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.hash = targetId;
  };

  return (
    <div
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        hasScrolled ? "shadow-md" : "shadow-sm"
      }`}
      onMouseLeave={() => setActiveMenuId(null)}
    >
      <header className="relative z-50 border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4">
          <a href="/" className="flex items-center gap-3" aria-label="홈으로 이동">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
              요
            </span>
            <span className="whitespace-nowrap text-lg font-bold text-textMain">
              편안한 요양원
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
            {menus.map((menu) => (
              <button
                key={menu.id}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeMenuId === menu.id
                    ? "bg-primary/10 text-primary"
                    : "text-textMain hover:bg-surface hover:text-primary"
                }`}
                onClick={() =>
                  setActiveMenuId((currentMenuId) =>
                    currentMenuId === menu.id ? null : menu.id,
                  )
                }
                onMouseEnter={() => setActiveMenuId(menu.id)}
              >
                {menu.label}
              </button>
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

      {activeMenu ? (
        <LNB
          menu={activeMenu}
          onNavigate={handleNavigate}
          onMouseEnter={() => setActiveMenuId(activeMenu.id)}
          onMouseLeave={() => setActiveMenuId(null)}
        />
      ) : null}
    </div>
  );
}
