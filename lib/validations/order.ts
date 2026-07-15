import { z } from "zod";

/**
 * Order intake schema — single source of truth shared between the
 * React form and the /send-order.php endpoint.
 *
 * IMPORTANT: keep field names, lengths and semantics in sync with
 * `public/send-order.php`.
 */
export const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("A valid email is required."),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
  plan: z
    .string()
    .trim()
    .min(1, "Please pick a plan.")
    .max(300, "Plan description is too long."),
  message: z
    .string()
    .trim()
    .max(3000, "Please keep your message under 3000 characters.")
    .optional()
    .or(z.literal("")),
  /**
   * Honeypot — real users never fill this (it's hidden with tabIndex=-1).
   * Any non-empty value is treated as spam and silently dropped by the
   * PHP endpoint.
   */
  website: z
    .string()
    .max(0, "Bot detected.")
    .optional()
    .or(z.literal("")),
});

export type OrderInput = z.infer<typeof orderSchema>;
