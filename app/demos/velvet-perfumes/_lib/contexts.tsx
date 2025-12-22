"use client";

import { useState, createContext, useContext, ReactNode } from "react";

// =============================================================================
// WISHLIST CONTEXT
// =============================================================================

interface WishlistContextType {
    wishlist: string[];
    toggleWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<string[]>([]);

    const toggleWishlist = (id: string) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const isInWishlist = (id: string) => wishlist.includes(id);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => {
    const ctx = useContext(WishlistContext);
    if (!ctx) return { wishlist: [], toggleWishlist: () => { }, isInWishlist: () => false };
    return ctx;
};

// =============================================================================
// COMPARE CONTEXT
// =============================================================================

interface CompareContextType {
    compareList: string[];
    toggleCompare: (id: string) => void;
    isInCompare: (id: string) => boolean;
    clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
    const [compareList, setCompareList] = useState<string[]>([]);

    const toggleCompare = (id: string) => {
        setCompareList(prev => {
            if (prev.includes(id)) return prev.filter(x => x !== id);
            if (prev.length >= 3) return prev; // Max 3 items
            return [...prev, id];
        });
    };

    const isInCompare = (id: string) => compareList.includes(id);
    const clearCompare = () => setCompareList([]);

    return (
        <CompareContext.Provider value={{ compareList, toggleCompare, isInCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
}

export const useCompare = () => {
    const ctx = useContext(CompareContext);
    if (!ctx) return { compareList: [], toggleCompare: () => { }, isInCompare: () => false, clearCompare: () => { } };
    return ctx;
};
