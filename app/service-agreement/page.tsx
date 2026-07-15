import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/legal-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Service Agreement",
  description:
    "Master Services Agreement between GetNextSite Agency and its clients — deliverables, IP, warranties and dispute resolution.",
  alternates: { canonical: `${siteConfig.url}/service-agreement` },
};

export default function ServiceAgreementPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Service Agreement", url: "/service-agreement" },
      ]}
      title={<>Service Agreement</>}
      updated="January 2026"
    >
      <p>
        This Service Agreement ("Agreement") governs the provision of design,
        development, hosting, marketing and related services (the "Services")
        by <strong>[Legal Business Name]</strong>, a company registered under
        the laws of <strong>[jurisdiction]</strong> with registered office at{" "}
        <strong>[registered address]</strong> ("we", "our", "us"), to you (the
        "Client").
      </p>

      <h2>1. Scope of work</h2>
      <p>
        The specific Services, deliverables, timeline and fees for each
        engagement are described in the accepted quotation, statement of work
        or invoice (the "Order"). Each Order incorporates this Agreement by
        reference.
      </p>

      <h2>2. Client responsibilities</h2>
      <ul>
        <li>
          Timely provision of content, credentials, brand assets, feedback and
          approvals required to deliver the Services.
        </li>
        <li>Designating a primary point of contact authorized to approve deliverables.</li>
        <li>Ensuring you have the right to use any material you provide us.</li>
        <li>Prompt payment of invoices per the payment terms.</li>
      </ul>

      <h2>3. Our responsibilities</h2>
      <ul>
        <li>Delivering the Services with reasonable skill and care.</li>
        <li>Meeting agreed milestones subject to timely Client input.</li>
        <li>Maintaining reasonable security and confidentiality of Client data.</li>
        <li>Providing the technical support level defined in the Order.</li>
      </ul>

      <h2>4. Fees and payment</h2>
      <ul>
        <li>Setup fees are billed at kickoff and at agreed milestones.</li>
        <li>Subscription fees are billed in advance, monthly or annually.</li>
        <li>All prices are in <strong>[USD/EUR/…]</strong> and exclude applicable taxes.</li>
        <li>Invoices are due within 14 days unless otherwise agreed.</li>
        <li>Late payment may incur interest at <strong>[1.5% per month]</strong> or the maximum rate permitted by law.</li>
      </ul>
      <p>
        Payment is collected through our external payment providers (Stripe,
        PayPal or bank transfer). We do not process card details on this
        website.
      </p>

      <h2>5. Intellectual property</h2>
      <ul>
        <li>
          On full payment, ownership of all custom design, content, and
          project-specific source code we produce for the Order transfers to
          the Client.
        </li>
        <li>
          We retain ownership of any pre-existing tools, libraries, design
          systems and templates that predate the Order ("Background IP") and
          grant the Client a perpetual, worldwide, royalty-free licence to use
          Background IP embedded in the deliverables.
        </li>
        <li>
          Third-party assets (fonts, stock imagery, open-source software)
          remain subject to their original licences.
        </li>
        <li>
          We may reference the engagement and include screenshots in our
          portfolio unless the Client opts out in writing.
        </li>
      </ul>

      <h2>6. Confidentiality</h2>
      <p>
        Each party will treat non-public information disclosed by the other in
        connection with the Services as confidential, and will only use it to
        perform its obligations under this Agreement. This obligation survives
        termination for three (3) years.
      </p>

      <h2>7. Data protection</h2>
      <p>
        Where we process personal data on the Client's behalf, we act as a
        processor under applicable data-protection law (including the GDPR and
        UK GDPR where relevant). A Data Processing Addendum ("DPA") is
        available on request.
      </p>

      <h2>8. Warranties</h2>
      <p>
        We warrant that the Services will be performed in a professional
        manner consistent with industry standards. Except as expressly stated,
        the Services are provided "as is" without further warranties of any
        kind, whether express or implied.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law:
      </p>
      <ul>
        <li>
          Neither party will be liable for indirect, incidental, special,
          consequential or punitive damages, or loss of profit, revenue,
          business, opportunity or data.
        </li>
        <li>
          Our aggregate liability under this Agreement will not exceed the
          fees paid by the Client in the three (3) months preceding the event
          giving rise to the claim.
        </li>
        <li>
          Nothing in this Agreement excludes liability for death, personal
          injury caused by negligence, fraud, or any other liability that
          cannot be excluded by applicable law.
        </li>
      </ul>

      <h2>10. Indemnity</h2>
      <p>
        Each party will indemnify the other against third-party claims arising
        from its own gross negligence, wilful misconduct, or breach of this
        Agreement.
      </p>

      <h2>11. Term and termination</h2>
      <ul>
        <li>Fixed-fee Orders end on final delivery and payment.</li>
        <li>Subscriptions renew automatically until cancelled per our{" "}
          <a href="/refund-policy">Refund &amp; Cancellation Policy</a>.
        </li>
        <li>
          Either party may terminate for material breach not cured within 14
          days of written notice.
        </li>
        <li>
          On termination, we hand over all Client materials and any completed
          deliverables paid for; the Client pays for work performed up to the
          effective termination date.
        </li>
      </ul>

      <h2>12. Force majeure</h2>
      <p>
        Neither party is liable for delay or failure due to events beyond
        reasonable control (natural disasters, pandemic, government action,
        major internet outages).
      </p>

      <h2>13. Governing law and disputes</h2>
      <p>
        This Agreement is governed by the laws of{" "}
        <strong>[jurisdiction]</strong>. The parties will first attempt to
        resolve any dispute by good-faith negotiation. Unresolved disputes will
        be submitted to the exclusive jurisdiction of the courts of{" "}
        <strong>[city, jurisdiction]</strong>.
      </p>

      <h2>14. Entire agreement</h2>
      <p>
        This Agreement together with the Order, our{" "}
        <a href="/terms">Terms of Service</a>,{" "}
        <a href="/privacy-policy">Privacy Policy</a>,{" "}
        <a href="/acceptable-use">Acceptable Use Policy</a> and{" "}
        <a href="/refund-policy">Refund &amp; Cancellation Policy</a>{" "}
        constitutes the entire agreement between the parties.
      </p>

      <h2>15. Contact</h2>
      <p>
        <strong>[Legal Business Name]</strong> —{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
      </p>
    </LegalShell>
  );
}
