"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, FileText, Sparkles } from "lucide-react";
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
import { invoiceSchema, type InvoiceInput } from "@/schemas";
import { submitInvoiceRequest } from "@/actions/contact";
import { addons } from "@/data/pricing";
import { Honeypot } from "@/components/forms/honeypot";
import { ConsentCheckbox } from "@/components/forms/consent-checkbox";

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
        <InvoiceForm defaultSelected={selected} />
      </DialogContent>
    </Dialog>
  );
}

function InvoiceForm({ defaultSelected }: { defaultSelected: string[] }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      plan: "monthly",
      services: defaultSelected,
      consent: false,
      website: "",
    },
  });

  const [state, setState] = React.useState<"idle" | "success" | "error">(
    "idle",
  );
  const [msg, setMsg] = React.useState<string>("");

  const selectedServices = watch("services") ?? [];

  const toggleService = (id: string) => {
    const next = selectedServices.includes(id)
      ? selectedServices.filter((s) => s !== id)
      : [...selectedServices, id];
    setValue("services", next, { shouldDirty: true });
  };

  async function onSubmit(data: InvoiceInput) {
    const result = await submitInvoiceRequest(data);
    setMsg(result.message);
    setState(result.ok ? "success" : "error");
  }

  return (
    <>
      <DialogHeader>
        <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" /> Instant invoice request
        </div>
        <DialogTitle className="text-2xl">Request your invoice</DialogTitle>
        <DialogDescription>
          Tell us what you need and we'll email a formal PDF invoice within 2
          business hours.
        </DialogDescription>
      </DialogHeader>

      <AnimatePresence mode="wait">
        {state === "success" ? (
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
              Invoice request received
            </h4>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{msg}</p>
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
              <Field
                id="name"
                label="Your name"
                error={errors.name?.message}
              >
                <Input id="name" placeholder="Jane Doe" {...register("name")} />
              </Field>
              <Field id="company" label="Company">
                <Input
                  id="company"
                  placeholder="Company (optional)"
                  {...register("company")}
                />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                id="email"
                label="Email"
                error={errors.email?.message}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  {...register("email")}
                />
              </Field>
              <Field id="phone" label="Phone">
                <Input
                  id="phone"
                  placeholder="+1 555 555 0100"
                  {...register("phone")}
                />
              </Field>
            </div>

            <Field id="plan" label="Preferred plan">
              <Select
                defaultValue="monthly"
                onValueChange={(v) => setValue("plan", v as "monthly" | "annual")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly subscription</SelectItem>
                  <SelectItem value="annual">Annual (save 15%)</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <div>
              <Label>Selected services</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {addons.map((a) => {
                  const active = selectedServices.includes(a.id);
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
            </div>

            <Field id="budget" label="Estimated budget">
              <Select onValueChange={(v) => setValue("budget", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lt-5k">Under $5,000</SelectItem>
                  <SelectItem value="5-15k">$5,000 – $15,000</SelectItem>
                  <SelectItem value="15-40k">$15,000 – $40,000</SelectItem>
                  <SelectItem value="40k+">$40,000+</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field
              id="description"
              label="Project description"
              error={errors.description?.message}
            >
              <Textarea
                id="description"
                rows={4}
                placeholder="What are you launching, when, and what would 'great' look like?"
                {...register("description")}
              />
            </Field>

            <Honeypot register={register("website")} />
            <ConsentCheckbox
              register={register("consent")}
              error={errors.consent?.message}
              id="invoice-consent"
            />

            {state === "error" && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {msg}
              </div>
            )}

            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
              >
                <FileText className="h-4 w-4" />
                {isSubmitting ? "Sending…" : "Send Me an Invoice"}
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
      {error && (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
