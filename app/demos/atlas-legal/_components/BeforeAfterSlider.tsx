"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
    beforeLabel?: string;
    afterLabel?: string;
    beforeValue: string;
    afterValue: string;
    beforeDesc?: string;
    afterDesc?: string;
}

export default function BeforeAfterSlider({
    beforeLabel = "Before",
    afterLabel = "After",
    beforeValue,
    afterValue,
    beforeDesc,
    afterDesc,
}: Props) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            handleMove(e.clientX);
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (isDragging && e.touches[0]) {
            handleMove(e.touches[0].clientX);
        }
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleEnd);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-64 sm:h-80 overflow-hidden cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
        >
            {/* Before Side (Left) */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-950/40 flex items-center justify-center"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <div className="text-center p-8">
                    <div className="text-xs uppercase tracking-widest text-red-400 mb-2">
                        {beforeLabel}
                    </div>
                    <div className="text-4xl sm:text-5xl font-serif font-bold text-red-300">
                        {beforeValue}
                    </div>
                    {beforeDesc && (
                        <div className="text-sm text-red-200/60 mt-2 max-w-xs">
                            {beforeDesc}
                        </div>
                    )}
                </div>
            </div>

            {/* After Side (Right) */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-green-950/40 flex items-center justify-center"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
                <div className="text-center p-8">
                    <div className="text-xs uppercase tracking-widest text-al-gold mb-2">
                        {afterLabel}
                    </div>
                    <div className="text-4xl sm:text-5xl font-serif font-bold text-al-gold">
                        {afterValue}
                    </div>
                    {afterDesc && (
                        <div className="text-sm text-white/60 mt-2 max-w-xs">{afterDesc}</div>
                    )}
                </div>
            </div>

            {/* Slider Handle */}
            <motion.div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                animate={{ boxShadow: isDragging ? "0 0 20px white" : "0 0 10px white" }}
            >
                {/* Handle Button */}
                <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform ${isDragging ? "scale-110" : ""
                        }`}
                    style={{
                        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    }}
                >
                    <svg
                        className="w-5 h-5 text-al-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        />
                    </svg>
                </div>

                {/* Top arrow */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-white" />
                </div>

                {/* Bottom arrow */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-white" />
                </div>
            </motion.div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/40 pointer-events-none">
                Drag to compare
            </div>
        </div>
    );
}
