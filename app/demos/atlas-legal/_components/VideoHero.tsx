"use client";

import React, { useRef, useEffect, useState } from "react";

interface Props {
    videoSrc?: string;
    fallbackImage?: string;
    overlayOpacity?: number;
    className?: string;
    children?: React.ReactNode;
}

export default function VideoHero({
    videoSrc = "/videos/legal-office.mp4",
    fallbackImage,
    overlayOpacity = 0.7,
    className = "",
    children,
}: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => setIsLoaded(true);
        const handleError = () => setHasError(true);

        video.addEventListener("loadeddata", handleLoaded);
        video.addEventListener("error", handleError);

        return () => {
            video.removeEventListener("loadeddata", handleLoaded);
            video.removeEventListener("error", handleError);
        };
    }, []);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Video Background */}
            {!hasError && (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            )}

            {/* Fallback gradient background */}
            <div
                className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded && !hasError ? "opacity-0" : "opacity-100"
                    }`}
                style={{
                    background: `linear-gradient(135deg, 
            oklch(0.12 0.03 260) 0%, 
            oklch(0.18 0.04 260) 50%, 
            oklch(0.10 0.02 260) 100%)`,
                }}
            />

            {/* Fallback image if provided */}
            {fallbackImage && (hasError || !isLoaded) && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${fallbackImage})` }}
                />
            )}

            {/* Dark overlay */}
            <div
                className="absolute inset-0 bg-al-bg-dark"
                style={{ opacity: overlayOpacity }}
            />

            {/* Gradient overlays for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-al-bg-dark via-transparent to-al-bg-dark/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-al-bg-dark/80 via-transparent to-transparent" />

            {/* Vignette effect */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 40%, oklch(0.12 0.03 260 / 0.8) 100%)",
                }}
            />

            {/* Noise texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
