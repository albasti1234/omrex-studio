"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

// -------------------------------------------------------------
// CONSTANTS
// -------------------------------------------------------------

const EASING = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { id: 1, title: "About You", icon: "◐" },
  { id: 2, title: "Your Project", icon: "◑" },
  { id: 3, title: "Budget & Timeline", icon: "◒" },
  { id: 4, title: "Final Details", icon: "◓" },
];

const PROJECT_TYPES = [
  { id: "cinematic-website", label: "Cinematic Website", description: "Full website with premium animations", icon: "◈", price: "From $3,500" },
  { id: "landing-page", label: "Launch Page", description: "High-converting landing page", icon: "◇", price: "From $1,500" },
  { id: "saas-interface", label: "SaaS Interface", description: "Dashboard & marketing site", icon: "▹", price: "From $4,500" },
  { id: "redesign", label: "Website Redesign", description: "Transform your existing site", icon: "◎", price: "From $2,500" },
];

const BUDGET_RANGES = [
  { id: "1500-3000", label: "$1.5K - $3K", sublabel: "Launch Page", color: "#78716c" },
  { id: "3000-5000", label: "$3K - $5K", sublabel: "Standard", color: "#d97706" },
  { id: "5000-10000", label: "$5K - $10K", sublabel: "Premium", color: "#f59e0b" },
  { id: "10000+", label: "$10K+", sublabel: "Custom", color: "#fbbf24" },
];

const TIMELINES = [
  { id: "asap", label: "ASAP", sublabel: "Rush fee applies", icon: "⚡" },
  { id: "2-4-weeks", label: "2-4 Weeks", sublabel: "Standard", icon: "◷" },
  { id: "1-2-months", label: "1-2 Months", sublabel: "Recommended", icon: "◑" },
  { id: "flexible", label: "Flexible", sublabel: "No rush", icon: "∞" },
];

const GOALS = [
  { id: "conversions", label: "Increase Conversions" },
  { id: "brand", label: "Build Brand Awareness" },
  { id: "launch", label: "Launch New Product" },
  { id: "ux", label: "Improve User Experience" },
  { id: "credibility", label: "Establish Credibility" },
  { id: "leads", label: "Generate More Leads" },
];

const REFERRAL_SOURCES = [
  { id: "twitter", label: "Twitter / X" },
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "google", label: "Google Search" },
  { id: "referral", label: "Referral" },
  { id: "dribbble", label: "Dribbble" },
  { id: "other", label: "Other" },
];

type FormData = {
  // Step 1
  name: string;
  email: string;
  company: string;
  role: string;
  website: string;
  // Step 2
  projectType: string;
  description: string;
  goals: string[];
  // Step 3
  budget: string;
  timeline: string;
  referralSource: string;
  // Step 4
  inspiration: string;
  additionalInfo: string;
  agreeToContact: boolean;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  website: "",
  projectType: "",
  description: "",
  goals: [],
  budget: "",
  timeline: "",
  referralSource: "",
  inspiration: "",
  additionalInfo: "",
  agreeToContact: false,
};

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

