"use client";

import { motion } from "framer-motion";


export interface PearlSectionHeaderProps {
  kicker?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  center?: boolean;
  className?: string;
  light?: boolean; // For dark backgrounds
  right?: React.ReactNode;
}

export default function PearlSectionHeader({
  kicker,
  title,
  subtitle,
  center = true,
  className,
  light = false,
  right,
}: PearlSectionHeaderProps) {
  const content = (
    <>
      {kicker && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pd-kicker"
          style={{ color: light ? "var(--color-pd-accent)" : undefined }}
        >
          {kicker}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`pd-heading-2 mb-6 ${light ? "text-white" : ""}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`pd-lead ${light ? "text-white/80" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </>
  );

  if (right) {
    return (
      <div className={`mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 ${className || ""}`}>
        <div className="max-w-3xl">
          {content}
        </div>
        <div className="shrink-0 mb-2">
          {right}
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-3xl mb-12 ${center ? "mx-auto text-center" : ""} ${className || ""}`}>
      {content}
    </div>
  );
}
