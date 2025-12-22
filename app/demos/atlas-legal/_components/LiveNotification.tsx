"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AtlasIcon from "./AtlasIcon";
import { useTranslation } from "../_lib/i18n/LanguageContext";

export default function LiveNotification() {
    const { t, isRtl } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [notificationType, setNotificationType] = useState<
        "available" | "newCase"
    >("available");

    useEffect(() => {
        // Show notification after a delay (simulating real-time events)
        const timer = setTimeout(() => {
            setIsVisible(true);

            // Auto-hide after 5 seconds
            setTimeout(() => setIsVisible(false), 5000);
        }, 10000); // Show after 10 seconds

        return () => clearTimeout(timer);
    }, []);

    const notifications = {
        available: {
            title: t("notification.available"),
            desc: t("notification.availableDesc"),
            icon: "user",
        },
        newCase: {
            title: t("notification.newCase"),
            desc: t("notification.newCaseDesc"),
            icon: "award",
        },
    };

    const notification = notifications[notificationType];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: isRtl ? -100 : 100, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: isRtl ? -100 : 100 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`fixed bottom-24 z-40 ${isRtl ? "left-6" : "right-6"}`}
                    dir={isRtl ? "rtl" : "ltr"}
                >
                    <div className="al-glass p-4 flex items-start gap-4 max-w-sm shadow-lg">
                        {/* Icon */}
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-atlas-accent/10 border border-atlas-accent">
                            <AtlasIcon
                                name={notification.icon as any}
                                className="w-5 h-5 text-atlas-accent"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm mb-1">
                                {notification.title}
                            </div>
                            <p className="text-xs text-atlas-muted line-clamp-2">
                                {notification.desc}
                            </p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="flex-shrink-0 p-1 hover:text-atlas-accent transition-colors"
                            aria-label="Close notification"
                        >
                            <AtlasIcon name="close" className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
