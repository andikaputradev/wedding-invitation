"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check, Heart } from "lucide-react";
import { GoldShimmerText } from "@/components/motion/GoldShimmerText";
import { FloatingParticles } from "@/components/motion/FloatingParticles";
import { Button } from "@/components/ui/Button";
import { invitationData } from "@/data/invitation";
import { SITE_URL } from "@/lib/constants";
import { copyToClipboard } from "@/lib/utils";

export function FooterSection() {
  const [shared, setShared] = useState(false);
  const { couple, hashtag } = invitationData;

  async function handleShare() {
    const shareData = {
      title: `Pernikahan ${couple.groomFull} & ${couple.brideFull}`,
      text: `Anda diundang ke pernikahan ${couple.groomFull} & ${couple.brideFull} pada Sabtu, 20 Desember 2026 di Yogyakarta. ${hashtag}`,
      url: SITE_URL,
    };

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.share &&
        navigator.canShare?.(shareData)
      ) {
        await navigator.share(shareData);
      } else {
        await copyToClipboard(SITE_URL);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    } catch {
      // User membatalkan share atau error
    }
  }

  return (
    <footer
      id="footer"
      className="relative overflow-hidden pt-24 pb-12 section-padding"
      aria-label="Footer undangan"
    >
      <FloatingParticles count={14} className="z-0" />

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/3 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">
            Dengan Cinta
          </span>
          <div className="gold-divider w-16 my-2" aria-hidden />
          <GoldShimmerText
            text={`${couple.groomFull} & ${couple.brideFull}`}
            as="p"
            size="xl"
            className="leading-tight"
          />
          <p className="mt-2 font-sans text-sm text-[color:var(--text-muted)] tracking-wider">
            {hashtag}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-sans text-sm text-[color:var(--text-secondary)] max-w-xs">
            Bagikan undangan ini kepada keluarga dan sahabat yang ingin Anda
            ajak bersama.
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              size="md"
              onClick={handleShare}
              className="gap-2"
              aria-label="Bagikan undangan ini"
            >
              <AnimatePresence mode="wait" initial={false}>
                {shared ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden />
                    Link Tersalin!
                  </motion.span>
                ) : (
                  <motion.span
                    key="share"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" aria-hidden />
                    Bagikan Undangan
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        <div className="gold-divider w-full" aria-hidden />

        <div className="flex flex-col items-center gap-3">
          <p className="font-sans text-xs text-[color:var(--text-muted)] leading-relaxed max-w-sm">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
          <div className="flex items-center gap-2 text-xs text-[color:var(--text-muted)]">
            <span>Dibuat dengan</span>
            <Heart className="h-3 w-3 text-[#D4AF37]" aria-hidden />
            <span>untuk momen yang tak terlupakan</span>
          </div>
          <p className="font-sans text-xs text-[color:var(--text-muted)]/60">
            © 2026 {couple.groomFull} &amp; {couple.brideFull}
          </p>
        </div>
      </div>
    </footer>
  );
}
