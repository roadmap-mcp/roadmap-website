import Link from "next/link";
import { SiteNav, SiteFooter, SectionHeading, GITHUB_URL } from "./_components/chrome";
import { patterns } from "./patterns/patterns";
import { PatternCard } from "./patterns/pattern-card";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <VideoSection />
        <PluginArchitecture />
        <Patterns />
        <HowItWorks />
        <LocalStrip />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(60rem_30rem_at_70%_-10%,#7aa7d6_0,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          A modular platform for building software with&nbsp;AI.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          Roadmap MCP is a plugin framework, not a fixed app. Compose the exact tools a
          workflow needs from swappable plugins — guided by a
          <strong className="text-white"> pattern language</strong> that names each way of
          working and the plugins and config that realize it.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="/patterns" className="rounded-lg bg-white px-6 py-3 font-medium text-brand transition hover:bg-slate-100">
            Explore the patterns
          </a>
          <a href="/download" className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10">
            Download
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Video ─────────────────────────── */

function VideoSection() {
  return (
    <section id="demo" className="bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-slate-900 shadow-2xl shadow-slate-900/25">
          <video
            className="block w-full"
            controls
            playsInline
            preload="metadata"
            poster="/promo-poster.png"
          >
            <source src="/roadmap-pe-promo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">
          A quick tour: compose a context from plugins, preview it inline, and serve it to your AI over MCP.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── Plugin architecture ─────────────────────────── */

const plugins: { name: string; label: string }[] = [
  { name: "context", label: "Contexts" },
  { name: "context-assistant", label: "Context Assistant" },
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
      <SectionHeading
        kicker="Architecture"
        title="Everything is a plugin"
        sub="A lightweight runtime discovers plugins at startup and wires them through typed extension points. An “edition” is nothing more than the framework plus the plugins you install — so you add, remove, or swap capabilities without forking the app."
      />

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
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

/* ─────────────────────────── Patterns ─────────────────────────── */

function Patterns() {
  return (
    <section id="patterns" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          kicker="Pattern language"
          title="A pattern language for AI-centered software development"
          sub="Each pattern names a recurring way of working with AI — its context, problem and solution — and lists the plugins and configuration that realize it. The patterns build on each other, starting from context composition."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {patterns.map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/patterns"
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-white px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand-50"
          >
            Browse all patterns
            <span aria-hidden>→</span>
          </Link>
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
    <section id="how" className="mx-auto max-w-6xl px-6 py-20">
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
    </section>
  );
}

/* ─────────────────────────── Local strip ─────────────────────────── */

function LocalStrip() {
  const items = [
    { k: "Runs locally", v: "Your code and docs never leave your machine." },
    { k: "Database-free", v: "Contexts are plain JSON files on disk." },
    { k: "Open source", v: "Self-hosted, inspectable, and extensible." },
    { k: "Bring your own AI", v: "Any provider — keys encrypted at rest with your password." },
  ];
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.k} className="bg-white p-7">
              <div className="text-base font-semibold text-brand">{i.k}</div>
              <div className="mt-1 text-sm text-slate-600">{i.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ─────────────────────────── */

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-3xl bg-brand px-8 py-16 text-center text-white">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Compose your own workbench.</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Self-hosted, open source, and ready in minutes. Start from the framework, apply a
          pattern, and bring your own AI provider.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/download" className="rounded-lg bg-white px-6 py-3 font-medium text-brand transition hover:bg-slate-100">
            Download
          </a>
          <a href={GITHUB_URL} className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10">
            Get it on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
