/**
 * Form handlers for the static-export build.
 *
 * If NEXT_PUBLIC_FORMSPREE_ENDPOINT is set at build time, submissions
 * are POST-ed there as JSON. Otherwise we simulate a successful send
 * (useful during local dev).
 *
 * Formspree setup: https://formspree.io → new form → copy the endpoint
 * (looks like https://formspree.io/f/abcxyz123) and add to .env.local:
 *
 *     NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/abcxyz123
 *
 * Then rebuild.
 */

import {
  contactSchema,
  invoiceSchema,
  consultationSchema,
  newsletterSchema,
  type ContactInput,
  type InvoiceInput,
  type ConsultationInput,
  type NewsletterInput,
} from "@/schemas";

export type ActionResult = { ok: boolean; message: string };

const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

async function send(kind: string, payload: unknown): Promise<ActionResult> {
  if (!endpoint) {
    // No endpoint configured — simulate success so local dev / demos still feel real.
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true, message: "simulated" };
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: `[GetNextSite] ${kind}`, ...(payload as object) }),
    });
    if (res.ok) return { ok: true, message: "sent" };
    return {
      ok: false,
      message:
        "We couldn't deliver your message right now — please email us at hello@nextsite-agency.com.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Network error — please try again, or email us at hello@nextsite-agency.com.",
    };
  }
}

export async function submitContact(
  data: ContactInput,
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the errors in the form." };
  }
  const result = await send("Contact", parsed.data);
  if (!result.ok) return result;
  return {
    ok: true,
    message:
      "Thanks — we received your message and will respond within one business day.",
  };
}

export async function submitInvoiceRequest(
  data: InvoiceInput,
): Promise<ActionResult> {
  const parsed = invoiceSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the errors in the form." };
  }
  const result = await send("Invoice Request", parsed.data);
  if (!result.ok) return result;
  return {
    ok: true,
    message:
      "Invoice request received. You'll get a formal PDF invoice in your inbox within 2 business hours.",
  };
}

export async function submitConsultation(
  data: ConsultationInput,
): Promise<ActionResult> {
  const parsed = consultationSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the errors in the form." };
  }
  const result = await send("Consultation", parsed.data);
  if (!result.ok) return result;
  return {
    ok: true,
    message:
      "Booked! Check your inbox for the calendar invite and a short pre-call brief.",
  };
}

export async function subscribeNewsletter(
  data: NewsletterInput,
): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, message: "Please enter a valid email." };
  }
  const result = await send("Newsletter", parsed.data);
  if (!result.ok) return result;
  return { ok: true, message: "You're in. See you next month." };
}
