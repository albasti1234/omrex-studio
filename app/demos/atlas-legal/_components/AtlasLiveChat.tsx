"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AtlasIcon from "./AtlasIcon";
import { useTranslation } from "../_lib/i18n/LanguageContext";

export default function AtlasLiveChat() {
    const { t, isRtl } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<
        { text: string; isUser: boolean }[]
    >([]);
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { text: inputValue, isUser: true }]);
        setInputValue("");

        // Simulate response after delay
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { text: t("chat.response"), isUser: false },
            ]);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Bubble */}
            <div className="al-chat-widget" dir={isRtl ? "rtl" : "ltr"}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="al-chat-bubble"
                    aria-label="Open live chat"
                >
                    <AtlasIcon
                        name={isOpen ? "close" : "chat"}
                        className="w-6 h-6 text-atlas-primary"
                    />
                </motion.button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`fixed bottom-24 z-50 w-[360px] max-w-[calc(100vw-2rem)] ${isRtl ? "left-6" : "right-6"}`}
                        dir={isRtl ? "rtl" : "ltr"}
                    >
                        <div className="bg-atlas-surface-elevated border border-atlas-border shadow-xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-[oklch(0.10_0.015_260)] p-4 flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center border border-atlas-accent">
                                    <AtlasIcon
                                        name="scales"
                                        className="w-5 h-5 text-atlas-accent"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="text-white font-semibold text-sm">
                                        Atlas Legal
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-atlas-accent">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        {t("chat.online")}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 text-white/50 hover:text-white transition-colors"
                                    aria-label="Close chat"
                                >
                                    <AtlasIcon name="close" className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-atlas-bg">
                                {/* Initial greeting */}
                                {messages.length === 0 && (
                                    <div
                                        className={`flex gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
                                    >
                                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-atlas-accent/10 border border-atlas-accent">
                                            <AtlasIcon
                                                name="scales"
                                                className="w-4 h-4 text-atlas-accent"
                                            />
                                        </div>
                                        <div className="flex-1 bg-atlas-surface p-3 text-sm">
                                            {t("chat.greeting")}
                                        </div>
                                    </div>
                                )}

                                {/* Messages */}
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-3 ${msg.isUser ? (isRtl ? "flex-row" : "flex-row-reverse") : isRtl ? "flex-row-reverse" : ""}`}
                                    >
                                        {!msg.isUser && (
                                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-atlas-accent/10 border border-atlas-accent">
                                                <AtlasIcon
                                                    name="scales"
                                                    className="w-4 h-4 text-atlas-accent"
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={`flex-1 p-3 text-sm ${msg.isUser
                                                    ? "bg-atlas-accent text-atlas-primary"
                                                    : "bg-atlas-surface"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Disclaimer */}
                            <div className="px-4 py-2 bg-atlas-surface border-t border-atlas-border">
                                <p className="text-[0.625rem] text-atlas-subtle text-center">
                                    {t("chat.disclaimer")}
                                </p>
                            </div>

                            {/* Input */}
                            <div className="p-3 border-t border-atlas-border">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder={t("chat.placeholder")}
                                        className="al-input py-2 text-sm"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim()}
                                        className="px-4 bg-atlas-accent text-atlas-primary hover:opacity-90 disabled:opacity-50 transition-opacity"
                                        aria-label="Send message"
                                    >
                                        <AtlasIcon
                                            name="arrow-right"
                                            className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
