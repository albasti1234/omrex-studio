"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import VEIcon from "./VEIcon";

interface VEModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "md" | "lg" | "xl" | "full";
}

export default function VEModal({
    isOpen,
    onClose,
    title,
    children,
    size = "lg",
}: VEModalProps) {
    const [mounted, setMounted] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    const sizeClasses = {
        md: "max-w-xl",
        lg: "max-w-3xl",
        xl: "max-w-5xl",
        full: "max-w-[95vw]",
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100]">
                    {/* Overlay */}
                    <motion.div
                        ref={overlayRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="flex items-center justify-center min-h-full p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative w-full ${sizeClasses[size]} bg-ve-surface-elevated rounded-2xl shadow-ve-xl overflow-hidden z-10`}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={title ? "modal-title" : undefined}
                        >
                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between px-6 py-4 border-b border-ve-border">
                                    <h2
                                        id="modal-title"
                                        className="text-lg font-semibold text-ve-text"
                                    >
                                        {title}
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-ve-muted hover:text-ve-text rounded-full hover:bg-ve-border transition-colors"
                                        aria-label="Close modal"
                                    >
                                        <VEIcon name="close" className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            {/* Close button (no title) */}
                            {!title && (
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-10 p-2 text-ve-muted hover:text-ve-text bg-ve-surface-elevated/80 backdrop-blur-sm rounded-full hover:bg-ve-border transition-colors"
                                    aria-label="Close modal"
                                >
                                    <VEIcon name="close" className="w-5 h-5" />
                                </button>
                            )}

                            {/* Content */}
                            <div className="max-h-[80vh] overflow-y-auto">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
