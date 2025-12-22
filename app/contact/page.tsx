"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// -------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------

const EASING = [0.16, 1, 0.3, 1] as const;

const CONTACT_INFO = {
  email: "omar.abosoud@outlook.com",
  whatsapp: "+971522712764",
  whatsappLink: "https://wa.me/971522712764",
  location: "UAE",
  timezone: "GMT+4",
  availability: "Sun - Thu, 9AM - 6PM",
};

const SOCIAL_LINKS = [
  { id: "twitter", label: "Twitter / X", href: "https://twitter.com/omrexstudio", icon: "𝕏" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/omrexstudio", icon: "◎" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/omrexstudio", icon: "in" },
  { id: "dribbble", label: "Dribbble", href: "https://dribbble.com/omrexstudio", icon: "◉" },
];

const FAQS = [
  {
    question: "What's your typical response time?",
    answer: "I usually respond within 24 hours on business days. For urgent inquiries, WhatsApp is the fastest way to reach me.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely! I work with clients worldwide. We can schedule calls that work for both time zones.",
  },
  {
    question: "What's the best way to start a project?",
    answer: "Fill out the project brief form with your requirements. This helps me understand your vision before our first call.",
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes! I offer maintenance packages and ongoing support for all projects I deliver.",
  },
];

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export default function ContactPage(): React.ReactElement {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050507]">
      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.04), transparent 40%)`,
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative px-4 pb-16 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-[10%] top-[10%] h-[500px] w-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.08), transparent 60%)", filter: "blur(100px)" }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[5%] bottom-[20%] h-[400px] w-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(120, 113, 108, 0.05), transparent 60%)", filter: "blur(100px)" }}
            animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <motion.div
            className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#52525b]"
            initial={{ opacity: 0, x: -20 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="transition-colors hover:text-[#f59e0b]">Home</Link>
            <span className="text-[#3f3f46]">/</span>
            <span className="text-[#71717a]">Contact</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-[2.5rem] font-semibold leading-tight text-[#f8fafc] sm:text-[3.5rem] lg:text-[4rem]">
              Let's work
              <br />
              <span className="text-gradient-gold">together.</span>
            </h1>
          </motion.div>

          <motion.p
            className="mt-6 max-w-xl text-lg text-[#a1a1aa]"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a project in mind? Let's create something cinematic together. 
            I'm always excited to work on new challenges.
          </motion.p>

          {/* Availability Badge */}
          <motion.div
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-5 py-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            </span>
            <span className="text-sm text-[#f59e0b]">Available for new projects</span>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* WhatsApp Card - Primary */}
            <WhatsAppCard />

            {/* Email Card */}
            <EmailCard />

            {/* Location Card */}
            <LocationCard />
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - Contact Form */}
            <ContactForm />

            {/* Right - Info & FAQ */}
            <div className="space-y-10">
              {/* Quick Info */}
              <QuickInfo />

              {/* FAQ */}
              <FAQSection />

              {/* Social Links */}
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

// -------------------------------------------------------------
// WHATSAPP CARD
// -------------------------------------------------------------

function WhatsAppCard(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="lg:col-span-2"
    >
      <a
        href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent("Hi Omar! I'm interested in working with you on a project.")}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="group relative overflow-hidden rounded-3xl border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 p-8 transition-all hover:border-[#25D366]/50"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Background glow */}
          <motion.div
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#25D366]/20 blur-3xl"
            animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.8 : 0.5 }}
            transition={{ duration: 0.5 }}
          />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* WhatsApp Icon */}
              <motion.div
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30"
                animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.div>

              <div>
                <span className="mb-1 block text-sm uppercase tracking-wider text-[#25D366]">
                  Fastest Response
                </span>
                <span className="block text-2xl font-semibold text-[#f8fafc]">
                  WhatsApp Me
                </span>
                <span className="mt-1 block text-[#a1a1aa]">
                  {CONTACT_INFO.whatsapp}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366]"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl">→</span>
            </motion.div>
          </div>

          {/* Bottom note */}
          <div className="relative mt-6 flex items-center gap-2 text-sm text-[#25D366]/70">
            <span>💬</span>
            <span>Usually reply within a few hours</span>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
}

// -------------------------------------------------------------
// EMAIL CARD
// -------------------------------------------------------------

function EmailCard(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <motion.div
        className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c] p-6 transition-all hover:border-[#f59e0b]/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Icon */}
        <motion.div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]"
          animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xl">✉</span>
        </motion.div>

        <span className="mb-1 block text-sm text-[#71717a]">Email</span>
        <span className="block text-lg font-medium text-[#f8fafc] break-all">
          {CONTACT_INFO.email}
        </span>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex-1 rounded-lg bg-white/5 py-2 text-center text-sm text-[#a1a1aa] transition-all hover:bg-white/10 hover:text-[#f8fafc]"
          >
            Send Email
          </a>
          <button
            onClick={copyEmail}
            className="rounded-lg bg-white/5 px-3 py-2 text-sm text-[#a1a1aa] transition-all hover:bg-white/10 hover:text-[#f8fafc]"
          >
            {copied ? "✓" : "Copy"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// LOCATION CARD
// -------------------------------------------------------------

function LocationCard(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="lg:col-span-3"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Location */}
        <div className="rounded-2xl border border-white/5 bg-[#0a0a0c]/50 p-5">
          <div className="mb-2 flex items-center gap-2 text-[#f59e0b]">
            <span>📍</span>
            <span className="text-sm font-medium">Location</span>
          </div>
          <span className="text-lg text-[#f8fafc]">{CONTACT_INFO.location}</span>
          <span className="mt-1 block text-sm text-[#71717a]">Working Worldwide</span>
        </div>

        {/* Timezone */}
        <div className="rounded-2xl border border-white/5 bg-[#0a0a0c]/50 p-5">
          <div className="mb-2 flex items-center gap-2 text-[#f59e0b]">
            <span>🕐</span>
            <span className="text-sm font-medium">Timezone</span>
          </div>
          <span className="text-lg text-[#f8fafc]">{CONTACT_INFO.timezone}</span>
          <span className="mt-1 block text-sm text-[#71717a]">Dubai Time</span>
        </div>

        {/* Availability */}
        <div className="rounded-2xl border border-white/5 bg-[#0a0a0c]/50 p-5">
          <div className="mb-2 flex items-center gap-2 text-[#f59e0b]">
            <span>📅</span>
            <span className="text-sm font-medium">Availability</span>
          </div>
          <span className="text-lg text-[#f8fafc]">{CONTACT_INFO.availability}</span>
          <span className="mt-1 block text-sm text-[#71717a]">Flexible for calls</span>
        </div>
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// CONTACT FORM
// -------------------------------------------------------------

function ContactForm(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your Formspree endpoint
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `Contact Form: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#f8fafc]">Send a Message</h2>
        <p className="mt-2 text-[#71717a]">
          Fill out the form below and I'll get back to you soon.
        </p>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-8 text-center"
        >
          <motion.div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f59e0b]/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <span className="text-2xl text-[#f59e0b]">✓</span>
          </motion.div>
          <h3 className="text-xl font-semibold text-[#f8fafc]">Message Sent!</h3>
          <p className="mt-2 text-[#a1a1aa]">Thanks for reaching out. I'll reply soon!</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 text-sm text-[#f59e0b] hover:underline"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name & Email */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#f8fafc]">
                Name <span className="text-[#f59e0b]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#f8fafc] placeholder-[#52525b] outline-none transition-all focus:border-[#f59e0b] focus:bg-white/[0.07]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#f8fafc]">
                Email <span className="text-[#f59e0b]">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#f8fafc] placeholder-[#52525b] outline-none transition-all focus:border-[#f59e0b] focus:bg-white/[0.07]"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#f8fafc]">
              Subject <span className="text-[#f59e0b]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#f8fafc] placeholder-[#52525b] outline-none transition-all focus:border-[#f59e0b] focus:bg-white/[0.07]"
              placeholder="What's this about?"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#f8fafc]">
              Message <span className="text-[#f59e0b]">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#f8fafc] placeholder-[#52525b] outline-none transition-all focus:border-[#f59e0b] focus:bg-white/[0.07]"
              placeholder="Tell me about your project or inquiry..."
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] py-4 text-sm font-medium text-[#050507] transition-all disabled:opacity-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>◌</motion.span>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send Message
                <span>✦</span>
              </span>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}

