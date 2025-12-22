"use client";

import React from "react";

interface Props {
    className?: string;
    variant?: "text" | "circle" | "card" | "image";
    width?: string | number;
    height?: string | number;
    lines?: number;
}

export default function Skeleton({
    className = "",
    variant = "text",
    width,
    height,
    lines = 1,
}: Props) {
    const baseClass =
        "animate-pulse bg-gradient-to-r from-al-border via-al-bg-warm to-al-border bg-[length:200%_100%]";

    if (variant === "circle") {
        return (
            <div
                className={`${baseClass} rounded-full ${className}`}
                style={{
                    width: width || 48,
                    height: height || 48,
                }}
            />
        );
    }

    if (variant === "card") {
        return (
            <div className={`${baseClass} rounded-lg ${className}`} style={{ height: height || 200 }}>
                <div className="p-6 space-y-4">
                    <div className="h-4 bg-white/20 rounded w-3/4" />
                    <div className="h-3 bg-white/20 rounded w-full" />
                    <div className="h-3 bg-white/20 rounded w-5/6" />
                </div>
            </div>
        );
    }

    if (variant === "image") {
        return (
            <div
                className={`${baseClass} ${className} flex items-center justify-center`}
                style={{
                    width: width || "100%",
                    height: height || 200,
                }}
            >
                <svg
                    className="w-10 h-10 text-al-border"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </div>
        );
    }

    // Text variant
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={`${baseClass} h-4 rounded`}
                    style={{
                        width: i === lines - 1 && lines > 1 ? "60%" : width || "100%",
                    }}
                />
            ))}
        </div>
    );
}

// Preset skeletons for common use cases
export function SkeletonCard() {
    return (
        <div className="al-card p-6 space-y-4">
            <Skeleton variant="circle" width={48} height={48} />
            <Skeleton lines={1} width="70%" />
            <Skeleton lines={3} />
            <div className="flex gap-2 pt-2">
                <Skeleton width={80} height={32} />
                <Skeleton width={80} height={32} />
            </div>
        </div>
    );
}

export function SkeletonAttorneyCard() {
    return (
        <div className="space-y-4">
            <Skeleton variant="image" height={320} />
            <div className="text-center space-y-2">
                <Skeleton width="60%" className="mx-auto" />
                <Skeleton width="40%" className="mx-auto" />
            </div>
        </div>
    );
}

export function SkeletonBlogCard() {
    return (
        <div className="al-card overflow-hidden">
            <Skeleton variant="image" height={192} />
            <div className="p-6 space-y-4">
                <div className="flex gap-2">
                    <Skeleton width={80} height={24} />
                    <Skeleton width={60} height={24} />
                </div>
                <Skeleton lines={2} />
                <div className="flex items-center gap-3 pt-4 border-t border-al-border">
                    <Skeleton variant="circle" width={40} height={40} />
                    <div className="flex-1 space-y-2">
                        <Skeleton width="50%" />
                        <Skeleton width="30%" />
                    </div>
                </div>
            </div>
        </div>
    );
}
