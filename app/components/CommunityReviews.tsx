"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// =============================================================================
// TYPES
// =============================================================================

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

// =============================================================================
// THEME & CONSTANTS
// =============================================================================

const EASING = [0.16, 1, 0.3, 1] as const;

const THEME = {
  primary: "#f59e0b",
  primaryLight: "#fbbf24",
  primaryDark: "#d97706",
  primaryRgb: "245, 158, 11",
  star: "#fbbf24",
  starEmpty: "#3f3f46",
  text: {
    primary: "#f8fafc",
    secondary: "#a1a1aa",
    muted: "#71717a",
    dark: "#52525b",
  },
  bg: {
    card: "rgba(10, 10, 10, 0.6)",
    cardHover: "rgba(20, 20, 20, 0.8)",
    input: "rgba(10, 10, 10, 0.8)",
  },
  border: {
    default: "rgba(245, 158, 11, 0.1)",
    hover: "rgba(245, 158, 11, 0.3)",
    focus: "rgba(245, 158, 11, 0.5)",
  },
  glow: {
    soft: "rgba(245, 158, 11, 0.1)",
    medium: "rgba(245, 158, 11, 0.2)",
    strong: "rgba(245, 158, 11, 0.4)",
  },
} as const;

const STORAGE_KEY = "omrex-community-reviews";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getStoredReviews(): Review[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading reviews:", error);
  }

  return [];
}

function saveReview(review: Review): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const existing = stored ? JSON.parse(stored) : [];
    existing.unshift(review);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error("Error saving review:", error);
  }
}

function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

function generateId(): string {
  return `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// =============================================================================
// STAR RATING COMPONENT
// =============================================================================

type StarRatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
};

function StarRating({
  rating,
  onRatingChange,
  interactive = false,
  size = "md",
}: StarRatingProps): React.ReactElement {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "text-lg gap-0.5",
    md: "text-2xl gap-1",
    lg: "text-3xl gap-1",
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoverRating || rating);

        return (
          <motion.button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onRatingChange?.(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`relative transition-all duration-200 ${interactive ? "cursor-pointer" : "cursor-default"
              }`}
            whileHover={interactive ? { scale: 1.2, y: -2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
          >
            {/* Glow effect for active stars */}
            {isActive && (
              <motion.div
                className="absolute inset-0 blur-sm"
                style={{ color: THEME.star }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
              >
                ★
              </motion.div>
            )}
            <span
              style={{
                color: isActive ? THEME.star : THEME.starEmpty,
                filter: isActive ? `drop-shadow(0 0 8px ${THEME.glow.medium})` : "none",
              }}
              className="relative transition-colors duration-200"
            >
              ★
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// =============================================================================
// SPOTLIGHT CARD
// =============================================================================

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

function SpotlightCard({ children, className = "", ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${THEME.glow.soft}, transparent 40%)`,
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${THEME.glow.soft}, transparent 40%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative z-20">{children}</div>
    </div>
  );
}
// =============================================================================
// REVIEW CARD
// =============================================================================

type ReviewCardProps = {
  review: Review;
  isActive?: boolean;
};

