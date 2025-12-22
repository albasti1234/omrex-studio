"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PearlSectionHeader from "../../_components/PearlSectionHeader";
import PearlCard from "../../_components/PearlCard";

type Treatment = {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  comfort: string;
  summary: string;
  highlights: string[];
  whatToExpect: string[];
  aftercare: string[];
  faqs: { q: string; a: string }[];
};

const TREATMENTS: Treatment[] = [
  {
    slug: "cosmetic",
    title: "Cosmetic Dentistry",
    tagline: "Your best smile, designed naturally.",
    duration: "Varies",
    comfort: "Spa-like protocols",
    summary:
      "From subtle whitening to complete smile makeovers with veneers, we blend art and science to create smiles that look like you—only better.",
    highlights: [
      "Digital Smile Design preview",
      "Minimally invasive options",
      "Natural shade matching",
      "Long-lasting ceramic materials",
    ],
    whatToExpect: [
      "Consultation & Photos: We discuss your goals and take high-res imagery.",
      "Digital Plan: You see the proposed result before we touch a tooth.",
      "Mockup: Try on your new smile in the chair.",
      "Final Treatment: Two visits to prepare and bond your new veneers.",
    ],
    aftercare: [
      "Brush and floss normally.",
      "Wear a night guard if you grind your teeth.",
      "Regular checkups to polish and inspect.",
    ],
    faqs: [
      {
        q: "How many veneers do I need?",
        a: "It depends on your smile width. usually 8-10 upper teeth for a full transformation.",
      },
      {
        q: "Do you shave my teeth down?",
        a: "Minimal prep is often needed for the best bond and profile, but we conserve as much enamel as possible.",
      },
    ],
  },
  {
    slug: "whitening",
    title: "Teeth Whitening",
    tagline: "A brighter smile — without harshness.",
    duration: "45–60 min",
    comfort: "Low sensitivity protocol",
    summary:
      "Professional whitening designed for comfort. We tailor the strength, protect enamel, and keep sensitivity low — while still delivering a visible lift.",
    highlights: [
      "Shade mapping before & after",
      "Desensitizing gel included",
      "Custom at-home maintenance plan",
      "Results you can see immediately",
    ],
    whatToExpect: [
      "We start with a quick smile check and shade map.",
      "We isolate gums, protect enamel, and apply the whitening gel in controlled cycles.",
      "We finish with a calming mineral treatment to reduce sensitivity.",
      "You leave with clear aftercare + optional take-home kit.",
    ],
    aftercare: [
      "Avoid staining foods/drinks for 24–48 hours (coffee, tea, berries).",
      "Use a sensitive toothpaste for 3–5 days.",
      "If you feel mild sensitivity, it’s temporary — we’ll guide you.",
    ],
    faqs: [
      {
        q: "Will it look natural?",
        a: "Yes. We lift your shade while keeping it realistic for your skin tone and enamel base.",
      },
      {
        q: "How long does it last?",
        a: "Typically 6–18 months depending on lifestyle. Touch-ups are simple.",
      },
      {
        q: "Is it safe for enamel?",
        a: "When professionally applied with isolation and controlled strength, it’s enamel-safe.",
      },
    ],
  },
  {
    slug: "invisalign",
    title: "Clear Aligners",
    tagline: "Straighten discreetly. Smile confidently.",
    duration: "3–12 months",
    comfort: "Gentle, staged movement",
    summary:
      "A premium clear-aligner plan with digital scanning, a predictable roadmap, and comfort-first refinements.",
    highlights: [
      "3D scan + digital plan preview",
      "Refinement checkpoints included",
      "Whitening-friendly approach",
      "Optional retainers plan",
    ],
    whatToExpect: [
      "We scan your teeth and plan movement digitally.",
      "You review the expected outcome before you start.",
      "You wear aligners 20–22 hours/day, switching sets as prescribed.",
      "We track progress and refine if needed.",
    ],
    aftercare: [
      "Wear retainers after treatment to keep results stable.",
      "Clean aligners gently daily; avoid heat.",
      "Maintain checkups to protect gums during movement.",
    ],
    faqs: [
      {
        q: "Does it hurt?",
        a: "You’ll feel pressure for 1–2 days when you switch sets. It’s usually mild and manageable.",
      },
      {
        q: "Can I eat normally?",
        a: "Yes — you remove aligners to eat, then brush and place them back.",
      },
      {
        q: "How do you know it’s working?",
        a: "We compare your scan/fit at each checkpoint and adjust if needed.",
      },
    ],
  },
  {
    slug: "implants",
    title: "Dental Implants",
    tagline: "A permanent-feeling solution — designed precisely.",
    duration: "3–6 months",
    comfort: "Sedation options available",
    summary:
      "Implants restore function, stability, and confidence. We plan with imaging, prioritize gum health, and build a natural crown profile.",
    highlights: [
      "3D imaging-based planning",
      "Bone & gum evaluation",
      "Natural-looking crown profile",
      "Long-term maintenance plan",
    ],
    whatToExpect: [
      "We evaluate bone and gum health + plan implant position.",
      "We place the implant with comfort-first anesthesia options.",
      "Healing happens while the implant integrates.",
      "We finalize with a crown designed for your bite and aesthetics.",
    ],
    aftercare: [
      "Follow the first-week soft-food plan.",
      "Keep the area clean and avoid smoking to protect healing.",
      "Attend follow-up visits to ensure perfect integration.",
    ],
    faqs: [
      {
        q: "Am I a candidate?",
        a: "Most patients are. We confirm with imaging and overall gum health.",
      },
      {
        q: "How long do implants last?",
        a: "With good hygiene and maintenance, many last decades.",
      },
      {
        q: "Do you offer sedation?",
        a: "Yes — we can plan options based on your comfort level.",
      },
    ],
  },
];

