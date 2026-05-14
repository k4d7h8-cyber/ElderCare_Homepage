"use client";

import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";

// [수정] LNB 누적 렌더링을 막기 위해 Header에서 사용할 menu.key / menu.children 구조로 관리합니다.
type HeaderMenu = {
  key: string;
  label: string;
  children: {
    label: string;
    href: string;
    targetId: string;
  }[];
};

const menus: HeaderMenu[] = [
  {
    key: "about",
    label: "요양원 소개",
    children: [
      { label: "인사말", href: "#about", targetId: "about" },
      { label: "연혁", href: "#history", targetId: "history" },
      { label: "시설현황", href: "#facility-status", targetId: "facility-status" },
      { label: "기관 특징 및 장점", href: "#service-strength", targetId: "service-strength" },
      {
        label: "시설 사진",
        href: "#gallery",
        targetId: "gallery",
      },
      {
        label: "조직도 및 인력현황",
        href: "#organization",
        targetId: "organization",
      },
    ],
  },
  {
    key: "admission",
    label: "입소 안내",
    children: [
      { label: "입소 대상", href: "#admission", targetId: "admission" },
      { label: "입소 절차", href: "#admission", targetId: "admission" },
      { label: "준비 서류", href: "#admission", targetId: "admission" },
      { label: "비용 안내", href: "#admission", targetId: "admission" },
      { label: "상담 안내 CTA", href: "#contact-cta", targetId: "contact-cta" },
    ],
  },
  {
    key: "services",
    label: "서비스",
    children: [
      { label: "일상생활 지원", href: "#services", targetId: "services" },
      { label: "건강관리", href: "#services", targetId: "services" },
      { label: "식사/위생관리", href: "#services", targetId: "services" },
      { label: "여가/정서 프로그램", href: "#services", targetId: "services" },
      { label: "보호자 소통 방식", href: "#services", targetId: "services" },
    ],
  },
  {
    key: "gallery",
    label: "갤러리",
    children: [
      { label: "일별 프로그램 사진", href: "#gallery", targetId: "gallery" },
      { label: "행사 사진", href: "#gallery", targetId: "gallery" },
      { label: "생활 모습 갤러리", href: "#gallery", targetId: "gallery" },
      { label: "간단한 설명글", href: "#gallery", targetId: "gallery" },
      { label: "시설 사진", href: "#gallery", targetId: "gallery" },
    ],
  },
  {
    key: "notice",
    label: "공지",
    children: [
      { label: "일반 공지", href: "#notice", targetId: "notice" },
      { label: "일정 안내", href: "#notice", targetId: "notice" },
      { label: "면회/운영 관련 안내", href: "#notice", targetId: "notice" },
      { label: "긴급 공지", href: "#notice", targetId: "notice" },
    ],
  },
  {
    key: "location",
    label: "오시는길",
    children: [
      { label: "지도", href: "#location", targetId: "location" },
      { label: "주소 CTA(네이버 지도)", href: "#location", targetId: "location" },
      { label: "전화번호 CTA", href: "#contact-cta", targetId: "contact-cta" },
    ],
  },
];

export function Header() {
  // [수정] LNB 배열을 누적하지 않고 현재 활성화된 GNB key 하나만 상태로 관리합니다.
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

  const handleNavigate = (targetId: string) => {
    const target = document.getElementById(targetId);
    setActiveMenuKey(null); // [수정] LNB 항목 선택 시 현재 열린 LNB를 닫습니다.

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
      onMouseLeave={() => setActiveMenuKey(null)} // [수정] Header 영역 이탈 시 LNB를 닫습니다.
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
              <div key={menu.key} className="relative">
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeMenuKey === menu.key
                      ? "bg-primary/10 text-primary"
                      : "text-textMain hover:bg-surface hover:text-primary"
                  }`}
                  onClick={() =>
                    setActiveMenuKey((currentMenuKey) =>
                      currentMenuKey === menu.key ? null : menu.key,
                    )
                  }
                  onMouseEnter={() => setActiveMenuKey(menu.key)} // [수정] 마우스를 올린 GNB key만 저장합니다.
                >
                  {menu.label}
                </button>

                {activeMenuKey === menu.key ? (
                  // [수정] 각 GNB 바로 아래에 세로 방향 LNB 드롭다운을 표시합니다.
                  <div
                    className="absolute left-1/2 top-full z-40 mt-3 flex min-w-44 -translate-x-1/2 flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-3 text-center shadow-lg"
                    onMouseEnter={() => setActiveMenuKey(menu.key)}
                    onMouseLeave={() => setActiveMenuKey(null)}
                  >
                    {menu.children.map((child) => (
                      <button
                        key={`${menu.key}-${child.href}-${child.label}`} // [수정] href와 label 조합으로 중복 key를 방지합니다.
                        type="button"
                        className="rounded-2xl border border-slate-100 bg-surface px-4 py-3 text-center text-sm font-semibold leading-relaxed text-textMain transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                        onClick={() => handleNavigate(child.targetId)}
                      >
                        {child.label}
                      </button>
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
