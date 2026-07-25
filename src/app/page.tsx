import type { ReactNode } from "react";
import { SiteNav, SiteFooter, GITHUB_URL } from "./_components/chrome";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Manifesto />
        <Audiences />
        <TrustBand />
        <CTA />
      </main>
      <SiteFooter />
    </>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* soft navy glow + faint grid, kept subtle */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70rem_40rem_at_50%_-20%,#1a3a5c_0,transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="relative mx-auto flex min-h-[82vh] max-w-5xl flex-col items-center justify-center px-6 py-28 text-center">
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
          AI you can
          <br />
          <span className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
            build on.
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          Reliable, inspectable AI tooling for the people who build business software.
          It runs on your machine, reasons from your sources, and hides nothing.
        </p>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/download"
            className="rounded-full bg-white px-7 py-3 text-base font-medium text-slate-900 transition hover:bg-slate-200"
          >
            Download
          </a>
          <a
            href="/architecture"
            className="rounded-full border border-white/25 px-7 py-3 text-base font-medium text-white transition hover:bg-white/10"
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Manifesto ─────────────────────────── */

function Manifesto() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-28 md:py-36">
        <p className="text-center text-2xl font-medium leading-[1.5] tracking-tight text-slate-900 sm:text-3xl md:text-[2.4rem] md:leading-[1.45]">
          Business software runs the world quietly — payroll, logistics, care, money.
          The people who build it <span className="text-slate-400">can&rsquo;t afford magic.</span>{" "}
          They need tools they can reason about, verify, and depend on.
        </p>
        <p className="mt-10 text-center text-2xl font-medium leading-[1.5] tracking-tight text-brand sm:text-3xl md:text-[2.4rem] md:leading-[1.45]">
          So we built AI the way infrastructure should be built: open, local, and honest.
          Not AI you hope works. AI you can build on.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── Audiences ─────────────────────────── */

function Audiences() {
  return (
    <section id="audiences">
      <AudienceBlock
        eyebrow="For developers"
        title="Give your AI the right context."
        body="Compose repo files, tickets, docs and notes into reusable, previewable contexts — then serve them to Claude, Cursor or your IDE over MCP with one tool call. Your assistant reasons from the truth, not a guess."
        href="/patterns/context-engineering"
        cta="Explore context engineering"
        tone="light"
        visual={<ContextVisual />}
      />
      <AudienceBlock
        eyebrow="For testers"
        title="Author tests by talking."
        body="Describe a flow and an AI drives a real browser — finding the tricky selectors, building reusable page-object components, and composing them into scenarios that run with a step-through report. End-to-end coverage, without the brittle busywork."
        href="/patterns/test-design"
        cta="See AI test design"
        tone="dark"
        reverse
        visual={<BrowserVisual />}
      />
      <AudienceBlock
        eyebrow="For architects & leaders"
        title="One brain for the whole team."
        body="Ingest your git history, docs, Confluence and Jira into a shared, on-disk knowledge base that feeds every context and role view — business analyst, architect, tester. It reads your sources; it never changes them."
        href="/patterns/company-brain"
        cta="Meet the Company Brain"
        tone="light"
        visual={<BrainVisual />}
      />
    </section>
  );
}

