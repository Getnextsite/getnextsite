import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter, Facebook } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { CookiePreferencesButton } from "@/components/layout/cookie-preferences-button";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <div className="pointer-events-none absolute inset-0 aurora-bg opacity-40" />
      <div className="container-wide relative py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
                { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                { icon: Github, href: siteConfig.social.github, label: "GitHub" },
                { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
                { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-full border border-border/70 p-2 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {Object.entries(siteConfig.footerNav).map(([heading, items]) => (
              <div key={heading}>
                <h3 className="text-sm font-semibold">{heading}</h3>
                <ul className="mt-4 space-y-3">
                  {items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className="text-sm text-muted-foreground transition hover:text-foreground"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold">Subscribe to our newsletter</h3>
              <p className="text-sm text-muted-foreground">
                Playbooks on websites, apps, AI, and marketing — once a month.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                Business
              </div>
              <div className="mt-1 font-medium text-foreground">
                {siteConfig.business.legalName}
              </div>
              <div>{siteConfig.business.jurisdiction}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                Registered address
              </div>
              <div className="mt-1">{siteConfig.business.address}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                Registration
              </div>
              <div className="mt-1">
                Reg. no. {siteConfig.business.registrationNumber}
              </div>
              <div>Tax ID: {siteConfig.business.taxId}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                Contact
              </div>
              <div className="mt-1">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>{siteConfig.contact.hours}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/cookie-policy" className="hover:text-foreground">
              Cookies
            </Link>
            <CookiePreferencesButton />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-foreground"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
