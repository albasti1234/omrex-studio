// ============================================================
// 📁 PATH: app/demos/ember-kitchen/reservations/page.tsx
// ============================================================

"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import EmberNavbar from "@/EmberComponents/EmberKitchen/EmberNavbar";
import EmberFooter from "@/EmberComponents/EmberKitchen/EmberFooter"

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];
const TIME_SLOTS = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];
const OCCASIONS = ["Regular Dining", "Birthday", "Anniversary", "Business Dinner", "Date Night"];

export default function ReservationsPage(): React.ReactElement {
  return (
    <main className="relative bg-[#0d0d0d]">
      <EmberNavbar />
      <ReservationHero />
      <ReservationForm />
      <ContactInfo />
      <EmberFooter />
    </main>
  );
}

function ReservationHero(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative h-[40vh] min-h-[350px] overflow-hidden bg-[#1a1714]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-transparent to-[#0d0d0d]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span className="text-[#d4a574] text-xl" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>✦</motion.span>
        <motion.p className="font-body text-xs tracking-[0.4em] uppercase text-[#d4a574] mt-4 mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>Join Us</motion.p>
        <motion.h1 className="font-display text-5xl md:text-6xl text-[#f5f0e8]" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>Reservations</motion.h1>
      </div>
    </section>
  );
}

