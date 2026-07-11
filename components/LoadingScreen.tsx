"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOAD_MESSAGES = [
  "Gathering the memories...",
  "Wrapping the letters...",
  "Lighting the candles...",
  "Preparing your birthday surprise...",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 12 + 4, 100);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 500);
        }
        return next;
      });
    }, 220);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOAD_MESSAGES.length);
    }, 1100);
    return () => clearInterval(msgInterval);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 900);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-obsidian"
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <FloatingParticles count={26} variant="particles" />
          <div className="absolute inset-0 bg-radial-fade" />

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-8 flex h-24 w-24 items-center justify-center"
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-gold/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-gold/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="gold-shimmer-text font-display text-4xl font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Anshu
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-10 font-display text-lg tracking-[0.25em] text-gold/90 sm:text-xl"
          >
            HAPPY BIRTHDAY
          </motion.p>

          {/* Progress bar */}
          <div className="relative h-[2px] w-64 overflow-hidden rounded-full bg-white/10 sm:w-80">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold-gradient"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <div className="mt-4 font-body text-xs tracking-widest text-muted">
            {Math.floor(progress)}%
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-6 font-script text-base italic text-muted/80 sm:text-lg"
            >
              {LOAD_MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
