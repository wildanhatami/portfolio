/**
 * ============================================================
 * PROFILE DATA — Muhammad Wildan Hatami Portfolio
 * ============================================================
 * Edit this file to update your personal information.
 * All changes here will reflect across the entire website.
 * ============================================================
 */

export const profile = {
  // ── Personal Info ──────────────────────────────────────────
  /** Full name, displayed in Footer and About section */
  fullName: "Muhammad Wildan Hatami",

  /** Short display name for the Navbar logo */
  displayName: "WILDAN HATAMI",

  /** Subtitle shown below your name in the Hero section */
  subtitle: "Computer Science Student & Web Developer",

  /** Your current city and country */
  location: "Bogor, Indonesia",

  // ── Contact ────────────────────────────────────────────────
  /** Primary contact email */
  email: "wildanhatami0305@gmail.com",

  // ── Social Media ───────────────────────────────────────────
  /** Replace placeholder URLs with your actual profile URLs */
  social: {
    github: "https://github.com/wildanhatami",
    linkedin: "https://linkedin.com/in/wildanhatami", // Replace with your actual LinkedIn URL
    instagram: "https://instagram.com/wildanhatami",  // Replace with your actual Instagram URL
  },

  // ── Hero Section ───────────────────────────────────────────
  /** Main heading in the Hero section (supports line breaks via array) */
  heroHeading: ["BUILDING DIGITAL", "EXPERIENCES THAT MATTER"],

  /** Words in the heading that receive neon gradient styling */
  heroHighlightWords: ["DIGITAL", "MATTER"],

  /** Description paragraph shown below the heading */
  heroDescription:
    "Saya adalah mahasiswa Ilmu Komputer yang tertarik mengembangkan website modern, responsif, dan mudah digunakan. Saya senang membangun solusi digital yang dapat membantu menyelesaikan permasalahan nyata.",

  // ── About Section ──────────────────────────────────────────
  /** First paragraph of the About section */
  aboutParagraph1:
    "Saya adalah mahasiswa Ilmu Komputer yang memiliki ketertarikan pada pengembangan website, desain antarmuka, dan pemanfaatan teknologi untuk menyelesaikan permasalahan nyata. Saya senang mempelajari teknologi baru, berkolaborasi dalam proyek kelompok, dan mengembangkan produk digital yang nyaman digunakan.",

  /** Second paragraph of the About section */
  aboutParagraph2:
    "Saat ini saya sedang memperluas pengalaman melalui proyek akademik dan pengembangan website. Saya tertarik untuk terus meningkatkan kemampuan pada bidang web development, software development, dan eksplorasi data.",

  // ── Work Section ───────────────────────────────────────────
  workDescription:
    "Kumpulan proyek yang saya kerjakan dalam pengembangan website, pemrograman, data, dan eksplorasi teknologi.",

  // ── Contact Section ────────────────────────────────────────
  contactDescription:
    "Punya ide, peluang kolaborasi, atau ingin berdiskusi mengenai sebuah proyek? Silakan hubungi saya.",

  // ── Profile Image ──────────────────────────────────────────
  /**
   * Path to your profile photo.
   * Place your photo at: public/images/profile.jpg
   * Recommended: 800×800px or larger, 1:1 ratio, JPG/PNG/WebP
   */
  profileImage: "/images/profile.jpg",
  profileImageAlt: "Muhammad Wildan Hatami",
};

export type Profile = typeof profile;
