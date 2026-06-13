"use client";

import { motion } from "framer-motion";
import { ProjectCategory } from "@/app/data/projects";

const categories: { label: string; value: "All" | ProjectCategory }[] = [
  { label: "All", value: "All" },
  { label: "Web", value: "Web" },
  { label: "Data & AI", value: "Data & AI" },
  { label: "Programming", value: "Programming" },
  { label: "Tools", value: "Tools" },
];

interface ProjectFilterProps {
  active: "All" | ProjectCategory;
  onChange: (category: "All" | ProjectCategory) => void;
}

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = active === cat.value;
        return (
          <motion.button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={{
              background: isActive
                ? "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.2))"
                : "rgba(255,255,255,0.04)",
              border: isActive
                ? "1px solid rgba(34,211,238,0.4)"
                : "1px solid rgba(255,255,255,0.08)",
              color: isActive ? "#e2eaf4" : "#8ca0bc",
              boxShadow: isActive
                ? "0 0 12px rgba(34,211,238,0.1)"
                : "none",
            }}
          >
            {cat.label}
            {isActive && (
              <motion.span
                layoutId="filter-indicator"
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,211,238,0.05), rgba(168,85,247,0.05))",
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
