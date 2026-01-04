"use client";

import React, { forwardRef } from "react";

interface VESelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

const VESelect = forwardRef<HTMLSelectElement, VESelectProps>(
    ({ label, error, options, className = "", ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-ve-text mb-2">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`ve-select ${error ? "border-red-500" : ""} ${className}`}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1.5 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

VESelect.displayName = "VESelect";

export default VESelect;
