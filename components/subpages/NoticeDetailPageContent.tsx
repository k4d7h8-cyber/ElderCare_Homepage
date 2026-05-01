import Link from "next/link";

import type { NoticeDetail } from "@/types/subpage";

type NoticeDetailPageContentProps = {
  notice: NoticeDetail;
};

export function NoticeDetailPageContent({ notice }: NoticeDetailPageContentProps) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <div className="border-b border-slate-100 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {notice.isPinned ? (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              상단고정
            </span>
          ) : null}
          <span className="text-sm font-semibold text-textSub">{notice.publishedAt}</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-textMain md:text-4xl">{notice.title}</h1>
        <p className="mt-3 text-sm leading-6 text-textSub">{notice.summary}</p>
      </div>

      <div className="min-h-56 whitespace-pre-line py-8 text-base leading-8 text-textMain">
        {notice.content}
      </div>

      <section className="rounded-2xl bg-surface p-5">
        <h2 className="font-bold text-textMain">첨부파일</h2>
        {notice.attachments.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {notice.attachments.map((attachment) => (
              <li key={attachment.name}>
                <a
                  href={attachment.url}
                  className="text-sm font-semibold text-primary transition hover:text-primaryDark"
                >
                  {attachment.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-textSub">등록된 첨부파일이 없습니다.</p>
        )}
      </section>

      <nav className="mt-6 grid gap-3 md:grid-cols-2" aria-label="이전글 다음글">
        {notice.previousId ? (
          <Link
            href={`/notices/${notice.previousId}`}
            className="rounded-2xl border border-slate-100 p-4 text-sm font-bold text-textMain transition hover:border-primary/30 hover:text-primary"
          >
            이전글 보기
          </Link>
        ) : (
          <div className="rounded-2xl border border-slate-100 p-4 text-sm text-textSub">
            이전글이 없습니다
          </div>
        )}
        {notice.nextId ? (
          <Link
            href={`/notices/${notice.nextId}`}
            className="rounded-2xl border border-slate-100 p-4 text-sm font-bold text-textMain transition hover:border-primary/30 hover:text-primary md:text-right"
          >
            다음글 보기
          </Link>
        ) : (
          <div className="rounded-2xl border border-slate-100 p-4 text-sm text-textSub md:text-right">
            다음글이 없습니다
          </div>
        )}
      </nav>

      <div className="mt-6">
        <Link
          href="/notices"
          className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primaryDark"
        >
          목록으로
        </Link>
      </div>
    </article>
  );
}
