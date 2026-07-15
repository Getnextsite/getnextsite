import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/legal-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "GDPR & Data Protection",
  description:
    "How GetNextSite Agency handles personal data under the GDPR, UK GDPR and equivalent regulations.",
  alternates: { canonical: `${siteConfig.url}/gdpr` },
};

export default function GDPRPage() {
  return (
    <LegalShell
      eyebrow="Legal · Data protection"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "GDPR", url: "/gdpr" },
      ]}
      title={<>GDPR &amp; Data Protection Notice</>}
      updated="January 2026"
    >
      <p>
        This notice explains how <strong>[Legal Business Name]</strong>{" "}
        complies with the EU General Data Protection Regulation (GDPR), the
        UK GDPR and equivalent frameworks. It supplements — and does not
        replace — our{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <h2>1. Data Controller</h2>
      <p>
        <strong>[Legal Business Name]</strong>, registered at{" "}
        <strong>[registered address, country]</strong>, is the Data Controller
        for personal data collected via this website (visitor forms, analytics
        cookies, newsletter). For enquiries write to{" "}
        <a href="mailto:privacy@nextsite-agency.com">
          privacy@nextsite-agency.com
        </a>
        .
      </p>

      <h2>2. Data Processor role</h2>
      <p>
        When we deliver Services to Clients, we generally act as a Data
        Processor on the Client's behalf (for example, processing enquiries
        submitted through a Client website we host). A Data Processing
        Addendum ("DPA") is available on request.
      </p>

      <h2>3. Lawful bases we rely on</h2>
      <ul>
        <li>
          <strong>Contract</strong> — to deliver Services requested by a
          Client (Art. 6(1)(b) GDPR).
        </li>
        <li>
          <strong>Legitimate interests</strong> — for site security, fraud
          prevention and improving our Services (Art. 6(1)(f) GDPR).
        </li>
        <li>
          <strong>Consent</strong> — for analytics, marketing cookies and
          newsletter (Art. 6(1)(a) GDPR).
        </li>
        <li>
          <strong>Legal obligation</strong> — for tax records and
          anti-money-laundering compliance (Art. 6(1)(c) GDPR).
        </li>
      </ul>

      <h2>4. Categories of data we process</h2>
      <ul>
        <li>Identity data (name, company).</li>
        <li>Contact data (email, phone, address).</li>
        <li>Content of enquiries you submit.</li>
        <li>Billing data (invoice details).</li>
        <li>Technical data (IP address, device, browser — anonymised in analytics).</li>
      </ul>
      <p>
        We do not collect special-category data unless you voluntarily
        include it in an enquiry. We do not use automated decision-making
        with legal effect.
      </p>

      <h2>5. Retention periods</h2>
      <ul>
        <li>Prospect enquiries: <strong>[24 months]</strong> from last contact.</li>
        <li>Client project data: for the duration of the engagement + <strong>[7 years]</strong> for tax records.</li>
        <li>Newsletter: until you unsubscribe.</li>
        <li>Backups: rolling 30 days.</li>
      </ul>

      <h2>6. International transfers</h2>
      <p>
        Some of our sub-processors (hosting, email, analytics) are located
        outside the EEA/UK. Where personal data is transferred, we rely on
        European Commission adequacy decisions or Standard Contractual
        Clauses ("SCCs"). A current sub-processor list is available on request.
      </p>

      <h2>7. Your rights</h2>
      <p>Under GDPR / UK GDPR you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Have inaccurate data corrected.</li>
        <li>Request erasure (subject to legal-retention exceptions).</li>
        <li>Restrict or object to processing.</li>
        <li>Data portability in a machine-readable format.</li>
        <li>Withdraw consent at any time (for consent-based processing).</li>
        <li>Lodge a complaint with your national data-protection authority.</li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:privacy@nextsite-agency.com">
          privacy@nextsite-agency.com
        </a>
        . We respond within 30 days.
      </p>

      <h2>8. Data-protection contact</h2>
      <p>
        Data Protection contact:{" "}
        <a href="mailto:privacy@nextsite-agency.com">
          privacy@nextsite-agency.com
        </a>
        <br />
        Postal:{" "}
        <strong>[registered address, country]</strong>
      </p>

      <h2>9. Supervisory authority</h2>
      <p>
        If you believe your rights have been infringed you may lodge a
        complaint with the data-protection authority of your country of
        residence. For UK residents, this is the Information Commissioner's
        Office (ICO). For EU residents, refer to your national authority.
      </p>

      <h2>10. Contact</h2>
      <p>
        General enquiries:{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
      </p>
    </LegalShell>
  );
}
