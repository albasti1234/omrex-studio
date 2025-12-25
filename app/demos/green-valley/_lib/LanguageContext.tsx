'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ar, type Translations } from './ar';
import { en } from './en';

type Language = 'ar' | 'en';

interface LanguageContextType {
    lang: Language;
    t: Translations;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
}

const translations: Record<Language, Translations> = { ar, en };

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Default language: Arabic
    const [lang, setLang] = useState<Language>('ar');

    const toggleLanguage = useCallback(() => {
        setLang(prev => prev === 'ar' ? 'en' : 'ar');
    }, []);

    const setLanguage = useCallback((newLang: Language) => {
        setLang(newLang);
    }, []);

    const t = translations[lang];

    return (
        <LanguageContext.Provider value={{ lang, t, toggleLanguage, setLanguage }}>
            <div dir={t.dir} lang={t.lang} className="min-h-screen">
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}
