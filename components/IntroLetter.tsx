"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

const LETTER_PARAGRAPHS = [
  "मेरी प्यारी बहन,",

  "जन्मदिन की ढेर सारी शुभकामनाएँ! 💖",

  "तुम सिर्फ़ मेरी बहन नहीं, मेरी सबसे अच्छी दोस्त  हो। तुम्हारी मुस्कान हमेशा बनी रहे और तुम्हारे जीवन में खुशियाँ, सफलता और प्यार कभी कम न हो।",

  "हमेशा खुश रहो। तुम मेरे लिए दुनिया की सबसे खास इंसान हो।",

  "ढेर सारा प्यार! ❤️",
];

export default function IntroLetter() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal px-6 py-24">
      <FloatingParticles count={16} variant="particles" />
      <div className="absolute inset-0 bg-radial-fade opacity-60" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="envelope"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-[3/2] w-full max-w-md cursor-pointer"
              aria-label="Open the letter"
            >
              {/* Envelope body */}
              <div className="absolute inset-0 rounded-lg border border-gold/30 bg-gradient-to-b from-[#161616] to-[#0c0c0c] shadow-gold-lg" />
              {/* Envelope flap */}
              <motion.div
                className="absolute left-0 top-0 h-full w-full origin-top"
                style={{
                  clipPath: "polygon(0 0, 50% 45%, 100% 0)",
                }}
              >
                <div className="h-full w-full bg-gradient-to-b from-[#1c1c1c] to-[#0c0c0c] border-b border-gold/20" />
              </motion.div>
              {/* Wax seal */}
              <motion.div
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-gradient shadow-gold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="font-display text-xl font-bold text-obsidian">A</span>
              </motion.div>
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-script text-lg italic text-gold/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                tap to open
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="glass-card relative w-full rounded-2xl p-8 shadow-gold-lg sm:p-12"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.03), transparent 60%)",
              }}
            >
              <div className="pointer-events-none absolute right-6 top-6 h-10 w-10 rounded-full bg-gold-gradient opacity-90 shadow-gold sm:right-10 sm:top-10" />
              <div className="space-y-5 font-script text-lg italic leading-relaxed text-ivory/90 sm:text-xl">
                {LETTER_PARAGRAPHS.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.35, duration: 0.7 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
