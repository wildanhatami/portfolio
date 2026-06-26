/**
 * ============================================================
 * PROJECTS DATA — Muhammad Wildan Hatami Portfolio
 * ============================================================
 * Edit this file to add, remove, or update projects.
 *
 * HOW TO ADD A NEW PROJECT:
 * 1. Copy one of the existing project objects below.
 * 2. Paste it at the end of the `projects` array.
 * 3. Fill in all the fields.
 * 4. Place the thumbnail in: public/images/projects/
 * 5. Set `featured: true` to show it in the Hero section.
 *
 * CATEGORIES (for filter tabs):
 * - "Web"         → Web development projects
 * - "Data & AI"   → Machine learning, data analysis
 * - "Programming" → Algorithms, systems, CLI tools
 * - "Tools"       → Configurations, utilities, setups
 * ============================================================
 */

export type ProjectCategory = "Web" | "Data & AI" | "Programming" | "Tools";

export interface Project {
  id: string;
  name: string;
  shortName?: string;
  category: ProjectCategory;
  description: string;
  /** List of technologies used. Replace placeholders with actual tech stack. */
  tech: string[];
  /** GitHub repository URL. Leave empty string "" if not available. */
  githubUrl: string;
  /** Live demo URL. Leave empty string "" if not available. */
  liveUrl: string;
  /**
   * Path to thumbnail image.
   * Place thumbnail at: public/images/projects/<filename>
   * Recommended: 1280x720px, 16:9 ratio, JPG/PNG/WebP
   */
  thumbnail: string;
  /** Set to true to show in the Featured Projects section on homepage */
  featured: boolean;
  /** Optional label shown when no URLs are available (e.g. "Private Project") */
  statusLabel?: string;
  /** Controls how the thumbnail image fits. Defaults to "cover" (crops to fill). Use "contain" to show full image. */
  objectFit?: "cover" | "contain";
  /**
   * GitHub repo in "owner/repo" format for auto-fetching README.
   * Leave empty for private repos — will use longDescription + highlights as fallback.
   */
  githubRepo?: string;
  /** Long description shown as fallback when README is unavailable (private repo). */
  longDescription?: string;
  /** Key highlights shown as bullet points in fallback mode. */
  highlights?: string[];
}

export const projects: Project[] = [

  // ── PROJECT 2 ──────────────────────────────────────────────
  {
    id: "logicore-help-center",
    name: "IPB Logicore Help Center",
    category: "Web",
    description:
      "A help center website designed to help users find information and guidance on using services in a more structured way.",
    tech: ["React", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/wildanhatami/ipb-logicore-help-center",
    liveUrl: "https://ipb-logicore-help-center.vercel.app",
    thumbnail: "/images/projects/logicore-help-center.jpg",
    featured: true,
    githubRepo: "wildanhatami/ipb-logicore-help-center",
  },

  // ── PROJECT 3 ──────────────────────────────────────────────
  {
    id: "face-mask-classification-cnn",
    name: "Face Mask Classification CNN",
    shortName: "Face Mask CNN",
    category: "Data & AI",
    description:
      "Classification of face mask usage conditions using HOG-SVM and CNN — Final Project for Digital Image Recognition IPB 2026.",
    tech: ["Python", "Jupyter Notebook", "CNN", "HOG-SVM", "Deep Learning"],
    githubUrl: "https://github.com/wildanhatami/face-mask-classification-cnn",
    liveUrl: "",
    thumbnail: "/images/projects/face-mask-classification-cnn.jpg",
    featured: true,
    githubRepo: "wildanhatami/face-mask-classification-cnn",
  },

  // ── PROJECT 4 ──────────────────────────────────────────────
  {
    id: "dry-bean-classification-ann",
    name: "Dry Bean Classification ANN",
    shortName: "Dry Bean ANN",
    category: "Data & AI",
    description:
      "Classification of seven dry bean varieties using Artificial Neural Network (ANN) based on morphological features — Final Project for Computational Intelligence IPB 2026.",
    tech: ["Python", "Jupyter Notebook", "ANN", "Machine Learning"],
    githubUrl: "https://github.com/wildanhatami/dry-bean-classification-ann",
    liveUrl: "",
    thumbnail: "/images/projects/dry-bean-classification-ann.jpg",
    featured: false,
    githubRepo: "wildanhatami/dry-bean-classification-ann",
  },



  // ── PROJECT 6 ──────────────────────────────────────────────
  {
    id: "crop-harvest-predictor-dt",
    name: "Crop Harvest Predictor (Decision Tree)",
    shortName: "Crop Harvest DT",
    category: "Data & AI",
    description:
      "A crop harvest prediction project using Decision Tree algorithm to determine harvest feasibility based on agronomic features.",
    tech: ["Python", "Jupyter Notebook", "Decision Tree", "Scikit-learn"],
    githubUrl: "https://github.com/wildanhatami/crop-harvest-predictor-dt",
    liveUrl: "",
    thumbnail: "/images/projects/crop-harvest-predictor-dt.jpg",
    featured: false,
    githubRepo: "wildanhatami/crop-harvest-predictor-dt",
  },

  // ── PROJECT 7 ──────────────────────────────────────────────
  {
    id: "academic-registration-system",
    name: "Academic Registration System",
    category: "Programming",
    description:
      "A terminal-based academic registration system implementing core programming concepts including data structures, OOP principles, and academic data management logic.",
    tech: ["C++"],
    githubUrl: "https://github.com/wildanhatami/academic-registration-system",
    liveUrl: "",
    thumbnail: "/images/projects/academic-registration-system.jpg",
    featured: false,
    githubRepo: "wildanhatami/academic-registration-system",
  },



  // ── PROJECT 10 ──────────────────────────────────────────────
  {
    id: "baserow-user-guide",
    name: "Baserow User Guide",
    category: "Tools",
    description:
      "A comprehensive user guide and documentation for Baserow — an open-source no-code database tool for structured data management workflows.",
    tech: ["Baserow", "No-code", "Documentation"],
    githubUrl: "https://github.com/wildanhatami/baserow-user-guide",
    liveUrl: "",
    thumbnail: "/images/projects/baserow-user-guide.jpg",
    objectFit: "contain",
    featured: false,
    githubRepo: "wildanhatami/baserow-user-guide",
  },
];

/** Helper: get only featured projects */
export const featuredProjects = projects.filter((p) => p.featured);

/** Helper: get projects by category */
export const getProjectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);
