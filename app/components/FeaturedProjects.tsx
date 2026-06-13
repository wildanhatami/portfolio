"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { featuredProjects } from "@/app/data/projects";

function ProjectThumbnail({
  src,
  alt,
  shortName,
  objectFit = "cover",
  priority = false,
}: {
  src: string;
  alt: string;
  shortName: string;
  objectFit?: "cover" | "contain";
  priority?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(8,20,45,0.9), rgba(34,211,238,0.08), rgba(168,85,247,0.08))",
        }}
      >
        <div className="text-center p-4">
          <div className="text-xs font-semibold gradient-text tracking-wider leading-tight">
            {shortName}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`${
        objectFit === "contain" ? "object-contain p-3" : "object-cover"
      } group-hover:scale-105 transition-transform duration-500`}
      onError={() => setImgError(true)}
    />
  );
}

export default function FeaturedProjects() {
  const handleScrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-6 rounded-full"
              style={{
                background: "linear-gradient(180deg, #22d3ee, #a855f7)",
              }}
            />
            <h2
              className="text-lg font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-jakarta)", color: "var(--text-primary)" }}
            >
              My Projects
            </h2>
          </div>
          <button
            onClick={handleScrollToWork}
            className="text-xs transition-colors flex items-center gap-1.5 group"
            style={{ color: "var(--cyan)" }}
          >
            View all
            <ExternalLink
              size={12}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </motion.div>

        {/* Featured project cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{
                "--hover-shadow": "0 0 20px rgba(34,211,238,0.15)",
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 24px var(--cyan-glow), 0 8px 24px rgba(0,0,0,0.3)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-cyan)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
              }}
            >
              {/* Thumbnail */}
              <div
                className="relative h-40 overflow-hidden m-2 rounded-lg"
                style={{
                  background:
                    project.objectFit === "contain"
                      ? "var(--bg-card)"
                      : "var(--bg-secondary)",
                  backdropFilter: project.objectFit === "contain" ? "blur(12px)" : undefined,
                  WebkitBackdropFilter: project.objectFit === "contain" ? "blur(12px)" : undefined,
                }}
              >
                <ProjectThumbnail
                  src={project.thumbnail}
                  alt={project.name}
                  shortName={project.shortName || project.name}
                  objectFit={project.objectFit}
                  priority={i < 3}
                />
                {/* Category badge */}
                <div className="absolute top-2 left-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"
                    style={{
                      background: "var(--badge-bg)",
                      border: "1px solid var(--border-cyan)",
                      color: "var(--cyan)",
                    }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-bold mb-1 transition-colors line-clamp-1" style={{ color: "var(--text-primary)" }}>
                  {project.name}
                </h3>
                <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex items-center gap-2 mt-3">
                  <Link
                    href={`/work/${project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-medium transition-all duration-200"
                    style={{
                      background: "var(--badge-purple)",
                      border: "1px solid var(--border-purple)",
                      color: "var(--purple)",
                    }}
                    aria-label={`View detail for ${project.name}`}
                  >
                    <BookOpen size={11} />
                    Detail
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                      aria-label={`GitHub — ${project.name}`}
                    >
                      <FaGithub size={14} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                      aria-label={`Live demo — ${project.name}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