function AudienceBlock({
  eyebrow, title, body, href, cta, tone, reverse, visual,
}: {
  eyebrow: string; title: string; body: string; href: string; cta: string;
  tone: "light" | "dark"; reverse?: boolean; visual: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div className={dark ? "bg-slate-950 text-white" : "bg-white text-slate-900"}>
      <div
        className={`mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-24 md:py-28 lg:flex-row ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="flex-1">
          <div className={`text-sm font-semibold uppercase tracking-wider ${dark ? "text-sky-300" : "text-brand"}`}>
            {eyebrow}
          </div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
          <p className={`mt-5 max-w-xl text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
            {body}
          </p>
          <a
            href={href}
            className={`mt-8 inline-flex items-center gap-1.5 text-base font-medium underline-offset-4 hover:underline ${
              dark ? "text-sky-300" : "text-brand"
            }`}
          >
            {cta} <span aria-hidden>→</span>
          </a>
        </div>
        <div className="flex w-full flex-1 justify-center">{visual}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Audience visuals (CSS/SVG) ─────────────────────────── */

function VisualFrame({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border p-6 shadow-xl ${
        dark
          ? "border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 shadow-black/40"
          : "border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-slate-200/70"
      }`}
    >
      {children}
    </div>
  );
}

function ContextVisual() {
  const rows = ["repo · payments/service.py", "jira · PAY-1421", "confluence · Refund policy", "notes · edge cases"];
  return (
    <VisualFrame>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Context</div>
      <div className="mt-3 space-y-2">
        {rows.map((r) => (
          <div key={r} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand" />
            <code className="truncate font-mono text-xs text-slate-600">{r}</code>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand px-3 py-2 text-xs font-medium text-white">
        served to your AI over MCP
      </div>
    </VisualFrame>
  );
}

function BrowserVisual() {
  return (
    <VisualFrame dark>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <span className="ml-2 truncate font-mono text-[10px] text-slate-400">app.example.com/checkout</span>
        </div>
        <div className="space-y-2 p-4">
          <div className="h-2.5 w-2/3 rounded bg-white/15" />
          <div className="h-8 rounded-lg border border-sky-400/40 bg-sky-400/10" />
          <div className="flex gap-2">
            <div className="h-7 w-24 rounded-lg bg-sky-400/80" />
            <div className="h-7 w-16 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {[["✓", "click #login", "text-emerald-400"], ["✓", "type ${user}", "text-emerald-400"], ["…", "assert order total", "text-sky-300"]].map(
          ([m, s, c]) => (
            <div key={s} className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
              <span className={c}>{m}</span>
              <span className="truncate">{s}</span>
            </div>
          ),
        )}
      </div>
    </VisualFrame>
  );
}

function BrainVisual() {
  const nodes = [
    { cx: 90, cy: 60 }, { cx: 210, cy: 48 }, { cx: 300, cy: 110 },
    { cx: 70, cy: 170 }, { cx: 200, cy: 200 }, { cx: 320, cy: 200 },
  ];
  const center = { cx: 195, cy: 120 };
  return (
    <VisualFrame>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Company Brain</div>
      <svg viewBox="0 0 390 260" className="mt-1 h-full w-full">
        {nodes.map((n, i) => (
          <line key={i} x1={center.cx} y1={center.cy} x2={n.cx} y2={n.cy} stroke="#1a3a5c" strokeOpacity="0.25" strokeWidth="1.5" />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r="7" fill="#fff" stroke="#1a3a5c" strokeWidth="1.6" />
        ))}
        <circle cx={center.cx} cy={center.cy} r="16" fill="#1a3a5c" />
        <circle cx={center.cx} cy={center.cy} r="26" fill="none" stroke="#1a3a5c" strokeOpacity="0.2" strokeWidth="1.5" />
      </svg>
      <div className="mt-1 flex flex-wrap justify-center gap-1.5">
        {["git", "docs", "Confluence", "Jira"].map((s) => (
          <span key={s} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] text-slate-500">
            {s}
          </span>
        ))}
      </div>
    </VisualFrame>
  );
}

/* ─────────────────────────── Trust band ─────────────────────────── */

function TrustBand() {
  const items = [
    { k: "Runs locally", v: "Your code and docs never leave your machine." },
    { k: "Database-free", v: "Contexts are plain files on disk you can read." },
    { k: "Open source", v: "Self-hosted, inspectable, and extensible." },
    { k: "Bring your own AI", v: "Any provider — keys encrypted at rest with your password." },
  ];
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Local. Inspectable. Yours.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/70">
          Trust isn&rsquo;t a feature you bolt on. It&rsquo;s how the whole thing is built.
        </p>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.k} className="bg-brand p-7">
              <div className="text-base font-semibold">{i.k}</div>
              <div className="mt-1 text-sm text-white/70">{i.v}</div>
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
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Ready to build on it?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
          Self-hosted, open source, and ready in minutes. Bring your own AI provider.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a href="/download" className="rounded-full bg-brand px-7 py-3 text-base font-medium text-white transition hover:bg-brand-600">
            Download
          </a>
          <a href={GITHUB_URL} className="rounded-full border border-slate-300 px-7 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50">
            Get it on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
