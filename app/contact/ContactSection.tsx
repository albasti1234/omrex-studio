"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// -------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------

const EASING = [0.16, 1, 0.3, 1] as const;

const CONTACT_INFO = [
  {
    label: "Email",
    value: "hello@omrex.studio",
    href: "mailto:hello@omrex.studio",
    icon: "✉",
  },
  {
    label: "Based in",
    value: "Jordan",
    href: null,
    icon: "◎",
  },
  {
    label: "Working",
    value: "Worldwide",
    href: null,
    icon: "◇",
  },
];

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export default function ContactSection(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section ref={ref} className="relative py-24 sm:py-32" id="contact">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.04),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASING }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#f59e0b]/50" />
              <span className="label">Contact</span>
            </div>

            <h2 className="heading-lg mb-4">
              Let's build something
              <br />
              <span className="text-gradient-gold">cinematic together.</span>
            </h2>

            <p className="body-md mb-8 max-w-md">
              Have a project in mind? Fill out the form and I'll get back to you within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <span className="text-[#f59e0b]">{info.icon}</span>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-[#52525b]">
                      {info.label}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-[#f8fafc] hover:text-[#f59e0b] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-[#f8fafc]">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f59e0b] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f59e0b]" />
              </span>
              <span className="text-sm text-[#f59e0b]">
                Available for new projects
              </span>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
          >
            <div className="relative rounded-2xl border border-white/5 bg-[#0a0a0c] p-6 sm:p-8">
              {/* Success State */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f59e0b]/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <span className="text-2xl">✓</span>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#f8fafc] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[#a1a1aa]">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="label-text">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label-text">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="project" className="label-text">
                      Project Type
                    </label>
                    <select
                      id="project"
                      name="project"
                      value={formState.project}
                      onChange={handleChange}
                      required
                      className="input appearance-none cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="cinematic-website">Cinematic Website</option>
                      <option value="landing-page">Launch Page</option>
                      <option value="saas-interface">SaaS Interface</option>
                      <option value="design-system">Design System</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="label-text">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="input appearance-none cursor-pointer"
                    >
                      <option value="">Select your budget</option>
                      <option value="1500-3000">$1,500 - $3,000</option>
                      <option value="3000-5000">$3,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000+">$10,000+</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="label-text">
                      Tell me about your project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="textarea"
                      placeholder="Describe your project, goals, and timeline..."
                      rows={4}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="btn-primary w-full justify-center"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ◌
                        </motion.span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span>✦</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}