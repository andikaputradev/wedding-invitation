"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

const variantClasses = {
  gold: "bg-[#D4AF37] text-[#2A1E12] hover:bg-[#F5D76E] shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.5)] font-semibold",
  outline:
    "border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]",
  ghost:
    "text-[color:var(--text-secondary)] hover:text-[#D4AF37] hover:bg-[#D4AF37]/8",
  danger:
    "bg-red-600/90 text-white hover:bg-red-600 shadow-[0_4px_16px_rgba(220,38,38,0.3)]",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-sm rounded-xl",
  lg: "px-8 py-4 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "gold",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? {} : { scale: 1.02 }}
        whileTap={isDisabled ? {} : { scale: 0.97 }}
        transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-sans transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={isDisabled}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading && (
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        )}
        <span className={cn(loading && "opacity-0")}>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
