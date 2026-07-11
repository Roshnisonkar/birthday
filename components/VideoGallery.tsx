"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Expand } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

const images: GalleryImage[] = [
  { id: "1", src: "/photos/gallery-1.jpeg", alt: "Childhood memory", caption: "Beautiful Memories" },
  { id: "2", src: "/photos/gallery-2.jpeg", alt: "Family moment", caption: "Together Forever" },
  { id: "3", src: "/photos/gallery-3.jpeg", alt: "Happy moment", caption: "Golden Memories" },
  { id: "4", src: "/photos/gallery-4.jpeg", alt: "Birthday memory", caption: "Special Day" },
  { id: "5", src: "/photos/gallery-5.jpeg", alt: "Fun moment", caption: "Smile Always" },
  { id: "6", src: "/photos/gallery-6.jpeg", alt: "Family photo", caption: "Our Bond" },
  { id: "7", src: "/photos/gallery-7.jpeg", alt: "Happy memory", caption: "Forever Cherished" },
];

export default function ImageGallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <section className="section-padding relative bg-obsidian px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-gold/70">
            Captured Moments
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ivory sm:text-5xl">
            Frames Full Of <span className="gold-text">Love</span>
          </h2>
        </motion.div>

        {/* Bento grid: image 1 spans large, rest fill around it */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2 sm:gap-5">
          {images.map((img, i) => (
            <ImageCard
              key={img.id}
              image={img}
              index={i}
              onClick={() => setSelected(img)}
              className={
                i === 0
                  ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                  : "aspect-square"
              }
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 backdrop-blur-sm px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl border border-gold/20 shadow-gold-lg"
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                width={1200}
                height={800}
                className="h-full w-full object-contain"
              />
              {selected.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian/90 to-transparent p-6">
                  <p className="font-display text-lg text-ivory">{selected.caption}</p>
                </div>
              )}
              <button
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 rounded-full border border-gold/30 bg-black/40 p-2 hover:border-gold"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-ivory" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ImageCard({
  image,
  index,
  onClick,
  className = "",
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`group glass-card relative cursor-pointer overflow-hidden rounded-2xl shadow-gold transition-shadow duration-500 hover:shadow-gold-lg ${className}`}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex w-full items-center justify-between p-4">
          {image.caption && (
            <p className="font-body text-sm font-medium text-ivory">{image.caption}</p>
          )}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient shadow-gold">
            <Expand className="h-4 w-4 text-obsidian" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}