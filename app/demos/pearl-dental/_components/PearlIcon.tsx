"use client";

import { motion } from "framer-motion";

export type PearlIconName =
    | "cosmetic"
    | "implants"
    | "aligners"
    | "prevention"
    | "emergency"
    | "whitening"
    | "calendar"
    | "shield"
    | "arrow-right"
    | "star"
    | "menu"
    | "x";

interface PearlIconProps {
    name: PearlIconName;
    className?: string;
}

export default function PearlIcon({ name, className = "w-6 h-6" }: PearlIconProps) {
    const iconPath = {
        cosmetic: (
            <>
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" opacity="0.2" />
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M16 4L17 6M20 5L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
        ),
        implants: (
            <>
                <path d="M12 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 8H16V14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14V8Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 2H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
        ),
        aligners: (
            <>
                <path d="M4 12C4 12 6 15 12 15C18 15 20 12 20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 10C5 10 7 7 12 7C17 7 19 10 19 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="11" r="1" fill="currentColor" />
                <circle cx="12" cy="11" r="1" fill="currentColor" />
                <circle cx="16" cy="11" r="1" fill="currentColor" />
            </>
        ),
        prevention: (
            <>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M8.5 14C9 15.5 10.5 16.5 12 16.5C13.5 16.5 15 15.5 15.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="9" cy="9" r="1" fill="currentColor" />
                <circle cx="15" cy="9" r="1" fill="currentColor" />
            </>
        ),
        emergency: (
            <>
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 9V15M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 2V5M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
        ),
        whitening: (
            <>
                <path d="M12 2L14 7L19 7.5L15 11L16 16L12 13.5L8 16L9 11L5 7.5L10 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M18 4L22 4M20 2L20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
        ),
        calendar: (
            <>
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
        ),
        shield: (
            <>
                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </>
        ),
        "arrow-right": (
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ),
        star: (
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
        ),
        menu: (
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ),
        x: (
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )
    };

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {iconPath[name] || null}
        </svg>
    );
}
