import { z } from "zod";
import {
  MAX_NAME_LENGTH,
  MAX_MESSAGE_LENGTH,
  MIN_GUEST_COUNT,
  MAX_GUEST_COUNT,
} from "@/lib/constants";

export const rsvpSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(MAX_NAME_LENGTH, `Nama maksimal ${MAX_NAME_LENGTH} karakter`)
    .regex(/^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF'-]+$/, "Nama tidak valid"),
  attendance: z.enum(["attending", "not_attending", "maybe"], {
    errorMap: () => ({ message: "Pilih status kehadiran" }),
  }),
  guestCount: z
    .number()
    .int()
    .min(MIN_GUEST_COUNT, `Minimal ${MIN_GUEST_COUNT} tamu`)
    .max(MAX_GUEST_COUNT, `Maksimal ${MAX_GUEST_COUNT} tamu`),
  message: z
    .string()
    .max(MAX_MESSAGE_LENGTH, `Pesan maksimal ${MAX_MESSAGE_LENGTH} karakter`)
    .optional()
    .default(""),
});

export const guestbookSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(MAX_NAME_LENGTH, `Nama maksimal ${MAX_NAME_LENGTH} karakter`)
    .regex(/^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF'-]+$/, "Nama tidak valid"),
  message: z
    .string()
    .min(5, "Pesan minimal 5 karakter")
    .max(MAX_MESSAGE_LENGTH, `Pesan maksimal ${MAX_MESSAGE_LENGTH} karakter`),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;
export type GuestbookFormValues = z.infer<typeof guestbookSchema>;
