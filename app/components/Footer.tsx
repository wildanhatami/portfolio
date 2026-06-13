"use client";

import { ChevronUp } from "lucide-react";
import { profile } from "@/app/data/profile";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative section-padding py-8"
      style={{
        borderTop: "1px solid rgba(34,211,238,0.08)",
        background: "rgba(2,8,23,0.8)",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,211,238,0.3), rgba(168,85,247,0.2), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <p className="text-xs text-[#4a5c74] text-center sm:text-left">
          © {currentYear}{" "}
          <span className="text-[#8ca0bc]">{profile.fullName}</span>. All
          rights reserved.
        </p>

        {/* Center: Social Links */}
        <SocialLinks size="sm" />

        {/* Right: Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-xs text-[#4a5c74] hover:text-cyan-400 transition-all duration-200 group"
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <span
            className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:bg-[rgba(34,211,238,0.1)] group-hover:border-[rgba(34,211,238,0.25)]"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <ChevronUp size={12} />
          </span>
        </button>
      </div>
    </footer>
  );
}
