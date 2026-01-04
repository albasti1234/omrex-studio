"use client";

import React from "react";
import { motion } from "framer-motion";

interface VECardProps {
    children: React.ReactNode;
    className?: string;
    glass?: boolean;
    hover?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
    onClick?: () => void;
}

export default function VECard({
    children,
    className = "",
    glass = false,
    hover = true,
    padding = "none",
    onClick,
}: VECardProps) {
    const paddingClasses = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    };

    const Component = onClick ? motion.button : motion.div;

    return (
        <Component
            className={`ve-card ${glass ? "ve-card-glass" : ""} ${paddingClasses[padding]} ${className}`}
            whileHover={hover ? { y: -4 } : undefined}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
        >
            {children}
        </Component>
    );
}
