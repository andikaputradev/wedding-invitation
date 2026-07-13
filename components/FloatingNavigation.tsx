"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Beranda" },
  { id: "countdown", label: "Hitung Mundur" },
  { id: "event", label: "Acara" },
  { id: "gallery", label: "Galeri" },
  { id: "story", label: "Cerita" },
  { id: "rsvp", label: "RSVP" },
  { id: "guestbook", label: "Ucapan" },
  { id: "gift", label: "Hadiah" },
];

export function FloatingNavigation() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("hero");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);

      const sections = navItems
        .map((n) => document.getElementById(n.id))
        .filter(Boolean) as HTMLElement[];

      const threshold = window.innerHeight * 0.4;
      let current = "hero";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) {
          current = section.id;
        }
      }
      setActive(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setExpanded(false);
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="fixed right-4 top-1/2 z-40 -translate-y-1/2"
          aria-label="Navigasi halaman"
        >
          <div className="flex flex-col items-end gap-1.5">
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                  className="card-glass rounded-2xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col gap-1"
                >
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-3 py-2 text-left text-xs transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]",
                        active === item.id
                          ? "bg-[#D4AF37] text-[#2A1E12] font-semibold"
                          : "text-[color:var(--text-secondary)] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full shrink-0",
                          active === item.id
                            ? "bg-[#2A1E12]"
                            : "bg-[#D4AF37]/50"
                        )}
                        aria-hidden
                      />
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setExpanded((v) => !v)}
              className={cn(
                "card-glass flex h-9 w-9 items-center justify-center rounded-full",
                "shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300",
                "border border-[#D4AF37]/30 text-[#D4AF37]",
                "hover:border-[#D4AF37]/60 hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              )}
              aria-label={expanded ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={expanded}
            >
              <motion.div
                animate={{ rotate: expanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-1 items-center"
                aria-hidden
              >
                <span className="h-0.5 w-3.5 bg-current rounded" />
                <span className="h-0.5 w-3.5 bg-current rounded" />
                <span className="h-0.5 w-3.5 bg-current rounded" />
              </motion.div>
            </button>

            <div className="flex flex-col gap-1.5 items-end py-1" aria-hidden>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="group flex items-center gap-2 focus-visible:outline-none"
                  tabIndex={-1}
                  aria-hidden
                >
                  <motion.span
                    className={cn(
                      "rounded-full transition-all duration-300",
                      active === item.id
                        ? "h-1.5 w-4 bg-[#D4AF37]"
                        : "h-1.5 w-1.5 bg-[#D4AF37]/30 group-hover:bg-[#D4AF37]/60"
                    )}
                    layoutId={`nav-dot-${item.id}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
