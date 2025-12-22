"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Props {
    enabled?: boolean;
}

export default function CursorEffect({ enabled = true }: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    // Spring animation for smooth following
    const springConfig = { damping: 25, stiffness: 300 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-pointer")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [enabled, cursorX, cursorY]);

    if (!enabled) return null;

    return (
        <>
            {/* Main cursor glow */}
            <motion.div
                className="fixed pointer-events-none z-[9999] mix-blend-screen hidden lg:block"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ duration: 0.15 }}
            >
                {/* Outer glow */}
                <div
                    className="absolute rounded-full"
                    style={{
                        width: isHovering ? 60 : 40,
                        height: isHovering ? 60 : 40,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        background:
                            "radial-gradient(circle, oklch(0.72 0.14 75 / 0.3) 0%, transparent 70%)",
                        filter: "blur(8px)",
                        transition: "width 0.2s, height 0.2s",
                    }}
                />

                {/* Inner dot */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 8,
                        height: 8,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "oklch(0.72 0.14 75)",
                        boxShadow: "0 0 20px oklch(0.72 0.14 75 / 0.5)",
                    }}
                    animate={{
                        scale: isHovering ? 0 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                />

                {/* Ring on hover */}
                <motion.div
                    className="absolute rounded-full border-2 border-al-gold"
                    style={{
                        width: 40,
                        height: 40,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                        scale: isHovering ? 1 : 0,
                        opacity: isHovering ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>

            {/* Trail effect */}
            <motion.div
                className="fixed pointer-events-none z-[9998] hidden lg:block"
                style={{
                    x: smoothX,
                    y: smoothY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible ? 0.3 : 0,
                }}
            >
                <div
                    className="rounded-full"
                    style={{
                        width: 100,
                        height: 100,
                        background:
                            "radial-gradient(circle, oklch(0.72 0.14 75 / 0.15) 0%, transparent 70%)",
                        filter: "blur(20px)",
                    }}
                />
            </motion.div>
        </>
    );
}
