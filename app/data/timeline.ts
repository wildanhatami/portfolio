/**
 * ============================================================
 * TIMELINE DATA — Muhammad Wildan Hatami Portfolio
 * ============================================================
 * Edit this file to update your timeline entries.
 *
 * HOW TO ADD A TIMELINE ENTRY:
 * 1. Add a new object to the `timelineEntries` array.
 * 2. Entries are displayed in chronological order (left to right on desktop).
 * ============================================================
 */

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
  /** Optional icon name from lucide-react */
  icon: "GraduationCap" | "BookOpen" | "Code2" | "Rocket" | "Briefcase" | "Star";
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: "t1",
    year: "2023",
    title: "Awal Perjalanan",
    description: "Memulai perjalanan sebagai mahasiswa Ilmu Komputer",
    icon: "GraduationCap",
  },
  {
    id: "t2",
    year: "2024",
    title: "Belajar & Berkembang",
    description: "Mempelajari dasar pemrograman dan pengembangan software",
    icon: "BookOpen",
  },
  {
    id: "t3",
    year: "2025",
    title: "Eksplorasi Proyek",
    description: "Mengerjakan berbagai proyek akademik dan eksplorasi teknologi",
    icon: "Code2",
  },
  {
    id: "t4",
    year: "2026",
    title: "Web & Data",
    description: "Mengembangkan proyek web, data, dan portofolio pribadi",
    icon: "Rocket",
  },
];
