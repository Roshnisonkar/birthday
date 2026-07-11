"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface FloatingParticlesProps {
  count?: number;
  variant?: "particles" | "stars" | "fireflies";
  className?: string;
}

interface Particle {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  opacity: number;
}

/**
 * Ambient background of drifting golden particles, twinkling stars,
 * or firefly-style glows. Purely decorative and aria-hidden.
 */
export default function FloatingParticles({
  count = 30,
  variant = "particles",
  className = "",
}: FloatingParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: variant === "stars" ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, [count, variant]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background:
              variant === "stars"
                ? "#FFFFFF"
                : "radial-gradient(circle, #FFD700 0%, #D4AF37 60%, transparent 100%)",
            boxShadow: variant === "fireflies" ? "0 0 8px 2px rgba(212,175,55,0.6)" : undefined,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            y: variant === "stars" ? [0, 0] : [0, -40, 0],
            x: variant === "fireflies" ? [0, 15, -10, 0] : 0,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
