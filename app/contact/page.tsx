import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/config/site";
import { InvoiceRequestTrigger } from "@/components/forms/invoice-request-dialog";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to GetNextSite Agency about your next website, mobile app, AI automation or marketing engagement. Same-day response.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
        title={
          <>
            Let's build the future of{" "}
            <span className="text-gradient-brand">your business.</span>
          </>
        }
        description="Same-day response, straight talk, and no long-form proposals to read."
      />

      <section className="pb-24">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <aside className="lg:col-span-5">
              <div className="space-y-4">
                <div className="rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur">
                  <h3 className="font-display text-lg font-semibold">Reach us</h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 text-primary" />
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="hover:text-primary"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 text-primary" />
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="hover:text-primary"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <MessageCircle className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsapp.replace(
                          /[^0-9]/g,
                          "",
                        )}`}
                        className="hover:text-primary"
                      >
                        WhatsApp — {siteConfig.contact.whatsapp}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{siteConfig.contact.address}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{siteConfig.contact.hours}</span>
                    </li>
                  </ul>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border/70">
                  <iframe
                    title="Office map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.5076848!3d37.7576792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000"
                    width="100%"
                    height="240"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block"
                  />
                </div>

                <div className="rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur">
                  <h3 className="font-display text-lg font-semibold">
                    Prefer to skip the form?
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get a formal invoice in your inbox in 2 hours.
                  </p>
                  <InvoiceRequestTrigger>
                    <Button variant="gradient" className="mt-4 w-full">
                      Send Me an Invoice
                    </Button>
                  </InvoiceRequestTrigger>
                </div>

                <div className="rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur">
                  <h3 className="font-display text-sm font-semibold">
                    Business identity
                  </h3>
                  <dl className="mt-3 space-y-2 text-xs">
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Legal name
                      </dt>
                      <dd className="mt-0.5 font-medium">
                        {siteConfig.business.legalName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Registered in
                      </dt>
                      <dd className="mt-0.5">
                        {siteConfig.business.jurisdiction}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Registration number
                      </dt>
                      <dd className="mt-0.5">
                        {siteConfig.business.registrationNumber}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Tax ID
                      </dt>
                      <dd className="mt-0.5">{siteConfig.business.taxId}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Registered address
                      </dt>
                      <dd className="mt-0.5">{siteConfig.business.address}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-[11px] text-muted-foreground">
                    Payments are processed by Stripe or PayPal via emailed
                    invoice links — never on this website.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
