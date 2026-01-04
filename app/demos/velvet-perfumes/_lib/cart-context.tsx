"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product } from "../_data/products";

// =============================================================================
// Types
// =============================================================================

export interface CartItem {
    product: Product;
    quantity: number;
    size: string;
    price: number;
}

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, size: string, quantity?: number) => void;
    removeItem: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    totalItems: number;
    totalPrice: number;
}

// =============================================================================
// Context
// =============================================================================

const CartContext = createContext<CartContextType | undefined>(undefined);

// =============================================================================
// Provider
// =============================================================================

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = useCallback((product: Product, size: string, quantity = 1) => {
        const sizeOption = product.sizes.find((s) => s.size === size);
        if (!sizeOption) return;

        setItems((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.product.id === product.id && item.size === size
            );

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += quantity;
                return updated;
            }

            return [
                ...prev,
                {
                    product,
                    quantity,
                    size,
                    price: sizeOption.price,
                },
            ];
        });

        // Open cart drawer when adding item
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((productId: string, size: string) => {
        setItems((prev) =>
            prev.filter((item) => !(item.product.id === productId && item.size === size))
        );
    }, []);

    const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId, size);
            return;
        }

        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    }, [removeItem]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const toggleCart = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const openCart = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeCart = useCallback(() => {
        setIsOpen(false);
    }, []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                toggleCart,
                openCart,
                closeCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// =============================================================================
// Hook
// =============================================================================

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
