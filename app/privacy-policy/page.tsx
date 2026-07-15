import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/legal-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GetNextSite Agency collects, uses and protects your personal information.",
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Privacy Policy", url: "/privacy-policy" },
      ]}
      title={<>Privacy Policy</>}
      updated="January 2026"
    >
      <p>
        <strong>[Legal Business Name]</strong> ("we", "our", "us") respects
        your privacy. This Privacy Policy explains what personal data we
        collect, why, how we use it, who we share it with, and your rights.
      </p>
      <p>
        This policy applies to visitors, prospects and clients of{" "}
        <a href={siteConfig.url}>{siteConfig.url.replace(/^https?:\/\//, "")}</a>{" "}
        and the services we deliver.
      </p>

      <h2>1. Who is responsible</h2>
      <p>
        Data Controller: <strong>[Legal Business Name]</strong>
        <br />
        Registered address: <strong>[registered address, country]</strong>
        <br />
        Privacy contact:{" "}
        <a href="mailto:privacy@nextsite-agency.com">
          privacy@nextsite-agency.com
        </a>
      </p>

      <h2>2. Data we collect</h2>
      <h3>You provide directly</h3>
      <ul>
        <li>Contact form data — name, company, email, phone, message.</li>
        <li>Invoice request data — same as above, plus selected services, budget range and project description.</li>
        <li>Consultation booking data — same, plus preferred date and topics.</li>
        <li>Newsletter opt-in — email address only.</li>
        <li>Client onboarding data — billing details, brand assets, credentials required to deliver Services.</li>
      </ul>

      <h3>Automatically</h3>
      <ul>
        <li>Technical data — IP address (truncated for analytics), device, browser, timezone.</li>
        <li>Usage data — pages visited, referrer, session duration.</li>
        <li>Cookies — see our <a href="/cookie-policy">Cookie Policy</a>.</li>
      </ul>

      <h3>From third parties</h3>
      <ul>
        <li>Publicly available business information used to verify prospects.</li>
        <li>Payment status from our payment processor (Stripe / PayPal invoice status).</li>
      </ul>

      <h2>3. Why we use it (lawful basis)</h2>
      <ul>
        <li><strong>Respond to enquiries and deliver Services</strong> — contract or pre-contract.</li>
        <li><strong>Improve the site and our proposals</strong> — legitimate interests.</li>
        <li><strong>Send newsletters</strong> — consent (opt-in, one-click unsubscribe).</li>
        <li><strong>Bill and record-keep</strong> — legal obligation (tax law).</li>
        <li><strong>Prevent fraud and secure our systems</strong> — legitimate interests.</li>
      </ul>

      <h2>4. Sharing</h2>
      <p>We share personal data only with vendors necessary to run the business, under contract:</p>
      <ul>
        <li>Hosting / CDN providers (e.g. Vercel, Hostinger, Cloudflare).</li>
        <li>Email service providers (transactional and newsletter).</li>
        <li>Payment processors (Stripe, PayPal) — for invoicing only, we never store full card numbers.</li>
        <li>Form providers (e.g. Formspree) — for enquiry delivery.</li>
        <li>Analytics providers (only if you consent to analytics cookies).</li>
        <li>Legal, tax and professional advisors under duty of confidentiality.</li>
      </ul>
      <p>
        We do <strong>not</strong> sell your personal data. We do not share it
        with advertisers.
      </p>

      <h2>5. International transfers</h2>
      <p>
        Some of our processors are located outside the EEA/UK. Where personal
        data leaves the EEA/UK we rely on adequacy decisions or Standard
        Contractual Clauses. See{" "}
        <a href="/gdpr">GDPR &amp; Data Protection Notice</a>.
      </p>

      <h2>6. Retention</h2>
      <ul>
        <li>Prospect enquiries: 24 months from last contact.</li>
        <li>Client records: engagement duration + 7 years for tax and legal records.</li>
        <li>Newsletter: until you unsubscribe.</li>
        <li>Analytics: 14 months (aggregated, non-identifying).</li>
        <li>Backups: rolling 30 days.</li>
      </ul>

      <h2>7. Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, restrict or object to processing of your personal data, obtain
        a portable copy, and withdraw consent. To exercise these rights email{" "}
        <a href="mailto:privacy@nextsite-agency.com">
          privacy@nextsite-agency.com
        </a>
        . We respond within 30 days.
      </p>
      <p>
        You can also lodge a complaint with your national data-protection
        authority. In the UK: the Information Commissioner's Office. In the
        EU: your national supervisory authority. In California: refer to CCPA
        rights below.
      </p>

      <h2>8. California residents (CCPA / CPRA)</h2>
      <ul>
        <li>Right to know what personal information we collect.</li>
        <li>Right to delete personal information (subject to legal exceptions).</li>
        <li>Right to correct inaccurate personal information.</li>
        <li>Right to opt out of "sale" or "sharing" — we do not sell personal information.</li>
        <li>Right to non-discrimination for exercising these rights.</li>
      </ul>

      <h2>9. Security</h2>
      <p>
        We apply reasonable technical and organizational measures — TLS in
        transit, encryption at rest, least-privilege access, monitoring, and
        regular backups — proportionate to the sensitivity of the data. See
        our <a href="/security">Security page</a> for detail.
      </p>

      <h2>10. Children</h2>
      <p>
        Our Services are not directed at children under 16 and we do not
        knowingly collect personal data from them. If you believe a child has
        provided us data, contact us and we will delete it.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        notified via email or a prominent site notice. The date at the top of
        this page indicates when the policy was last revised.
      </p>

      <h2>12. Contact</h2>
      <p>
        <strong>[Legal Business Name]</strong>
        <br />
        <strong>[registered address]</strong>
        <br />
        Privacy contact:{" "}
        <a href="mailto:privacy@nextsite-agency.com">
          privacy@nextsite-agency.com
        </a>
        <br />
        General contact:{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
      </p>
    </LegalShell>
  );
}
