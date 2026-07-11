"use client";

import { useCallback, useEffect, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollProgress from "./ScrollProgress";
import StepNav from "./StepNav";

interface Step {
  label: string;
  render: (goNext: () => void, goToStart: () => void) => ReactNode;
}

interface StepFlowProps {
  steps: Step[];
}

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

/**
 * Presents each section as a single full-screen "step," advanced via
 * Back / Next controls (or the dots) instead of continuous scrolling.
 */
export default function StepFlow({ steps }: StepFlowProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(steps.length - 1, index));
      setDirection(clamped > current ? 1 : -1);
      setCurrent(clamped);
    },
    [current, steps.length]
  );

  const next = useCallback(() => goTo(current + 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1), [goTo, current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping = ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (isTyping) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [current]);

  return (
    <>
      <ScrollProgress progress={(current + 1) / steps.length} />

      <div className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="h-screen w-full overflow-y-auto pb-40"
          >
            {steps[current].render(next, () => goTo(0))}
          </motion.div>
        </AnimatePresence>
      </div>

      <StepNav
        steps={steps.map((s) => s.label)}
        current={current}
        onNext={next}
        onPrev={prev}
        onJump={goTo}
      />
    </>
  );
}
