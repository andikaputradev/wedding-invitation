"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

interface GoldShimmerTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizeMap = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-5xl",
  "2xl": "text-6xl md:text-7xl",
};

export function GoldShimmerText({
  text,
  className,
  as: Tag = "span",
  size = "lg",
}: GoldShimmerTextProps) {
  const prefersReduced = useReducedMotionSafe();

  if (prefersReduced) {
    return (
      <Tag
        className={cn("gold-text font-serif font-bold", sizeMap[size], className)}
      >
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(
        "relative inline-block font-serif font-bold",
        sizeMap[size],
        className
      )}
    >
      <motion.span
        className="gold-shimmer-text"
        animate={{
          backgroundPosition: ["0% center", "200% center"],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          backgroundSize: "200% auto",
        }}
      >
        {text}
      </motion.span>
    </Tag>
  );
}
