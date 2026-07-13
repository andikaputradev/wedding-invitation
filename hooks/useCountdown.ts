"use client";

import { useState, useEffect } from "react";
import { WEDDING_DATE } from "@/lib/constants";

interface CountdownValues {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

export function useCountdown(): CountdownValues {
  const [values, setValues] = useState<CountdownValues>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isExpired: false,
  });

  useEffect(() => {
    function calculate(): CountdownValues {
      const now = Date.now();
      const target = WEDDING_DATE.getTime();
      const diff = Math.max(0, Math.floor((target - now) / 1000));

      if (diff === 0) {
        return {
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isExpired: true,
        };
      }

      const d = Math.floor(diff / 86400);
      const h = Math.floor((diff % 86400) / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      return {
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
        isExpired: false,
      };
    }

    setValues(calculate());
    const interval = setInterval(() => setValues(calculate()), 1000);
    return () => clearInterval(interval);
  }, []);

  return values;
}
