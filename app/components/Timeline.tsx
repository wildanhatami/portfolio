"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Code2,
  Rocket,
  Briefcase,
  Star,
} from "lucide-react";
import { timelineEntries, TimelineEntry } from "@/app/data/timeline";

const iconMap: Record<TimelineEntry["icon"], React.ElementType> = {
  GraduationCap,
  BookOpen,
  Code2,
  Rocket,
  Briefcase,
  Star,
};

export default function Timeline() {
  return (
    <div className="mt-10">
      <h3
        className="text-sm font-bold text-white tracking-widest uppercase mb-8"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        Timeline
      </h3>

      {/* Desktop: horizontal layout */}
      <div className="hidden md:block relative">
        {/* Gradient line */}
        <div
          className="absolute top-5 left-0 right-0 h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #22d3ee, #a855f7, #22d3ee)",
          }}
        />

        <div className="grid grid-cols-4 gap-4 relative">
          {timelineEntries.map((entry, i) => {
            const Icon = iconMap[entry.icon];
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-start pt-10 relative"
              >
                {/* Milestone dot + icon */}
                <div
                  className="absolute top-0 left-4 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.15))",
                    border: "2px solid rgba(34,211,238,0.5)",
                    boxShadow: "0 0 12px rgba(34,211,238,0.25)",
                  }}
                >
                  <Icon size={16} className="text-cyan-400" />
                </div>

                {/* Year */}
                <span
                  className="text-xs font-bold text-[#22d3ee] tracking-wider mb-1"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {entry.year}
                </span>
                <h4 className="text-sm font-semibold text-white mb-1 leading-tight">
                  {entry.title}
                </h4>
                <p className="text-xs text-[#8ca0bc] leading-relaxed">
                  {entry.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical layout */}
      <div className="md:hidden flex flex-col gap-0">
        {timelineEntries.map((entry, i) => {
          const Icon = iconMap[entry.icon];
          const isLast = i === timelineEntries.length - 1;
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-4"
            >
              {/* Line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.15))",
                    border: "2px solid rgba(34,211,238,0.5)",
                    boxShadow: "0 0 10px rgba(34,211,238,0.2)",
                  }}
                >
                  <Icon size={15} className="text-cyan-400" />
                </div>
                {!isLast && (
                  <div
                    className="w-[2px] flex-1 my-1"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(34,211,238,0.4), rgba(168,85,247,0.2))",
                      minHeight: "32px",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                <span className="text-xs font-bold text-[#22d3ee] tracking-wider">
                  {entry.year}
                </span>
                <h4 className="text-sm font-semibold text-white mt-0.5 mb-1">
                  {entry.title}
                </h4>
                <p className="text-xs text-[#8ca0bc] leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
