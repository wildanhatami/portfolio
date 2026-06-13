"use client";

import { motion } from "framer-motion";
import { skills } from "@/app/data/skills";

// Dynamically import react-icons
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
  return (
    <div>
      <h3
        className="text-sm font-bold text-white tracking-widest uppercase mb-4"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        Skills
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {skills.map((skill, i) => {
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
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = `${skill.color}40`;
                el.style.boxShadow = `0 0 12px ${skill.color}20`;
                el.style.background = `${skill.color}08`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {IconComponent ? (
                  <IconComponent
                    size={24}
                    style={{ color: skill.color }}
                  />
                ) : (
                  <span
                    className="text-xs font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.abbr || skill.name.slice(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#8ca0bc] text-center leading-tight font-medium">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
