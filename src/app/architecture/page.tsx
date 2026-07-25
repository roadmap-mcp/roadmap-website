import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter, SectionHeading, GITHUB_URL } from "../_components/chrome";
import { patterns } from "../patterns/patterns";
import { PatternCard } from "../patterns/pattern-card";

export const metadata: Metadata = {
  title: "Architecture — Roadmap MCP",
  description:
    "How Roadmap MCP works: a thin runtime that discovers plugins at startup and wires them through typed extension points. An edition is the framework plus the plugins you install.",
};

export default function ArchitecturePage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <ArchHero />
        <PluginArchitecture />
        <HowItWorks />
        <PatternsTeaser />
        <VideoSection />
      </main>
      <SiteFooter />
    </>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function ArchHero() {
  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="text-sm font-semibold uppercase tracking-wider text-brand">Architecture</div>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Everything is a plugin.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          A lightweight runtime discovers plugins at startup and wires them through typed
          extension points. An <em>edition</em> is nothing more than the framework plus the
          plugins you install — so you add, remove, or swap capabilities without forking the app.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── Plugin architecture ─────────────────────────── */

const plugins: { name: string; label: string }[] = [
  { name: "context", label: "Contexts" },
  { name: "context-assistant", label: "Context Assistant" },
  { name: "brain", label: "Company Brain" },
  { name: "jira", label: "Jira / Confluence" },
  { name: "ai", label: "AI Providers" },
  { name: "whisper", label: "Whisper (voice)" },
  { name: "e2e", label: "Web Testing" },
  { name: "e2e-selenium", label: "Selenium Driver" },
  { name: "e2e-assistant", label: "AI Test Design" },
  { name: "fileviewer", label: "File Viewer" },
  { name: "viewer-plantuml", label: "PlantUML" },
  { name: "viewer-markdown", label: "Markdown" },
  { name: "viewer-image", label: "Image" },
  { name: "scratchdir", label: "Scratch Dir" },
  { name: "folderpicker", label: "Folder Picker" },
  { name: "settings", label: "Settings / Admin" },
];

function PluginArchitecture() {
  return (
    <section id="architecture" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-brand to-brand-700 p-8 text-white">
          <div className="text-sm font-semibold uppercase tracking-wider text-white/70">
            The framework
          </div>
          <h3 className="mt-2 text-2xl font-bold">roadmap-framework</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            A thin runtime: plugin discovery and topo-sorted startup, an extension +
            service registry, config with encrypted secrets, and an MCP server. It ships
            no features of its own — every capability arrives as a plugin.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-white/90">
            {[
              "Runtime discovery — no rebuild to add a plugin",
              "Typed extension points, additive or swappable",
              "Backend Python + optional Angular frontend per plugin",
              "A shared @roadmap/ui design system for consistent UI",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium text-slate-500">Installed plugins register into the framework</div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {plugins.map((p) => (
              <div
                key={p.name}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand/40 hover:shadow-md hover:shadow-slate-200/60"
              >
                <div className="text-sm font-semibold text-slate-900">{p.label}</div>
                <code className="mt-1 block truncate font-mono text-[11px] text-slate-400">
                  roadmap-plugin-{p.name}
                </code>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-600">
            Each plugin declares its dependencies and the extension points it fills — so a
            pattern is just a resolved set of these tiles, pre-configured for a job.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── How it works ─────────────────────────── */

const steps = [
  { n: "1", title: "Start from the framework", body: "Download the bundle and launch. You get the framework plus a core set of plugins — no database, nothing to provision." },
  { n: "2", title: "Apply a pattern", body: "Install the plugins a pattern needs from the in-app registry, then apply its configuration — sources, AI providers, task prompts." },
  { n: "3", title: "Work, then serve over MCP", body: "Compose contexts and generate artifacts, and expose every context to Claude, Cursor or your IDE with one MCP tool call." },
];

function HowItWorks() {
  return (
    <section id="how" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="How it works" title="From framework to AI-ready in three steps" />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-slate-200 bg-white p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-base font-bold text-white">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Patterns teaser ─────────────────────────── */

function PatternsTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        kicker="Pattern language"
        title="Each way of working, named"
        sub="A pattern names a recurring way of working with AI — its context, problem and solution — and lists the plugins and configuration that realize it."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {patterns.slice(0, 3).map((p) => (
          <PatternCard key={p.slug} pattern={p} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/patterns"
          className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-white px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand-50"
        >
          Browse all patterns <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────── Video ─────────────────────────── */

function VideoSection() {
  return (
    <section id="demo" className="border-t border-slate-200 bg-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/40">
          <video className="block w-full" controls playsInline preload="metadata" poster="/promo-poster.png">
            <source src="/roadmap-pe-promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="mt-4 text-center text-sm text-slate-400">
          A quick tour: compose a context from plugins, preview it inline, and serve it to your AI over MCP.
        </p>
        <div className="mt-8 text-center">
          <a href={GITHUB_URL} className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline">
            Read the source on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
