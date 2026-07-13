"use client";

import type {
  GuestbookApiResponse,
  RsvpApiResponse,
  GuestbookSubmitResponse,
} from "@/types/api";
import type { RsvpPayload, GuestbookPayload } from "@/types/invitation";
import { APPS_SCRIPT_URL, ACTIONS } from "@/lib/constants";
import { sanitizeName, sanitizeMessage } from "@/lib/sanitize";

function getEndpoint(): string {
  if (!APPS_SCRIPT_URL) {
    throw new Error(
      "NEXT_PUBLIC_APPS_SCRIPT_URL belum dikonfigurasi. Periksa .env.local Anda."
    );
  }
  return APPS_SCRIPT_URL;
}

async function postToScript<T>(
  payload: Record<string, unknown>
): Promise<T> {
  const endpoint = getEndpoint();
  const response = await fetch(endpoint, {
    method: "POST",
    // PERBAIKAN: Diubah ke text/plain untuk mengelabui browser agar tidak memicu Preflight OPTIONS (CORS Blocked)
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Gagal menghubungi server`);
  }

  const data: T = await response.json();
  return data;
}

async function getFromScript<T>(params: Record<string, string>): Promise<T> {
  const endpoint = getEndpoint();
  const url = new URL(endpoint);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const response = await fetch(url.toString(), {
    method: "GET",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Gagal memuat data`);
  }

  const data: T = await response.json();
  return data;
}

export async function submitRsvp(
  payload: RsvpPayload
): Promise<RsvpApiResponse> {
  const sanitized = {
    action: ACTIONS.RSVP,
    name: sanitizeName(payload.name),
    attendance: payload.attendance,
    guestCount: payload.guestCount,
    message: sanitizeMessage(payload.message),
    userAgent:
      typeof navigator !== "undefined"
        ? navigator.userAgent.slice(0, 200)
        : "unknown",
  };

  return postToScript<RsvpApiResponse>(sanitized);
}

export async function submitGuestbook(
  payload: GuestbookPayload
): Promise<GuestbookSubmitResponse> {
  const sanitized = {
    action: ACTIONS.GUESTBOOK,
    name: sanitizeName(payload.name),
    message: sanitizeMessage(payload.message),
    userAgent:
      typeof navigator !== "undefined"
        ? navigator.userAgent.slice(0, 200)
        : "unknown",
  };

  return postToScript<GuestbookSubmitResponse>(sanitized);
}

export async function fetchGuestbook(): Promise<GuestbookApiResponse> {
  return getFromScript<GuestbookApiResponse>({
    action: ACTIONS.GET_GUESTBOOK,
  });
}