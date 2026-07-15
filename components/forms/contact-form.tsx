"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { contactSchema, type ContactInput } from "@/schemas";
import { submitContact } from "@/actions/contact";
import { services } from "@/data/services";
import { Honeypot } from "@/components/forms/honeypot";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { consent: false, website: "" },
  });

  const [state, setState] = React.useState<"idle" | "success" | "error">(
    "idle",
  );
  const [msg, setMsg] = React.useState("");

  async function onSubmit(data: ContactInput) {
    const result = await submitContact(data);
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
              Message received
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
                  placeholder="Jane Doe"
                  className="mt-1.5"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Optional"
                  className="mt-1.5"
                  {...register("company")}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="mt-1.5"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 555 555 0100"
                  className="mt-1.5"
                  {...register("phone")}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Service</Label>
                <Select onValueChange={(v) => setValue("service", v)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="What do you need?" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.slug} value={s.slug}>
                        {s.shortTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Budget</Label>
                <Select onValueChange={(v) => setValue("budget", v)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Estimated budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lt-5k">Under $5,000</SelectItem>
                    <SelectItem value="5-15k">$5,000 – $15,000</SelectItem>
                    <SelectItem value="15-40k">$15,000 – $40,000</SelectItem>
                    <SelectItem value="40k+">$40,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="message">How can we help?</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell us about the project, timelines, and goals."
                className="mt-1.5"
                {...register("message")}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Honeypot register={register("website")} />

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-0.5 h-4 w-4 rounded border-border"
              />
              <span>
                I agree to the{" "}
                <a
                  className="text-primary underline"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </a>
                . We'll only email you about your request.
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-destructive">{errors.consent.message}</p>
            )}

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
              <Send className="h-4 w-4" />
              {isSubmitting ? "Sending…" : "Send message"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
