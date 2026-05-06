import Image from "next/image";

type LogoItem = {
  readonly name: string;
  readonly logoSrc: string;
};

interface LogoStripProps {
  readonly items: LogoItem[];
}

export function LogoStrip({ items }: LogoStripProps) {
  return (
    <section aria-label="Trusted by teams shipping customer-facing AI" className="w-full">
      <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">Trusted by teams shipping customer-facing AI</p>

      <div
        className="no-scrollbar mt-4 -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item) => (
          <div
            className="group flex h-10 w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border-subtle bg-bg-surface p-1.5 grayscale opacity-50 transition duration-200 hover:opacity-100 hover:grayscale-0"
            key={item.name}
          >
            <div className="relative h-7 w-[108px] transition-transform duration-200 group-hover:scale-[1.03]">
              <Image alt={item.name} fill className="object-contain" sizes="108px" src={item.logoSrc} />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
