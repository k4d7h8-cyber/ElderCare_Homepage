export function SectionSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="h-4 w-24 animate-pulse rounded-full bg-slate-100" />
      <div className="h-7 w-2/3 animate-pulse rounded-full bg-slate-100" />
      <div className="space-y-2">
        <div className="h-4 animate-pulse rounded-full bg-slate-100" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "표시할 내용이 없습니다",
  description = "관리자 페이지에서 콘텐츠를 등록하면 이 영역에 표시됩니다.",
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
      <p className="text-base font-bold text-textMain">{title}</p>
      <p className="mt-2 text-sm leading-6 text-textSub">{description}</p>
    </div>
  );
}
