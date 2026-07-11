"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, Sparkles } from "lucide-react";
import FloatingParticles from "./FloatingParticles";

interface PasswordGateProps {
  onUnlock: () => void;
  /** Change this to whatever secret word you want your sister to enter. */
  password?: string;
  /** A gentle nudge shown near the input, without giving it away outright. */
  hint?: string;
}

export default function PasswordGate({
  onUnlock,
  password = "1201",
  hint = "Hint: it's how I always end our calls.",
}: PasswordGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === password.toLowerCase()) {
      setError(false);
      setUnlocking(true);
      setTimeout(onUnlock, 1400);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian px-4">
      <FloatingParticles count={22} variant="fireflies" />
      <div className="absolute inset-0 bg-radial-fade" />

      <AnimatePresence>
        {unlocking && (
          <motion.div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-gold-bright"
                style={{ left: "50%", top: "50%" }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: (Math.random() - 0.5) * 900,
                  y: (Math.random() - 0.5) * 900,
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: unlocking ? 0 : 1,
          y: 0,
          x: shake ? [0, -10, 10, -8, 8, 0] : 0,
          scale: unlocking ? 1.05 : 1,
        }}
        transition={{ duration: shake ? 0.5 : 0.8, ease: "easeOut" }}
        className="glass-card relative z-10 w-full max-w-md rounded-3xl p-8 shadow-gold-lg sm:p-10"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-white/5">
          <Lock className="h-6 w-6 text-gold" strokeWidth={1.5} />
        </div>

        <h1 className="text-balance mb-3 text-center font-display text-2xl font-semibold leading-snug text-ivory sm:text-3xl">
          For My Beautiful Sister <span aria-hidden>❤️</span>
        </h1>
        <p className="mb-8 text-center font-body text-sm text-muted">
          This little corner of the internet was made only for you. Enter the
          word to step inside.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter the secret word"
              autoComplete="off"
              className="w-full rounded-xl border border-gold/25 bg-white/5 px-5 py-3.5 text-center font-body text-ivory placeholder:text-muted/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50"
              aria-label="Password"
              aria-invalid={error}
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-center text-xs text-rose-400"
                  role="alert"
                >
                  Not quite — try again.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient px-6 py-3.5 font-body text-sm font-semibold uppercase tracking-widest text-obsidian shadow-gold transition-shadow hover:shadow-gold-lg"
          >
            Unlock
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </form>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center font-script text-sm italic text-muted/70">
          <Sparkles className="h-3.5 w-3.5 text-gold/70" />
          {hint}
        </p>
      </motion.div>
    </div>
  );
}
