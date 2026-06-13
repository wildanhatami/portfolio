"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Lock, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/app/data/projects";

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  Web: {
    bg: "rgba(34,211,238,0.12)",
    border: "rgba(34,211,238,0.3)",
    text: "#22d3ee",
  },
  "Data & AI": {
    bg: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.3)",
    text: "#a855f7",
  },
  Programming: {
    bg: "rgba(236,72,153,0.1)",
    border: "rgba(236,72,153,0.25)",
    text: "#ec4899",
  },
  Tools: {
    bg: "rgba(250,204,21,0.1)",
    border: "rgba(250,204,21,0.25)",
    text: "#fbbf24",
  },
};

function ThumbnailFallback({ name }: { name: string }) {
  const words = name.split(" ").slice(0, 3);
  const abbr = words.map((w) => w[0]).join("").toUpperCase().slice(0, 3);
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-card), var(--badge-subtle), var(--badge-purple))",
      }}
    >
      <div
        className="text-2xl font-bold gradient-text mb-1"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        {abbr}
      </div>
      <div className="text-[9px] tracking-widest text-center px-4" style={{ color: "var(--text-muted)" }}>
        {name}
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  const colors = categoryColors[project.category] || categoryColors["Web"];

  const hasGithub = Boolean(project.githubUrl);
  const hasLive = Boolean(project.liveUrl);
  const hasNoLinks = !hasGithub && !hasLive;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group glass-card overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 24px var(--cyan-glow), 0 8px 32px rgba(0,0,0,0.4)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-cyan)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-44 overflow-hidden shrink-0 m-2 rounded-lg"
        style={{
          background:
            project.objectFit === "contain"
              ? "var(--bg-card)"
              : "var(--bg-secondary)",
          backdropFilter: project.objectFit === "contain" ? "blur(12px)" : undefined,
          WebkitBackdropFilter: project.objectFit === "contain" ? "blur(12px)" : undefined,
        }}
      >
        {!imgError ? (
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`${
              project.objectFit === "contain"
                ? "object-contain p-3"
                : "object-cover"
            } group-hover:scale-105 transition-transform duration-500`}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <ThumbnailFallback name={project.shortName || project.name} />
        )}

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"
            style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Private label */}
        {hasNoLinks && project.statusLabel && (
          <div className="absolute top-2 right-2">
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-medium flex items-center gap-1"
              style={{
                background: "rgba(250,204,21,0.1)",
                border: "1px solid rgba(250,204,21,0.2)",
                color: "#fbbf24",
              }}
            >
              <Lock size={8} />
              {project.statusLabel}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-sm mb-2 transition-colors leading-snug"
          style={{ fontFamily: "var(--font-jakarta)", color: "var(--text-primary)" }}
        >
          {project.name}
        </h3>
        <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        {/* Tech tags */}
        {project.tech.length > 0 && !project.tech[0].startsWith("Tambahkan") && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                style={{
                  color: "var(--text-secondary)",
                  background: "var(--badge-subtle)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] flex items-center" style={{ color: "var(--text-muted)" }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto flex-wrap">
          {/* Detail button — always shown */}
          <Link
            href={`/work/${project.id}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              background: "var(--badge-purple)",
              border: "1px solid var(--border-purple)",
              color: "var(--purple)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--badge-bg)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "var(--badge-purple)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--purple)";
            }}
            aria-label={`View detail for ${project.name}`}
          >
            <BookOpen size={13} />
            Detail
          </Link>
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{ border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--badge-subtle)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
              }}
              aria-label={`View GitHub repository for ${project.name}`}
            >
              <FaGithub size={13} />
              GitHub
            </a>
          )}
          {hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                color: "var(--cyan)",
                background: "var(--badge-subtle)",
                border: "1px solid var(--border-subtle)",
              }}
              aria-label={`View live demo for ${project.name}`}
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
