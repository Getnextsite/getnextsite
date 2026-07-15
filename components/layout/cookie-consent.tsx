"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Shield, X, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type Preferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "nextsite-cookie-consent-v1";

function readStored(): Preferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Preferences;
    return parsed;
  } catch {
    return null;
  }
}

function persist(p: Preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* no-op */
  }
}

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false);
  const [prefsOpen, setPrefsOpen] = React.useState(false);
  const [prefs, setPrefs] = React.useState<Preferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  React.useEffect(() => {
    const existing = readStored();
    if (!existing) {
      const t = window.setTimeout(() => setVisible(true), 1500);
      return () => window.clearTimeout(t);
    }
  }, []);

  function acceptAll() {
    const p: Preferences = { necessary: true, analytics: true, marketing: true };
    persist(p);
    setVisible(false);
  }
  function rejectAll() {
    const p: Preferences = { necessary: true, analytics: false, marketing: false };
    persist(p);
    setVisible(false);
  }
  function savePreferences() {
    persist(prefs);
    setPrefsOpen(false);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-3 bottom-3 z-[55] md:inset-x-auto md:right-4 md:bottom-4 md:max-w-md"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
        >
          <div className="glass-strong overflow-hidden rounded-2xl border border-white/10 p-5 shadow-2xl">
            {!prefsOpen ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Cookie className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-sm font-semibold">
                      We use cookies
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Necessary cookies keep the site running. Analytics help us
                      improve the product. Marketing helps us reach the right
                      audience. Choose what you're comfortable with.{" "}
                      <Link
                        href="/cookie-policy"
                        className="text-primary hover:underline"
                      >
                        Cookie policy
                      </Link>
                      {" · "}
                      <Link
                        href="/privacy-policy"
                        className="text-primary hover:underline"
                      >
                        Privacy
                      </Link>
                      .
                    </p>
                  </div>
                  <button
                    aria-label="Close"
                    onClick={rejectAll}
                    className="rounded-full p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="w-full sm:flex-1"
                    onClick={acceptAll}
                  >
                    Accept all
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full sm:flex-1"
                    onClick={rejectAll}
                  >
                    Only necessary
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full rounded-full sm:w-auto"
                    onClick={() => setPrefsOpen(true)}
                  >
                    <Sliders className="h-3.5 w-3.5" /> Preferences
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <h3 className="font-display text-sm font-semibold">
                    Cookie preferences
                  </h3>
                </div>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">Necessary</div>
                      <div className="text-xs text-muted-foreground">
                        Required for authentication, security, and remembering
                        your preferences.
                      </div>
                    </div>
                    <Switch checked disabled aria-label="Necessary cookies (required)" />
                  </li>
                  <li className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">Analytics</div>
                      <div className="text-xs text-muted-foreground">
                        Anonymous usage to help us improve the product.
                      </div>
                    </div>
                    <Switch
                      checked={prefs.analytics}
                      onCheckedChange={(v) =>
                        setPrefs((p) => ({ ...p, analytics: v }))
                      }
                    />
                  </li>
                  <li className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium">Marketing</div>
                      <div className="text-xs text-muted-foreground">
                        Measure marketing campaigns and personalization.
                      </div>
                    </div>
                    <Switch
                      checked={prefs.marketing}
                      onCheckedChange={(v) =>
                        setPrefs((p) => ({ ...p, marketing: v }))
                      }
                    />
                  </li>
                </ul>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="w-full sm:flex-1"
                    onClick={savePreferences}
                  >
                    Save preferences
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full rounded-full sm:w-auto"
                    onClick={() => setPrefsOpen(false)}
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
