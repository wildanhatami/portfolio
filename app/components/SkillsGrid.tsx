"use client";

import { motion } from "framer-motion";
import { skills } from "@/app/data/skills";
import { useTheme } from "@/app/context/ThemeContext";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPython,
  SiFigma,
} from "react-icons/si";

const iconMap: Record<string, React.ElementType> = {
  SiHtml5,
  SiCss3: SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPython,
  SiFigma,
};

export default function SkillsGrid() {
  const { theme } = useTheme();

  return (
    <div>
      <h3
        className="text-sm font-bold tracking-widest uppercase mb-4"
        style={{ fontFamily: "var(--font-jakarta)", color: "var(--text-primary)" }}
      >
        Skills
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {skills.map((skill, i) => {
          const isTargetSkill = skill.id === "nextjs" || skill.id === "github";
          const skillColor = theme === "light" && isTargetSkill ? "#000000" : skill.color;

          const IconComponent =
            skill.iconType === "react-icon" && skill.iconKey
              ? iconMap[skill.iconKey]
              : null;

          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-default transition-all duration-200"
              style={{
                background: "var(--badge-subtle)",
                border: "1px solid var(--border-subtle)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = `${skillColor}60`;
                el.style.boxShadow = `0 0 12px ${skillColor}25`;
                el.style.background = `${skillColor}10`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--border-subtle)";
                el.style.boxShadow = "none";
                el.style.background = "var(--badge-subtle)";
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {IconComponent ? (
                  <IconComponent size={24} style={{ color: skillColor }} />
                ) : (
                  <span className="text-xs font-bold" style={{ color: skillColor }}>
                    {skill.abbr || skill.name.slice(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
              <span
                className="text-[10px] text-center leading-tight font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
