"use client";

import { useState, useRef, useEffect, use } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAdjacentProjects, type Project } from "../../../data/projects";
import { PROJECTS, getAllCategories } from "@/data/projects";
// -------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------

const EASING = [0.16, 1, 0.3, 1] as const;

// -------------------------------------------------------------
// PAGE COMPONENT
// -------------------------------------------------------------

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function ProjectDetailPage({ params }: PageProps): React.ReactElement {
  const { slug } = use(params);
  const project = getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050507]">
      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${project.accentColor}08, transparent 40%)`,
        }}
      />

      <CinematicHero project={project} />
      <ProjectStats project={project} />
      <ProjectOverview project={project} />
      <ChallengeAndSolution project={project} />
      <ImageGallery project={project} />
      <TechStack project={project} />
      <Testimonial project={project} />
      <ProjectNavigation projectSlug={project.slug} />
      <ProjectCTA accentColor={project.accentColor} />
    </main>
  );
}

// -------------------------------------------------------------
// CINEMATIC HERO
// -------------------------------------------------------------

function CinematicHero({ project }: { project: Project }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100vh] min-h-[700px] overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/60 via-[#050507]/40 to-[#050507]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/80 via-transparent to-[#050507]/80" />
      </motion.div>

      {/* Cinematic Bars */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050507] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050507] to-transparent" />

      {/* Scan Line Effect */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}50, transparent)` }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-4 pb-20 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <div className="mx-auto w-full max-w-6xl">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/work"
              className="mb-8 inline-flex items-center gap-2 text-sm text-[#71717a] transition-colors hover:text-[#f8fafc]"
            >
              <span>←</span>
              <span>Back to Work</span>
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]"
              style={{
                backgroundColor: `${project.accentColor}20`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}40`,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
              </span>
              {project.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-4 text-[3rem] font-bold leading-[1.1] text-[#f8fafc] sm:text-[4rem] lg:text-[5rem]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatedTitle text={project.title} color={project.accentColor} />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-8 text-xl text-[#a1a1aa] sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {project.subtitle}
          </motion.p>

          {/* Meta Info */}
          <motion.div
            className="flex flex-wrap items-center gap-6 text-sm text-[#71717a]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: project.accentColor }}>◷</span>
              <span>{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: project.accentColor }}>◈</span>
              <span>{project.duration}</span>
            </div>
            {project.liveUrl && (
  <Link
    href={project.liveUrl}
    className="flex items-center gap-2 transition-colors hover:text-[#f8fafc]"
  >
    <span style={{ color: project.accentColor }}>↗</span>
    <span>View Live Site</span>
  </Link>
)}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-[#52525b]"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-12 w-[1px]" style={{ background: `linear-gradient(to bottom, ${project.accentColor}, transparent)` }} />
        </motion.div>
      </motion.div>

      {/* Decorative Corners */}
      <div className="pointer-events-none absolute left-8 top-24 hidden lg:block">
        <motion.div
          className="h-20 w-20 border-l-2 border-t-2 rounded-tl-xl"
          style={{ borderColor: `${project.accentColor}30` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
      </div>
      <div className="pointer-events-none absolute right-8 bottom-40 hidden lg:block">
        <motion.div
          className="h-20 w-20 border-r-2 border-b-2 rounded-br-xl"
          style={{ borderColor: `${project.accentColor}30` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        />
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// ANIMATED TITLE
// -------------------------------------------------------------

function AnimatedTitle({ text, color }: { text: string; color: string }): React.ReactElement {
  return (
    <span className="inline-block">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.5 + index * 0.04,
            ease: EASING,
          }}
          whileHover={{
            color: color,
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// -------------------------------------------------------------
// PROJECT STATS
// -------------------------------------------------------------

function ProjectStats({ project }: { project: Project }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {project.stats.map((stat: { value: string; label: string; icon: string }, index: number) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isInView={isInView}
              accentColor={project.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  isInView,
  accentColor,
}: {
  stat: { value: string; label: string; icon: string };
  index: number;
  isInView: boolean;
  accentColor: string;
}): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 transition-opacity"
        style={{ background: `radial-gradient(circle at center, ${accentColor}20, transparent 70%)` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Icon */}
      <motion.span
        className="mb-3 block text-3xl"
        animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 10 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {stat.icon}
      </motion.span>

      {/* Value */}
      <motion.div
        className="mb-1 text-3xl font-bold sm:text-4xl"
        style={{ color: accentColor }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
      >
        {stat.value}
      </motion.div>

      {/* Label */}
      <div className="text-sm text-[#71717a]">{stat.label}</div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
        animate={{ borderColor: isHovered ? `${accentColor}40` : "transparent" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// -------------------------------------------------------------
// PROJECT OVERVIEW
// -------------------------------------------------------------

function ProjectOverview({ project }: { project: Project }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Label */}
          <div className="mb-6 flex items-center gap-3">
            <div
              className="h-px w-12"
              style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
            />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: project.accentColor }}
            >
              Overview
            </span>
          </div>

          {/* Content */}
          <p className="text-xl leading-relaxed text-[#e4e4e7] sm:text-2xl">
            {project.overview}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// CHALLENGE AND SOLUTION
// -------------------------------------------------------------

function ChallengeAndSolution({ project }: { project: Project }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0c] p-8">
              {/* Icon */}
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${project.accentColor}15` }}
              >
                <span className="text-2xl" style={{ color: project.accentColor }}>⚡</span>
              </div>

              <h3 className="mb-4 text-xl font-semibold text-[#f8fafc]">The Challenge</h3>
              <p className="leading-relaxed text-[#a1a1aa]">{project.challenge}</p>

              {/* Decorative */}
              <div
                className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: project.accentColor }}
              />
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className="relative overflow-hidden rounded-3xl border p-8"
              style={{
                borderColor: `${project.accentColor}30`,
                background: `linear-gradient(135deg, ${project.accentColor}08, transparent)`,
              }}
            >
              {/* Icon */}
              <div
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ backgroundColor: project.accentColor }}
              >
                <span className="text-2xl text-[#050507]">✦</span>
              </div>

              <h3 className="mb-4 text-xl font-semibold text-[#f8fafc]">The Solution</h3>
              <p className="leading-relaxed text-[#a1a1aa]">{project.solution}</p>

              {/* Decorative */}
              <div
                className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: project.accentColor }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// IMAGE GALLERY
