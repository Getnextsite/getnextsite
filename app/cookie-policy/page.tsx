import type { Metadata } from "next";
import { LegalShell } from "@/components/sections/legal-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How GetNextSite Agency uses cookies and similar tracking technologies, and how you can control them.",
  alternates: { canonical: `${siteConfig.url}/cookie-policy` },
};

export default function CookiePolicyPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Cookie Policy", url: "/cookie-policy" },
      ]}
      title={<>Cookie Policy</>}
      updated="January 2026"
    >
      <p>
        This Cookie Policy explains how <strong>[Legal Business Name]</strong>{" "}
        ("we", "our", "us"), operator of{" "}
        <a href={siteConfig.url}>{siteConfig.url.replace(/^https?:\/\//, "")}</a>,
        uses cookies and similar technologies to recognize you when you visit
        our website.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small data files placed on your device when you visit a
        website. They are widely used to make websites work, or work more
        efficiently, and to provide analytics or personalization.
      </p>

      <h2>2. Cookies we use</h2>
      <h3>Strictly necessary</h3>
      <p>
        These cookies are essential for the site to function. They enable
        core features such as security, network management, and remembering
        your preferences. They cannot be switched off.
      </p>
      <ul>
        <li>
          <code>nextsite-cookie-consent-v1</code> — records your cookie
          preferences. Duration: 12 months. First-party.
        </li>
        <li>
          <code>nextsite-exit-intent-shown</code> — session flag so our exit
          modal appears at most once per visit. Duration: session. First-party.
        </li>
      </ul>

      <h3>Analytics (opt-in)</h3>
      <p>
        We may set analytics cookies if you accept them in the banner. These
        help us understand how visitors use the site so we can improve it.
      </p>
      <ul>
        <li>
          <strong>[Analytics provider — e.g. Plausible, Fathom]</strong> —
          anonymous usage statistics. No personal identifiers stored.
        </li>
      </ul>

      <h3>Marketing (opt-in)</h3>
      <p>
        We may set marketing cookies if you accept them. These allow us to
        measure marketing campaign performance and personalize content.
      </p>
      <ul>
        <li>
          <strong>[Marketing provider — e.g. Meta Pixel, LinkedIn Insight]</strong>{" "}
          — conversion measurement. Third-party.
        </li>
      </ul>

      <h2>3. How to control cookies</h2>
      <p>
        You can accept, reject, or customize cookies via the banner shown on
        your first visit or by clicking the "Cookie preferences" link in the
        footer. You can also block or delete cookies directly through your
        browser settings — note that this may impact certain functionality.
      </p>

      <h2>4. Third-party cookies</h2>
      <p>
        Some cookies are placed by third-party services that appear on our
        pages. We do not control the dissemination of these cookies. You
        should check the third-party websites for more information about
        these cookies.
      </p>

      <h2>5. Changes to this policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes
        to the cookies we use or for other operational, legal, or regulatory
        reasons. The "Last updated" date at the top of this page indicates
        when this policy was most recently revised.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about our use of cookies? Email us at{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        .
      </p>
    </LegalShell>
  );
}
