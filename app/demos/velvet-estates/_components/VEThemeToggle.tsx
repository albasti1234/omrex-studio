"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../_lib/ThemeContext";
import VEIcon from "./VEIcon";

export default function VEThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-10 h-10 flex items-center justify-center text-ve-muted hover:text-ve-accent rounded-full border border-ve-border hover:border-ve-accent transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Night Mode" : "Day Mode"}
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: theme === "light" ? 0 : 180,
                    opacity: 1,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <VEIcon
                    name={theme === "light" ? "moon" : "sun"}
                    className="w-4 h-4"
                />
            </motion.div>
        </motion.button>
    );
}
