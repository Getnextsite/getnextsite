"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { orderSchema, type OrderInput } from "@/lib/validations/order";
import { addons, basePlan } from "@/data/pricing";
import { formatCurrency } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function InvoiceRequestTrigger({
  children,
  selected = [],
}: {
  children: React.ReactNode;
  selected?: string[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <OrderForm defaultSelected={selected} />
      </DialogContent>
    </Dialog>
  );
}

function OrderForm({ defaultSelected }: { defaultSelected: string[] }) {
  const [servicesPicked, setServicesPicked] =
    React.useState<string[]>(defaultSelected);
  const [billing, setBilling] = React.useState<"monthly" | "annual">("monthly");
  const [budget, setBudget] = React.useState<string>("");
  const [consent, setConsent] = React.useState(false);
  const [consentError, setConsentError] = React.useState<string | undefined>();
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      plan: "",
      message: "",
      website: "",
    },
  });

  // Compute a readable plan/price string from the current selection.
  const planString = React.useMemo(() => {
    const chosen = addons.filter((a) => servicesPicked.includes(a.id));
    const monthly =
      basePlan.price + chosen.reduce((sum, a) => sum + a.monthly, 0);
    const setup =
      basePlan.setup + chosen.reduce((sum, a) => sum + a.setup, 0);
    const displayed =
      billing === "annual"
        ? `${formatCurrency(Math.round(monthly * 12 * 0.85))}/yr`
        : `${formatCurrency(monthly)}/mo`;
    const items =
      chosen.length > 0
        ? chosen.map((a) => a.name).join(", ")
        : "Foundation only";
    const setupPart =
      setup > 0 ? ` · setup ${formatCurrency(setup)}` : "";
    return `${billing === "annual" ? "Annual" : "Monthly"} · ${displayed}${setupPart} · ${items}`;
  }, [servicesPicked, billing]);

  // Auto-inject the plan into the form as soon as it changes.
  React.useEffect(() => {
    setValue("plan", planString, { shouldValidate: false });
  }, [planString, setValue]);

  function toggleService(id: string) {
    setServicesPicked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function onSubmit(data: OrderInput) {
    if (!consent) {
      setConsentError("Please accept the privacy policy.");
      return;
    }
    setConsentError(undefined);
    setStatus("sending");

    const enrichedMessage = [
      data.message ?? "",
      budget ? `Budget range: ${budget}` : "",
    ]
      .filter((s) => s && s.trim().length > 0)
      .join("\n\n");

    try {
      const res = await fetch("/send-order.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, message: enrichedMessage }),
      });
      const json = (await res.json().catch(() => ({ success: false }))) as {
        success?: boolean;
      };
      setStatus(json.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(
    /[^0-9]/g,
    "",
  )}`;

  return (
    <>
      <DialogHeader>
        <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" /> Order request
        </div>
        <DialogTitle className="text-2xl">Request your invoice</DialogTitle>
        <DialogDescription>
          Tell us what you need and we'll email a formal PDF invoice within 2
          business hours. Payments are handled outside this website via Stripe
          or PayPal.
        </DialogDescription>
      </DialogHeader>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500"
            >
              <CheckCircle2 className="h-7 w-7" />
            </motion.div>
            <h4 className="mt-4 font-display text-xl font-semibold">
              Merci ! We received your order
            </h4>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We'll reply within 24 hours. Need us faster? Ping us on WhatsApp.
            </p>
            <Button asChild variant="gradient" size="lg" className="mt-6">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </Button>
          </motion.div>
        ) : status === "error" ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-destructive/15 text-destructive">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h4 className="mt-4 font-display text-xl font-semibold">
              Something went wrong
            </h4>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              We couldn't deliver your message right now. Contact us on
              WhatsApp — we'll take it from there.
            </p>
            <div className="mt-6 flex gap-2">
              <Button asChild variant="gradient" size="lg">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStatus("idle")}
              >
                Try again
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 grid gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="name" label="Your name" error={errors.name?.message}>
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  {...register("name")}
                />
              </Field>
              <Field id="email" label="Email" error={errors.email?.message}>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  {...register("email")}
                />
              </Field>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                id="phone"
                label="Phone (optional)"
                error={errors.phone?.message}
              >
                <Input
                  id="phone"
                  placeholder="+1 555 555 0100"
                  autoComplete="tel"
                  {...register("phone")}
                />
              </Field>
              <Field id="billing" label="Billing">
                <Select
                  value={billing}
                  onValueChange={(v) =>
                    setBilling(v as "monthly" | "annual")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">
                      Monthly subscription
                    </SelectItem>
                    <SelectItem value="annual">
                      Annual (save 15%)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div>
              <Label>Selected services</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {addons.map((a) => {
                  const active = servicesPicked.includes(a.id);
                  return (
                    <button
                      type="button"
                      key={a.id}
                      onClick={() => toggleService(a.id)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/70 bg-background/50 hover:border-primary/40"
                      }`}
                    >
                      {a.name}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 rounded-xl border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
                <span className="uppercase tracking-widest text-[10px]">
                  Your plan
                </span>
                <br />
                <span className="mt-1 block text-sm font-medium text-foreground">
                  {planString}
                </span>
              </p>
              {/* Hidden field — auto-populated via setValue */}
              <input type="hidden" {...register("plan")} />
              {errors.plan && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.plan.message}
                </p>
              )}
            </div>

            <Field id="budget" label="Estimated budget (optional)">
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under $5,000">Under $5,000</SelectItem>
                  <SelectItem value="$5,000 – $15,000">
                    $5,000 – $15,000
                  </SelectItem>
                  <SelectItem value="$15,000 – $40,000">
                    $15,000 – $40,000
                  </SelectItem>
                  <SelectItem value="$40,000+">$40,000+</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field
              id="message"
              label="Project description (optional)"
              error={errors.message?.message}
            >
              <Textarea
                id="message"
                rows={4}
                placeholder="What are you launching, when, and what would 'great' look like?"
                {...register("message")}
              />
            </Field>

            {/* Honeypot — hidden field, real users never fill it */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("website")}
            />

            <div>
              <label
                htmlFor="order-consent"
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <input
                  id="order-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border"
                />
                <span>
                  I agree that GetNextSite Agency may process my details to
                  respond to this request, per the{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-primary underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {consentError && (
                <p className="mt-1 text-xs text-destructive">
                  {consentError}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse items-start gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-muted-foreground">
                Payments processed by Stripe or PayPal — never on this site.
              </p>
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full sm:w-auto"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                {status === "sending" ? "Sending…" : "Send Me an Invoice"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
