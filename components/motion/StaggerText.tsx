"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  mode?: "words" | "chars";
}

export function StaggerText({
  text,
  className,
  delay = 0,
  staggerChildren = 0.04,
  mode = "words",
}: StaggerTextProps) {
  const prefersReduced = useReducedMotionSafe();
  const items = mode === "chars" ? text.split("") : text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: prefersReduced ? 0 : staggerChildren,
      },
    },
  };

  const child: Variants = prefersReduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
        },
      };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block"
          aria-hidden
        >
          {item}
          {mode === "words" && i < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
