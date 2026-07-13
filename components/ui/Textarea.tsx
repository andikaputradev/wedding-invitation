"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  maxCount?: number;
  currentCount?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      maxCount,
      currentCount = 0,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[color:var(--text-secondary)]"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-[#D4AF37]" aria-label="wajib diisi">
                *
              </span>
            )}
          </label>
          {maxCount !== undefined && (
            <span
              className={cn(
                "text-xs tabular-nums",
                currentCount > maxCount * 0.9
                  ? "text-amber-500"
                  : "text-[color:var(--text-muted)]"
              )}
              aria-live="polite"
            >
              {currentCount}/{maxCount}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full resize-none rounded-xl border bg-[color:var(--card-bg)] px-4 py-3 text-sm",
            "text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)]",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]",
            error
              ? "border-red-500/70 focus:ring-red-500/30"
              : "border-[color:var(--border-color)] hover:border-[#D4AF37]/40",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : hint
                ? `${textareaId}-hint`
                : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-xs text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && hint && (
          <p
            id={`${textareaId}-hint`}
            className="text-xs text-[color:var(--text-muted)]"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
