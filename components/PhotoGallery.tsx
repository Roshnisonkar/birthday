"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { photos } from "@/data/photos";

const spanClasses: Record<string, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

export default function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    []
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, next, prev]);

  return (
    <section className="section-padding relative bg-charcoal px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold/70">
            Frozen Moments
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ivory sm:text-5xl">
            A Gallery of <span className="gold-text">Memories</span>
          </h2>
        </motion.div>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
              onClick={() => setActiveIndex(i)}
              className={`group relative overflow-hidden rounded-2xl border border-gold/20 shadow-gold ${spanClasses[photo.span ?? "normal"]}`}
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/60" />
              {photo.caption && (
                <p className="absolute bottom-3 left-3 right-3 translate-y-2 font-body text-xs text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.caption}
                </p>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-obsidian/95 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 rounded-full border border-gold/30 bg-white/5 p-2.5 text-ivory transition-colors hover:border-gold hover:text-gold"
              aria-label="Close photo viewer"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-gold/30 bg-white/5 p-2.5 text-ivory transition-colors hover:border-gold hover:text-gold sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-gold/30 bg-white/5 p-2.5 text-ivory transition-colors hover:border-gold hover:text-gold sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="relative flex max-h-[85vh] w-full max-w-3xl flex-col items-center"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gold/30 shadow-gold-lg">
                <Image
                  src={photos[activeIndex].src}
                  alt={photos[activeIndex].alt}
                  fill
                  className="object-contain bg-black"
                  sizes="90vw"
                />
              </div>
              {photos[activeIndex].caption && (
                <p className="mt-5 text-center font-script text-lg italic text-gold/90">
                  {photos[activeIndex].caption}
                </p>
              )}
              <p className="mt-1 font-body text-xs text-muted">
                {activeIndex + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
