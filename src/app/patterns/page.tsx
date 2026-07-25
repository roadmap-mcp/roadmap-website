import type { Metadata } from "next";
import { SiteNav, SiteFooter } from "../_components/chrome";
import { patterns } from "./patterns";
import { PatternCard } from "./pattern-card";

export const metadata: Metadata = {
  title: "Patterns · Roadmap MCP — a pattern language for AI-centered software development",
  description:
    "A pattern language for building software with AI. Each pattern names a way of working and lists the Roadmap MCP plugins and configuration that realize it, starting from context composition.",
};

export default function PatternsPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-brand">Pattern language</div>
            <h1 className="mx-auto mt-2 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              A pattern language for AI-centered software development
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              Each pattern names a recurring way of working with AI and makes it concrete: a
              context, a problem, a solution — and the exact Roadmap MCP plugins and configuration
              that realize it. The patterns build on each other, starting from context composition.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {patterns.map((p) => (
              <PatternCard key={p.slug} pattern={p} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
