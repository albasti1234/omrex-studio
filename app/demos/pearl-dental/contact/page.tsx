"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlNav from "../_components/PearlNav";
import PearlFooter from "../_components/PearlFooter";
import PearlPageHeader from "../_components/PearlPageHeader";
import PearlIcon from "../_components/PearlIcon";

export default function ContactPage() {
  return (
    <>
      <PearlNav />
      <main className="min-h-screen bg-pd-bg pb-24">
        <PearlPageHeader
          kicker="Concierge"
          title="Get in Touch"
          subtitle="Whether you have a question about a procedure or need help with insurance, our team is here to assist."
        />

        <div className="pd-container mt-16">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Info Column */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-pd-text-main">Clinic Hours</h2>
                <div className="space-y-4">
                  {[
                    { day: "Mon - Thu", time: "8:00 AM - 6:00 PM" },
                    { day: "Friday", time: "8:00 AM - 2:00 PM" },
                    { day: "Weekend", time: "Closed" }
                  ].map(s => (
                    <div key={s.day} className="flex justify-between border-b border-pd-border pb-4 max-w-sm">
                      <span className="font-medium text-pd-text-main">{s.day}</span>
                      <span className="text-pd-text-muted">{s.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-6 text-pd-text-main">Location</h2>
                <p className="text-pd-text-muted leading-relaxed mb-4">
                  123 Luxury Lane, Suite 400<br />
                  Beverly Hills, CA 90210
                </p>
                <div className="flex gap-4">
                  <a href="tel:+15555555555" className="text-pd-primary font-bold hover:underline">310.555.0123</a>
                  <a href="mailto:hello@pearldental.com" className="text-pd-primary font-bold hover:underline">hello@pearldental.com</a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-pd-lg border border-pd-border">
              <h2 className="text-2xl font-semibold mb-8 text-pd-text-main">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-pd-text-muted">Name</label>
                    <input type="text" className="w-full bg-pd-bg border border-pd-border rounded-xl px-4 py-3 outline-none focus:border-pd-primary transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-pd-text-muted">Phone</label>
                    <input type="tel" className="w-full bg-pd-bg border border-pd-border rounded-xl px-4 py-3 outline-none focus:border-pd-primary transition-colors" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-pd-text-muted">Email</label>
                  <input type="email" className="w-full bg-pd-bg border border-pd-border rounded-xl px-4 py-3 outline-none focus:border-pd-primary transition-colors" placeholder="jane@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-pd-text-muted">How can we help?</label>
                  <textarea rows={4} className="w-full bg-pd-bg border border-pd-border rounded-xl px-4 py-3 outline-none focus:border-pd-primary transition-colors resize-none" placeholder="I'm interested in veneers..." />
                </div>
                <button type="button" className="pd-btn pd-btn-primary w-full">Send Message</button>
              </form>
            </div>

          </div>
        </div>
      </main>
      <PearlFooter />
    </>
  );
}
