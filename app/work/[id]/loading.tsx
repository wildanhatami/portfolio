export default function Loading() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Hero thumbnail skeleton */}
      <div
        className="w-full skeleton-shimmer relative"
        style={{ height: "clamp(220px, 45vw, 560px)" }}
      >
        {/* Gradient fade bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">

        {/* Header card skeleton */}
        <div
          className="rounded-xl p-5 sm:p-7 lg:p-8 mb-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="flex-1">
              <div className="h-8 sm:h-10 w-4/5 rounded-lg mb-3 skeleton-shimmer" />
              <div className="h-4 w-full rounded mb-2 skeleton-shimmer" />
              <div className="h-4 w-3/4 rounded mb-5 skeleton-shimmer" />
              <div className="flex flex-wrap gap-2">
                {[64, 80, 72, 88].map((w, i) => (
                  <div key={i} className="h-7 rounded-md skeleton-shimmer" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
            <div className="flex lg:flex-col gap-3 flex-wrap mt-5 lg:mt-0 lg:min-w-[180px] lg:shrink-0">
              <div className="h-10 w-40 rounded-lg skeleton-shimmer" />
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div
          className="rounded-xl p-5 sm:p-7 lg:p-8"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="h-4 w-28 rounded mb-6 skeleton-shimmer" />
          {[100, 95, 88, 72, 90, 60, 82, 76].map((w, i) => (
            <div key={i} className="h-4 rounded mb-3 skeleton-shimmer" style={{ width: `${w}%` }} />
          ))}
          <div className="h-28 rounded-xl mt-6 skeleton-shimmer" />
          {[88, 74, 82].map((w, i) => (
            <div key={i} className="h-4 rounded mt-3 skeleton-shimmer" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
