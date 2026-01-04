"use client";

import React from "react";
import { useTheme } from "../_lib/ThemeContext";
import AtlasIcon from "./AtlasIcon";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-atlas-accent border border-white/10 hover:border-atlas-accent/50 transition-all"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Dark Mode" : "Light Mode"}
        >
            <AtlasIcon
                name={theme === "light" ? "moon" : "sun"}
                className="w-4 h-4"
            />
        </button>
    );
}
