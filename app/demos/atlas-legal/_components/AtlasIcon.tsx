"use client";

import React from "react";

// Comprehensive icon library for Atlas Legal
// All icons are custom SVG paths for consistency

interface AtlasIconProps {
    name: IconName;
    className?: string;
    size?: number;
}

type IconName =
    | "scales"
    | "gavel"
    | "shield"
    | "award"
    | "user"
    | "users"
    | "briefcase"
    | "document"
    | "building"
    | "home"
    | "phone"
    | "email"
    | "location"
    | "clock"
    | "calendar"
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
    | "star"
    | "heart"
    | "quote"
    | "chat"
    | "sun"
    | "moon"
    | "globe"
    | "target"
    | "linkedin"
    | "twitter"
    | "facebook"
    | "corporate"
    | "litigation"
    | "injury"
    | "family"
    | "realestate"
    | "criminal";

const icons: Record<IconName, React.ReactNode> = {
    scales: (
        <path
            d="M12 3v18M3 8l3 9h12l3-9M7.5 8v0a4.5 4.5 0 019 0v0M3 8h18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    gavel: (
        <>
            <path
                d="M14.25 8.5l5.25 5.25M4 20l4-4M15 4l5 5M7 16l7-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect
                x="8.5"
                y="8.5"
                width="4"
                height="4"
                rx="0.5"
                transform="rotate(45 10.5 10.5)"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </>
    ),
    shield: (
        <path
            d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    award: (
        <>
            <circle
                cx="12"
                cy="9"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
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
    briefcase: (
        <>
            <rect
                x="3"
                y="8"
                width="18"
                height="12"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2M12 12v4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    document: (
        <>
            <path
                d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M14 3v6h6M8 13h8M8 17h8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
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
    quote: (
        <>
            <path
                d="M10 8H6a2 2 0 00-2 2v4a2 2 0 002 2h4l-1 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 8h-4a2 2 0 00-2 2v4a2 2 0 002 2h4l-1 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    chat: (
        <path
            d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.505 15.073 3 13.575 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
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
    target: (
        <>
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx="12"
                cy="12"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
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
    facebook: (
        <path
            d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
    corporate: (
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
    litigation: (
        <>
            <path
                d="M14.25 8.5l5.25 5.25M4 20l4-4M15 4l5 5M7 16l7-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    injury: (
        <>
            <path
                d="M12 8v8M8 12h8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </>
    ),
    family: (
        <>
            <circle
                cx="9"
                cy="7"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx="17"
                cy="7"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M17 11a3 3 0 013 3v1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </>
    ),
    realestate: (
        <>
            <path
                d="M3 21h18M9 21V9l6-3v15M5 21V11l4-2M19 21V13l-4-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </>
    ),
    criminal: (
        <>
            <rect
                x="5"
                y="7"
                width="14"
                height="10"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M9 7V5a3 3 0 016 0v2M12 11v3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="12" cy="15" r="1" fill="currentColor" />
        </>
    ),
};

export default function AtlasIcon({
    name,
    className = "",
    size = 24,
}: AtlasIconProps) {
    const icon = icons[name];

    if (!icon) {
        console.warn(`AtlasIcon: Icon "${name}" not found`);
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
