"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import PearlIcon from "./PearlIcon";

const LINKS = [
  { label: "My Services", href: "/demos/pearl-dental/services" },
  { label: "Treatments", href: "/demos/pearl-dental/treatments" },
  { label: "Insurance", href: "/demos/pearl-dental/insurance" },
  { label: "Our Team", href: "/demos/pearl-dental/team" },
  { label: "Contact", href: "/demos/pearl-dental/contact" },
];

export default function PearlNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Scroll Animations
  // Compact nav on scroll:
  const navY = useTransform(scrollY, [0, 100], [0, -10]);
  const navPadding = useTransform(scrollY, [0, 100], ["1.25rem", "0.75rem"]);

  // Background opacity adjustment
  const bgOpacity = useTransform(scrollY, [0, 150], [0.6, 0.95]);
  const bgBlur = useTransform(scrollY, [0, 150], [8, 16]);

  // Border gets subtler on scroll
  const borderColor = useTransform(scrollY, [0, 150], ["rgba(255,255,255,0.4)", "rgba(255,255,255,0.1)"]);

  // Mobile scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 flex justify-center pt-2 px-4"
        style={{ y: navY }}
      >
        <motion.div
          className="w-full max-w-7xl mx-auto rounded-full border shadow-pd-md flex items-center justify-between transition-all duration-500"
          style={{
            paddingTop: navPadding,
            paddingBottom: navPadding,
            paddingLeft: "1.5rem",
            paddingRight: "0.5rem",
            backgroundColor: useMotionTemplate`rgba(255,255,255, ${bgOpacity})`,
            backdropFilter: useMotionTemplate`blur(${bgBlur}px)`,
            borderColor: borderColor
          }}
        >
          {/* LOGO */}
          <Link href="/demos/pearl-dental" className="flex items-center gap-3 group z-50 relative">
            <span
              className="relative flex h-10 w-10 items-center justify-center rounded-full border overflow-hidden bg-white/50"
              style={{
                borderColor: "rgba(20,184,166,0.2)",
                boxShadow: "0 4px 12px rgba(20,184,166,0.15)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-pd-primary/20 to-transparent opacity-50" />
              <span className="text-[13px] font-bold tracking-[0.15em] text-pd-primary relative z-10">PD</span>
            </span>
            <div className="leading-tight flex flex-col">
              <span className="text-[14px] font-semibold tracking-tight text-pd-text-main group-hover:text-pd-primary transition-colors duration-300">Pearl Dental</span>
              <span className="text-[10px] uppercase tracking-widest text-pd-text-muted">Studio</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1 bg-pd-bg/50 p-1 rounded-full border border-pd-border/50">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${isActive ? 'text-pd-primary' : 'text-pd-text-muted hover:text-pd-text-main'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-pd-border/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 pl-2">
            <Link
              href="/demos/pearl-dental/booking"
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-pd-primary text-white text-[13px] font-medium tracking-wide hover:bg-pd-text-main transition-colors duration-500 shadow-lg shadow-pd-primary/20"
            >
              <span>Book Online</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 rounded-full hover:bg-pd-bg transition-colors"
            >
              <PearlIcon name={isOpen ? "x" : "menu"} className="w-6 h-6 text-pd-text-main" />
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* MOBILE FULL SCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl flex flex-col justify-center items-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-pd-primary/5 to-transparent pointer-events-none" />

            <nav className="flex flex-col items-center gap-6 relative z-10">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-medium tracking-tight text-pd-text-main hover:text-pd-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col gap-4 text-center"
              >
                <Link href="/demos/pearl-dental/booking" onClick={() => setIsOpen(false)} className="pd-btn pd-btn-primary min-w-[200px]">
                  Book Appointment
                </Link>
                <div className="text-sm text-pd-text-muted">
                  New Patients: (555) 123-4567
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
