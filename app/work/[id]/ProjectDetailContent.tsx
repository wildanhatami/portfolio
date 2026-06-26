"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Project } from "@/app/data/projects";
import "highlight.js/styles/github-dark.css";

const categoryConfig: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  Web: {
    bg: "rgba(34,211,238,0.10)",
    border: "rgba(34,211,238,0.35)",
    text: "var(--cyan)",
    glow: "rgba(34,211,238,0.15)",
  },
  "Data & AI": {
    bg: "rgba(168,85,247,0.10)",
    border: "rgba(168,85,247,0.35)",
    text: "var(--purple)",
    glow: "rgba(168,85,247,0.15)",
  },
  Programming: {
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.30)",
    text: "var(--magenta)",
    glow: "rgba(236,72,153,0.12)",
  },
  Tools: {
    bg: "rgba(250,204,21,0.08)",
    border: "rgba(250,204,21,0.28)",
    text: "#d97706",
    glow: "rgba(250,204,21,0.10)",
  },
};

interface Props {
  project: Project;
  readme: string | null;
}

export default function ProjectDetailContent({ project, readme }: Props) {
  const [imgError, setImgError] = useState(false);
  const cat = categoryConfig[project.category] || categoryConfig["Web"];
  const hasGithub = Boolean(project.githubUrl);
  const hasLive = Boolean(project.liveUrl);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full opacity-[0.05] animate-blob-drift"
          style={{ background: `radial-gradient(circle, var(--cyan), transparent 65%)` }}
        />
        <div
          className="absolute -bottom-60 -left-60 w-[600px] h-[600px] rounded-full opacity-[0.05] animate-blob-drift"
          style={{ background: `radial-gradient(circle, var(--purple), transparent 65%)`, animationDelay: "4s" }}
        />
      </div>

      {/* ── HERO THUMBNAIL — full width ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(220px, 45vw, 560px)" }}
      >
        {!imgError ? (
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            priority
            sizes="100vw"
            className={project.objectFit === "contain" ? "object-contain" : "object-cover"}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--bg-secondary)" }}
          >
            <span
              className="font-bold"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                background: "linear-gradient(135deg, var(--cyan), var(--purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {project.shortName?.slice(0, 2).toUpperCase() ?? project.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Gradient overlay bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
          }}
        />

        {/* Back button overlaid on hero */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:left-8 z-10"
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium group transition-all duration-200"
            style={{
              background: "rgba(2,8,23,0.65)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>
        </motion.div>

        {/* Category badge overlaid */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:right-8 z-10"
        >
          <span
            className="px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: cat.bg,
              border: `1px solid ${cat.border}`,
              color: cat.text,
              backdropFilter: "blur(12px)",
            }}
          >
            {project.category}
          </span>
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">

        {/* ── Header card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-card p-5 sm:p-7 lg:p-8 mb-6"
          style={{ border: `1px solid ${cat.border}` }}
        >
          {/* Two-column layout on desktop: title + actions left, meta right */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">

            {/* Left — title + description + tags */}
            <div className="flex-1 min-w-0">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 break-words"
                style={{ color: "var(--text-primary)" }}
              >
                {project.name}
              </h1>

              <p
                className="text-sm sm:text-base leading-relaxed mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.description}
              </p>

              {/* Tech tags */}
              {project.tech.length > 0 && !project.tech[0].startsWith("Add") && (
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag px-3 py-1 rounded-md text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right — action buttons (stacked vertically on desktop, horizontal on mobile) */}
            <div className="flex lg:flex-col gap-3 flex-wrap mt-5 lg:mt-0 lg:min-w-[180px] lg:shrink-0">
              {hasGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap"
                  aria-label={`GitHub — ${project.name}`}
                >
                  <FaGithub size={15} />
                  View on GitHub
                </a>
              )}
              {hasLive && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyan inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap"
                  aria-label={`Live demo — ${project.name}`}
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>
              )}
              {project.statusLabel && (
                <span
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap"
                  style={{
                    background: "rgba(250,204,21,0.08)",
                    border: "1px solid rgba(250,204,21,0.25)",
                    color: "#b45309",
                  }}
                >
                  🔒 {project.statusLabel}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Content — README or fallback ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {readme ? (
            <div
              className="glass-card p-5 sm:p-7 lg:p-8"
              style={{ border: "1px solid var(--border-subtle)" }}
            >
              {/* README header */}
              <div
                className="flex items-center gap-2 mb-6 pb-4"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <FaGithub size={15} style={{ color: "var(--text-secondary)" }} />
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  README.md
                </span>
              </div>

              <div className="overflow-hidden">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    h1: ({ children }) => (
                      <h2
                        className="text-xl sm:text-2xl font-bold mb-4 mt-8 first:mt-0 break-words pb-2"
                        style={{
                          color: "var(--text-primary)",
                          borderBottom: "1px solid var(--border-subtle)",
                        }}
                      >
                        {children}
                      </h2>
                    ),
                    h2: ({ children }) => (
                      <h3
                        className="text-lg sm:text-xl font-bold mb-3 mt-7 break-words"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {children}
                      </h3>
                    ),
                    h3: ({ children }) => (
                      <h4
                        className="text-base sm:text-lg font-semibold mb-2 mt-5 break-words"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {children}
                      </h4>
                    ),
                    h4: ({ children }) => (
                      <h5
                        className="text-sm sm:text-base font-semibold mb-2 mt-4 break-words"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {children}
                      </h5>
                    ),
                    p: ({ children }) => (
                      <p
                        className="leading-relaxed mb-4 break-words text-sm sm:text-base"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-none space-y-2 mb-4 pl-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol
                        className="list-decimal list-inside space-y-2 mb-4 text-sm sm:text-base pl-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li
                        className="flex items-start gap-2.5 text-sm sm:text-base"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--cyan)", opacity: 0.75 }}
                        />
                        <span className="break-words min-w-0 leading-relaxed">{children}</span>
                      </li>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 transition-colors hover:opacity-80 break-all"
                        style={{ color: "var(--cyan)" }}
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em style={{ color: "var(--text-secondary)" }}>{children}</em>
                    ),
                    code: ({ className, children, ...props }) => {
                      const isInline = !className;
                      if (isInline) {
                        return (
                          <code
                            className="px-1.5 py-0.5 rounded text-xs font-mono break-all"
                            style={{
                              color: "var(--cyan)",
                              background: "var(--badge-bg)",
                              border: "1px solid var(--border-cyan)",
                            }}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }
                      return <code className={className} {...props}>{children}</code>;
                    },
                    pre: ({ children }) => (
                      <pre
                        className="rounded-xl p-4 sm:p-5 mb-4 overflow-x-auto text-xs sm:text-sm leading-relaxed"
                        style={{
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote
                        className="pl-4 my-4 italic text-sm sm:text-base rounded-r-lg py-2"
                        style={{
                          borderLeft: "3px solid var(--cyan)",
                          background: "var(--badge-subtle)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {children}
                      </blockquote>
                    ),
                    img: ({ src, alt }) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={src}
                        alt={alt ?? ""}
                        className="rounded-xl max-w-full my-4 mx-auto block"
                        style={{ border: "1px solid var(--border-subtle)" }}
                      />
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-5 rounded-lg" style={{ border: "1px solid var(--border-subtle)" }}>
                        <table className="w-full text-xs sm:text-sm min-w-[320px]">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead style={{ background: "var(--bg-secondary)" }}>{children}</thead>
                    ),
                    th: ({ children }) => (
                      <th
                        className="text-left px-4 py-3 font-semibold text-xs tracking-wider uppercase whitespace-nowrap"
                        style={{ color: "var(--cyan)", borderBottom: "1px solid var(--border-subtle)" }}
                      >
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td
                        className="px-4 py-3 text-xs sm:text-sm"
                        style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)" }}
                      >
                        {children}
                      </td>
                    ),
                    hr: () => (
                      <hr className="my-6" style={{ borderColor: "var(--border-subtle)" }} />
                    ),
                  }}
                >
                  {readme}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            /* ── Fallback static content ── */
            <div
              className="glass-card p-5 sm:p-7 lg:p-8"
              style={{ border: "1px solid var(--border-subtle)" }}
            >
              <div
                className="flex items-center gap-2 mb-6 pb-4"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Project Overview
                </span>
              </div>

              {project.longDescription && (
                <p
                  className="leading-relaxed mb-6 text-sm sm:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.longDescription}
                </p>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3
                    className="text-xs font-bold mb-4 tracking-widest uppercase"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm sm:text-base"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <CheckCircle2
                          size={16}
                          className="shrink-0 mt-0.5"
                          style={{ color: "var(--cyan)" }}
                        />
                        <span className="break-words leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!project.longDescription && !project.highlights && (
                <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
                  Detail project ini tidak tersedia secara publik.
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Bottom nav ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 pt-6 flex justify-between items-center"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <Link
            href="/#work"
            className="back-link inline-flex items-center gap-2 text-sm font-medium transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to all projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
