import type { HomePageData } from "@/types/home";

type HomeHeroProps = {
  data: HomePageData;
};

export function HomeHero({ data }: HomeHeroProps) {
  return (
    <section className="bg-surface flex flex-col items-center justify-center px-6 py-24 text-center min-h-[60vh]">
      <p className="mb-4 text-sm font-medium text-textSub tracking-widest uppercase">
        HERO 영역
      </p>
      <h1 className="text-4xl font-bold leading-tight text-textMain md:text-5xl">
        {data.hero.title}
      </h1>
      <p className="mt-4 text-base text-textSub md:text-lg">
        {data.hero.description}
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
        <button className="rounded-full border border-primary/40 bg-primary/10 px-8 py-3 font-medium text-primary transition hover:bg-primary/20">
          {data.hero.primaryActionLabel}
        </button>
        <button className="rounded-full border border-gray-300 bg-white px-8 py-3 font-medium text-textMain transition hover:border-gray-400">
          {data.hero.secondaryActionLabel}
        </button>
      </div>
    </section>
  );
}