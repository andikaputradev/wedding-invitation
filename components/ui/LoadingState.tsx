import { cn } from "@/lib/utils";

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const spinnerSize = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function LoadingState({
  message = "Memuat...",
  className,
  size = "md",
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12",
        className
      )}
      role="status"
      aria-label={message}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-[#D4AF37]/30 border-t-[#D4AF37]",
          spinnerSize[size]
        )}
        aria-hidden
      />
      <p className="text-sm text-[color:var(--text-muted)] font-sans">
        {message}
      </p>
    </div>
  );
}
