import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, User } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { FinalCTA } from "@/components/sections/final-cta";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import { posts } from "@/data/insights";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Playbooks, deep dives, and field notes from the GetNextSite team on websites, apps, AI automation, and digital marketing.",
  alternates: {
    canonical: `${siteConfig.url}/insights`,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function InsightsPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
        ]}
        title={
          <>
            Playbooks and field notes from{" "}
            <span className="text-gradient-brand">shipping teams.</span>
          </>
        }
        description="Practical writing on websites, apps, AI, growth, and design — no fluff."
      />

      {featured && (
        <section className="pb-12">
          <div className="container-wide">
            <FadeIn>
              <Link
                href={`/insights/${featured.slug}`}
                className="group relative grid gap-0 overflow-hidden rounded-3xl border border-border/70 bg-card/60 transition hover:border-primary/40 hover:shadow-xl lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto">
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="gradient">{featured.category}</Badge>
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {featured.readTime} min read
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold leading-tight sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground">{featured.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-purple-500 text-xs font-semibold text-white">
                      {featured.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-medium">{featured.author.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {featured.author.role}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 pt-2 text-sm font-semibold text-primary">
                    Read the full piece{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="pb-24">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.04}>
                <Link
                  href={`/insights/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/60 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Badge variant="outline" className="text-[10px]">
                        {p.category}
                      </Badge>
                      <span>{formatDate(p.publishedAt)}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                      {p.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <User className="h-3 w-3" /> {p.author.name}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {p.readTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