function ReviewCard({ review, isActive = true }: ReviewCardProps): React.ReactElement {
  return (
    <SpotlightCard
      className={`h-full rounded-2xl border transition-all duration-500 ${isActive
          ? `border-[${THEME.border.hover}] bg-[${THEME.bg.cardHover}]`
          : `border-[${THEME.border.default}] bg-[${THEME.bg.card}]`
        }`}
      style={{
        borderColor: isActive ? THEME.border.hover : THEME.border.default,
        background: isActive ? THEME.bg.cardHover : THEME.bg.card,
      }}
    >
      <div className="relative p-6">
        {/* Quote mark */}
        <motion.div
          className="absolute -left-1 -top-2 text-[4rem] font-serif leading-none"
          style={{ color: `rgba(${THEME.primaryRgb}, 0.1)` }}
          animate={{ opacity: isActive ? 0.15 : 0.08 }}
        >
          "
        </motion.div>

        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryDark})`,
                color: "#030303",
                boxShadow: isActive ? `0 0 20px ${THEME.glow.medium}` : "none",
              }}
              animate={{ scale: isActive ? 1 : 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {review.name.charAt(0).toUpperCase()}
            </motion.div>

            <div>
              <h4 style={{ color: THEME.text.primary }} className="font-semibold">
                {review.name}
              </h4>
              <p style={{ color: THEME.text.dark }} className="text-[0.7rem]">
                {new Date(review.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <StarRating rating={review.rating} size="sm" />
        </div>

        {/* Comment */}
        <p
          style={{ color: THEME.text.secondary }}
          className="text-[0.9rem] leading-relaxed"
        >
          "{review.comment}"
        </p>

        {/* Decorative corner glow */}
        <div
          className="absolute -bottom-10 -right-10 h-20 w-20 rounded-full blur-3xl transition-opacity duration-500"
          style={{
            background: THEME.glow.soft,
            opacity: isActive ? 1 : 0.3,
          }}
        />
      </div>
    </SpotlightCard>
  );
}

// =============================================================================
// REVIEW FORM
// =============================================================================

type ReviewFormProps = {
  onSubmit: (review: Review) => void;
};

function ReviewForm({ onSubmit }: ReviewFormProps): React.ReactElement {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || rating === 0) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const newReview: Review = {
      id: generateId(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    onSubmit(newReview);

    setName("");
    setRating(0);
    setComment("");
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const isValid = name.trim() && comment.trim() && rating > 0;

  return (
    <SpotlightCard className="rounded-3xl border border-[#f59e0b]/10 bg-[#0a0a0a]/60 backdrop-blur-xl">
      <div className="relative p-8">
        {/* Background decorations */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl"
          style={{ background: THEME.glow.soft }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full blur-3xl"
          style={{ background: `rgba(${THEME.primaryRgb}, 0.05)` }}
        />

        {/* Header */}
        <div className="relative z-10 mb-8 text-center">
          <motion.div
            className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: `rgba(${THEME.primaryRgb}, 0.1)`,
              border: `1px solid rgba(${THEME.primaryRgb}, 0.2)`,
            }}
          >
            <span style={{ color: THEME.primary }} className="text-sm">
              ✦
            </span>
            <span
              style={{ color: THEME.primary }}
              className="text-[10px] font-medium uppercase tracking-[0.2em]"
            >
              Share Your Experience
            </span>
            <span style={{ color: THEME.primary }} className="text-sm">
              ✦
            </span>
          </motion.div>

          <h3 style={{ color: THEME.text.primary }} className="text-[1.4rem] font-semibold">
            Leave a Review
          </h3>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="relative z-10 mb-6 rounded-xl p-4 text-center"
              style={{
                background: `rgba(${THEME.primaryRgb}, 0.15)`,
                border: `1px solid rgba(${THEME.primaryRgb}, 0.3)`,
              }}
            >
              <p style={{ color: THEME.primaryLight }} className="flex items-center justify-center gap-2">
                <span>✓</span> Thank you for your review!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="review-name"
              style={{ color: THEME.text.muted }}
              className="mb-2 block text-[0.7rem] uppercase tracking-[0.2em]"
            >
              Your Name
            </label>
            <motion.input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300"
              style={{
                background: THEME.bg.input,
                border: `1px solid ${THEME.border.default}`,
                color: THEME.text.primary,
              }}
              whileFocus={{
                borderColor: THEME.border.focus,
                boxShadow: `0 0 0 3px ${THEME.glow.soft}`,
              }}
            />
          </div>

          {/* Rating */}
          <div>
            <label
              style={{ color: THEME.text.muted }}
              className="mb-3 block text-[0.7rem] uppercase tracking-[0.2em]"
            >
              Your Rating
            </label>
            <div className="flex items-center gap-4">
              <StarRating rating={rating} onRatingChange={setRating} interactive size="lg" />
              <AnimatePresence>
                {rating > 0 && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{ color: THEME.text.muted }}
                    className="text-sm"
                  >
                    {rating === 5
                      ? "Outstanding!"
                      : rating === 4
                        ? "Great!"
                        : rating === 3
                          ? "Good"
                          : rating === 2
                            ? "Fair"
                            : "Poor"}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor="review-comment"
              style={{ color: THEME.text.muted }}
              className="mb-2 block text-[0.7rem] uppercase tracking-[0.2em]"
            >
              Your Review
            </label>
            <motion.textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              required
              rows={4}
              className="w-full resize-none rounded-xl px-4 py-3.5 text-sm outline-none transition-all duration-300"
              style={{
                background: THEME.bg.input,
                border: `1px solid ${THEME.border.default}`,
                color: THEME.text.primary,
              }}
              whileFocus={{
                borderColor: THEME.border.focus,
                boxShadow: `0 0 0 3px ${THEME.glow.soft}`,
              }}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="group relative w-full overflow-hidden rounded-xl py-4 font-semibold uppercase tracking-[0.1em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: isValid
                ? `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryDark})`
                : THEME.bg.input,
              color: isValid ? "#030303" : THEME.text.dark,
              boxShadow: isValid ? `0 0 30px ${THEME.glow.medium}` : "none",
            }}
            whileHover={isValid ? { scale: 1.02, boxShadow: `0 0 50px ${THEME.glow.strong}` } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-[0.8rem]">
              {isSubmitting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ◌
                  </motion.span>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Review
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </>
              )}
            </span>

            {/* Shine effect */}
            {isValid && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            )}
          </motion.button>
        </form>
      </div>
    </SpotlightCard>
  );
}

// =============================================================================
// STATS DISPLAY
// =============================================================================

type ReviewStatsProps = {
  totalReviews: number;
  averageRating: number;
};

function ReviewStats({ totalReviews, averageRating }: ReviewStatsProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16"
    >
      {/* Average Rating */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-4">
          <motion.span
            className="text-[3.5rem] font-bold tabular-nums"
            style={{ color: THEME.text.primary }}
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {averageRating.toFixed(1)}
          </motion.span>
          <div className="flex flex-col items-start gap-1">
            <StarRating rating={Math.round(averageRating)} size="sm" />
            <span
              style={{ color: THEME.text.dark }}
              className="text-[0.65rem] uppercase tracking-[0.2em]"
            >
              Average Rating
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="hidden h-16 w-px sm:block"
        style={{
          background: `linear-gradient(180deg, transparent, rgba(${THEME.primaryRgb}, 0.3), transparent)`,
        }}
      />

      {/* Total Reviews */}
      <div className="text-center">
        <motion.span
          className="block text-[3.5rem] font-bold tabular-nums"
          style={{ color: THEME.primary }}
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {totalReviews}
        </motion.span>
        <span
          style={{ color: THEME.text.dark }}
          className="text-[0.65rem] uppercase tracking-[0.2em]"
        >
          Total Reviews
        </span>
      </div>
    </motion.div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function CommunityReviews(): React.ReactElement {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Load reviews
  useEffect(() => {
    setReviews(getStoredReviews());
    setIsLoaded(true);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (reviews.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.min(reviews.length, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleNewReview = useCallback((review: Review) => {
    saveReview(review);
    setReviews((prev) => [review, ...prev]);
    setActiveIndex(0);
  }, []);

  const averageRating = calculateAverageRating(reviews);
  const totalReviews = reviews.length;

  return (
    // mobile: Tighter padding on mobile, more on desktop
    <section ref={ref} className="relative overflow-hidden px-4 py-12 sm:py-16 md:py-24 sm:px-6 lg:px-8">
      {/* Background effects */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, rgba(${THEME.primaryRgb}, 0.03), transparent 50%)`,
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          // mobile: Reduced margin on mobile
          className="mb-8 sm:mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${THEME.primaryRgb}, 0.5))`,
              }}
            />
            <span
              style={{ color: THEME.primary }}
              className="text-[11px] uppercase tracking-[0.3em]"
            >
              Community Reviews
            </span>
            <span
              className="h-px w-12"
              style={{
                background: `linear-gradient(90deg, rgba(${THEME.primaryRgb}, 0.5), transparent)`,
              }}
            />
          </div>

          // mobile: Smaller text on mobile
          <h2 style={{ color: THEME.text.primary }} className="text-[1.5rem] font-semibold sm:text-[1.8rem] md:text-[2.2rem]">
            What people <span className="text-gradient-gold">think</span>
          </h2>

          <p style={{ color: THEME.text.secondary }} className="mx-auto mt-4 max-w-md text-[0.95rem]">
            Real reviews from our community. Your feedback helps us grow.
          </p>
        </motion.div>

        {/* Stats */}
        {isLoaded && totalReviews > 0 && (
          <ReviewStats totalReviews={totalReviews} averageRating={averageRating} />
        )}

        {/* Grid Layout - mobile: single column, desktop: 3 columns */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Reviews Carousel */}
          <div className="lg:col-span-2">
            {reviews.length > 0 ? (
              // mobile: Smaller card height on mobile
              <div className="relative h-[240px] sm:h-[280px]">
                <AnimatePresence mode="popLayout">
                  {reviews.slice(0, 5).map((review, index) => {
                    const isActive = index === activeIndex;
                    const offset = index - activeIndex;

                    // Only render visible cards
                    if (Math.abs(offset) > 2) return null;

                    return (
                      <motion.div
                        key={review.id}
                        className="absolute inset-0 px-2"
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{
                          opacity: isActive ? 1 : Math.max(0, 0.6 - Math.abs(offset) * 0.25),
                          y: offset * 60,
                          scale: 1 - Math.abs(offset) * 0.06,
                          zIndex: 10 - Math.abs(offset),
                        }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.6, ease: EASING }}
                      >
                        <ReviewCard review={review} isActive={isActive} />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Navigation dots */}
                {reviews.length > 1 && (
                  <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
                    {reviews.slice(0, 5).map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className="relative h-2 rounded-full transition-all duration-300"
                        style={{
                          width: index === activeIndex ? 24 : 8,
                          background:
                            index === activeIndex ? THEME.primary : THEME.text.dark,
                          boxShadow:
                            index === activeIndex
                              ? `0 0 10px ${THEME.glow.medium}`
                              : "none",
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-[280px] items-center justify-center rounded-2xl border border-dashed"
                style={{
                  borderColor: THEME.border.default,
                  background: THEME.bg.card,
                }}
              >
                <div className="text-center">
                  <motion.div
                    className="mb-4 text-4xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✦
                  </motion.div>
                  <p style={{ color: THEME.text.muted }}>
                    No reviews yet. Be the first to share your experience!
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Review Form */}
          <div className="lg:col-span-1">
            <ReviewForm onSubmit={handleNewReview} />
          </div>
        </div>
      </div>
    </section>
  );
}