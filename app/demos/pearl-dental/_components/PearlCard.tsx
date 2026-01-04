"use client";

import { motion } from "framer-motion";
import PearlIcon, { PearlIconName } from "./PearlIcon";

interface PearlCardProps {
  icon?: PearlIconName;
  title: string;
  description: string;
  index?: number;
  className?: string; // Additional classes
}

export default function PearlCard({ icon, title, description, index = 0, className = "" }: PearlCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`pd-card p-8 flex flex-col items-start ${className}`}
    >
      {icon && (
        <div className="mb-6 w-12 h-12 rounded-2xl bg-pd-primary/5 flex items-center justify-center text-pd-primary group-hover:scale-110 group-hover:bg-pd-primary group-hover:text-white transition-all duration-500">
          <PearlIcon name={icon} className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-3 text-pd-text-main group-hover:text-pd-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-pd-text-muted leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
