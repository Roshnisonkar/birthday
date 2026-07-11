"use client";

import { motion } from "framer-motion";
import { wishes } from "@/data/wishes";

export default function Wishes() {
  return (
    <section className="section-padding relative bg-obsidian px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold/70">
            You Are
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ivory sm:text-5xl">
            Everything I <span className="gold-text">Admire</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {wishes.map((wish, i) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, type: "spring", stiffness: 120 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card flex flex-col items-center rounded-2xl p-6 text-center shadow-gold transition-shadow duration-500 hover:shadow-gold-lg"
            >
              <motion.span
                className="mb-3 text-3xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                aria-hidden="true"
              >
                {wish.emoji}
              </motion.span>
              <h3 className="font-display text-base font-semibold text-ivory sm:text-lg">
                {wish.title}
              </h3>
              <p className="mt-2 font-body text-xs leading-relaxed text-muted sm:text-sm">
                {wish.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
