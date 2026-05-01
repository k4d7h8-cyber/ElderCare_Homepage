"use client";

import Link from "next/link";
import { useState } from "react";

import { EmptyState } from "@/components/common/PageStates";
import type { NoticeListItem } from "@/types/subpage";

type NoticesListPageContentProps = {
  notices: NoticeListItem[];
};

const pageSize = 6;

export function NoticesListPageContent({ notices }: NoticesListPageContentProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const visibleNotices = notices.slice(0, visibleCount);
  const canLoadMore = visibleCount < notices.length;

  if (notices.length === 0) {
    return <EmptyState title="등록된 공지사항이 없습니다" />;
  }

  return (
    <section id="notice-list" className="scroll-mt-28 rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <div className="hidden grid-cols-[96px_1fr_140px] bg-surface px-5 py-4 text-sm font-bold text-textMain md:grid">
          <span>구분</span>
          <span>제목</span>
          <span>작성일</span>
        </div>
        <div className="divide-y divide-slate-100">
          {visibleNotices.map((notice) => (
            <article
              key={notice.id}
              className="grid gap-2 px-5 py-5 md:grid-cols-[96px_1fr_140px] md:items-center md:gap-0"
            >
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                  notice.isPinned
                    ? "bg-primary/10 text-primary"
                    : "bg-surface text-textSub"
                }`}
              >
                {notice.isPinned ? "상단고정" : "일반"}
              </span>
              <div>
                <Link
                  href={`/notices/${notice.id}`}
                  className="font-bold text-textMain transition hover:text-primary"
                >
                  {notice.title}
                </Link>
                <p className="mt-2 line-clamp-1 text-sm text-textSub">{notice.summary}</p>
              </div>
              <p className="text-sm font-medium text-textSub">{notice.publishedAt}</p>
            </article>
          ))}
        </div>
      </div>

      {canLoadMore ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + pageSize)}
            className="rounded-full border border-primary/30 bg-white px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary/5"
          >
            더 보기
          </button>
        </div>
      ) : null}
    </section>
  );
}
