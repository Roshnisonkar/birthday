"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memories } from "@/data/memories";

export default function Timeline() {
  return (
    <section className="section-padding relative bg-obsidian px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading />

        <div className="relative mt-20">
          {/* Center line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-16">
            {memories.map((memory, i) => (
              <TimelineItem key={memory.id} memory={memory} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <span className="font-body text-xs uppercase tracking-[0.3em] text-gold/70">
        Our Story
      </span>
      <h2 className="mt-4 font-display text-4xl font-semibold text-ivory sm:text-5xl">
        A Timeline of <span className="gold-text">Us</span>
      </h2>
    </motion.div>
  );
}

function TimelineItem({
  memory,
  index,
}: {
  memory: (typeof memories)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative pl-16 sm:pl-0">
      <div
        className={`sm:grid sm:grid-cols-2 sm:gap-12 ${isEven ? "" : "sm:[direction:rtl]"}`}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`glass-card overflow-hidden rounded-2xl [direction:ltr] ${isEven ? "sm:col-start-1" : "sm:col-start-2"}`}
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={memory.image}
              alt={memory.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
          </div>
          <div className="p-6">
            <span className="font-body text-xs uppercase tracking-widest text-gold/80">
              {memory.year}
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold text-ivory">
              {memory.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted">
              {memory.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-6 top-8 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-gold-gradient shadow-gold sm:left-1/2"
      >
        <span className="absolute h-8 w-8 animate-pulse-glow rounded-full bg-gold/30" />
      </motion.div>
    </div>
  );
}
