import { SectionSkeleton } from "@/components/common/PageStates";

export default function NoticesLoading() {
  return (
    <main className="min-h-screen bg-surface px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-5">
        <SectionSkeleton />
        <SectionSkeleton />
      </div>
    </main>
  );
}
