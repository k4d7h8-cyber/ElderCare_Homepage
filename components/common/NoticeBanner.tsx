"use client";

import { useState } from "react";

import type { Notice } from "@/types/home";

type NoticeBannerProps = {
  notice?: Notice | null;
};

const fallbackNoticeText = "공지사항 제목이 여기에 표시됩니다 - 2026.04.24";

function formatNoticeDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export function NoticeBanner({ notice }: NoticeBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  const noticeDate = notice?.publishedAt ? formatNoticeDate(notice.publishedAt) : "";
  const noticeText = notice?.title
    ? `${notice.title}${noticeDate ? ` - ${noticeDate}` : ""}`
    : fallbackNoticeText;

  return (
    <div className="relative z-[60] border-b border-slate-100 bg-banner px-4 py-2 text-sm text-textMain">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a href={notice?.href ?? "#notice"} className="min-w-0 flex-1 truncate font-medium">
          {noticeText}
        </a>
        <button
          type="button"
          aria-label="공지 배너 닫기"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-textSub transition hover:bg-white/70 hover:text-textMain"
          onClick={() => setIsVisible(false)}
        >
          X
        </button>
      </div>
    </div>
  );
}
