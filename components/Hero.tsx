"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingParticles from "./FloatingParticles";
import { useMagnetic } from "@/hooks/useMagnetic";

interface HeroProps {
  onBegin: () => void;
  sisterName?: string;
}

export default function Hero({ onBegin, sisterName = "Sister" }: HeroProps) {
  const magnetic = useMagnetic(0.4);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-obsidian px-6 text-center">
      {/* Layered ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-obsidian to-obsidian" />
      <FloatingParticles count={45} variant="stars" />
      <FloatingParticles count={20} variant="particles" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-6 font-body text-xs uppercase text-gold/80 sm:text-sm"
        >
          A Private Celebration
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-balance font-display text-5xl font-bold leading-[1.1] text-ivory sm:text-7xl md:text-8xl"
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="gold-shimmer-text mt-3 font-script text-4xl italic sm:text-6xl md:text-7xl"
        >
          My Dearest {sisterName}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 max-w-xl font-body text-base leading-relaxed text-muted sm:text-lg"
        >
          Every year gives me one more reason to be grateful you&rsquo;re mine.
          This one is entirely for you.
        </motion.p>

        <motion.button
          ref={magnetic.ref as React.RefObject<HTMLButtonElement>}
          {...magnetic.handlers}
          onClick={onBegin}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: magnetic.offset.x,
            translateY: magnetic.offset.y,
          }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="group relative mt-12 overflow-hidden rounded-full border border-gold/50 bg-white/5 px-10 py-4 font-body text-sm font-medium uppercase tracking-[0.2em] text-ivory shadow-gold backdrop-blur-sm transition-shadow hover:shadow-gold-lg"
        >
          <span className="relative z-10">Begin the Journey</span>
          <span className="absolute inset-0 -z-0 bg-gold-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 2.2, duration: 1 }, y: { delay: 2.2, duration: 2, repeat: Infinity } }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-gold/60" />
        </motion.div>
      </div>
    </section>
  );
}
