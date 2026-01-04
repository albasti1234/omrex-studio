"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedScalesProps {
    size?: number;
    className?: string;
}

export default function AnimatedScales({
    size = 120,
    className = "",
}: AnimatedScalesProps) {
    return (
        <motion.svg
            viewBox="0 0 100 100"
            width={size}
            height={size}
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Definitions */}
            <defs>
                {/* Gold gradient */}
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.72 0.14 75)" />
                    <stop offset="100%" stopColor="oklch(0.80 0.10 75)" />
                </linearGradient>

                {/* Glow filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Central pillar */}
            <motion.rect
                x="48"
                y="25"
                width="4"
                height="50"
                fill="url(#goldGradient)"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "50px 75px" }}
            />

            {/* Base */}
            <motion.rect
                x="35"
                y="73"
                width="30"
                height="5"
                rx="1"
                fill="url(#goldGradient)"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{ transformOrigin: "50px 75px" }}
            />

            {/* Crossbeam */}
            <motion.rect
                x="15"
                y="24"
                width="70"
                height="3"
                fill="url(#goldGradient)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "50px 25px" }}
            />

            {/* Left chain */}
            <motion.line
                x1="20"
                y1="27"
                x2="20"
                y2="45"
                stroke="url(#goldGradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            />

            {/* Right chain */}
            <motion.line
                x1="80"
                y1="27"
                x2="80"
                y2="45"
                stroke="url(#goldGradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            />

            {/* Left scale pan */}
            <motion.g
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <motion.path
                    d="M 10 47 Q 20 55, 30 47"
                    fill="none"
                    stroke="url(#goldGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />

                {/* Left pan bowl */}
                <motion.ellipse
                    cx="20"
                    cy="52"
                    rx="12"
                    ry="4"
                    fill="url(#goldGradient)"
                    opacity="0.3"
                />
            </motion.g>

            {/* Right scale pan */}
            <motion.g
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 1.1,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <motion.path
                    d="M 70 47 Q 80 55, 90 47"
                    fill="none"
                    stroke="url(#goldGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    filter="url(#glow)"
                />

                {/* Right pan bowl */}
                <motion.ellipse
                    cx="80"
                    cy="52"
                    rx="12"
                    ry="4"
                    fill="url(#goldGradient)"
                    opacity="0.3"
                />
            </motion.g>

            {/* Central balance point */}
            <motion.circle
                cx="50"
                cy="25"
                r="4"
                fill="url(#goldGradient)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 0.4,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                }}
                filter="url(#glow)"
            />

            {/* Subtle animation - balance sway */}
            <motion.g
                animate={{
                    rotate: [-1, 1, -1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ transformOrigin: "50px 25px" }}
            />
        </motion.svg>
    );
}
