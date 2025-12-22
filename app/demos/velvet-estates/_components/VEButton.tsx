"use client";

import React from "react";
import { motion } from "framer-motion";

interface VEButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "accent" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    children: React.ReactNode;
}

export default function VEButton({
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    iconPosition = "right",
    children,
    className = "",
    disabled,
    ...props
}: VEButtonProps) {
    const baseClasses = "ve-btn";

    const variantClasses = {
        primary: "ve-btn-primary",
        accent: "ve-btn-accent",
        outline: "ve-btn-outline",
        ghost: "ve-btn-ghost",
    };

    const sizeClasses = {
        sm: "text-xs py-2 px-4",
        md: "",
        lg: "text-sm py-4 px-8",
    };

    return (
        <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            disabled={disabled || loading}
            {...(props as any)}
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                    {icon && iconPosition === "left" && (
                        <span className="flex-shrink-0">{icon}</span>
                    )}
                    <span>{children}</span>
                    {icon && iconPosition === "right" && (
                        <span className="flex-shrink-0">{icon}</span>
                    )}
                </>
            )}
        </motion.button>
    );
}
