// ============================================================
// 📁 PATH: app/demos/ember-kitchen/contact/page.tsx
// ============================================================

"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import EmberNavbar from "@/EmberComponents/EmberKitchen/EmberNavbar";
import EmberFooter from "@/EmberComponents/EmberKitchen/EmberFooter";

export default function ContactPage(): React.ReactElement {
  return (
    <main className="relative bg-[#0d0d0d]">
      <EmberNavbar />
      <ContactHero />
      <ContactCards />
      <ContactForm />
      <LocationSection />
      <FAQ />
      <EmberFooter />
    </main>
  );
}

function ContactHero(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative h-[40vh] min-h-[350px] overflow-hidden bg-[#1a1714]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/70 via-transparent to-[#0d0d0d]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span className="text-[#d4a574] text-xl" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>✦</motion.span>
        <motion.p className="font-body text-xs tracking-[0.4em] uppercase text-[#d4a574] mt-4 mb-4" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>Get in Touch</motion.p>
        <motion.h1 className="font-display text-5xl md:text-6xl text-[#f5f0e8]" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>Contact Us</motion.h1>
      </div>
    </section>
  );
}

function ContactCards(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    { icon: "📍", title: "Visit Us", lines: ["123 Culinary Avenue", "Downtown District", "New York, NY 10001"], action: "Get Directions" },
    { icon: "📞", title: "Call Us", lines: ["Reservations: +1 (555) 123-4567", "Events: +1 (555) 123-4568"], action: "Call Now" },
    { icon: "✉️", title: "Email Us", lines: ["hello@emberkitchen.com", "events@emberkitchen.com"], action: "Send Email" },
    { icon: "🕐", title: "Hours", lines: ["Tue-Thu: 5:30pm - 10pm", "Fri-Sat: 5:30pm - 11pm", "Sun: 5pm - 9pm", "Mon: Closed"], action: "Reserve" },
  ];

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div key={card.title} className="group p-8 border border-[#d4a574]/10 hover:border-[#d4a574]/30 bg-[#1a1714]/50 transition-all" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}>
              <div className="w-12 h-12 rounded-full border border-[#d4a574]/30 flex items-center justify-center text-xl group-hover:bg-[#d4a574] transition-all">{card.icon}</div>
              <h3 className="font-display text-xl text-[#f5f0e8] mt-6 mb-4">{card.title}</h3>
              <div className="space-y-1 mb-6">
                {card.lines.map((line, i) => (
                  <p key={i} className={`font-elegant text-sm ${line === "Mon: Closed" ? "text-[#d4a574]/50" : "text-[#f5f0e8]/60"}`}>{line}</p>
                ))}
              </div>
              <span className="font-body text-xs tracking-[0.15em] uppercase text-[#d4a574]">{card.action} →</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-[#1a1714]">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="text-[#d4a574] text-lg">✦</span>
          <h2 className="font-display text-4xl text-[#f5f0e8] mt-4 mb-4">Send a Message</h2>
        </motion.div>

        {isSuccess ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-[#d4a574] flex items-center justify-center">
              <span className="text-3xl text-[#d4a574]">✓</span>
            </div>
            <h3 className="font-display text-3xl text-[#f5f0e8] mb-4">Message Sent</h3>
            <p className="font-elegant text-lg text-[#f5f0e8]/60 mb-8">We'll get back to you within 24 hours.</p>
            <Link href="/demos/ember-kitchen"><motion.button className="btn-outline-gold" whileHover={{ scale: 1.02 }}><span>Back to Home</span></motion.button></Link>
          </motion.div>
        ) : (
          <motion.form onSubmit={handleSubmit} className="space-y-8" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-3">Your Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-transparent border border-[#d4a574]/30 px-4 py-3.5 font-elegant text-[#f5f0e8] focus:outline-none focus:border-[#d4a574] transition-colors" />
              </div>
              <div>
                <label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-3">Email *</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-transparent border border-[#d4a574]/30 px-4 py-3.5 font-elegant text-[#f5f0e8] focus:outline-none focus:border-[#d4a574] transition-colors" />
              </div>
            </div>
            <div>
              <label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-3">Subject</label>
              <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-transparent border border-[#d4a574]/30 px-4 py-3.5 font-elegant text-[#f5f0e8] focus:outline-none focus:border-[#d4a574] transition-colors appearance-none cursor-pointer">
                {["General Inquiry", "Reservations", "Private Events", "Catering", "Feedback"].map((opt) => (<option key={opt} value={opt} className="bg-[#1a1714]">{opt}</option>))}
              </select>
            </div>
            <div>
              <label className="block font-body text-xs tracking-[0.2em] uppercase text-[#d4a574] mb-3">Message *</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} className="w-full bg-transparent border border-[#d4a574]/30 px-4 py-3.5 font-elegant text-[#f5f0e8] focus:outline-none focus:border-[#d4a574] transition-colors resize-none" />
            </div>
            <div className="flex justify-center">
              <motion.button type="submit" disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                className={`px-12 py-4 font-body text-xs tracking-[0.2em] uppercase ${!isSubmitting && formData.name && formData.email && formData.message ? "bg-[#d4a574] text-[#0d0d0d]" : "bg-[#d4a574]/20 text-[#f5f0e8]/30 cursor-not-allowed"}`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

function LocationSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative h-[400px] bg-[#1a1714]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574]/10 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-[#d4a574]/5 text-[200px]">📍</span></div>
      
      <motion.div className="absolute bottom-8 right-8 left-8 md:left-auto md:w-96 bg-[#0d0d0d]/95 backdrop-blur-md p-8 border border-[#d4a574]/20"
        initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
        <span className="text-[#d4a574]">✦</span>
        <h3 className="font-display text-2xl text-[#f5f0e8] mt-2 mb-4">Find Us</h3>
        <p className="font-elegant text-[#f5f0e8]/60 mb-6">123 Culinary Avenue<br />Downtown District<br />New York, NY 10001</p>
        <div className="flex gap-4">
          <a href="https://maps.google.com" target="_blank" className="flex-1 py-3 text-center font-body text-xs uppercase bg-[#d4a574] text-[#0d0d0d]">Directions</a>
          <a href="tel:+15551234567" className="flex-1 py-3 text-center font-body text-xs uppercase border border-[#d4a574] text-[#d4a574]">Call</a>
        </div>
      </motion.div>

      <motion.div className="bg-[#0d0d0d] py-6 px-6 absolute bottom-0 left-0 right-0" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div><span className="text-[#d4a574]">🚗</span><h4 className="font-display text-sm text-[#f5f0e8] mt-2">Valet Parking</h4></div>
          <div><span className="text-[#d4a574]">🚇</span><h4 className="font-display text-sm text-[#f5f0e8] mt-2">Near Subway</h4></div>
          <div><span className="text-[#d4a574]">🅿️</span><h4 className="font-display text-sm text-[#f5f0e8] mt-2">Parking Garage</h4></div>
        </div>
      </motion.div>
    </section>
  );
}

function FAQ(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "Do I need a reservation?", a: "While walk-ins are welcome, we recommend reservations especially for weekends." },
    { q: "What is the dress code?", a: "Smart casual. We ask guests to avoid athletic wear and flip-flops." },
    { q: "Do you accommodate dietary restrictions?", a: "Yes, please inform us when making your reservation." },
    { q: "Is there a corkage fee?", a: "Yes, $50 per bottle with a limit of two bottles per table." },
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-[#0d0d0d]">
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="text-[#d4a574] text-lg">✦</span>
          <h2 className="font-display text-4xl text-[#f5f0e8] mt-4">Common Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} className="border border-[#d4a574]/10 overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-[#d4a574]/5 transition-colors">
                <span className="font-display text-lg text-[#f5f0e8]">{faq.q}</span>
                <motion.span className="text-[#d4a574] text-xl ml-4" animate={{ rotate: openIndex === index ? 45 : 0 }}>+</motion.span>
              </button>
              <motion.div initial={false} animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }} className="overflow-hidden">
                <p className="px-6 pb-6 font-elegant text-[#f5f0e8]/60">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}