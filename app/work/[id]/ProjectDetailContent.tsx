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

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  Web: { bg: "rgba(34,211,238,0.12)", border: "rgba(34,211,238,0.3)", text: "var(--cyan)" },
  "Data & AI": { bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.3)", text: "var(--purple)" },
  Programming: { bg: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.25)", text: "var(--magenta)" },
  Tools: { bg: "rgba(250,204,21,0.1)", border: "rgba(250,204,21,0.25)", text: "#fbbf24" },
};

interface Props {
  project: Project;
  readme: string | null;
}

export default function ProjectDetailContent({ project, readme }: Props) {
  const [imgError, setImgError] = useState(false);
  const colors = categoryColors[project.category] || categoryColors["Web"];
  const hasGithub = Boolean(project.githubUrl);
  const hasLive = Boolean(project.liveUrl);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-primary)", fontFamily: "var(--font-jakarta)" }}
    >
      {/* Fixed background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.04] animate-blob-drift"
          style={{ background: "radial-gradient(circle, var(--cyan), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.04] animate-blob-drift"
          style={{ background: "radial-gradient(circle, var(--purple), transparent 70%)", animationDelay: "4s" }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/#work"
            className="back-link inline-flex items-center gap-2 text-sm transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          {/* Category badge */}
          <div className="mb-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
            >
              {project.category}
            </span>
          </div>

          {/* Title — uses CSS var so light mode works */}
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight break-words"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}
          >
            {project.name}
          </h1>

          <p
            className="text-sm sm:text-base leading-relaxed mb-5 max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          {project.tech.length > 0 && !project.tech[0].startsWith("Add") && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="tech-tag px-3 py-1 rounded-md text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
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
                className="btn-cyan inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                aria-label={`Live demo — ${project.name}`}
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
            {project.statusLabel && (
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.25)", color: "#b45309" }}
              >
                🔒 {project.statusLabel}
              </span>
            )}
          </div>
        </motion.div>

        {/* Thumbnail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full rounded-xl overflow-hidden mb-8"
          style={{
            height: "clamp(180px, 38vw, 420px)",
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {!imgError ? (
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className={project.objectFit === "contain" ? "object-contain p-6" : "object-cover"}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="text-4xl font-bold"
                style={{
                  background: "linear-gradient(135deg, var(--cyan), var(--purple))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {project.shortName?.slice(0, 2).toUpperCase() || project.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </motion.div>

        {/* Content — README or fallback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {readme ? (
            /* ── README from GitHub ── */
            <div
              className="glass-card p-5 sm:p-8"
              style={{ border: "1px solid var(--border-subtle)" }}
            >
              <div
                className="flex items-center gap-2 mb-6 pb-4"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <FaGithub size={16} style={{ color: "var(--text-secondary)" }} />
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  README.md
                </span>
              </div>
              <div className="prose-custom overflow-hidden">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                  components={{
                    h1: ({ children }) => (
                      <h2
                        className="text-xl sm:text-2xl font-bold mb-4 mt-6 first:mt-0 break-words"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {children}
                      </h2>
                    ),
                    h2: ({ children }) => (
                      <h3
                        className="text-lg sm:text-xl font-bold mb-3 mt-6 break-words"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {children}
                      </h3>
                    ),
                    h3: ({ children }) => (
                      <h4
                        className="text-base sm:text-lg font-semibold mb-2 mt-4 break-words"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {children}
                      </h4>
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
                      <ul className="list-none space-y-2 mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol
                        className="list-decimal list-inside space-y-2 mb-4 text-sm sm:text-base"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li
                        className="flex items-start gap-2 text-sm sm:text-base"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--cyan)", opacity: 0.7 }}
                        />
                        <span className="break-words min-w-0">{children}</span>
                      </li>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 transition-colors break-all"
                        style={{ color: "var(--cyan)" }}
                      >
                        {children}
                      </a>
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
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre
                        className="rounded-lg p-4 mb-4 overflow-x-auto text-xs sm:text-sm"
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
                        className="pl-4 my-4 italic text-sm sm:text-base"
                        style={{
                          borderLeft: "3px solid var(--border-cyan)",
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
                        alt={alt || ""}
                        className="rounded-lg max-w-full my-4"
                        style={{ border: "1px solid var(--border-subtle)" }}
                      />
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4 -mx-1">
                        <table className="w-full text-xs sm:text-sm min-w-[320px]">{children}</table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th
                        className="text-left px-3 py-2 font-semibold text-xs tracking-wider uppercase whitespace-nowrap"
                        style={{
                          color: "var(--cyan)",
                          borderBottom: "1px solid var(--border-cyan)",
                        }}
                      >
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td
                        className="px-3 py-2 text-xs sm:text-sm"
                        style={{
                          color: "var(--text-secondary)",
                          borderBottom: "1px solid var(--border-subtle)",
                        }}
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
              className="glass-card p-5 sm:p-8"
              style={{ border: "1px solid var(--border-subtle)" }}
            >
              <div
                className="flex items-center gap-2 mb-6 pb-4"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
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
                    className="text-sm font-semibold mb-4 tracking-wider uppercase"
                    style={{ color: "var(--text-primary)" }}
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
                        <span className="break-words">{h}</span>
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

        {/* Bottom nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-6 flex justify-start"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <Link
            href="/#work"
            className="back-link inline-flex items-center gap-2 text-sm transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to all projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
