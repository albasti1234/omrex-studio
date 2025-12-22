"use client";

import React from "react";

// Icon library for Velvet Estates
// Minimal, elegant SVG icons

interface VEIconProps {
    name: IconName;
    className?: string;
    size?: number;
}

type IconName =
    | "home"
    | "building"
    | "bed"
    | "bath"
    | "sqft"
    | "car"
    | "location"
    | "phone"
    | "email"
    | "calendar"
    | "clock"
    | "star"
    | "heart"
    | "heart-filled"
    | "share"
    | "arrow-right"
    | "arrow-left"
    | "chevron-down"
    | "chevron-up"
    | "chevron-right"
    | "chevron-left"
    | "check"
    | "close"
    | "menu"
    | "search"
    | "filter"
    | "grid"
    | "map"
    | "play"
    | "sun"
    | "moon"
    | "user"
    | "users"
    | "key"
    | "dollar"
    | "chart"
    | "building-office"
    | "globe"
    | "linkedin"
    | "instagram"
    | "twitter";

const icons: Record<IconName, React.ReactNode> = {
    home: (
        <path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    building: (
        <>
            <rect
                x="4"
                y="3"
                width="16"
                height="18"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-4h4v4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    bed: (
        <>
            <path
                d="M3 7v11M21 7v11M3 14h18M5 14V9a2 2 0 012-2h10a2 2 0 012 2v5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
        </>
    ),
    bath: (
        <>
            <path
                d="M4 12h16a1 1 0 011 1v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2a1 1 0 011-1zM6 12V5a2 2 0 012-2h1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M6 19v2M18 19v2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    sqft: (
        <>
            <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M3 9h18M9 3v18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </>
    ),
    car: (
        <>
            <path
                d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 011.1-1.79l3-1.5A2 2 0 018 5h8a2 2 0 01.9.21l3 1.5A2 2 0 0121 8.5V15a2 2 0 01-2 2M5 17v2M19 17v2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="7.5" cy="13" r="1.5" fill="currentColor" />
            <circle cx="16.5" cy="13" r="1.5" fill="currentColor" />
        </>
    ),
    location: (
        <>
            <path
                d="M12 21c-4-4-8-7.582-8-12a8 8 0 1116 0c0 4.418-4 8-8 12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx="12"
                cy="9"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </>
    ),
    phone: (
        <path
            d="M3 5.5A2.5 2.5 0 015.5 3H8a1 1 0 011 1v3a1 1 0 01-1 1H7a1 1 0 00-1 1 10 10 0 009 9 1 1 0 001-1v-1a1 1 0 011-1h3a1 1 0 011 1v2.5a2.5 2.5 0 01-2.5 2.5A17.5 17.5 0 013 5.5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    email: (
        <>
            <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M3 7l9 6 9-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    calendar: (
        <>
            <rect
                x="3"
                y="5"
                width="18"
                height="16"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M8 3v4M16 3v4M3 10h18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    clock: (
        <>
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M12 6v6l4 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    star: (
        <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
    ),
    heart: (
        <path
            d="M12 21s-8-5.5-8-11a5 5 0 0110 0 5 5 0 0110 0c0 5.5-8 11-8 11z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    ),
    "heart-filled": (
        <path
            d="M12 21s-8-5.5-8-11a5 5 0 0110 0 5 5 0 0110 0c0 5.5-8 11-8 11z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    ),
    share: (
        <>
            <circle
                cx="18"
                cy="5"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx="6"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx="18"
                cy="19"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </>
    ),
    "arrow-right": (
        <path
            d="M5 12h14m-7-7l7 7-7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    "arrow-left": (
        <path
            d="M19 12H5m7-7l-7 7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    "chevron-down": (
        <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    "chevron-up": (
        <path
            d="M18 15l-6-6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    "chevron-right": (
        <path
            d="M9 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    "chevron-left": (
        <path
            d="M15 18l-6-6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    check: (
        <path
            d="M5 12l5 5L20 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    close: (
        <path
            d="M6 6l12 12M6 18L18 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    ),
    menu: (
        <path
            d="M4 6h16M4 12h16M4 18h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    ),
    search: (
        <>
            <circle
                cx="11"
                cy="11"
                r="7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M21 21l-4.35-4.35"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    filter: (
        <path
            d="M3 4h18M7 9h10M10 14h4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    ),
    grid: (
        <>
            <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </>
    ),
    map: (
        <>
            <path
                d="M9 3L3 6v15l6-3M9 3l6 3M9 3v15m6-12l6-3v15l-6 3M15 6v15m0 0l-6-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    play: (
        <path
            d="M6 4l15 8-15 8V4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
    ),
    sun: (
        <>
            <circle
                cx="12"
                cy="12"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    moon: (
        <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    user: (
        <>
            <circle
                cx="12"
                cy="8"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M4 21v-1a6 6 0 0112 0v1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    users: (
        <>
            <circle
                cx="9"
                cy="8"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M3 21v-1a4 4 0 014-4h4a4 4 0 014 4v1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx="17"
                cy="8"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M17 14a4 4 0 014 4v1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    key: (
        <>
            <circle
                cx="8"
                cy="8"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M11.5 11.5L21 21M18 18l3 3M21 18l-3 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    dollar: (
        <>
            <path
                d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    chart: (
        <>
            <path
                d="M3 3v18h18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M7 14l4-4 4 4 5-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    "building-office": (
        <>
            <rect
                x="4"
                y="2"
                width="16"
                height="20"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M9 22v-4h6v4M9 6h.01M12 6h.01M15 6h.01M9 10h.01M12 10h.01M15 10h.01M9 14h.01M12 14h.01M15 14h.01"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    globe: (
        <>
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9zM3 12h18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </>
    ),
    linkedin: (
        <path
            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    instagram: (
        <>
            <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx="12"
                cy="12"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
        </>
    ),
    twitter: (
        <path
            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0023 3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
};

export default function VEIcon({
    name,
    className = "",
    size = 24,
}: VEIconProps) {
    const icon = icons[name];

    if (!icon) {
        console.warn(`VEIcon: Icon "${name}" not found`);
        return null;
    }

    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className}
            aria-hidden="true"
        >
            {icon}
        </svg>
    );
}

export type { IconName };
