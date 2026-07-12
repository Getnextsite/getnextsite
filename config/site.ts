export const siteConfig = {
  name: "GetNextSite Agency",
  shortName: "GetNextSite",
  tagline: "Building the Future of Your Business Online.",
  description:
    "GetNextSite Agency helps businesses launch, modernize, automate, and scale their digital presence — professional website development, mobile apps, AI business automation, digital marketing, branding, hosting, and long-term maintenance.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextsite-agency.vercel.app",
  ogImage: "/og.svg",
  keywords: [
    "professional website development",
    "mobile app development",
    "AI business automation",
    "digital marketing agency",
    "website design for small businesses",
    "SEO",
    "branding",
    "hosting",
    "web maintenance",
  ],
  authors: [{ name: "GetNextSite Agency", url: "https://nextsite-agency.com" }],
  creator: "GetNextSite Agency",
  contact: {
    email: "hello@nextsite-agency.com",
    phone: "+1 (555) 010-2030",
    whatsapp: "+15550102030",
    address: "1 Market Street, Suite 400, San Francisco, CA 94103",
    hours: "Mon–Fri · 9:00 – 18:00 (PT)",
  },
  social: {
    twitter: "https://twitter.com/nextsiteagency",
    linkedin: "https://linkedin.com/company/nextsite-agency",
    github: "https://github.com/nextsite-agency",
    instagram: "https://instagram.com/nextsite.agency",
    facebook: "https://facebook.com/nextsite.agency",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
  ],
  footerNav: {
    Services: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Branding", href: "/services/branding" },
    ],
    Company: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Industries", href: "/industries" },
      { label: "Contact", href: "/contact" },
    ],
    Resources: [
      { label: "Pricing", href: "/pricing" },
      { label: "Insights", href: "/insights" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Free Tools", href: "/tools" },
      { label: "Security", href: "/security" },
      { label: "FAQ", href: "/faq" },
      { label: "Book a Consultation", href: "/book-consultation" },
      { label: "Careers", href: "/careers" },
    ],
    Compare: [
      { label: "vs Wix", href: "/vs/wix" },
      { label: "vs Squarespace", href: "/vs/squarespace" },
      { label: "vs Webflow", href: "/vs/webflow" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
