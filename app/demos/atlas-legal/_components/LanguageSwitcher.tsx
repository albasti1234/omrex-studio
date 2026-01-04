"use client";

import React from "react";
import { useLanguage } from "../_lib/i18n/LanguageContext";
import { languageNames, languageFlags, Language } from "../_lib/i18n/translations";
import AtlasIcon from "./AtlasIcon";

export default function LanguageSwitcher() {
    const { language, setLanguage, isRtl } = useLanguage();

    const toggleLanguage = () => {
        const newLang: Language = language === "en" ? "ar" : "en";
        setLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white border border-white/10 hover:border-atlas-accent/50 transition-all group"
            aria-label={`Switch to ${language === "en" ? "Arabic" : "English"}`}
            title={language === "en" ? "العربية" : "English"}
        >
            <AtlasIcon
                name="globe"
                className="w-4 h-4 group-hover:text-atlas-accent transition-colors"
            />
            <span className="hidden sm:inline">
                {languageFlags[language === "en" ? "ar" : "en"]}{" "}
                {languageNames[language === "en" ? "ar" : "en"]}
            </span>
        </button>
    );
}
