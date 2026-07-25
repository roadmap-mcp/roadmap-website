import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav, SiteFooter } from "../../_components/chrome";
import { patterns, getPattern, type Pattern } from "../patterns";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return patterns.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) return { title: "Pattern not found · Roadmap MCP" };
  return {
    title: `${pattern.name} · Roadmap MCP patterns`,
    description: `${pattern.title} — ${pattern.tagline} Context, problem, solution, and the Roadmap MCP plugins that realize it.`,
  };
}

export default async function PatternPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) notFound();

  const isRole = pattern.kind === "Role";

  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-14">
          <nav className="text-sm text-slate-500">
            <Link href="/patterns" className="hover:text-brand">← All patterns</Link>
          </nav>

          <header className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={
                  "rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide " +
                  (isRole ? "bg-amber-50 text-amber-700" : "bg-brand-50 text-brand")
                }
              >
                {pattern.kind}
              </span>
              <code className="font-mono text-sm text-slate-500">{pattern.name}</code>
            </div>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{pattern.title}</h1>
            <p className="mt-3 text-lg text-slate-600">{pattern.tagline}</p>
          </header>

          <Field label="Context">{pattern.context}</Field>

          <ConsiderList
            label="Consider these patterns first"
            slugs={pattern.considerFirst}
            emptyNote="This is a foundational pattern — nothing needs to come before it."
          />

          <Field label="Problem">{pattern.problem}</Field>
          <Field label="Solution">{pattern.solution}</Field>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Realized in Roadmap MCP
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {pattern.plugins.map((p) => (
                <span
                  key={p}
                  className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] text-slate-600"
                >
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-700">Config: </span>
              {pattern.config}
            </p>
          </div>

          <ConsiderList label="Consider next" slugs={pattern.considerNext} />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">{label}</h2>
      <p className="mt-2 text-base leading-relaxed text-slate-700">{children}</p>
    </section>
  );
}

function ConsiderList({
  label,
  slugs,
  emptyNote,
}: {
  label: string;
  slugs: string[];
  emptyNote?: string;
}) {
  const linked = slugs.map(getPattern).filter((p): p is Pattern => Boolean(p));
  if (linked.length === 0 && !emptyNote) return null;
  return (
    <section className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">{label}</h2>
      {linked.length === 0 ? (
        <p className="mt-2 text-base leading-relaxed text-slate-500">{emptyNote}</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {linked.map((p) => (
            <Link
              key={p.slug}
              href={`/patterns/${p.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-brand/40 hover:text-brand"
            >
              <code className="font-mono text-[13px]">{p.name}</code>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
