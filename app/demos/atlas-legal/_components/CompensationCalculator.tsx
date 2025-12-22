"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import AtlasIcon from "./AtlasIcon";
import { useTranslation } from "../_lib/i18n/LanguageContext";

const CASE_TYPES = [
    { value: "auto", label: "Auto Accident", multiplier: 1.5 },
    { value: "medical", label: "Medical Malpractice", multiplier: 2.5 },
    { value: "workplace", label: "Workplace Injury", multiplier: 2.0 },
    { value: "product", label: "Product Liability", multiplier: 2.2 },
    { value: "slip", label: "Slip & Fall", multiplier: 1.3 },
];

const SEVERITY_LEVELS = [
    { value: "mild", multiplier: 1.5 },
    { value: "moderate", multiplier: 3 },
    { value: "severe", multiplier: 5 },
    { value: "catastrophic", multiplier: 10 },
];

export default function CompensationCalculator() {
    const { t, isRtl } = useTranslation();
    const [caseType, setCaseType] = useState("auto");
    const [severity, setSeverity] = useState("moderate");
    const [medicalExpenses, setMedicalExpenses] = useState(25000);
    const [lostWages, setLostWages] = useState(15000);
    const [showResult, setShowResult] = useState(false);

    const estimate = useMemo(() => {
        const caseMultiplier =
            CASE_TYPES.find((c) => c.value === caseType)?.multiplier || 1;
        const severityMultiplier =
            SEVERITY_LEVELS.find((s) => s.value === severity)?.multiplier || 1;

        const base = medicalExpenses + lostWages;
        const low = Math.round(base * caseMultiplier * severityMultiplier * 0.8);
        const high = Math.round(base * caseMultiplier * severityMultiplier * 1.5);

        return { low, high };
    }, [caseType, severity, medicalExpenses, lostWages]);

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(num);
    };

    return (
        <div className="al-card p-8 lg:p-10">
            <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border-2 border-al-gold">
                    <AtlasIcon name="scales" className="w-8 h-8 text-al-gold" />
                </div>
                <h3 className="al-heading-3 mb-2">{t("calc.title")}</h3>
                <p className="text-al-text-muted text-sm">{t("calc.subtitle")}</p>
            </div>

            <div className="space-y-6">
                {/* Case Type */}
                <div>
                    <label className="block text-sm font-semibold mb-3">
                        {t("calc.caseType")}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {CASE_TYPES.map((type) => (
                            <button
                                key={type.value}
                                onClick={() => setCaseType(type.value)}
                                className={`px-3 py-2 text-xs sm:text-sm font-medium border transition-all ${caseType === type.value
                                        ? "border-al-gold bg-al-gold/10 text-al-gold"
                                        : "border-al-border hover:border-al-gold/50"
                                    }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Severity */}
                <div>
                    <label className="block text-sm font-semibold mb-3">
                        {t("calc.injurySeverity")}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {SEVERITY_LEVELS.map((level) => (
                            <button
                                key={level.value}
                                onClick={() => setSeverity(level.value)}
                                className={`py-3 text-xs sm:text-sm font-medium border transition-all ${severity === level.value
                                        ? level.value === "catastrophic"
                                            ? "border-red-500 bg-red-50 text-red-600"
                                            : "border-al-gold bg-al-gold/10 text-al-gold"
                                        : "border-al-border hover:border-al-gold/50"
                                    }`}
                            >
                                {t(`calc.${level.value}` as any)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Medical Expenses */}
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        {t("calc.medicalExpenses")}
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-al-text-muted">
                            $
                        </span>
                        <input
                            type="number"
                            value={medicalExpenses}
                            onChange={(e) => setMedicalExpenses(Number(e.target.value))}
                            className="al-input pl-8"
                            placeholder="25000"
                        />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="500000"
                        step="1000"
                        value={medicalExpenses}
                        onChange={(e) => setMedicalExpenses(Number(e.target.value))}
                        className="w-full mt-2 accent-al-gold"
                    />
                </div>

                {/* Lost Wages */}
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        {t("calc.lostWages")}
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-al-text-muted">
                            $
                        </span>
                        <input
                            type="number"
                            value={lostWages}
                            onChange={(e) => setLostWages(Number(e.target.value))}
                            className="al-input pl-8"
                            placeholder="15000"
                        />
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="200000"
                        step="1000"
                        value={lostWages}
                        onChange={(e) => setLostWages(Number(e.target.value))}
                        className="w-full mt-2 accent-al-gold"
                    />
                </div>

                {/* Calculate Button */}
                <button
                    onClick={() => setShowResult(true)}
                    className="al-btn al-btn-gold w-full"
                >
                    Calculate Estimate
                    <AtlasIcon name="arrow-right" className="w-5 h-5" />
                </button>

                {/* Result */}
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-al-bg-dark text-white text-center"
                    >
                        <div className="text-sm text-white/50 mb-2">{t("calc.estimate")}</div>
                        <div className="text-3xl sm:text-4xl font-serif font-bold text-al-gold">
                            {formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}
                        </div>
                        <p className="text-xs text-white/40 mt-4 max-w-sm mx-auto">
                            {t("calc.disclaimer")}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
