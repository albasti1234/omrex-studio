"use client";

import React, { forwardRef } from "react";

interface VEInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const VEInput = forwardRef<HTMLInputElement, VEInputProps>(
    ({ label, error, icon, className = "", ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-ve-text mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ve-muted">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`ve-input ${icon ? "pl-12" : ""} ${error ? "border-red-500" : ""} ${className}`}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1.5 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

VEInput.displayName = "VEInput";

export default VEInput;
