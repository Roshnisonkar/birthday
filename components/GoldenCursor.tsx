"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Replaces the default cursor with a soft golden glow and a
 * lagging outer ring, plus a faint trail. Disabled on touch devices.
 */
export default function GoldenCursor() {
  const isTouch = useMediaQuery("(pointer: coarse)");
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.5 });

  const ringX = useSpring(x, { damping: 30, stiffness: 150, mass: 0.8 });
  const ringY = useSpring(y, { damping: 30, stiffness: 150, mass: 0.8 });

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement;
      setPointer(!!target.closest("a, button, [role='button'], input, textarea"));
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        className="absolute rounded-full mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: pointer ? 14 : 8,
          height: pointer ? 14 : 8,
          background: "#FFD700",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.3s",
        }}
      />
      <motion.div
        className="absolute rounded-full border border-gold"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: pointer ? 56 : 36,
          height: pointer ? 56 : 36,
          opacity: visible ? 0.6 : 0,
          boxShadow: "0 0 20px rgba(212,175,55,0.35)",
          transition: "width 0.25s, height 0.25s, opacity 0.3s",
        }}
      />
    </div>
  );
}
