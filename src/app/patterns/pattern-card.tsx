import Link from "next/link";
import type { Pattern } from "./patterns";

/** A clickable pattern-language card linking to the pattern's page. */
export function PatternCard({ pattern }: { pattern: Pattern }) {
  const isRole = pattern.kind === "Role";
  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand/40 hover:shadow-lg hover:shadow-slate-200/60"
    >
      <div className="flex items-center justify-between">
        <span
          className={
            "rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide " +
            (isRole ? "bg-amber-50 text-amber-700" : "bg-brand-50 text-brand")
          }
        >
          {pattern.kind}
        </span>
        <code className="font-mono text-[11px] text-slate-400">{pattern.name}</code>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-brand">
        {pattern.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{pattern.tagline}</p>

      <div className="mt-5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Plugins</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {pattern.plugins.map((p) => (
            <span
              key={p}
              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand">
        Read the pattern
        <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}
