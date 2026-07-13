"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoldShimmerText } from "@/components/motion/GoldShimmerText";
import { FloatingParticles } from "@/components/motion/FloatingParticles";
import { AnimatedGradient } from "@/components/motion/AnimatedGradient";
import { invitationData } from "@/data/invitation";

interface OpeningScreenProps {
  guestName: string;
  onOpen: () => void;
}

export function OpeningScreen({ guestName, onOpen }: OpeningScreenProps) {
  const [closing, setClosing] = useState(false);

  function handleOpen() {
    setClosing(true);
    setTimeout(onOpen, 900);
  }

  const { couple } = invitationData;

  return (
    <AnimatePresence>
      {!closing ? (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(8px)",
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--bg-primary)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Layar pembuka undangan pernikahan"
        >
          <AnimatedGradient className="z-0" />
          <FloatingParticles count={20} className="z-0" />

          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                Undangan Pernikahan
              </span>
              <div className="gold-divider my-3 w-24" aria-hidden />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <GoldShimmerText
                text={couple.groomFull}
                size="lg"
                as="h1"
                className="leading-tight"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="font-serif text-2xl italic text-[#D4AF37]/70"
                aria-hidden
              >
                &
              </motion.span>
              <GoldShimmerText
                text={couple.brideFull}
                size="lg"
                as="h1"
                className="leading-tight"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-center gap-1"
            >
              <p className="font-sans text-sm text-[color:var(--text-muted)]">
                Sabtu, 20 Desember 2026
              </p>
              <p className="font-sans text-sm text-[color:var(--text-muted)]">
                Grand Ballroom Nusantara, Yogyakarta
              </p>
            </motion.div>

            {guestName && guestName !== "Tamu Undangan" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-6 py-3"
              >
                <p className="font-sans text-sm text-[color:var(--text-muted)]">
                  Kepada Yth.
                </p>
                <p className="font-serif text-base font-semibold text-[#D4AF37]">
                  {guestName}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <motion.button
                onClick={handleOpen}
                className="group relative overflow-hidden rounded-full bg-[#D4AF37] px-10 py-4 font-sans text-sm font-semibold text-[#2A1E12] shadow-[0_8px_32px_rgba(212,175,55,0.4)]"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 12px 40px rgba(212,175,55,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  aria-hidden
                />
                Buka Undangan
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1"
            aria-hidden
          >
            <motion.div
              className="h-8 w-0.5 bg-gradient-to-b from-[#D4AF37]/50 to-transparent"
              animate={{ scaleY: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              Scroll
            </span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
