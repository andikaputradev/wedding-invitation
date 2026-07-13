"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useGuestbook } from "@/hooks/useGuestbook";
import { guestbookSchema } from "@/lib/validators";
import { MAX_MESSAGE_LENGTH } from "@/lib/constants";
import type { GuestbookEntry } from "@/types/invitation";
import { cn } from "@/lib/utils";

interface FormErrors {
  name?: string;
  message?: string;
}

interface EntryCardProps {
  entry: GuestbookEntry;
  index: number;
}

function EntryCard({ entry, index }: EntryCardProps) {
  const formattedDate = new Date(entry.timestamp).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="card-glass rounded-2xl p-5 border border-[#D4AF37]/12 shadow-[0_2px_12px_rgba(212,175,55,0.06)]"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37]"
          aria-hidden
        >
          <span className="font-serif text-base font-semibold">
            {entry.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-serif text-sm font-semibold text-[color:var(--text-primary)] truncate">
              {entry.name}
            </span>
            <time
              className="text-xs text-[color:var(--text-muted)] shrink-0"
              dateTime={entry.timestamp}
            >
              {formattedDate}
            </time>
          </div>
          <p className="mt-1.5 font-sans text-sm leading-relaxed text-[color:var(--text-secondary)] break-words">
            {entry.message}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 pl-12" aria-hidden>
        <Heart className="h-3 w-3 text-[#D4AF37]/50" />
        <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/20 to-transparent" />
      </div>
    </motion.article>
  );
}

export function GuestbookSection() {
  const { entries, fetchState, submitState, load, submit, resetSubmit } =
    useGuestbook();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const parsed = guestbookSchema.safeParse({ name, message });
    if (!parsed.success) {
      const fe: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        fe[field] = issue.message;
      }
      setErrors(fe);
      return;
    }

    const success = await submit(parsed.data);
    if (success) {
      setSubmitted(true);
      setName("");
      setMessage("");
      setTimeout(() => {
        setSubmitted(false);
        resetSubmit();
      }, 4000);
    }
  }

  const isLoading = submitState.status === "loading";

  return (
    <section
      id="guestbook"
      className="py-24 section-padding overflow-hidden"
      aria-label="Buku tamu dan ucapan"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal direction="up">
          <div className="mb-12 flex flex-col items-center gap-3 text-center">
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-[color:var(--text-muted)]">
              Doa &amp; Ucapan
            </span>
            <h2 className="font-serif text-3xl font-bold gold-text sm:text-4xl">
              Buku Tamu
            </h2>
            <div className="gold-divider w-24" aria-hidden />
            <p className="font-sans text-sm text-[color:var(--text-secondary)]">
              Tinggalkan ucapan dan doa untuk kedua mempelai.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="up">
          <div className="card-glass rounded-3xl p-7 border border-[#D4AF37]/15 shadow-[0_4px_32px_rgba(212,175,55,0.07)] mb-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="flex flex-col items-center gap-3 py-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 220,
                      damping: 14,
                    }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/15"
                  >
                    <Heart className="h-6 w-6 text-[#D4AF37]" />
                  </motion.div>
                  <p className="font-serif text-lg font-semibold text-[color:var(--text-primary)]">
                    Ucapan Terkirim!
                  </p>
                  <p className="font-sans text-sm text-[color:var(--text-secondary)]">
                    Terima kasih atas doa dan ucapan Anda yang indah.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  <Input
                    label="Nama"
                    type="text"
                    placeholder="Nama Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    required
                    maxLength={80}
                    autoComplete="name"
                  />

                  <Textarea
                    label="Pesan & Doa"
                    placeholder="Tuliskan ucapan tulus Anda untuk Arga & Nimas..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    error={errors.message}
                    required
                    rows={4}
                    maxLength={MAX_MESSAGE_LENGTH}
                    maxCount={MAX_MESSAGE_LENGTH}
                    currentCount={message.length}
                  />

                  {submitState.status === "error" && (
                    <p
                      className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400"
                      role="alert"
                    >
                      {submitState.message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="gold"
                    size="md"
                    loading={isLoading}
                    className="w-full gap-2"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                    Kirim Ucapan
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <div aria-label="Daftar ucapan tamu" aria-live="polite">
          {fetchState.status === "loading" && (
            <LoadingState message="Memuat ucapan..." />
          )}

          {fetchState.status === "error" && (
            <ErrorState
              message="Gagal memuat ucapan. Silakan refresh halaman."
              onRetry={load}
            />
          )}

          {(fetchState.status === "success" ||
            fetchState.status === "idle") && (
            <div className="flex flex-col gap-4">
              {entries.length === 0 && fetchState.status === "success" ? (
                <p className="py-8 text-center font-sans text-sm text-[color:var(--text-muted)]">
                  Belum ada ucapan. Jadilah yang pertama!
                </p>
              ) : (
                entries.map((entry, i) => (
                  <EntryCard key={`${entry.timestamp}-${i}`} entry={entry} index={i} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
