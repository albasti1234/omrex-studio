"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

export default function PageTransition({ children }: Props) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

// Staggered content animation for sections
export const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

// Fade in animation
export const fadeIn = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.8 },
    },
};

// Scale in animation
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

// Slide in from side
export const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};

export const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
};
