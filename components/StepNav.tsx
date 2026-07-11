"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepNavProps {
  steps: string[];
  current: number;
  onNext: () => void;
  onPrev: () => void;
  onJump: (index: number) => void;
}

export default function StepNav({ steps, current, onNext, onPrev, onJump }: StepNavProps) {
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[85] flex flex-col items-center gap-3 px-4 pb-5 pt-8 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent">
      {/* Progress dots */}
      <div className="flex items-center gap-2" role="tablist" aria-label="Celebration steps">
        {steps.map((label, i) => (
          <button
            key={label}
            role="tab"
            aria-selected={i === current}
            aria-label={label}
            onClick={() => onJump(i)}
            className="group relative flex h-6 items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "h-2 w-6 bg-gold-gradient shadow-gold"
                  : i < current
                    ? "h-1.5 w-1.5 bg-gold/70"
                    : "h-1.5 w-1.5 bg-white/20"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Back / Next controls */}
      <div className="flex w-full max-w-sm items-center justify-between gap-4 sm:max-w-md">
        <motion.button
          onClick={onPrev}
          disabled={isFirst}
          whileHover={!isFirst ? { scale: 1.03 } : undefined}
          whileTap={!isFirst ? { scale: 0.97 } : undefined}
          className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-white/5 px-5 py-2.5 font-body text-xs font-medium uppercase tracking-widest text-ivory backdrop-blur-sm transition-opacity disabled:opacity-0 sm:text-sm"
          aria-label="Previous step"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </motion.button>

        <span className="font-body text-[11px] tracking-widest text-muted/70 sm:text-xs">
          {current + 1} / {steps.length} &middot; {steps[current]}
        </span>

        <motion.button
          onClick={onNext}
          disabled={isLast}
          whileHover={!isLast ? { scale: 1.03 } : undefined}
          whileTap={!isLast ? { scale: 0.97 } : undefined}
          className="flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold-gradient px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-widest text-obsidian shadow-gold transition-opacity disabled:opacity-0 sm:text-sm"
          aria-label="Next step"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
