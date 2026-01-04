"use client";

import "./velvet-perfumes.css";
import { CartProvider } from "./_lib/cart-context";

export default function VelvetPerfumesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CartProvider>
            <div className="velvet-perfumes">
                {children}
            </div>
        </CartProvider>
    );
}
