"use client";

import React from "react";

interface VESkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular";
    width?: string | number;
    height?: string | number;
}

export default function VESkeleton({
    className = "",
    variant = "rectangular",
    width,
    height,
}: VESkeletonProps) {
    const variantClasses = {
        text: "h-4 rounded",
        circular: "rounded-full",
        rectangular: "rounded-lg",
    };

    return (
        <div
            className={`ve-skeleton ${variantClasses[variant]} ${className}`}
            style={{
                width: width,
                height: height,
            }}
        />
    );
}

// Property Card Skeleton
export function VEPropertyCardSkeleton() {
    return (
        <div className="ve-card overflow-hidden">
            <VESkeleton className="aspect-[4/3] w-full rounded-none" />
            <div className="p-6 space-y-4">
                <VESkeleton height={24} width="70%" />
                <VESkeleton height={16} width="50%" />
                <div className="flex gap-4">
                    <VESkeleton height={16} width={60} />
                    <VESkeleton height={16} width={60} />
                    <VESkeleton height={16} width={80} />
                </div>
                <VESkeleton height={20} width="40%" />
            </div>
        </div>
    );
}
