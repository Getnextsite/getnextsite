"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { consultationSchema, type ConsultationInput } from "@/schemas";
import { submitConsultation } from "@/actions/contact";
import { Honeypot } from "@/components/forms/honeypot";
import { ConsentCheckbox } from "@/components/forms/consent-checkbox";

const goalOptions = [
  "New website",
  "Redesign",
  "Mobile app",
  "AI automation",
  "SEO / Marketing",
  "Branding",
];

export function BookingForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { goals: [], consent: false, website: "" },
  });
  const selectedGoals = watch("goals") ?? [];
  const [state, setState] = React.useState<"idle" | "success" | "error">(
    "idle",
  );
  const [msg, setMsg] = React.useState("");

  function toggleGoal(g: string) {
    const next = selectedGoals.includes(g)
      ? selectedGoals.filter((x) => x !== g)
      : [...selectedGoals, g];
    setValue("goals", next, { shouldDirty: true });
  }

  async function onSubmit(data: ConsultationInput) {
    const result = await submitConsultation(data);
    setMsg(result.message);
    setState(result.ok ? "success" : "error");
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur sm:p-8">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-8 text-center"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-500">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h4 className="mt-4 font-display text-xl font-semibold">
              You're booked
            </h4>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {msg}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  className="mt-1.5"
                  placeholder="Jane Doe"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1.5"
                  placeholder="you@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  className="mt-1.5"
                  placeholder="+1 555 555 0100"
                  {...register("phone")}
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  className="mt-1.5"
                  placeholder="Optional"
                  {...register("company")}
                />
              </div>
            </div>

            <div>
              <Label>What would you like to discuss?</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {goalOptions.map((g) => {
                  const active = selectedGoals.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGoal(g)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/70 hover:border-primary/40"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label htmlFor="preferredDate">Preferred date & time</Label>
              <Input
                id="preferredDate"
                type="datetime-local"
                className="mt-1.5"
                {...register("preferredDate")}
              />
            </div>

            <div>
              <Label htmlFor="message">Anything we should know?</Label>
              <Textarea
                id="message"
                rows={3}
                className="mt-1.5"
                placeholder="Optional context on the project"
                {...register("message")}
              />
            </div>

            <Honeypot register={register("website")} />
            <ConsentCheckbox
              register={register("consent")}
              error={errors.consent?.message}
              id="booking-consent"
            />

            {state === "error" && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {msg}
              </div>
            )}

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="mt-2 w-full sm:w-fit"
              disabled={isSubmitting}
            >
              <CalendarClock className="h-4 w-4" />
              {isSubmitting ? "Booking…" : "Book my free consultation"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
