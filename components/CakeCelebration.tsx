"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Fireworks from "./Fireworks";

const CANDLE_POSITIONS = [-56, -28, 0, 28, 56];

export default function CakeCelebration() {
  const [blownOut, setBlownOut] = useState(false);

  return (
    <section className="section-padding relative overflow-hidden bg-charcoal px-6">
      <Fireworks active={blownOut} bursts={5} />

      <AnimatePresence>
        {blownOut && <FloatingHearts />}
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold/70">
            Make A Wish
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ivory sm:text-5xl">
            Time To <span className="gold-text">Celebrate</span>
          </h2>
        </motion.div>

        {/* Cake */}
        <div className="relative mt-16 flex flex-col items-center">
          {/* Candles */}
          <div className="relative flex h-24 items-end justify-center">
            {CANDLE_POSITIONS.map((offset, i) => (
              <div
                key={i}
                className="absolute bottom-0 flex flex-col items-center"
                style={{ left: `calc(50% + ${offset}px)`, transform: "translateX(-50%)" }}
              >
                <AnimatePresence>
                  {!blownOut && (
                    <motion.div
                      initial={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0, y: -10 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="mb-0.5 h-4 w-2 origin-bottom rounded-full bg-gradient-to-t from-orange-500 via-gold-bright to-yellow-100 animate-flicker"
                      style={{ boxShadow: "0 0 12px 3px rgba(255,215,0,0.7)" }}
                    />
                  )}
                </AnimatePresence>
                <div className="h-10 w-1.5 rounded-sm bg-gold-gradient" />
              </div>
            ))}
          </div>

          {/* Cake tiers */}
          <div className="relative flex flex-col items-center">
            <div className="h-8 w-40 rounded-t-lg border border-gold/40 bg-gradient-to-b from-[#1c1c1c] to-[#0f0f0f] shadow-gold" />
            <div className="h-12 w-56 rounded-t-xl border border-gold/40 bg-gradient-to-b from-[#201a10] to-[#0f0c08] shadow-gold" />
            <div className="h-16 w-72 rounded-t-2xl border border-gold/40 bg-gradient-to-b from-[#241d10] to-[#100d07] shadow-gold-lg" />
            {/* Gold drip accents */}
            <div className="absolute -top-1 left-1/2 h-2 w-44 -translate-x-1/2 rounded-full bg-gold-gradient opacity-70 blur-[1px]" />
          </div>
        </div>

        {!blownOut ? (
          <motion.button
            onClick={() => setBlownOut(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-14 rounded-full border border-gold/50 bg-white/5 px-8 py-3.5 font-body text-sm font-medium uppercase tracking-widest text-ivory shadow-gold backdrop-blur-sm transition-shadow hover:shadow-gold-lg"
          >
            Blow the Candles
          </motion.button>
        ) : (
          <motion.h3
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="gold-shimmer-text mt-14 font-display text-3xl font-bold sm:text-4xl"
          >
            Happy Birthday Sister ❤️
          </motion.h3>
        )}
      </div>
    </section>
  );
}

function FloatingHearts() {
  const hearts = Array.from({ length: 16 });
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {hearts.map((_, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0"
          style={{ left: `${Math.random() * 100}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -500 - Math.random() * 200, opacity: [0, 1, 0] }}
          transition={{ duration: 4 + Math.random() * 2, delay: Math.random() * 1.5, ease: "easeOut" }}
        >
          <Heart
            className="text-gold"
            fill="currentColor"
            style={{ width: 14 + Math.random() * 14, height: 14 + Math.random() * 14 }}
          />
        </motion.span>
      ))}
    </div>
  );
}
