import { ButtonHTMLAttributes, InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../_lib/utils";

// BUTTON
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                    {
                        "bg-[#45D4BF] text-[#0F172A] hover:shadow-[0_0_20px_rgba(69,212,191,0.4)] hover:bg-[#2DD4BF]": variant === "primary",
                        "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/5": variant === "secondary",
                        "border border-white/20 text-white hover:border-white/40 hover:bg-white/5": variant === "outline",
                        "text-slate-400 hover:text-white hover:bg-white/5": variant === "ghost",
                        "h-8 px-4 text-xs": size === "sm",
                        "h-10 px-6 text-sm": size === "md",
                        "h-12 px-8 text-base": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

// INPUT
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#45D4BF]/50 focus:border-[#45D4BF]/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
                    className
                )}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

// CARD
export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={cn("lr-glass-card rounded-2xl p-6", className)}>
            {children}
        </div>
    );
}

// BADGE
export function Badge({ children, variant = "neutral", className }: { children: React.ReactNode, variant?: "neutral" | "success" | "warning" | "accent", className?: string }) {
    return (
        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", {
            "bg-slate-800/50 border-slate-700 text-slate-400": variant === "neutral",
            "bg-emerald-500/10 border-emerald-500/20 text-emerald-400": variant === "success",
            "bg-amber-500/10 border-amber-500/20 text-amber-400": variant === "warning",
            "bg-[#45D4BF]/10 border-[#45D4BF]/20 text-[#45D4BF]": variant === "accent",
        }, className)}>
            {children}
        </span>
    );
}
