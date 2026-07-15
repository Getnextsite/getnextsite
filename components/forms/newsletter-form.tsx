"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { subscribeNewsletter } from "@/actions/contact";

export function NewsletterForm() {
  const [state, setState] = React.useState<"idle" | "submitting" | "done">(
    "idle",
  );
  const { push } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const website = String(data.get("website") ?? "");
    // Honeypot: real users won't fill this hidden field.
    if (website) {
      setState("done");
      return;
    }
    const result = await subscribeNewsletter({ email });
    if (result.ok) {
      setState("done");
      push({
        title: "Subscribed",
        description: result.message,
        variant: "success",
      });
    } else {
      setState("idle");
      push({
        title: "Something went wrong",
        description: result.message,
        variant: "error",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
      {state === "done" ? (
        <div className="flex w-full items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4" /> Subscribed. See you in your inbox.
        </div>
      ) : (
        <>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          />
          <Input
            type="email"
            required
            name="email"
            placeholder="you@company.com"
            aria-label="Email address"
            className="flex-1"
          />
          <Button
            type="submit"
            variant="gradient"
            disabled={state === "submitting"}
          >
            {state === "submitting" ? "…" : "Subscribe"}
          </Button>
        </>
      )}
    </form>
  );
}
