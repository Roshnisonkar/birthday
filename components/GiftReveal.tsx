"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Gift } from "lucide-react";
import Fireworks from "./Fireworks";

export default function GiftReveal() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="section-padding relative overflow-hidden bg-obsidian px-6">
      <Fireworks active={opened} bursts={4} />
      <AnimatePresence>{opened && <GiftHearts />}</AnimatePresence>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold/70">
            One Last Surprise
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ivory sm:text-5xl">
            A Little <span className="gold-text">Gift</span> For You
          </h2>
        </motion.div>

        <div className="relative mt-16 flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 2.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute h-40 w-40 rounded-full bg-gold-bright/40 blur-3xl"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setOpened(true)}
            disabled={opened}
            whileHover={!opened ? { scale: 1.05, rotate: -1 } : undefined}
            whileTap={!opened ? { scale: 0.95 } : undefined}
            aria-label="Open your gift"
            className="relative z-10"
          >
            {/* Box lid */}
            <motion.div
              animate={
                opened
                  ? { y: -60, rotate: -18, opacity: 0 }
                  : { y: 0, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -top-6 left-1/2 h-8 w-48 -translate-x-1/2 rounded-md border border-gold/40 bg-gradient-to-b from-[#1c1c1c] to-[#0c0c0c] shadow-gold"
            />
            {/* Box body */}
            <div className="relative flex h-40 w-44 items-center justify-center rounded-lg border border-gold/40 bg-gradient-to-b from-[#161616] to-[#0a0a0a] shadow-gold-lg">
              {!opened && (
                <>
                  <div className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-gold-gradient" />
                  <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-gold-gradient" />
                  <div className="absolute -top-2 left-1/2 h-6 w-8 -translate-x-1/2 rounded-full border-2 border-gold" />
                </>
              )}
              {opened && <Gift className="h-10 w-10 text-gold/40" strokeWidth={1} />}
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="glass-card mt-10 rounded-2xl p-8 shadow-gold-lg"
            >
              <p className="text-balance font-script text-xl italic leading-relaxed text-ivory/90 sm:text-2xl">
                The best gift I could give you is a reminder: you are loved
                more than you know, admired more than you realize, and
                cherished every single day — not just today.
              </p>
              <p className="mt-4 font-body text-sm text-gold/80">
                Happy Birthday, my forever favorite person.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function GiftHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0"
          style={{ left: `${Math.random() * 100}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -450 - Math.random() * 200, opacity: [0, 1, 0] }}
          transition={{ duration: 4 + Math.random() * 2, delay: Math.random() * 1.2, ease: "easeOut" }}
        >
          <Heart className="text-gold" fill="currentColor" style={{ width: 12 + Math.random() * 12, height: 12 + Math.random() * 12 }} />
        </motion.span>
      ))}
    </div>
  );
}
