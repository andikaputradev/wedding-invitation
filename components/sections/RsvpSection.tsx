"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Users } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedGradient } from "@/components/motion/AnimatedGradient";
import { useRsvp } from "@/hooks/useRsvp";
import { rsvpSchema } from "@/lib/validators";
import { ATTENDANCE_OPTIONS, MAX_MESSAGE_LENGTH } from "@/lib/constants";
import type { AttendanceStatus } from "@/types/invitation";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  attendance?: string;
  guestCount?: string;
  message?: string;
}

export function RsvpSection() {
  const { state, submit, reset } = useRsvp();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceStatus>("attending");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const parsed = rsvpSchema.safeParse({ name, attendance, guestCount, message });
    if (!parsed.success) {
      const fe: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        fe[field] = issue.message;
      }
      setErrors(fe);
      return;
    }

    submit(parsed.data);
  }

  function handleReset() {
    reset();
    setName("");
    setAttendance("attending");
    setGuestCount(1);
    setMessage("");
    setErrors({});
  }

  const isLoading = state.status === "loading";

  return (
    <section
      id="rsvp"
      className="relative py-24 section-padding overflow-hidden"
      aria-label="Konfirmasi kehadiran"
    >
      <AnimatedGradient className="z-0 opacity-50" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal direction="up">
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">
              Konfirmasi
            </span>
            <h2 className="font-serif text-3xl font-bold gold-text sm:text-4xl">
              RSVP
            </h2>
            <div className="gold-divider w-24" aria-hidden />
            <p className="font-sans text-sm text-[color:var(--text-secondary)] max-w-sm text-balance">
              Mohon konfirmasi kehadiran Anda paling lambat{" "}
              <strong className="text-[#D4AF37]">10 Desember 2026</strong>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="up">
          <div className="card-glass rounded-3xl p-8 border border-[#D4AF37]/15 shadow-[0_4px_32px_rgba(212,175,55,0.08)]">
            <AnimatePresence mode="wait">
              {state.status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                  className="flex flex-col items-center gap-5 py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/15"
                  >
                    <CheckCircle className="h-8 w-8 text-[#D4AF37]" />
                  </motion.div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif text-xl font-semibold text-[color:var(--text-primary)]">
                      Terima Kasih!
                    </h3>
                    <p className="font-sans text-sm text-[color:var(--text-secondary)]">
                      Konfirmasi kehadiran Anda telah kami terima. Kami sangat
                      menantikan kehadiran Anda.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Kirim Ulang
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  <Input
                    label="Nama Lengkap"
                    type="text"
                    placeholder="Masukkan nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    required
                    maxLength={80}
                    autoComplete="name"
                  />

                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-[color:var(--text-secondary)]">
                      Konfirmasi Kehadiran{" "}
                      <span className="text-[#D4AF37]" aria-label="wajib diisi">
                        *
                      </span>
                    </legend>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {ATTENDANCE_OPTIONS.map((opt) => (
                        <label
                          key={opt.value}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200",
                            "focus-within:ring-2 focus-within:ring-[#D4AF37]",
                            attendance === opt.value
                              ? "border-[#D4AF37] bg-[#D4AF37]/10"
                              : "border-[color:var(--border-color)] hover:border-[#D4AF37]/40"
                          )}
                        >
                          <input
                            type="radio"
                            name="attendance"
                            value={opt.value}
                            checked={attendance === opt.value}
                            onChange={() => setAttendance(opt.value)}
                            className="sr-only"
                          />
                          <span
                            className={cn(
                              "h-3.5 w-3.5 rounded-full border-2 flex items-center justify-center shrink-0",
                              attendance === opt.value
                                ? "border-[#D4AF37] bg-[#D4AF37]"
                                : "border-[color:var(--border-color)]"
                            )}
                            aria-hidden
                          >
                            {attendance === opt.value && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[#2A1E12]" />
                            )}
                          </span>
                          <span className="text-sm text-[color:var(--text-primary)]">
                            {opt.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.attendance && (
                      <p className="mt-1 text-xs text-red-500" role="alert">
                        {errors.attendance}
                      </p>
                    )}
                  </fieldset>

                  {attendance === "attending" && (
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="guestCount"
                        className="text-sm font-medium text-[color:var(--text-secondary)]"
                      >
                        <Users className="inline h-3.5 w-3.5 mr-1 text-[#D4AF37]" aria-hidden />
                        Jumlah Tamu
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setGuestCount((v) => Math.max(1, v - 1))
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border-color)] text-[color:var(--text-primary)] hover:border-[#D4AF37]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                          aria-label="Kurangi jumlah tamu"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center font-serif text-lg font-semibold text-[color:var(--text-primary)] tabular-nums">
                          {guestCount}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setGuestCount((v) => Math.min(5, v + 1))
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border-color)] text-[color:var(--text-primary)] hover:border-[#D4AF37]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                          aria-label="Tambah jumlah tamu"
                        >
                          +
                        </button>
                        <span className="text-xs text-[color:var(--text-muted)]">
                          (maks. 5 orang)
                        </span>
                      </div>
                      {errors.guestCount && (
                        <p className="text-xs text-red-500" role="alert">
                          {errors.guestCount}
                        </p>
                      )}
                    </div>
                  )}

                  <Textarea
                    label="Pesan atau Doa (opsional)"
                    placeholder="Tuliskan pesan atau doa Anda untuk kedua mempelai..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={errors.message}
                    rows={4}
                    maxLength={MAX_MESSAGE_LENGTH}
                    maxCount={MAX_MESSAGE_LENGTH}
                    currentCount={message.length}
                  />

                  {state.status === "error" && (
                    <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
                      {state.message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    loading={isLoading}
                    className="w-full mt-1"
                  >
                    Kirim Konfirmasi
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