// -------------------------------------------------------------

function ImageGallery({ project }: { project: Project }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-20">
      {/* Section Header */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-px w-12"
              style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
            />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: project.accentColor }}
            >
              Gallery
            </span>
          </div>
          <span className="text-sm text-[#52525b]">{project.images.length} images</span>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <motion.div
        className="flex gap-6 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-8 snap-x snap-mandatory hide-scrollbar"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Left spacer */}
        <div className="shrink-0 w-[calc((100vw-1280px)/2)] min-w-4" />

        {project.images.map((image: { src: string; alt: string; caption?: string }, index: number) => (
          <GalleryCard
            key={index}
            image={image}
            index={index}
            accentColor={project.accentColor}
            onClick={() => setSelectedImage(index)}
          />
        ))}

        {/* Right spacer */}
        <div className="shrink-0 w-[calc((100vw-1280px)/2)] min-w-4" />
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox
            images={project.images}
            currentIndex={selectedImage}
            onClose={() => setSelectedImage(null)}
            onPrev={() => setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : project.images.length - 1))}
            onNext={() => setSelectedImage((prev) => (prev! < project.images.length - 1 ? prev! + 1 : 0))}
            accentColor={project.accentColor}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({
  image,
  index,
  accentColor,
  onClick,
}: {
  image: { src: string; alt: string; caption?: string };
  index: number;
  accentColor: string;
  onClick: () => void;
}): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative shrink-0 w-[80vw] max-w-[600px] snap-center cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-[#050507]/60"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Expand Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: accentColor }}
          >
            <span className="text-2xl text-[#050507]">⤢</span>
          </div>
        </motion.div>

        {/* Caption */}
        {image.caption && (
          <motion.div
            className="absolute inset-x-0 bottom-0 p-4"
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-[#f8fafc]">{image.caption}</p>
          </motion.div>
        )}

        {/* Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
          animate={{ borderColor: isHovered ? `${accentColor}50` : "transparent" }}
        />
      </div>

      {/* Image number */}
      <div className="mt-3 text-xs text-[#52525b]">
        {String(index + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  accentColor,
}: {
  images: { src: string; alt: string; caption?: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  accentColor: string;
}): React.ReactElement {
  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050507]/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f8fafc] transition-all hover:bg-white/10"
        onClick={onClose}
      >
        ✕
      </button>

      {/* Image */}
      <motion.div
        className="relative max-h-[80vh] max-w-[90vw]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1200}
          height={750}
          className="rounded-2xl object-contain"
        />

        {/* Caption */}
        {currentImage.caption && (
          <p className="mt-4 text-center text-[#a1a1aa]">{currentImage.caption}</p>
        )}
      </motion.div>

      {/* Navigation */}
      <button
        className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f8fafc] transition-all hover:bg-white/10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        ←
      </button>
      <button
        className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f8fafc] transition-all hover:bg-white/10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        →
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-[#71717a]">
        <span style={{ color: accentColor }}>{currentIndex + 1}</span>
        <span> / {images.length}</span>
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// TECH STACK
// -------------------------------------------------------------

function TechStack({ project }: { project: Project }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Label */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div
              className="h-px w-12"
              style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor})` }}
            />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: project.accentColor }}
            >
              Tech Stack
            </span>
            <div
              className="h-px w-12"
              style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
            />
          </div>

          {/* Tech Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {project.techStack.map((tech: string, index: number) => (
              <motion.span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-[#a1a1aa] transition-all hover:border-white/20 hover:text-[#f8fafc]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                whileHover={{
                  backgroundColor: `${project.accentColor}20`,
                  borderColor: `${project.accentColor}50`,
                  color: project.accentColor,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// TESTIMONIAL
// -------------------------------------------------------------

function Testimonial({ project }: { project: Project }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
        style={{ backgroundColor: project.accentColor }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Quote Icon */}
          <motion.div
            className="mb-8 text-7xl leading-none opacity-20"
            style={{ color: project.accentColor }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            "
          </motion.div>

          {/* Quote */}
          <blockquote className="mb-8 text-xl leading-relaxed text-[#e4e4e7] sm:text-2xl">
            {project.testimonial.quote}
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <div
              className="relative h-16 w-16 overflow-hidden rounded-full border-2"
              style={{ borderColor: `${project.accentColor}50` }}
            >
              <Image
                src={project.testimonial.avatar}
                alt={project.testimonial.author}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <div className="font-semibold text-[#f8fafc]">{project.testimonial.author}</div>
              <div className="text-sm text-[#71717a]">{project.testimonial.role}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// PROJECT NAVIGATION
// -------------------------------------------------------------

function ProjectNavigation({ projectSlug }: { projectSlug: string }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { prev, next } = getAdjacentProjects(projectSlug);

  return (
    <section ref={ref} className="relative border-t border-white/5 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Previous */}
          {prev && (
            <Link href={`/work/${prev.slug}`} className="group">
              <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-6 transition-all hover:border-white/10">
                <span className="mb-2 block text-xs text-[#52525b]">← Previous Project</span>
                <span className="block text-lg font-semibold text-[#f8fafc] transition-colors group-hover:text-[#f59e0b]">
                  {prev.title}
                </span>
                <span className="mt-1 block text-sm text-[#71717a]">{prev.category}</span>
              </div>
            </Link>
          )}

          {/* Next */}
          {next && (
            <Link href={`/work/${next.slug}`} className="group sm:text-right">
              <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0c] p-6 transition-all hover:border-white/10">
                <span className="mb-2 block text-xs text-[#52525b]">Next Project →</span>
                <span className="block text-lg font-semibold text-[#f8fafc] transition-colors group-hover:text-[#f59e0b]">
                  {next.title}
                </span>
                <span className="mt-1 block text-sm text-[#71717a]">{next.category}</span>
              </div>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// PROJECT CTA
// -------------------------------------------------------------

function ProjectCTA({ accentColor }: { accentColor: string }): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="relative overflow-hidden rounded-3xl border p-8 text-center sm:p-12"
          style={{
            borderColor: `${accentColor}30`,
            background: `linear-gradient(135deg, ${accentColor}10, transparent)`,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30 blur-3xl"
            style={{ backgroundColor: accentColor }}
          />

          <div className="relative">
            <h2 className="text-2xl font-semibold text-[#f8fafc] sm:text-3xl">
              Like what you see?
            </h2>
            <p className="mt-3 text-[#a1a1aa]">
              Let's create something cinematic for your brand.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/brief">
                <motion.button
                  className="flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-[#050507]"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Start Your Project</span>
                  <span>✦</span>
                </motion.button>
              </Link>

              <Link href="/work">
                <motion.button
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-[#f8fafc] transition-all hover:bg-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View More Work</span>
                  <span>→</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}