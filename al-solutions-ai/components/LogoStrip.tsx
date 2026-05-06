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
    <section aria-label="Trusted by leading teams" className="w-full space-y-8 sm:space-y-10 md:space-y-12">
      {/* Header with visual hierarchy */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent-400/10 px-3 py-1 sm:px-4 sm:py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-accent-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-400">Social Proof</span>
        </div>
        <div>
          <h2 className="text-xl font-bold leading-tight text-text-primary sm:text-2xl md:text-3xl">
            Trusted by teams shipping
          </h2>
          <p className="mt-1 bg-gradient-to-r from-accent-400 via-accent-300 to-accent-400 bg-clip-text text-lg font-bold text-transparent sm:text-xl md:text-2xl">
            customer-facing AI
          </p>
        </div>
      </div>

      {/* Desktop: Professional grid layout */}
      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-7 gap-4">
        {items.map((item) => (
          <div
            className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-border-subtle bg-gradient-to-br from-bg-surface to-bg-surface/50 p-4 transition-all duration-300 hover:border-accent-400 hover:shadow-xl hover:shadow-accent-400/10 hover:bg-bg-surface"
            key={item.name}
          >
            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
            
            <div className="relative h-7 w-full">
              <Image
                alt={item.name}
                className="object-contain grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-110"
                fill
                sizes="120px"
                src={item.logoSrc}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tablet: 3-column grid */}
      <div className="hidden sm:grid md:hidden grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            className="group relative flex items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-gradient-to-br from-bg-surface to-bg-surface/50 p-4 transition-all duration-300 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-400/10"
            key={item.name}
          >
            <div className="relative h-6 w-full">
              <Image
                alt={item.name}
                className="object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                fill
                sizes="120px"
                src={item.logoSrc}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Horizontal scrollable with premium styling */}
      <div className="sm:hidden">
        <div
          className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((item) => (
            <div
              className="group flex h-14 w-36 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-gradient-to-br from-bg-surface to-bg-surface/50 p-3 transition-all duration-300 active:scale-95 active:border-accent-400"
              key={item.name}
            >
              <div className="relative h-5 w-full">
                <Image
                  alt={item.name}
                  className="object-contain grayscale transition-all duration-300 group-active:grayscale-0"
                  fill
                  sizes="120px"
                  src={item.logoSrc}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-text-tertiary">Swipe to explore</p>
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
