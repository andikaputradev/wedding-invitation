"use client";

import { useState, useRef, useCallback } from "react";
import { submitRsvp } from "@/lib/api";
import type { RsvpPayload } from "@/types/invitation";
import type { FetchState } from "@/types/api";
import { RSVP_COOLDOWN_MS } from "@/lib/constants";

interface UseRsvpReturn {
  state: FetchState<Record<string, never>>;
  submit: (payload: RsvpPayload) => Promise<void>;
  reset: () => void;
}

export function useRsvp(): UseRsvpReturn {
  const [state, setState] = useState<FetchState<Record<string, never>>>({
    status: "idle",
  });
  const lastSubmit = useRef<number>(0);

  const submit = useCallback(async (payload: RsvpPayload) => {
    const now = Date.now();
    if (now - lastSubmit.current < RSVP_COOLDOWN_MS) {
      setState({
        status: "error",
        message: "Mohon tunggu sebentar sebelum mengirim ulang.",
      });
      return;
    }

    setState({ status: "loading" });
    lastSubmit.current = now;

    try {
      const res = await submitRsvp(payload);
      if (res.success) {
        setState({ status: "success", data: {} });
      } else {
        setState({ status: "error", message: res.message });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengirim RSVP";
      setState({ status: "error", message });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: "idle" });
  }, []);

  return { state, submit, reset };
}
