"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { invitationData } from "@/data/invitation";
import type { GalleryImage } from "@/types/invitation";

interface LightboxProps {
  image: GalleryImage;
  onClose: () => void;
}

function Lightbox({ image, onClose }: LightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${image.alt}`}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        className="relative max-h-[90vh] max-w-3xl w-full overflow-hidden rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Tutup lightbox"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export function GallerySection() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const { gallery } = invitationData;

  return (
    <section
      id="gallery"
      className="py-24 section-padding overflow-hidden"
      aria-label="Galeri foto"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal direction="up">
          <div className="mb-14 flex flex-col items-center gap-3 text-center">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">
              Pre-Wedding
            </span>
            <h2 className="font-serif text-3xl font-bold gold-text sm:text-4xl">
              Galeri Foto
            </h2>
            <div className="gold-divider w-24" aria-hidden />
          </div>
        </Reveal>

        <div className="columns-2 gap-3 sm:columns-3 lg:columns-3 space-y-3">
          {gallery.map((image, i) => (
            <Reveal key={i} delay={i * 0.08} direction="up">
              <motion.button
                className="group relative w-full overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
                onClick={() => setSelected(image)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                aria-label={`Lihat ${image.alt}`}
              >
                <div className="relative overflow-hidden break-inside-avoid">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/90 text-[#2A1E12]"
                      aria-hidden
                    >
                      <ZoomIn className="h-4 w-4" />
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-[#D4AF37]/0 transition-all duration-300 group-hover:border-[#D4AF37]/30" aria-hidden />
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <Lightbox image={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
