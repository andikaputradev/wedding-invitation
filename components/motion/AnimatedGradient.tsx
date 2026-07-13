"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  variant?: "light" | "dark" | "auto";
}

export function AnimatedGradient({
  className,
  variant = "auto",
}: AnimatedGradientProps) {
  const prefersReduced = useReducedMotionSafe();

  const lightGradients = [
    "radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(245,215,110,0.08) 0%, transparent 60%)",
    "radial-gradient(ellipse at 60% 80%, rgba(212,175,55,0.1) 0%, transparent 60%), radial-gradient(ellipse at 30% 10%, rgba(184,134,11,0.08) 0%, transparent 60%)",
    "radial-gradient(ellipse at 50% 30%, rgba(245,215,110,0.1) 0%, transparent 60%), radial-gradient(ellipse at 90% 70%, rgba(212,175,55,0.08) 0%, transparent 60%)",
  ];

  const darkGradients = [
    "radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(184,134,11,0.05) 0%, transparent 60%)",
    "radial-gradient(ellipse at 60% 80%, rgba(212,175,55,0.06) 0%, transparent 60%), radial-gradient(ellipse at 30% 10%, rgba(245,215,110,0.05) 0%, transparent 60%)",
    "radial-gradient(ellipse at 50% 30%, rgba(184,134,11,0.07) 0%, transparent 60%), radial-gradient(ellipse at 90% 70%, rgba(212,175,55,0.05) 0%, transparent 60%)",
  ];

  const gradients =
    variant === "dark"
      ? darkGradients
      : variant === "light"
        ? lightGradients
        : lightGradients;

  if (prefersReduced) {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0", className)}
        style={{ background: gradients[0] }}
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0", className)}
      animate={{ background: gradients }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      aria-hidden
    />
  );
}