export default function BriefPage(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goalId: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Replace with your Formspree endpoint
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyzabc123";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          goals: formData.goals.join(", "),
          _subject: `New Project Brief from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      case 2:
        return formData.projectType !== "" && formData.description.trim() !== "";
      case 3:
        return formData.budget !== "" && formData.timeline !== "";
      case 4:
        return formData.agreeToContact;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return <SuccessScreen name={formData.name} />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050507]">
      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.03), transparent 40%)`,
        }}
      />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-[300px] top-[20%] h-[600px] w-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.08), transparent 60%)", filter: "blur(100px)" }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[200px] bottom-[10%] h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(120, 113, 108, 0.06), transparent 60%)", filter: "blur(100px)" }}
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <Link href="/" className="mb-8 inline-flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706] opacity-20" />
              <div className="absolute inset-[1px] rounded-lg bg-[#050507]" />
              <span className="relative text-sm font-bold text-[#f59e0b]">O</span>
            </div>
            <span className="text-lg font-semibold text-[#f8fafc]">OMREX.STUDIO</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-[2rem] font-semibold leading-tight text-[#f8fafc] sm:text-[2.5rem]">
              Start Your Project
              <br />
              <span className="text-gradient-gold">Brief</span>
            </h1>
            <p className="mt-4 text-[#a1a1aa]">
              Tell me about your vision and let's create something cinematic together.
            </p>
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={4} />

        {/* Step Indicators */}
        <StepIndicators currentStep={currentStep} />

        {/* Form Container */}
        <motion.div
          className="relative mt-10 overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0c]/80 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Spotlight effect on card */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.03), transparent 40%)`,
            }}
          />

          <div className="relative p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <Step1
                  key="step1"
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
              {currentStep === 2 && (
                <Step2
                  key="step2"
                  formData={formData}
                  updateFormData={updateFormData}
                  toggleGoal={toggleGoal}
                />
              )}
              {currentStep === 3 && (
                <Step3
                  key="step3"
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
              {currentStep === 4 && (
                <Step4
                  key="step4"
                  formData={formData}
                  updateFormData={updateFormData}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="border-t border-white/5 px-6 py-5 sm:px-10">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={prevStep}
                className={`flex items-center gap-2 text-sm text-[#71717a] transition-colors hover:text-[#f8fafc] ${currentStep === 1 ? "invisible" : ""}`}
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>←</span>
                <span>Back</span>
              </motion.button>

              {currentStep < 4 ? (
                <motion.button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all ${
                    canProceed()
                      ? "bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-[#050507]"
                      : "bg-white/5 text-[#52525b] cursor-not-allowed"
                  }`}
                  whileHover={canProceed() ? { scale: 1.02 } : {}}
                  whileTap={canProceed() ? { scale: 0.98 } : {}}
                >
                  <span>Continue</span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                  {canProceed() && (
                    <motion.div
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-8 py-3 text-sm font-medium transition-all ${
                    canProceed() && !isSubmitting
                      ? "bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-[#050507]"
                      : "bg-white/5 text-[#52525b] cursor-not-allowed"
                  }`}
                  whileHover={canProceed() && !isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={canProceed() && !isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        ◌
                      </motion.span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Brief</span>
                      <span>✦</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          className="mt-8 text-center text-[12px] text-[#52525b]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your information is secure and will only be used to discuss your project.
        </motion.p>
      </div>
    </main>
  );
}

// -------------------------------------------------------------
// PROGRESS BAR
// -------------------------------------------------------------

function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }): React.ReactElement {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="relative">
      {/* Background track */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
        {/* Progress fill */}
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#fbbf24]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: EASING }}
        />
      </div>

      {/* Percentage */}
      <div className="mt-2 flex items-center justify-between text-[11px]">
        <span className="uppercase tracking-[0.2em] text-[#52525b]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-[#f59e0b]">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// STEP INDICATORS
// -------------------------------------------------------------

function StepIndicators({ currentStep }: { currentStep: number }): React.ReactElement {
  return (
    <div className="mt-8 hidden sm:flex items-center justify-between">
      {STEPS.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <motion.div
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                isActive
                  ? "border-[#f59e0b] bg-[#f59e0b]/10"
                  : isCompleted
                  ? "border-[#f59e0b] bg-[#f59e0b]"
                  : "border-white/10 bg-white/5"
              }`}
              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
            >
              {isCompleted ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[#050507]"
                >
                  ✓
                </motion.span>
              ) : (
                <span className={isActive ? "text-[#f59e0b]" : "text-[#52525b]"}>
                  {step.icon}
                </span>
              )}

              {/* Pulse ring for active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#f59e0b]"
                  animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Step Label */}
            <span
              className={`ml-3 text-sm ${
                isActive ? "text-[#f8fafc]" : isCompleted ? "text-[#a1a1aa]" : "text-[#52525b]"
              }`}
            >
              {step.title}
            </span>

            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div className="mx-4 h-px flex-1 bg-white/5">
                <motion.div
                  className="h-full bg-[#f59e0b]"
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// -------------------------------------------------------------
// STEP 1: ABOUT YOU
// -------------------------------------------------------------

function Step1({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: EASING }}
    >
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">👤</span>
          <h2 className="text-xl font-semibold text-[#f8fafc]">About You</h2>
        </div>
        <p className="text-sm text-[#71717a]">Let's start with the basics. Who are you?</p>
      </div>

      <div className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            label="Your Name"
            required
            value={formData.name}
            onChange={(value) => updateFormData("name", value)}
            placeholder="John Doe"
          />
          <FormField
            label="Email Address"
            required
            type="email"
            value={formData.email}
            onChange={(value) => updateFormData("email", value)}
            placeholder="john@company.com"
          />
        </div>

        {/* Company & Role Row */}
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            label="Company / Brand"
            value={formData.company}
            onChange={(value) => updateFormData("company", value)}
            placeholder="Acme Inc."
          />
          <FormField
            label="Your Role"
            value={formData.role}
            onChange={(value) => updateFormData("role", value)}
            placeholder="Founder, Marketing Lead..."
          />
        </div>

        {/* Website */}
        <FormField
          label="Current Website"
          value={formData.website}
          onChange={(value) => updateFormData("website", value)}
          placeholder="https://yoursite.com (if you have one)"
        />
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// STEP 2: PROJECT DETAILS
// -------------------------------------------------------------

function Step2({
  formData,
  updateFormData,
  toggleGoal,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  toggleGoal: (goalId: string) => void;
}): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: EASING }}
    >
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">📋</span>
          <h2 className="text-xl font-semibold text-[#f8fafc]">Your Project</h2>
        </div>
        <p className="text-sm text-[#71717a]">What are we building together?</p>
      </div>

      <div className="space-y-8">
        {/* Project Type Selection */}
        <div>
          <label className="mb-3 block text-sm font-medium text-[#f8fafc]">
            Project Type <span className="text-[#f59e0b]">*</span>
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROJECT_TYPES.map((type) => (
              <ProjectTypeCard
                key={type.id}
                type={type}
                isSelected={formData.projectType === type.id}
                onSelect={() => updateFormData("projectType", type.id)}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <FormTextarea
          label="Project Description"
          required
          value={formData.description}
          onChange={(value) => updateFormData("description", value)}
          placeholder="Tell me about your project, your vision, and what you want to achieve..."
          rows={4}
        />

        {/* Goals */}
        <div>
          <label className="mb-3 block text-sm font-medium text-[#f8fafc]">
            Main Goals <span className="text-[#71717a] text-xs font-normal">(Select all that apply)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((goal) => (
              <GoalTag
                key={goal.id}
                goal={goal}
                isSelected={formData.goals.includes(goal.id)}
                onToggle={() => toggleGoal(goal.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// STEP 3: BUDGET & TIMELINE
// -------------------------------------------------------------

function Step3({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: EASING }}
    >
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <h2 className="text-xl font-semibold text-[#f8fafc]">Budget & Timeline</h2>
        </div>
        <p className="text-sm text-[#71717a]">Let's align on expectations.</p>
      </div>

      <div className="space-y-8">
        {/* Budget Range */}
        <div>
          <label className="mb-3 block text-sm font-medium text-[#f8fafc]">
            Budget Range <span className="text-[#f59e0b]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {BUDGET_RANGES.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                isSelected={formData.budget === budget.id}
                onSelect={() => updateFormData("budget", budget.id)}
              />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label className="mb-3 block text-sm font-medium text-[#f8fafc]">
            Timeline <span className="text-[#f59e0b]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TIMELINES.map((timeline) => (
              <TimelineCard
                key={timeline.id}
                timeline={timeline}
                isSelected={formData.timeline === timeline.id}
                onSelect={() => updateFormData("timeline", timeline.id)}
              />
            ))}
          </div>
        </div>

        {/* Referral Source */}
        <div>
          <label className="mb-3 block text-sm font-medium text-[#f8fafc]">
            How did you find me?
          </label>
          <div className="flex flex-wrap gap-2">
            {REFERRAL_SOURCES.map((source) => (
              <motion.button
                key={source.id}
                onClick={() => updateFormData("referralSource", source.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  formData.referralSource === source.id
                    ? "border-[#f59e0b] bg-[#f59e0b]/10 text-[#f59e0b]"
                    : "border-white/10 bg-white/5 text-[#71717a] hover:border-white/20 hover:text-[#a1a1aa]"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {source.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// STEP 4: FINAL DETAILS
// -------------------------------------------------------------

function Step4({
  formData,
  updateFormData,
}: {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: EASING }}
    >
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          <h2 className="text-xl font-semibold text-[#f8fafc]">Final Details</h2>
        </div>
        <p className="text-sm text-[#71717a]">Almost there! Any inspiration or additional info?</p>
      </div>

      <div className="space-y-6">
        {/* Inspiration */}
        <FormTextarea
          label="Inspiration & References"
          value={formData.inspiration}
          onChange={(value) => updateFormData("inspiration", value)}
          placeholder="Share links to websites you like or describe the style you're going for..."
          rows={3}
        />

        {/* Additional Info */}
        <FormTextarea
          label="Anything Else?"
          value={formData.additionalInfo}
          onChange={(value) => updateFormData("additionalInfo", value)}
          placeholder="Any other details, questions, or things I should know..."
          rows={3}
        />

        {/* Consent Checkbox */}
        <motion.label
          className="flex cursor-pointer items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10"
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={formData.agreeToContact}
              onChange={(e) => updateFormData("agreeToContact", e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-5 w-5 rounded border-2 border-white/20 bg-white/5 transition-all peer-checked:border-[#f59e0b] peer-checked:bg-[#f59e0b]">
              <motion.svg
                className="h-full w-full p-0.5 text-[#050507]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: formData.agreeToContact ? 1 : 0,
                  opacity: formData.agreeToContact ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </motion.svg>
            </div>
          </div>
          <div>
            <span className="text-sm text-[#f8fafc]">
              I agree to be contacted about this project
            </span>
            <p className="mt-1 text-xs text-[#52525b]">
              I'll respond within 24-48 hours to discuss your project.
            </p>
          </div>
        </motion.label>

        {/* Summary Preview */}
        <motion.div
          className="rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/5 p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-2 flex items-center gap-2 text-[#f59e0b]">
            <span>✦</span>
            <span className="text-sm font-medium">Brief Summary</span>
          </div>
          <div className="text-sm text-[#a1a1aa]">
            <p><span className="text-[#71717a]">Project:</span> {PROJECT_TYPES.find(t => t.id === formData.projectType)?.label || "Not selected"}</p>
            <p><span className="text-[#71717a]">Budget:</span> {BUDGET_RANGES.find(b => b.id === formData.budget)?.label || "Not selected"}</p>
            <p><span className="text-[#71717a]">Timeline:</span> {TIMELINES.find(t => t.id === formData.timeline)?.label || "Not selected"}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// -------------------------------------------------------------
// SUCCESS SCREEN
// -------------------------------------------------------------

function SuccessScreen({ name }: { name: string }): React.ReactElement {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-4">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.1), transparent 60%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-md text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASING }}
      >
        {/* Success Icon */}
        <motion.div
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#f59e0b] bg-[#f59e0b]/10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
        >
          <motion.span
            className="text-4xl text-[#f59e0b]"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.4, stiffness: 200 }}
          >
            ✓
          </motion.span>
          
          {/* Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#f59e0b]"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#f59e0b]"
            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>

        {/* Text */}
        <motion.h1
          className="mb-4 text-[2rem] font-semibold text-[#f8fafc]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Brief Submitted!
        </motion.h1>

        <motion.p
          className="mb-2 text-lg text-[#a1a1aa]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Thanks, <span className="text-[#f59e0b]">{name || "friend"}</span>!
        </motion.p>

        <motion.p
          className="mb-8 text-[#71717a]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          I'll review your brief and get back to you within 24-48 hours. 
          <br />Keep an eye on your inbox!
        </motion.p>

        {/* Decorative */}
        <motion.div
          className="mb-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="text-[#f59e0b]/30"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              ✦
            </motion.span>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-[#a1a1aa] transition-all hover:border-[#f59e0b]/50 hover:text-[#f8fafc]"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[20%] text-4xl text-[#f59e0b]/10"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        ✦
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-[15%] bottom-[25%] text-3xl text-[#f59e0b]/10"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        ◈
      </motion.div>
    </main>
  );
}

// -------------------------------------------------------------
// REUSABLE COMPONENTS
// -------------------------------------------------------------

function FormField({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}): React.ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#f8fafc]">
        {label} {required && <span className="text-[#f59e0b]">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#f8fafc] placeholder-[#52525b] outline-none transition-all focus:border-[#f59e0b] focus:bg-white/[0.07]"
        />
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl bg-[#f59e0b]/20 blur-xl"
          animate={{ opacity: isFocused ? 0.5 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}

function FormTextarea({
  label,
  required,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}): React.ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#f8fafc]">
        {label} {required && <span className="text-[#f59e0b]">*</span>}
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          rows={rows}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[#f8fafc] placeholder-[#52525b] outline-none transition-all focus:border-[#f59e0b] focus:bg-white/[0.07]"
        />
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl bg-[#f59e0b]/20 blur-xl"
          animate={{ opacity: isFocused ? 0.5 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}

function ProjectTypeCard({
  type,
  isSelected,
  onSelect,
}: {
  type: typeof PROJECT_TYPES[number];
  isSelected: boolean;
  onSelect: () => void;
}): React.ReactElement {
  return (
    <motion.button
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all ${
        isSelected
          ? "border-[#f59e0b] bg-[#f59e0b]/10"
          : "border-white/10 bg-white/5 hover:border-white/20"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Selection indicator */}
      <motion.div
        className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2"
        animate={{
          borderColor: isSelected ? "#f59e0b" : "rgba(255,255,255,0.2)",
          backgroundColor: isSelected ? "#f59e0b" : "transparent",
        }}
      >
        {isSelected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[10px] text-[#050507]"
          >
            ✓
          </motion.span>
        )}
      </motion.div>

      <span className={`mb-2 block text-2xl ${isSelected ? "text-[#f59e0b]" : "text-[#71717a]"}`}>
        {type.icon}
      </span>
      <span className={`block font-medium ${isSelected ? "text-[#f8fafc]" : "text-[#a1a1aa]"}`}>
        {type.label}
      </span>
      <span className="mt-1 block text-xs text-[#52525b]">{type.description}</span>
      <span className={`mt-2 block text-xs ${isSelected ? "text-[#f59e0b]" : "text-[#71717a]"}`}>
        {type.price}
      </span>
    </motion.button>
  );
}

function BudgetCard({
  budget,
  isSelected,
  onSelect,
}: {
  budget: typeof BUDGET_RANGES[number];
  isSelected: boolean;
  onSelect: () => void;
}): React.ReactElement {
  return (
    <motion.button
      onClick={onSelect}
      className={`relative overflow-hidden rounded-xl border p-4 text-center transition-all ${
        isSelected
          ? "border-[#f59e0b] bg-[#f59e0b]/10"
          : "border-white/10 bg-white/5 hover:border-white/20"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Top accent */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: budget.color }}
        animate={{ opacity: isSelected ? 1 : 0.3 }}
      />

      <span className={`block text-lg font-semibold ${isSelected ? "text-[#f8fafc]" : "text-[#a1a1aa]"}`}>
        {budget.label}
      </span>
      <span className="mt-1 block text-[10px] uppercase tracking-wider text-[#52525b]">
        {budget.sublabel}
      </span>
    </motion.button>
  );
}

function TimelineCard({
  timeline,
  isSelected,
  onSelect,
}: {
  timeline: typeof TIMELINES[number];
  isSelected: boolean;
  onSelect: () => void;
}): React.ReactElement {
  return (
    <motion.button
      onClick={onSelect}
      className={`relative overflow-hidden rounded-xl border p-4 text-center transition-all ${
        isSelected
          ? "border-[#f59e0b] bg-[#f59e0b]/10"
          : "border-white/10 bg-white/5 hover:border-white/20"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className={`mb-1 block text-xl ${isSelected ? "text-[#f59e0b]" : "text-[#52525b]"}`}>
        {timeline.icon}
      </span>
      <span className={`block text-sm font-medium ${isSelected ? "text-[#f8fafc]" : "text-[#a1a1aa]"}`}>
        {timeline.label}
      </span>
      <span className="mt-1 block text-[10px] text-[#52525b]">{timeline.sublabel}</span>
    </motion.button>
  );
}

function GoalTag({
  goal,
  isSelected,
  onToggle,
}: {
  goal: typeof GOALS[number];
  isSelected: boolean;
  onToggle: () => void;
}): React.ReactElement {
  return (
    <motion.button
      onClick={onToggle}
      className={`rounded-full border px-4 py-2 text-sm transition-all ${
        isSelected
          ? "border-[#f59e0b] bg-[#f59e0b]/10 text-[#f59e0b]"
          : "border-white/10 bg-white/5 text-[#71717a] hover:border-white/20 hover:text-[#a1a1aa]"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isSelected && <span className="mr-1">✓</span>}
      {goal.label}
    </motion.button>
  );
}