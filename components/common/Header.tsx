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
      { label: "시설현황", href: "/about#facility-status" },
      { label: "기관 특징 및 장점", href: "/about#strengths" },
      { label: "조직도 및 인력현황", href: "/about#organization" },
    ],
  },
  {
    key: "admission",
    label: "입소 안내",
    href: "/#admission",
    children: [
      { label: "입소 대상", href: "/admission#targets" },
      { label: "입소 절차", href: "/admission#process" },
      { label: "준비 서류", href: "/admission#documents" },
      { label: "비용 안내", href: "/admission#costs" },
    ],
  },
  {
    key: "services",
    label: "제공 서비스",
    href: "/#services",
    children: [
      { label: "일상생활 지원", href: "/services#daily-life" },
      { label: "건강관리", href: "/services#health-care" },
      { label: "식사/위생관리", href: "/services#meal-hygiene" },
      { label: "여가/정서 프로그램", href: "/services#emotional-support" },
      { label: "보호자 소통", href: "/services#family-communication" },
    ],
  },
  {
    key: "gallery",
    label: "갤러리",
    href: "/#gallery",
    children: [
      { label: "신나는 프로그램", href: "/gallery#daily" },
      { label: "특별한 날들", href: "/gallery#event" },
      { label: "시설 사진", href: "/gallery#facility" },
    ],
  },
  {
    key: "notice",
    label: "공지사항",
    href: "/#notices",
    children: [
      { label: "공지사항", href: "/notices#notice-list" },
    ],
  },
  {
    key: "location",
    label: "오시는길",
    href: "/#location",
    children: [
      { label: "지도", href: "/location#map" },
    ],
  },
];

export function Header() {
  const [activeMenuKey, setActiveMenuKey] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileMenuKey, setExpandedMobileMenuKey] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 900px)");

    const closeMobileMenuAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
        setExpandedMobileMenuKey(null);
      }
    };

    desktopMediaQuery.addEventListener("change", closeMobileMenuAtDesktop);

    return () => desktopMediaQuery.removeEventListener("change", closeMobileMenuAtDesktop);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setExpandedMobileMenuKey(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
    setExpandedMobileMenuKey(null);
    setActiveMenuKey(null);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileMenuKey(null);
  };

  const handleMobileSubmenuToggle = (menuKey: string) => {
    setExpandedMobileMenuKey((activeKey) => (activeKey === menuKey ? null : menuKey));
  };

  return (
    <div
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        hasScrolled ? "shadow-md" : "shadow-sm"
      }`}
      onMouseLeave={() => setActiveMenuKey(null)}
    >
      <header className="relative z-50 border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 min-[1200px]:gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="홈으로 이동">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
              요
            </span>
            <span className="hidden whitespace-nowrap text-lg font-bold text-textMain sm:inline">
              편안한 요양원
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0 min-[900px]:flex min-[1200px]:gap-1"
            aria-label="주요 메뉴"
          >
            {menus.map((menu) => (
              <div key={menu.key} className="relative">
                <Link
                  href={menu.href}
                  className={`whitespace-nowrap rounded-full px-2 py-2 text-sm font-semibold transition min-[1200px]:px-4 ${
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

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ButtonLink
              href="/login"
              variant="text-link"
              className="hidden min-[1200px]:inline-flex"
            >
              로그인
            </ButtonLink>
            <ButtonLink
              href="#contact-cta"
              variant="primary"
              className="!px-3 min-[1200px]:!px-5"
            >
              상담문의
            </ButtonLink>
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={handleMobileMenuToggle}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-textMain transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-[900px]:hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {isMobileMenuOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="모바일 주요 메뉴"
          className="absolute left-0 right-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-slate-200 bg-white px-4 py-4 shadow-xl min-[900px]:hidden"
        >
          <div className="mx-auto max-w-6xl space-y-2">
            {menus.map((menu) => {
              const isExpanded = expandedMobileMenuKey === menu.key;
              const submenuId = `mobile-submenu-${menu.key}`;

              return (
                <div key={menu.key} className="overflow-hidden rounded-2xl border border-slate-100">
                  <div className="flex items-center bg-white">
                    <Link
                      href={menu.href}
                      onClick={handleMobileMenuClose}
                      className="min-w-0 flex-1 px-4 py-4 text-sm font-bold text-textMain transition hover:bg-primary/5 hover:text-primary"
                    >
                      {menu.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`${menu.label} 하위 메뉴 ${isExpanded ? "접기" : "펼치기"}`}
                      aria-expanded={isExpanded}
                      aria-controls={submenuId}
                      onClick={() => handleMobileSubmenuToggle(menu.key)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center border-l border-slate-100 text-textSub transition hover:bg-primary/5 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {isExpanded ? (
                    <div id={submenuId} className="space-y-1 border-t border-slate-100 bg-surface p-3">
                      {menu.children.map((child) => (
                        <Link
                          key={`${menu.key}-mobile-${child.href}-${child.label}`}
                          href={child.href}
                          onClick={handleMobileMenuClose}
                          className="block rounded-xl bg-white px-4 py-3 text-sm font-semibold text-textSub transition hover:bg-primary/5 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div className="border-t border-slate-200 pt-4">
              <ButtonLink
                href="/login"
                variant="outline"
                className="w-full"
                onClick={handleMobileMenuClose}
              >
                로그인
              </ButtonLink>
            </div>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
