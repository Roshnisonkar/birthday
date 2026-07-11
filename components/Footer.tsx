"use client";

import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

interface FooterProps {
  /** Replays the celebration from the very first step. */
  onRestart?: () => void;
}

export default function Footer({ onRestart }: FooterProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-obsidian px-6 text-center">
      <FloatingParticles count={24} variant="stars" />
      <div className="absolute inset-0 bg-radial-fade opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <p className="mx-auto flex max-w-md items-center justify-center gap-2 font-script text-2xl italic text-ivory/90 sm:text-3xl">
          Made with <Heart className="h-5 w-5 fill-gold text-gold" /> for the best sister in the world
        </p>
        <p className="mt-4 font-body text-xs tracking-widest text-muted/50">
          {new Date().getFullYear()} &middot; A Private Celebration
        </p>

        {onRestart && (
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group mt-10 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-7 py-3 font-body text-xs font-medium uppercase tracking-widest text-ivory shadow-gold backdrop-blur-sm transition-shadow hover:shadow-gold-lg sm:text-sm"
          >
            <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-180" />
            Relive It Again
          </motion.button>
        )}
      </motion.div>
    </section>
  );
}
