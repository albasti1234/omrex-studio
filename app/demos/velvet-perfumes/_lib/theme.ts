export type Theme = {
    colors: {
        bg: { primary: string; secondary: string; tertiary: string };
        accent: {
            gold: string;
            goldLight: string;
            goldRgb: string;
            purple: string;
            pink: string;
            red: string;
        };
        text: { primary: string; secondary: string; muted: string };
        border: { subtle: string; default: string; hover: string };
    };
};

export const THEME: Theme = {
    colors: {
        bg: { primary: "#070709", secondary: "#0c0c10", tertiary: "#111118" },
        accent: {
            gold: "#d4a853",
            goldLight: "#e8c47a",
            goldRgb: "212, 168, 83",
            purple: "#a855f7",
            pink: "#ec4899",
            red: "#ef4444"
        },
        text: { primary: "#fafaf9", secondary: "#a8a29e", muted: "#78716c" },
        border: { subtle: "rgba(212,168,83,0.08)", default: "rgba(212,168,83,0.15)", hover: "rgba(212,168,83,0.35)" },
    },
};

export const FOR_HER_THEME: Theme = {
    colors: {
        bg: { primary: "#0f0505", secondary: "#1a0a0a", tertiary: "#261010" },
        accent: {
            gold: "#ec4899", // Using Pink as primary 'gold' replacement for brand consistency in this theme
            goldLight: "#fbcfe8",
            goldRgb: "236, 72, 153",
            purple: "#d4a853", // Swap purple/gold roles if needed
            pink: "#ec4899",
            red: "#ef4444"
        },
        text: { primary: "#fff1f2", secondary: "#fecdd3", muted: "#fda4af" },
        border: { subtle: "rgba(236, 72, 153, 0.08)", default: "rgba(236, 72, 153, 0.15)", hover: "rgba(236, 72, 153, 0.35)" },
    },
};

export const FOR_HIM_THEME: Theme = {
    colors: {
        bg: { primary: "#020617", secondary: "#0f172a", tertiary: "#1e293b" },
        accent: {
            gold: "#38bdf8", // Sky blue as primary
            goldLight: "#bae6fd",
            goldRgb: "56, 189, 248",
            purple: "#818cf8",
            pink: "#38bdf8",
            red: "#ef4444"
        },
        text: { primary: "#f8fafc", secondary: "#cbd5e1", muted: "#94a3b8" },
        border: { subtle: "rgba(56, 189, 248, 0.08)", default: "rgba(56, 189, 248, 0.15)", hover: "rgba(56, 189, 248, 0.35)" },
    },
};

export const UNISEX_THEME: Theme = {
    colors: {
        bg: { primary: "#070709", secondary: "#0c0c10", tertiary: "#111118" },
        accent: {
            gold: "#a855f7", // Purple as primary
            goldLight: "#e9d5ff",
            goldRgb: "168, 85, 247",
            purple: "#a855f7",
            pink: "#d4a853",
            red: "#ef4444"
        },
        text: { primary: "#fafaf9", secondary: "#a8a29e", muted: "#78716c" },
        border: { subtle: "rgba(168, 85, 247, 0.08)", default: "rgba(168, 85, 247, 0.15)", hover: "rgba(168, 85, 247, 0.35)" },
    },
};

export const CATEGORY_COLORS = {
    top: { main: "#a855f7", light: "rgba(168, 85, 247, 0.2)" },      // Purple
    heart: { main: "#ec4899", light: "rgba(236, 72, 153, 0.2)" },    // Pink
    base: { main: "#d4a853", light: "rgba(212, 168, 83, 0.2)" },     // Gold
} as const;
