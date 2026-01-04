"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import {
    translations,
    Language,
    TranslationKey,
    isRTL,
} from "./translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

const STORAGE_KEY = "atlas-legal-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");
    const [mounted, setMounted] = useState(false);

    // Load saved language preference
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
        if (saved && (saved === "en" || saved === "ar")) {
            setLanguageState(saved);
        }
        setMounted(true);
    }, []);

    // Update document direction and lang attribute
    useEffect(() => {
        if (!mounted) return;

        const dir = isRTL(language) ? "rtl" : "ltr";
        document.documentElement.lang = language;
        document.documentElement.dir = dir;
        document.body.dir = dir;

        // Save preference
        localStorage.setItem(STORAGE_KEY, language);
    }, [language, mounted]);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    const value: LanguageContextType = {
        language,
        setLanguage,
        isRtl: isRTL(language),
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

// Translation hook with type safety
export function useTranslation() {
    const { language, isRtl, setLanguage } = useLanguage();

    const t = useCallback(
        (key: TranslationKey): string => {
            const translation = translations[language]?.[key];
            if (translation) return translation;

            // Fallback to English
            const fallback = translations.en?.[key];
            if (fallback) return fallback;

            // Return key if not found
            console.warn(`Translation missing for key: ${key}`);
            return key;
        },
        [language]
    );

    return { t, language, isRtl, setLanguage };
}
