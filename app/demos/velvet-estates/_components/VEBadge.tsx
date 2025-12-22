"use client";

import React from "react";

interface VEBadgeProps {
    children: React.ReactNode;
    variant?: "default" | "accent" | "success" | "warning";
    size?: "sm" | "md";
    className?: string;
}

export default function VEBadge({
    children,
    variant = "default",
    size = "md",
    className = "",
}: VEBadgeProps) {
    const variantClasses = {
        default: "ve-badge",
        accent: "ve-badge ve-badge-accent",
        success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    };

    const sizeClasses = {
        sm: "text-[0.625rem] px-2 py-1",
        md: "",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        >
            {children}
        </span>
    );
}
