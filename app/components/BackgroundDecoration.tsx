"use client";

export default function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#020817]" />

      {/* Top-left cyan blob */}
      <div
        className="animate-blob-drift absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.8) 0%, rgba(34,211,238,0) 70%)",
          animationDelay: "0s",
        }}
      />

      {/* Top-right purple blob */}
      <div
        className="animate-blob-drift absolute -top-20 right-0 w-[500px] h-[500px] rounded-full opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.9) 0%, rgba(168,85,247,0) 70%)",
          animationDelay: "-4s",
        }}
      />

      {/* Mid-left small cyan */}
      <div
        className="animate-blob-drift absolute top-[45%] -left-20 w-[350px] h-[350px] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.7) 0%, rgba(34,211,238,0) 70%)",
          animationDelay: "-8s",
        }}
      />

      {/* Bottom-right purple blob */}
      <div
        className="animate-blob-drift absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(168,85,247,0) 70%)",
          animationDelay: "-2s",
        }}
      />

      {/* Bottom-center magenta accent */}
      <div
        className="animate-blob-drift absolute bottom-[20%] left-[40%] w-[300px] h-[300px] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.9) 0%, rgba(236,72,153,0) 70%)",
          animationDelay: "-6s",
        }}
      />

      {/* Grid dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(34,211,238,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Subtle scan lines / noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.05) 2px, rgba(34,211,238,0.05) 4px)",
        }}
      />

      {/* Particles (static positioned dots) */}
      {[
        { top: "15%", left: "8%", size: 2, delay: 0 },
        { top: "35%", left: "92%", size: 1.5, delay: 1 },
        { top: "55%", left: "5%", size: 2, delay: 2 },
        { top: "75%", left: "85%", size: 1, delay: 0.5 },
        { top: "20%", left: "70%", size: 1.5, delay: 1.5 },
        { top: "80%", left: "20%", size: 2, delay: 2.5 },
        { top: "10%", left: "50%", size: 1, delay: 0.8 },
        { top: "65%", left: "60%", size: 1.5, delay: 1.8 },
        { top: "42%", left: "35%", size: 1, delay: 3 },
        { top: "90%", left: "48%", size: 1.5, delay: 0.3 },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-glow-pulse"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size * 2}px`,
            height: `${p.size * 2}px`,
            background:
              i % 2 === 0
                ? "rgba(34,211,238,0.7)"
                : "rgba(168,85,247,0.7)",
            animationDelay: `${p.delay}s`,
            boxShadow:
              i % 2 === 0
                ? "0 0 6px rgba(34,211,238,0.8)"
                : "0 0 6px rgba(168,85,247,0.8)",
          }}
        />
      ))}
    </div>
  );
}
