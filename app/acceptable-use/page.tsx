import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/legal-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "What Clients can and cannot do on services hosted or delivered by GetNextSite Agency.",
  alternates: { canonical: `${siteConfig.url}/acceptable-use` },
};

export default function AcceptableUsePage() {
  return (
    <LegalShell
      eyebrow="Legal"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Acceptable Use", url: "/acceptable-use" },
      ]}
      title={<>Acceptable Use Policy</>}
      updated="January 2026"
    >
      <p>
        This Acceptable Use Policy ("AUP") sets out prohibited uses of any
        website, application, hosting, email, AI or infrastructure we provide
        (the "Services"). It applies to all Clients, end users of Client
        products, and visitors.
      </p>

      <h2>1. Prohibited content</h2>
      <p>You may not use the Services to host, distribute, or promote:</p>
      <ul>
        <li>Content that is illegal in the jurisdictions where the Services operate.</li>
        <li>Child sexual abuse material or content sexualising minors.</li>
        <li>Content that infringes third-party intellectual-property rights.</li>
        <li>Content that incites violence, terrorism, or discrimination.</li>
        <li>Malware, phishing kits, or software designed to compromise systems.</li>
        <li>Adult content without appropriate age-verification and legal compliance.</li>
      </ul>

      <h2>2. Prohibited activity</h2>
      <ul>
        <li>Unsolicited bulk email (spam) or violation of anti-spam law.</li>
        <li>Attempts to breach the security of any system, network or account.</li>
        <li>Denial-of-service attacks or resource abuse.</li>
        <li>Cryptocurrency mining without our prior written consent.</li>
        <li>Scraping or data-harvesting against another party's terms.</li>
        <li>Impersonation, fraud, or deceptive business practices.</li>
        <li>Circumventing usage limits, rate limits, or security controls.</li>
      </ul>

      <h2>3. AI-specific restrictions</h2>
      <p>
        Where we provide AI-powered services (chatbots, receptionists, content
        generation), Clients agree not to use them to:
      </p>
      <ul>
        <li>Generate misleading medical, legal, or financial advice presented as human authored.</li>
        <li>Deceive users about interacting with an AI where disclosure is legally required.</li>
        <li>Produce content that violates applicable AI regulations (including the EU AI Act where in force).</li>
        <li>Automate mass generation of political disinformation.</li>
      </ul>

      <h2>4. Fair use of resources</h2>
      <p>
        Shared hosting resources (CPU, memory, storage, bandwidth) are
        provided on a fair-use basis. Sustained excessive use may require an
        upgrade to a dedicated plan. We will always contact you first before
        applying any resource limits.
      </p>

      <h2>5. Reporting abuse</h2>
      <p>
        Report suspected AUP violations to{" "}
        <a href="mailto:abuse@nextsite-agency.com">
          abuse@nextsite-agency.com
        </a>
        . Include URLs, screenshots and timestamps where relevant.
      </p>

      <h2>6. Enforcement</h2>
      <p>
        We may investigate suspected violations. Consequences may include
        content removal, service suspension, account termination, cooperation
        with law-enforcement, and — where applicable — chargebacks or refunds
        being denied.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update this AUP from time to time. Material changes will be
        notified via email or account notice.
      </p>

      <h2>8. Contact</h2>
      <p>
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
      </p>
    </LegalShell>
  );
}
