"use client";

import { useState } from "react";
import { Header } from "../../_components/Header";
import { Button, Card, Input } from "../../_components/UiComponents";
import { Icons } from "../../_components/Icons";

const STEPS = [
    { id: 1, title: "Goals", desc: "What are we building?" },
    { id: 2, title: "Audience", desc: "Who is it for?" },
    { id: 3, title: "Features", desc: "Technical requirements" },
    { id: 4, title: "Review", desc: "Summary" }
];

export default function BriefPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        goal: "Increase patient bookings by 30%",
        audience: "High-net-worth individuals, 30-50yo",
        features: "Booking system, 3D Teeth Viewer",
    });

    const next = () => setStep(s => Math.min(s + 1, 4));
    const prev = () => setStep(s => Math.max(s - 1, 1));

    return (
        <>
            <Header title="Project Brief" />
            <main className="p-8 max-w-4xl mx-auto">

                {/* Progress */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 -z-10" />
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#45D4BF] -z-10 transition-all duration-500"
                            style={{ width: `${((step - 1) / 3) * 100}%` }}
                        />

                        {STEPS.map((s) => (
                            <div key={s.id} className="flex flex-col items-center gap-2 bg-[#0F172A] px-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s.id
                                        ? "bg-[#45D4BF] text-[#0F172A] shadow-[0_0_15px_rgba(69,212,191,0.4)]"
                                        : "bg-slate-800 text-slate-500 border border-slate-700"
                                    }`}>
                                    {step > s.id ? <Icons.StatusDone className="w-6 h-6" /> : s.id}
                                </div>
                                <div className={`text-xs font-medium ${step >= s.id ? "text-white" : "text-slate-500"}`}>
                                    {s.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Area */}
                <Card className="min-h-[400px] flex flex-col">
                    <div className="flex-1">
                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-bold text-white">Project Goals</h2>
                                <p className="text-slate-400">Define the primary success metrics for this project.</p>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Primary Objective</label>
                                    <Input
                                        value={formData.goal}
                                        onChange={e => setFormData({ ...formData, goal: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-bold text-white">Target Audience</h2>
                                <p className="text-slate-400">Who are you trying to reach?</p>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Audience Description</label>
                                    <Input
                                        value={formData.audience}
                                        onChange={e => setFormData({ ...formData, audience: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-bold text-white">Key Features</h2>
                                <p className="text-slate-400">Technical requirements for the build.</p>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Requirements List</label>
                                    <Input
                                        value={formData.features}
                                        onChange={e => setFormData({ ...formData, features: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-2xl font-bold text-white">Summary Review</h2>
                                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Goal</div>
                                        <div className="text-white">{formData.goal}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Audience</div>
                                        <div className="text-white">{formData.audience}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Features</div>
                                        <div className="text-white">{formData.features}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-8 border-t border-white/5 flex justify-between">
                        <Button variant="ghost" onClick={prev} disabled={step === 1}>Back</Button>
                        {step < 4 ? (
                            <Button onClick={next} className="w-32">Next Step</Button>
                        ) : (
                            <Button onClick={() => alert("Demo Brief Submitted!")} className="w-32 bg-[#45D4BF] text-black hover:bg-[#2DD4BF]">Submit</Button>
                        )}
                    </div>
                </Card>
            </main>
        </>
    );
}