function ReservationForm(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ date: "", time: "", guests: 2, occasion: "Regular Dining", firstName: "", lastName: "", email: "", phone: "", specialRequests: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const updateForm = (field: string, value: string | number) => setFormData((prev) => ({ ...prev, [field]: value }));
  const canProceed = formData.date && formData.time && formData.guests;
  const canSubmit = formData.firstName && formData.lastName && formData.email && formData.phone;

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 1) dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => ({ day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()], date: date.getDate(), month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()] });

  return (
    <section ref={ref} className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <motion.div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-[#d4a574] flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                <span className="text-3xl text-[#d4a574]">✓</span>
              </motion.div>
              <h2 className="font-display text-4xl text-[#f5f0e8] mb-4">Reservation Confirmed</h2>
              <p className="font-elegant text-lg text-[#f5f0e8]/60 mb-8">Thank you, {formData.firstName}!</p>
              <div className="bg-[#1a1714] border border-[#d4a574]/20 p-8 rounded-lg max-w-md mx-auto mb-8">
                <div className="space-y-3 text-left">
                  <div className="flex justify-between"><span className="text-[#f5f0e8]/40">Date</span><span className="text-[#f5f0e8]">{formData.date}</span></div>
                  <div className="flex justify-between"><span className="text-[#f5f0e8]/40">Time</span><span className="text-[#f5f0e8]">{formData.time}</span></div>
                  <div className="flex justify-between"><span className="text-[#f5f0e8]/40">Guests</span><span className="text-[#f5f0e8]">{formData.guests}</span></div>
                  <div className="flex justify-between"><span className="text-[#f5f0e8]/40">Confirmation</span><span className="text-[#d4a574]">EMB-{Date.now().toString().slice(-6)}</span></div>
                </div>
              </div>
              <Link href="/demos/ember-kitchen"><motion.button className="btn-gold" whileHover={{ scale: 1.02 }}><span>Back to Home</span></motion.button></Link>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border ${step >= 1 ? "border-[#d4a574] text-[#d4a574]" : "border-[#d4a574]/30"} ${step > 1 ? "bg-[#d4a574] text-[#0d0d0d]" : ""}`}>{step > 1 ? "✓" : "1"}</div>
                <div className={`h-px w-16 ${step > 1 ? "bg-[#d4a574]" : "bg-[#d4a574]/20"}`} />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border ${step === 2 ? "border-[#d4a574] text-[#d4a574]" : "border-[#d4a574]/30 text-[#f5f0e8]/30"}`}>2</div>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  <div className="space-y-10">
                    <div>
                      <label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-4">Party Size</label>
                      <div className="flex flex-wrap gap-3">
                        {PARTY_SIZES.map((size) => (
                          <button key={size} type="button" onClick={() => updateForm("guests", size)} className={`w-14 h-14 rounded-full font-display text-lg border transition-all ${formData.guests === size ? "bg-[#d4a574] border-[#d4a574] text-[#0d0d0d]" : "border-[#d4a574]/30 text-[#f5f0e8] hover:border-[#d4a574]"}`}>{size}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-4">Select Date</label>
                      <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                        {generateDates().map((date) => {
                          const f = formatDate(date);
                          const v = date.toISOString().split("T")[0];
                          return (
                            <button key={v} type="button" onClick={() => updateForm("date", v)} className={`flex-shrink-0 w-20 py-4 rounded-lg text-center border transition-all ${formData.date === v ? "bg-[#d4a574] border-[#d4a574]" : "border-[#d4a574]/20 hover:border-[#d4a574]/50"}`}>
                              <span className={`block text-[10px] uppercase ${formData.date === v ? "text-[#0d0d0d]/60" : "text-[#f5f0e8]/40"}`}>{f.day}</span>
                              <span className={`block font-display text-2xl mt-1 ${formData.date === v ? "text-[#0d0d0d]" : "text-[#f5f0e8]"}`}>{f.date}</span>
                              <span className={`block text-[10px] uppercase mt-1 ${formData.date === v ? "text-[#0d0d0d]/60" : "text-[#f5f0e8]/40"}`}>{f.month}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-4">Select Time</label>
                      <div className="grid grid-cols-4 gap-3">
                        {TIME_SLOTS.map((time) => (
                          <button key={time} type="button" onClick={() => updateForm("time", time)} className={`py-3 rounded-lg font-body text-sm border transition-all ${formData.time === time ? "bg-[#d4a574] border-[#d4a574] text-[#0d0d0d]" : "border-[#d4a574]/20 text-[#f5f0e8] hover:border-[#d4a574]/50"}`}>{time}</button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-4">Occasion</label>
                      <div className="flex flex-wrap gap-3">
                        {OCCASIONS.map((occ) => (
                          <button key={occ} type="button" onClick={() => updateForm("occasion", occ)} className={`px-5 py-2.5 rounded-full font-body text-xs border transition-all ${formData.occasion === occ ? "bg-[#d4a574]/20 border-[#d4a574] text-[#d4a574]" : "border-[#d4a574]/20 text-[#f5f0e8]/60"}`}>{occ}</button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-6">
                      <motion.button type="button" onClick={() => setStep(2)} disabled={!canProceed} className={`px-10 py-4 font-body text-xs tracking-[0.2em] uppercase ${canProceed ? "bg-[#d4a574] text-[#0d0d0d]" : "bg-[#d4a574]/20 text-[#f5f0e8]/30 cursor-not-allowed"}`} whileHover={canProceed ? { scale: 1.02 } : {}}>Continue</motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="bg-[#1a1714] border border-[#d4a574]/20 p-6 rounded-lg">
                      <h3 className="font-display text-lg text-[#d4a574] mb-4">Your Reservation</h3>
                      <div className="flex flex-wrap gap-6 text-sm">
                        <div><span className="text-[#f5f0e8]/40">Date</span><p className="text-[#f5f0e8] font-elegant text-lg mt-1">{formData.date}</p></div>
                        <div><span className="text-[#f5f0e8]/40">Time</span><p className="text-[#f5f0e8] font-elegant text-lg mt-1">{formData.time}</p></div>
                        <div><span className="text-[#f5f0e8]/40">Guests</span><p className="text-[#f5f0e8] font-elegant text-lg mt-1">{formData.guests}</p></div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div><label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-3">First Name *</label><input type="text" value={formData.firstName} onChange={(e) => updateForm("firstName", e.target.value)} required className="w-full bg-transparent border border-[#d4a574]/30 rounded-lg px-4 py-3.5 font-elegant text-[#f5f0e8] focus:outline-none focus:border-[#d4a574]" /></div>
                      <div><label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-3">Last Name *</label><input type="text" value={formData.lastName} onChange={(e) => updateForm("lastName", e.target.value)} required className="w-full bg-transparent border border-[#d4a574]/30 rounded-lg px-4 py-3.5 font-elegant text-[#f5f0e8] focus:outline-none focus:border-[#d4a574]" /></div>
                      <div><label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-3">Email *</label><input type="email" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} required className="w-full bg-transparent border border-[#d4a574]/30 rounded-lg px-4 py-3.5 font-elegant text-[#f5f0e8] focus:outline-none focus:border-[#d4a574]" /></div>
                      <div><label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-3">Phone *</label><input type="tel" value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} required className="w-full bg-transparent border border-[#d4a574]/30 rounded-lg px-4 py-3.5 font-elegant text-[#f5f0e8] focus:outline-none focus:border-[#d4a574]" /></div>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <button type="button" onClick={() => setStep(1)} className="font-body text-xs uppercase text-[#f5f0e8]/50 hover:text-[#f5f0e8]">← Back</button>
                      <motion.button type="submit" disabled={!canSubmit || isSubmitting} className={`px-10 py-4 font-body text-xs tracking-[0.2em] uppercase ${canSubmit && !isSubmitting ? "bg-[#d4a574] text-[#0d0d0d]" : "bg-[#d4a574]/20 text-[#f5f0e8]/30 cursor-not-allowed"}`} whileHover={canSubmit && !isSubmitting ? { scale: 1.02 } : {}}>{isSubmitting ? "Confirming..." : "Confirm Reservation"}</motion.button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ContactInfo(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-6 bg-[#1a1714]">
      <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <h2 className="font-display text-3xl text-[#f5f0e8] mb-4">Need Assistance?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8">
          <div><span className="block font-body text-xs uppercase text-[#d4a574] mb-1">Call Us</span><span className="font-elegant text-xl text-[#f5f0e8]">+1 (555) 123-4567</span></div>
          <span className="hidden sm:block w-px h-12 bg-[#d4a574]/20" />
          <div><span className="block font-body text-xs uppercase text-[#d4a574] mb-1">Email</span><span className="font-elegant text-xl text-[#f5f0e8]">reservations@emberkitchen.com</span></div>
        </div>
      </motion.div>
    </section>
  );
}