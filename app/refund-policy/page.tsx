import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/legal-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Refund and cancellation terms for GetNextSite Agency subscription services and one-time setup fees.",
  alternates: { canonical: `${siteConfig.url}/refund-policy` },
};

export default function RefundPolicyPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Refund & Cancellation", url: "/refund-policy" },
      ]}
      title={<>Refund &amp; Cancellation Policy</>}
      updated="January 2026"
    >
      <p>
        This policy explains how refunds, cancellations and pauses work for
        services purchased from <strong>[Legal Business Name]</strong> ("we",
        "our", "us"). It is part of our{" "}
        <a href="/terms">Terms of Service</a>.
      </p>

      <h2>1. Payment methods</h2>
      <p>
        Payments are handled manually through our external payment providers
        (e.g. Stripe or PayPal invoice links). Payments are not processed
        directly on this website. Once your invoice is issued and paid,
        onboarding begins.
      </p>

      <h2>2. One-time setup fees</h2>
      <p>
        Setup fees cover discovery, design, development, testing and launch
        work.
      </p>
      <ul>
        <li>
          <strong>Before work begins</strong> — full refund on request within
          7 days of payment, provided the discovery phase has not started.
        </li>
        <li>
          <strong>During the project</strong> — refunds are prorated based on
          milestones already delivered. Design and code produced up to the
          refund date remains our property unless separately agreed.
        </li>
        <li>
          <strong>After launch</strong> — setup fees are non-refundable once
          the site or app has been deployed to your production environment.
        </li>
      </ul>

      <h2>3. Monthly subscriptions</h2>
      <p>
        Monthly plans (hosting, security, maintenance, marketing, AI) may be
        cancelled at any time from your account or by emailing{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        .
      </p>
      <ul>
        <li>Cancellation takes effect at the end of the current billing period.</li>
        <li>
          We do not offer prorated refunds for partial months except where
          required by applicable consumer-protection law.
        </li>
        <li>
          On cancellation we hand over your code, content and database
          exports. Hosting, monitoring and support end with the subscription.
        </li>
      </ul>

      <h2>4. Annual subscriptions</h2>
      <p>
        Annual plans are billed upfront with a 15% discount versus monthly.
      </p>
      <ul>
        <li>
          Within 14 days of purchase: full refund on request (minus payment
          processor fees), provided no significant work has begun.
        </li>
        <li>
          After 14 days: refund of the unused portion, minus a 20%
          administrative fee.
        </li>
      </ul>

      <h2>5. Add-ons and third-party costs</h2>
      <p>
        Some add-ons include third-party fees (domain registration, SSL wildcard
        certificates, SMS costs, cloud usage above included quotas). These are
        billed at cost and are non-refundable once purchased on your behalf.
      </p>

      <h2>6. Pause &amp; downgrade</h2>
      <p>
        You may pause a subscription for up to 60 days once per calendar year
        without penalty. Downgrades take effect at the next billing cycle.
      </p>

      <h2>7. Chargebacks</h2>
      <p>
        If you initiate a chargeback rather than requesting a refund through
        us, we reserve the right to suspend all services and hosting on your
        account until the dispute is resolved. Please contact us first — we
        respond to refund requests within one business day.
      </p>

      <h2>8. How to request a refund</h2>
      <p>
        Email{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>{" "}
        from the address on your account. Include your invoice number and the
        reason for the request. Approved refunds are issued to the original
        payment method within 5–10 business days.
      </p>

      <h2>9. Statutory rights</h2>
      <p>
        Nothing in this policy limits any non-waivable statutory rights you
        have as a consumer under the laws of{" "}
        <strong>[your jurisdiction]</strong>.
      </p>

      <h2>10. Contact</h2>
      <p>
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>{" "}
        · <a href="/contact">Contact form</a>
      </p>
    </LegalShell>
  );
}