// -------------------------------------------------------------
// QUICK INFO
// -------------------------------------------------------------

function QuickInfo(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-white/5 bg-[#0a0a0c] p-6"
    >
      <h3 className="mb-4 text-lg font-semibold text-[#f8fafc]">Quick Contact</h3>
      
      <div className="space-y-4">
        {/* WhatsApp - Primary */}
        <a
          href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent("Hi Omar!")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 p-4 transition-all hover:border-[#25D366]/40"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#25D366] text-white">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <span className="block text-sm font-medium text-[#f8fafc]">WhatsApp</span>
            <span className="text-sm text-[#25D366]">{CONTACT_INFO.whatsapp}</span>
          </div>
          <span className="ml-auto text-[#25D366]">→</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:border-white/10"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f59e0b]/10 text-[#f59e0b]">
            ✉
          </div>
          <div>
            <span className="block text-sm font-medium text-[#f8fafc]">Email</span>
            <span className="text-sm text-[#71717a]">{CONTACT_INFO.email}</span>
          </div>
          <span className="ml-auto text-[#71717a]">→</span>
        </a>
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// FAQ SECTION
// -------------------------------------------------------------

function FAQSection(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <h3 className="mb-4 text-lg font-semibold text-[#f8fafc]">FAQ</h3>
      
      <div className="space-y-2">
        {FAQS.map((faq, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span className="text-sm font-medium text-[#f8fafc]">{faq.question}</span>
              <motion.span
                className="text-[#f59e0b]"
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: EASING }}
              className="overflow-hidden"
            >
              <p className="px-4 pb-4 text-sm text-[#71717a]">{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// SOCIAL LINKS
// -------------------------------------------------------------

function SocialLinks(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="mb-4 text-lg font-semibold text-[#f8fafc]">Follow Me</h3>
      
      <div className="flex flex-wrap gap-3">
        {SOCIAL_LINKS.map((social) => (
          <motion.a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#a1a1aa] transition-all hover:border-[#f59e0b]/50 hover:text-[#f59e0b]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{social.icon}</span>
            <span>{social.label}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// CTA SECTION
// -------------------------------------------------------------

function CTASection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-[#f59e0b]/20 bg-gradient-to-br from-[#f59e0b]/10 to-transparent p-8 text-center sm:p-12"
        >
          {/* Background */}
          <motion.div
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#f59e0b]/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="relative">
            <h2 className="text-2xl font-semibold text-[#f8fafc] sm:text-3xl">
              Ready to start your project?
            </h2>
            <p className="mt-3 text-[#a1a1aa]">
              Let's create something cinematic together.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/brief">
                <motion.button
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#d97706] px-8 py-4 text-sm font-medium text-[#050507]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Start Your Brief</span>
                  <span>✦</span>
                </motion.button>
              </Link>

              <a
                href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent("Hi Omar! I'd like to discuss a project.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-8 py-4 text-sm font-medium text-[#25D366]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp</span>
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}