export default function TreatmentSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const t = TREATMENTS.find((x) => x.slug === params.slug);

  if (!t) {
    return (
      <main className="pd-container py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="pd-kicker mb-4">404</div>
        <h1 className="text-3xl font-bold text-pd-text-main mb-4">Treatment not found</h1>
        <p className="pd-muted max-w-lg mb-8">
          The treatment you are looking for doesn't exist or hasn't been added yet.
          Please browse our available services.
        </p>
        <Link href="/demos/pearl-dental/treatments" className="pd-btn pd-btn-primary">
          View all treatments
        </Link>
      </main>
    );
  }

  return (
    <main className="py-12 pb-24">
      <div className="pd-container">
        <PearlSectionHeader
          kicker="Treatment details"
          title={t.title}
          subtitle={t.summary}
          right={
            <div className="flex flex-wrap gap-3">
              <Link
                href="/demos/pearl-dental/booking"
                className="pd-btn pd-btn-primary"
              >
                Book consultation
              </Link>
              <Link
                href="/demos/pearl-dental/treatments"
                className="pd-btn pd-btn-secondary"
              >
                All treatments
              </Link>
            </div>
          }
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-12">
            {/* HEROLike Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-pd-primary/20 bg-gradient-to-br from-white to-pd-primary/5 p-8"
            >
              <div className="pd-kicker text-pd-primary mb-2">Highlights</div>
              <h2 className="text-2xl font-bold text-pd-text-main mb-6">{t.tagline}</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {t.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-pd-primary shrink-0" />
                    <span className="text-pd-text-main font-medium text-sm">{h}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4 pt-8 border-t border-pd-primary/10">
                <div className="pr-6 border-r border-pd-border/60">
                  <div className="text-[11px] uppercase tracking-wider text-pd-text-muted mb-1">Duration</div>
                  <div className="font-semibold text-pd-text-main">{t.duration}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-pd-text-muted mb-1">Comfort Level</div>
                  <div className="font-semibold text-pd-text-main">{t.comfort}</div>
                </div>
              </div>
            </motion.div>

            {/* PROCESS */}
            <section>
              <div className="pd-kicker mb-6">The Process</div>
              <div className="space-y-6">
                {t.whatToExpect.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-pd-primary/30 bg-pd-primary/5 text-sm font-semibold text-pd-primary">
                      {i + 1}
                    </div>
                    <div className="pt-1">
                      <p className="text-pd-text-main leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AFTERCARE */}
            <section className="bg-pd-surface rounded-2xl p-8 border border-pd-border">
              <h3 className="text-lg font-semibold text-pd-text-main mb-4">Aftercare</h3>
              <ul className="space-y-3">
                {t.aftercare.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-pd-text-muted">
                    <span className="text-pd-primary">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQs */}
            <section>
              <h3 className="text-xl font-bold text-pd-text-main mb-6">Frequent Questions</h3>
              <div className="grid gap-4">
                {t.faqs.map((f, i) => (
                  <div key={i} className="pd-card p-6">
                    <h4 className="font-semibold text-pd-text-main mb-2">{f.q}</h4>
                    <p className="text-sm text-pd-text-muted leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="pd-card p-6 sticky top-24">
              <div className="pd-kicker mb-3">Booking</div>
              <h3 className="text-lg font-semibold mb-2">Ready to start?</h3>
              <p className="text-sm text-pd-text-muted mb-6">
                Book a consultation to confirm if {t.title} is right for you. Use our online insurance checker to see your coverage.
              </p>
              <Link href="/demos/pearl-dental/booking" className="pd-btn pd-btn-primary w-full text-center">
                Book Consultation
              </Link>
              <div className="mt-4 text-center">
                <Link href="/demos/pearl-dental/insurance" className="text-xs text-pd-text-muted hover:text-pd-primary underline">
                  Check insurance coverage
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
