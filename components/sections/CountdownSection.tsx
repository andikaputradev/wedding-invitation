"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { Reveal } from "@/components/motion/Reveal";

interface CountdownCardProps {
  value: string;
  label: string;
  delay: number;
}

function CountdownCard({ value, label, delay }: CountdownCardProps) {
  return (
    <Reveal delay={delay} direction="up">
      <motion.div
        className="card-glass flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-6 min-w-[72px] sm:min-w-[90px]"
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
      >
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -12, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif text-3xl font-bold tabular-nums gold-text sm:text-4xl"
          aria-live="polite"
          aria-label={`${value} ${label}`}
        >
          {value}
        </motion.span>
        <span className="font-sans text-xs uppercase tracking-widest text-[color:var(--text-muted)]">
          {label}
        </span>
      </motion.div>
    </Reveal>
  );
}

export function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown();

  return (
    <section
      id="countdown"
      className="relative py-20 section-padding overflow-hidden"
      aria-label="Hitung mundur hari pernikahan"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-4xl">
        <Reveal direction="up">
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">
              Menuju Hari Bahagia
            </span>
            <h2 className="font-serif text-3xl font-bold gold-text sm:text-4xl">
              Hitung Mundur
            </h2>
            <div className="gold-divider w-24" aria-hidden />
            <p className="font-sans text-sm text-[color:var(--text-secondary)]">
              Sabtu, 20 Desember 2026
            </p>
          </div>
        </Reveal>

        {isExpired ? (
          <Reveal direction="up">
            <div className="text-center py-12">
              <p className="font-serif text-2xl italic text-[#D4AF37]">
                Alhamdulillah, hari bahagia telah tiba!
              </p>
              <p className="mt-2 font-sans text-sm text-[color:var(--text-muted)]">
                Terima kasih atas doa dan kehadiran Anda.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
            <CountdownCard value={days} label="Hari" delay={0} />
            <Reveal delay={0.15}>
              <span
                className="font-serif text-2xl font-bold text-[#D4AF37]/50 pb-2 self-center"
                aria-hidden
              >
                :
              </span>
            </Reveal>
            <CountdownCard value={hours} label="Jam" delay={0.1} />
            <Reveal delay={0.25}>
              <span
                className="font-serif text-2xl font-bold text-[#D4AF37]/50 pb-2 self-center"
                aria-hidden
              >
                :
              </span>
            </Reveal>
            <CountdownCard value={minutes} label="Menit" delay={0.2} />
            <Reveal delay={0.35}>
              <span
                className="font-serif text-2xl font-bold text-[#D4AF37]/50 pb-2 self-center"
                aria-hidden
              >
                :
              </span>
            </Reveal>
            <CountdownCard value={seconds} label="Detik" delay={0.3} />
          </div>
        )}
      </div>
    </section>
  );
}
