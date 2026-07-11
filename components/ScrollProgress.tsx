"use client";

import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

interface ScrollProgressProps {
  /** When provided (0 to 1), the bar reflects this value instead of window scroll — used for step-based navigation. */
  progress?: number;
}

/**
 * Thin golden progress bar fixed to the top of the viewport.
 * Reflects window scroll by default, or a controlled `progress` value
 * (0-1) when the page is driven step-by-step instead of by scrolling.
 */
export default function ScrollProgress({ progress }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const manual = useMotionValue(0);

  useEffect(() => {
    if (progress !== undefined) manual.set(progress);
  }, [progress, manual]);

  const source = progress !== undefined ? manual : scrollYProgress;
  const scaleX = useSpring(source, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[90] h-[3px] origin-left bg-gold-gradient"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
