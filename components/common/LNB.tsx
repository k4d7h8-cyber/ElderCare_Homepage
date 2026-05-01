export type LnbMenuItem = {
  label: string;
  targetId: string;
};

export type LnbMenu = {
  id: string;
  label: string;
  items: LnbMenuItem[];
};

type LNBProps = {
  menu: LnbMenu;
  onNavigate: (targetId: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function LNB({ menu, onNavigate, onMouseEnter, onMouseLeave }: LNBProps) {
  return (
    <div
      className="absolute left-0 right-0 top-full z-40 border-t border-slate-100 bg-white/95 shadow-lg backdrop-blur"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 md:flex-row md:items-start">
        <div className="shrink-0 md:w-44">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Sub Menu
          </p>
          <p className="mt-2 text-xl font-bold text-textMain">{menu.label}</p>
        </div>

        <div className="flex flex-1 flex-wrap gap-2">
          {menu.items.map((item) => (
            <button
              key={item.targetId}
              type="button"
              className="rounded-2xl border border-slate-100 bg-surface px-4 py-3 text-left text-sm font-semibold leading-relaxed text-textMain transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              onClick={() => onNavigate(item.targetId)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
