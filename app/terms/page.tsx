import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/legal-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of the GetNextSite Agency website and services.",
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Terms of Service", url: "/terms" },
      ]}
      title={<>Terms of Service</>}
      updated="January 2026"
    >
      <p>
        These Terms of Service ("Terms") govern your use of the website{" "}
        <a href={siteConfig.url}>{siteConfig.url.replace(/^https?:\/\//, "")}</a>{" "}
        and any services provided by <strong>[Legal Business Name]</strong>{" "}
        ("we", "our", "us"). By accessing or using the site you agree to
        these Terms.
      </p>

      <h2>1. Who we are</h2>
      <p>
        <strong>[Legal Business Name]</strong>, a company registered under the
        laws of <strong>[jurisdiction]</strong>, registration number{" "}
        <strong>[registration number]</strong>, with registered office at{" "}
        <strong>[registered address]</strong>. VAT / Tax ID:{" "}
        <strong>[tax id, if applicable]</strong>.
      </p>

      <h2>2. Services</h2>
      <p>
        We provide professional website development, mobile applications, AI
        automation, digital marketing, branding, hosting and related services
        (the "Services"). The Services are delivered under our{" "}
        <a href="/service-agreement">Service Agreement</a> per project
        Order.
      </p>
      <p>
        Prices displayed on this site are indicative starting points. Every
        engagement is confirmed via a formal quotation before work begins.
      </p>

      <h2>3. How you engage us</h2>
      <ol>
        <li>You submit a request via the website, email or WhatsApp.</li>
        <li>We discuss the project by email, video call or phone.</li>
        <li>We prepare a custom quotation.</li>
        <li>
          If accepted, an invoice or payment link is sent through our external
          payment provider (Stripe / PayPal / bank).
        </li>
        <li>Work begins after payment confirmation.</li>
      </ol>
      <p>
        Payments are <strong>not</strong> processed directly on this website.
      </p>

      <h2>4. Ownership</h2>
      <p>
        On full payment, ownership of the custom design, content and
        project-specific source code we produce transfers to you. We retain
        rights to our pre-existing libraries, design systems and internal
        tools. Third-party licences (fonts, stock imagery, open-source
        software) remain subject to their original terms.
      </p>

      <h2>5. Cancellation</h2>
      <p>
        You can cancel any subscription at any time. Refund terms are
        detailed in our{" "}
        <a href="/refund-policy">Refund &amp; Cancellation Policy</a>.
      </p>

      <h2>6. Uptime &amp; SLA</h2>
      <p>
        We target 99.9% monthly uptime for hosted services. If we fall below
        this target we credit the corresponding portion of your subscription
        for that month.
      </p>

      <h2>7. Acceptable use</h2>
      <p>
        Your use of the Services is subject to our{" "}
        <a href="/acceptable-use">Acceptable Use Policy</a>. We reserve the
        right to suspend Services in the event of material breach.
      </p>

      <h2>8. Warranties and disclaimers</h2>
      <p>
        We warrant that the Services will be performed with reasonable skill
        and care. Except as expressly stated, the Services are provided "as
        is" without further warranties. See our{" "}
        <a href="/disclaimer">Disclaimer</a>.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, our aggregate liability is
        limited to the fees paid by you in the three (3) months preceding the
        event giving rise to the claim. We are not liable for indirect,
        incidental, consequential or punitive damages, or loss of profit,
        revenue, business or data. Nothing in these Terms excludes liability
        for death, personal injury caused by negligence, fraud, or any other
        liability that cannot be excluded by applicable law.
      </p>

      <h2>10. Indemnity</h2>
      <p>
        You agree to indemnify us against third-party claims arising from
        your breach of these Terms, misuse of the Services, or infringement
        of any right of another party through content or credentials you
        provide.
      </p>

      <h2>11. Confidentiality</h2>
      <p>
        Each party will treat non-public information disclosed by the other
        as confidential, use it only to perform under these Terms, and
        protect it with reasonable care.
      </p>

      <h2>12. Data protection</h2>
      <p>
        We process personal data as described in our{" "}
        <a href="/privacy-policy">Privacy Policy</a> and{" "}
        <a href="/gdpr">GDPR Notice</a>.
      </p>

      <h2>13. Force majeure</h2>
      <p>
        Neither party is liable for failure or delay caused by events beyond
        reasonable control (natural disasters, pandemic, government action,
        major internet outages).
      </p>

      <h2>14. Governing law and jurisdiction</h2>
      <p>
        These Terms are governed by the laws of{" "}
        <strong>[jurisdiction]</strong>. The parties will attempt to resolve
        disputes by good-faith negotiation. Unresolved disputes are subject
        to the exclusive jurisdiction of the courts of{" "}
        <strong>[city, jurisdiction]</strong>. Nothing here removes any
        non-waivable statutory rights you have as a consumer.
      </p>

      <h2>15. Changes</h2>
      <p>
        We may update these Terms from time to time. Material changes are
        notified via email or a prominent site notice. Continued use of the
        Services after changes take effect constitutes acceptance.
      </p>

      <h2>16. Contact</h2>
      <p>
        <strong>[Legal Business Name]</strong>
        <br />
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        <br />
        Legal:{" "}
        <a href="mailto:legal@nextsite-agency.com">
          legal@nextsite-agency.com
        </a>
      </p>
    </LegalShell>
  );
}
