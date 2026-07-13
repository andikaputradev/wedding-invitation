export const APPS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ?? "";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arga-nimas.vercel.app";

export const RSVP_COOLDOWN_MS = 30_000;
export const GUESTBOOK_COOLDOWN_MS = 15_000;

export const MAX_NAME_LENGTH = 80;
export const MAX_MESSAGE_LENGTH = 500;
export const MIN_GUEST_COUNT = 1;
export const MAX_GUEST_COUNT = 5;

export const ACTIONS = {
  RSVP: "rsvp",
  GUESTBOOK: "guestbook",
  GET_GUESTBOOK: "get_guestbook",
} as const;

export const ATTENDANCE_OPTIONS = [
  { value: "attending" as const, label: "Hadir" },
  { value: "not_attending" as const, label: "Tidak Hadir" },
  { value: "maybe" as const, label: "Mungkin Hadir" },
] as const;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  cinematic: 1.2,
} as const;

export const EASING = {
  premium: [0.25, 0.46, 0.45, 0.94] as const,
  outExpo: [0.19, 1, 0.22, 1] as const,
  inExpo: [0.95, 0.05, 0.795, 0.035] as const,
};

export const WEDDING_DATE = new Date("2026-12-20T08:00:00+07:00");
