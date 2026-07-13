"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

export interface ToastData {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
  duration?: number;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bg: "bg-emerald-950/90 dark:bg-emerald-950/95 border-emerald-700/50",
    text: "text-emerald-200",
    icon_color: "text-emerald-400",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-950/90 dark:bg-red-950/95 border-red-700/50",
    text: "text-red-200",
    icon_color: "text-red-400",
  },
  info: {
    icon: Info,
    bg: "bg-[#15130F]/90 dark:bg-[#15130F]/95 border-[#D4AF37]/30",
    text: "text-[#F7E7CE]",
    icon_color: "text-[#D4AF37]",
  },
};

export function Toast({ toast, onDismiss, duration = 4500 }: ToastProps) {
  const config = typeConfig[toast.type];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss, duration]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-md",
        "min-w-[280px] max-w-[380px] pointer-events-auto",
        config.bg
      )}
    >
      <Icon
        className={cn("mt-0.5 h-4 w-4 shrink-0", config.icon_color)}
        aria-hidden
      />
      <p className={cn("flex-1 text-sm leading-relaxed", config.text)}>
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className={cn(
          "mt-0.5 rounded-md p-0.5 transition-opacity hover:opacity-70",
          config.text
        )}
        aria-label="Tutup notifikasi"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      className="fixed bottom-6 right-4 z-50 flex flex-col gap-2 items-end"
      aria-label="Notifikasi"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

let toastIdCounter = 0;
export function createToastId(): string {
  return `toast-${++toastIdCounter}-${Date.now()}`;
}
