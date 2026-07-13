"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export function FloatingParticles({
  count = 18,
  className,
}: FloatingParticlesProps) {
  const prefersReduced = useReducedMotionSafe();
  // Menggunakan useState agar render pertama di server/client bernilai sama (kosong)
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate angka acak strictly di sisi client setelah komponen mounted
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 4 + 5,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.4 + 0.15,
    }));
    setParticles(generated);
  }, [count]);

  if (prefersReduced) return null;
  
  // Mencegah mismatch dengan tidak merender elemen sebelum state partikel terisi di client
  if (particles.length === 0) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(212,175,55,${p.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            y: [-12, 12, -12],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}