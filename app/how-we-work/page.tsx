import type { Metadata } from "next";
import {
  MessageSquare,
  Calculator,
  FileText,
  CreditCard,
  Rocket,
  ShieldCheck,
  Info,
} from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { FinalCTA } from "@/components/sections/final-cta";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "How We Work — From Request to Launch",
  description:
    "The transparent process: how we go from your first message to a live product — no surprise invoices, no on-site payments.",
  alternates: { canonical: `${siteConfig.url}/how-we-work` },
};

const steps = [
  {
    icon: MessageSquare,
    title: "1. You submit a request",
    body: "Reach us via the contact form, invoice request, email, WhatsApp, or a booked call. Tell us what you're building, your rough budget, and your timeline. No commitment.",
    detail:
      "We reply within one business day with a short list of clarifying questions.",
  },
  {
    icon: Calculator,
    title: "2. We discuss the project",
    body: "A 30-minute call (video or phone) or a short email thread. We map the scope, the deliverables, the constraints, and the success metrics.",
    detail:
      "You leave the discussion with a clear picture of what we'd recommend and what it would cost.",
  },
  {
    icon: FileText,
    title: "3. Custom quotation",
    body: "A written proposal with fixed scope, fixed milestones, fixed fee, delivery calendar, and any subscription add-ons you selected.",
    detail:
      "Quotations are valid for 30 days. You can request revisions freely.",
  },
  {
    icon: CreditCard,
    title: "4. Invoice or payment link — sent externally",
    body: "Once you accept, we send a formal invoice or a Stripe / PayPal payment link by email. Payment happens on the provider's secure page, not on this website.",
    detail:
      "You'll receive a PDF invoice with our full legal details and tax breakdown.",
  },
  {
    icon: Rocket,
    title: "5. Work begins after payment confirmation",
    body: "Kickoff meeting scheduled the same week. From here you get a weekly demo, a live staging URL, and a single point of contact until launch.",
    detail:
      "For subscriptions, the monthly plan starts on the go-live date, not the kickoff date.",
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: "No on-site payments",
    body: "We do not process cards on this website. All payments flow through Stripe or PayPal — providers you already trust.",
  },
  {
    icon: FileText,
    title: "Everything in writing",
    body: "Quotation, scope, timeline, deliverables. If it isn't written, it isn't in scope.",
  },
  {
    icon: Info,
    title: "You own it",
    body: "On full payment, code and content are yours. Cancellation hands everything over — no lock-in.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="How we work"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "How we work", url: "/how-we-work" },
        ]}
        title={
          <>
            From your first message to a live product —{" "}
            <span className="text-gradient-brand">transparently.</span>
          </>
        }
        description="No surprise invoices. No pressure. Payments handled through secure external providers — never on this website."
      />

      <section className="pb-16">
        <div className="container-wide">
          <ol className="mx-auto max-w-3xl space-y-4">
            {steps.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.06}>
                <li className="group relative rounded-2xl border border-border/70 bg-card/60 p-6 transition hover:border-primary/40 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 text-white">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-xl font-semibold">
                        {s.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {s.body}
                      </p>
                      <p className="mt-2 text-xs text-primary/90">{s.detail}</p>
                    </div>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/20 py-16">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="border-primary/30 text-primary"
            >
              What you're guaranteed
            </Badge>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Predictable, secure, on your terms.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-border/70 bg-card/60 p-6"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display font-semibold">{g.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
