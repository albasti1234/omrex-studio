"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AtlasIcon from "./AtlasIcon";
import { PRACTICE_AREAS } from "../_data/practice-areas";

type BookingStep = 1 | 2 | 3;

const CASE_TYPES = PRACTICE_AREAS.map((p) => ({ value: p.slug, label: p.title }));

const TIME_SLOTS = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
];

export default function AtlasBookingForm() {
    const [step, setStep] = useState<BookingStep>(1);
    const [formData, setFormData] = useState({
        caseType: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        description: "",
        urgency: "normal",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleNext = () => {
        if (step < 3) setStep((s) => (s + 1) as BookingStep);
    };

    const handleBack = () => {
        if (step > 1) setStep((s) => (s - 1) as BookingStep);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                >
                    <AtlasIcon name="check" className="w-10 h-10 text-green-600" />
                </motion.div>
                <h3 className="al-heading-3 mb-4">Consultation Scheduled</h3>
                <p className="al-lead max-w-md mx-auto mb-8">
                    Thank you, {formData.name}. We've received your request and will contact
                    you within 24 hours to confirm your appointment.
                </p>
                <div className="inline-block p-6 bg-al-bg-warm border border-al-border">
                    <div className="text-sm text-al-text-muted mb-2">Your Appointment</div>
                    <div className="text-xl font-serif font-semibold">
                        {formData.date} at {formData.time}
                    </div>
                    <div className="text-al-gold mt-2">
                        {CASE_TYPES.find((c) => c.value === formData.caseType)?.label}
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
                {[1, 2, 3].map((s) => (
                    <React.Fragment key={s}>
                        <div
                            className={`w-10 h-10 flex items-center justify-center font-semibold transition-all duration-300 ${s <= step
                                    ? "bg-al-gold text-al-primary"
                                    : "bg-al-bg-warm border border-al-border text-al-text-muted"
                                }`}
                        >
                            {s < step ? (
                                <AtlasIcon name="check" className="w-5 h-5" />
                            ) : (
                                s
                            )}
                        </div>
                        {s < 3 && (
                            <div
                                className={`w-20 h-0.5 transition-all duration-300 ${s < step ? "bg-al-gold" : "bg-al-border"
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Step Labels */}
            <div className="flex justify-between text-xs text-al-text-muted mb-8 px-4">
                <span className={step >= 1 ? "text-al-gold" : ""}>Case Type</span>
                <span className={step >= 2 ? "text-al-gold" : ""}>Your Information</span>
                <span className={step >= 3 ? "text-al-gold" : ""}>Scheduling</span>
            </div>

            <AnimatePresence mode="wait">
                {/* Step 1: Case Type */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-semibold mb-3">
                                What type of legal matter do you need help with?
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {CASE_TYPES.map((caseType) => (
                                    <button
                                        key={caseType.value}
                                        onClick={() =>
                                            setFormData({ ...formData, caseType: caseType.value })
                                        }
                                        className={`p-4 text-left border transition-all duration-300 ${formData.caseType === caseType.value
                                                ? "border-al-gold bg-al-gold/5"
                                                : "border-al-border hover:border-al-gold/50"
                                            }`}
                                    >
                                        <div className="font-medium text-sm">{caseType.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-3">
                                How urgent is your matter?
                            </label>
                            <div className="flex gap-3">
                                {[
                                    { value: "normal", label: "Normal" },
                                    { value: "urgent", label: "Urgent" },
                                    { value: "emergency", label: "Emergency" },
                                ].map((urgency) => (
                                    <button
                                        key={urgency.value}
                                        onClick={() =>
                                            setFormData({ ...formData, urgency: urgency.value })
                                        }
                                        className={`flex-1 py-3 text-sm font-medium border transition-all duration-300 ${formData.urgency === urgency.value
                                                ? urgency.value === "emergency"
                                                    ? "border-red-500 bg-red-50 text-red-600"
                                                    : "border-al-gold bg-al-gold/5"
                                                : "border-al-border hover:border-al-gold/50"
                                            }`}
                                    >
                                        {urgency.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Contact Info */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-semibold mb-2">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="al-input"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="al-input"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                    className="al-input"
                                    placeholder="(555) 123-4567"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Brief Description of Your Case
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                rows={4}
                                className="al-input resize-none"
                                placeholder="Please provide a brief summary of your legal matter..."
                            />
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Scheduling */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Preferred Date
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="al-input"
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-3">
                                Available Time Slots
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {TIME_SLOTS.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setFormData({ ...formData, time })}
                                        className={`py-3 text-sm font-medium border transition-all duration-300 ${formData.time === time
                                                ? "border-al-gold bg-al-gold/5"
                                                : "border-al-border hover:border-al-gold/50"
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-al-bg-warm border border-al-border">
                            <div className="text-sm font-semibold mb-2">Consultation Summary</div>
                            <div className="text-sm text-al-text-muted space-y-1">
                                <div>
                                    <strong>Case Type:</strong>{" "}
                                    {CASE_TYPES.find((c) => c.value === formData.caseType)?.label}
                                </div>
                                <div>
                                    <strong>Contact:</strong> {formData.name} ({formData.email})
                                </div>
                                <div>
                                    <strong>Appointment:</strong> {formData.date} at {formData.time}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
                {step > 1 ? (
                    <button
                        onClick={handleBack}
                        className="al-btn al-btn-outline-dark flex items-center gap-2"
                    >
                        <AtlasIcon name="arrow-left" className="w-4 h-4" />
                        Back
                    </button>
                ) : (
                    <div />
                )}

                {step < 3 ? (
                    <button
                        onClick={handleNext}
                        disabled={step === 1 && !formData.caseType}
                        className="al-btn al-btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                        Continue
                        <AtlasIcon name="arrow-right" className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!formData.date || !formData.time}
                        className="al-btn al-btn-gold flex items-center gap-2 disabled:opacity-50"
                    >
                        Confirm Booking
                        <AtlasIcon name="check" className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
