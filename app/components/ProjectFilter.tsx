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
                ? "linear-gradient(135deg, var(--badge-bg), var(--badge-purple))"
                : "var(--badge-subtle)",
              border: isActive
                ? "1px solid var(--border-cyan)"
                : "1px solid var(--border-subtle)",
              color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
              boxShadow: isActive
                ? "0 0 12px var(--cyan-glow)"
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
                    "linear-gradient(135deg, var(--badge-subtle), var(--badge-purple))",
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
