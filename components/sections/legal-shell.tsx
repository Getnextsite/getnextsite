import { Info } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";

/**
 * Standard container for legal / policy pages.
 * Wraps a PageHeader + a disclaimer banner + a typography-tuned article.
 */
export function LegalShell({
  eyebrow,
  title,
  description,
  breadcrumbs,
  updated,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs: { name: string; url: string }[];
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        breadcrumbs={breadcrumbs}
        title={title}
        description={description ?? `Last updated ${updated}.`}
      />

      <section className="pb-24">
        <div className="container-tight">
          <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-800 dark:text-amber-200">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                <strong>Template notice.</strong> This page is a professionally-worded
                starting point. Before publishing, review the highlighted{" "}
                <code className="rounded bg-amber-500/20 px-1">[bracketed]</code> fields
                with your business details, and have a lawyer in your jurisdiction
                confirm the final text.
              </p>
            </div>
          </div>

          <article className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground [&>h2]:mt-10 [&>h2]:pt-2 [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:text-foreground [&>h3]:mt-6 [&>h3]:font-display [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-foreground [&>ul]:ml-5 [&>ul]:list-disc [&>ul]:space-y-2 [&>ol]:ml-5 [&>ol]:list-decimal [&>ol]:space-y-2 [&_a]:text-primary [&_a]:underline [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.85em]">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}
