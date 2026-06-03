import type { ReactNode } from "react";

const GITHUB_URL = "https://github.com/b2it/roadmap-pe";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <VideoSection />
        <Features />
        <HowItWorks />
        <LocalStrip />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ─────────────────────────── Nav ─────────────────────────── */

function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <a href="#" className="flex items-center gap-2 font-semibold text-brand">
          <Logo className="h-6 w-6" />
          <span className="text-lg">Roadmap</span>
          <span className="rounded border border-brand/30 px-1.5 py-0.5 text-[11px] font-semibold text-brand/80">
            Personal
          </span>
        </a>
        <div className="ml-auto hidden items-center gap-7 text-sm text-slate-600 md:flex">
          <a href="#demo" className="hover:text-brand">Demo</a>
          <a href="#features" className="hover:text-brand">Features</a>
          <a href="#how" className="hover:text-brand">How it works</a>
        </div>
        <a
          href={GITHUB_URL}
          className="ml-auto rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 md:ml-0"
        >
          Get it on GitHub
        </a>
      </nav>
    </header>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(60rem_30rem_at_70%_-10%,#7aa7d6_0,transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Database-free · runs locally · open source
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Your contexts, ready for any&nbsp;AI.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          Assemble Confluence pages, Jira issues, repo files and notes into reusable
          <strong className="text-white"> contexts</strong>. Preview them inline, then serve any
          context to Claude, Cursor or your IDE over <strong className="text-white">MCP</strong>.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#demo" className="rounded-lg bg-white px-6 py-3 font-medium text-brand transition hover:bg-slate-100">
            Watch the 45s demo
          </a>
          <a href={GITHUB_URL} className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10">
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Video ─────────────────────────── */

function VideoSection() {
  return (
    <section id="demo" className="mx-auto -mt-12 max-w-5xl px-6 pb-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-2xl shadow-slate-900/20">
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
      <p className="mt-3 text-center text-sm text-slate-500">
        A quick tour: build a context, preview it inline, and hand it to your AI over MCP.
      </p>
    </section>
  );
}

/* ─────────────────────────── Features ─────────────────────────── */

const features: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <IconList />,
    title: "Contexts",
    body: "Group repo files, tickets, docs and instructions into reusable, shareable contexts — with mixins and a live preview.",
  },
  {
    icon: <IconLink />,
    title: "Confluence & Jira",
    body: "Pull Confluence pages and Jira issues straight into a context. Pages are rendered to clean, LLM-friendly markdown.",
  },
  {
    icon: <IconDoc />,
    title: "Inline file viewer",
    body: "Browse scratch and repo files in-app — markdown, images, and PlantUML diagrams rendered right there.",
  },
  {
    icon: <IconMic />,
    title: "Voice input",
    body: "Dictate notes and instructions with built-in Whisper speech-to-text, with optional AI clean-up.",
  },
  {
    icon: <IconSpark />,
    title: "AI assistant",
    body: "An assistant on every context proposes items, tags and structure from a plain-language description.",
  },
  {
    icon: <IconPlug />,
    title: "MCP server",
    body: "Every context is exposed over MCP, so Claude, Cursor or your IDE can read it with first-class tools.",
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading kicker="Features" title="Everything around contexts — nothing you don't need" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg hover:shadow-slate-200/60">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
              {f.icon}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── How it works ─────────────────────────── */

const steps = [
  { n: "1", title: "Build a context", body: "Add Confluence pages, Jira issues, repo files, URLs and notes — or let the assistant draft it for you." },
  { n: "2", title: "Preview inline", body: "See the fully rendered context, browse scratch files and PlantUML diagrams, and refine until it's right." },
  { n: "3", title: "Hand it to your AI", body: "Point Claude, Cursor or your IDE at the MCP server and pull the context with one tool call." },
];

function HowItWorks() {
  return (
    <section id="how" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="How it works" title="From scattered docs to AI-ready context in three steps" />
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

/* ─────────────────────────── Local strip ─────────────────────────── */

function LocalStrip() {
  const items = [
    { k: "No database", v: "Contexts are plain JSON files on disk." },
    { k: "Runs locally", v: "Your code and docs never leave your machine." },
    { k: "Encrypted secrets", v: "API keys encrypted at rest with your password." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.k} className="bg-white p-7">
            <div className="text-base font-semibold text-brand">{i.k}</div>
            <div className="mt-1 text-sm text-slate-600">{i.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ─────────────────────────── */

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="rounded-3xl bg-brand px-8 py-16 text-center text-white">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your context, anywhere you code.</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Self-hosted, open source, and ready in minutes. Bring your own AI provider.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={GITHUB_URL} className="rounded-lg bg-white px-6 py-3 font-medium text-brand transition hover:bg-slate-100">
            Get it on GitHub
          </a>
          <a href="#demo" className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10">
            Watch the demo
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Footer ─────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo className="h-5 w-5 text-brand" />
          <span>Roadmap · Personal Edition</span>
        </div>
        <div className="flex items-center gap-6">
          <a href={GITHUB_URL} className="hover:text-brand">GitHub</a>
          <a href="#features" className="hover:text-brand">Features</a>
          <a href="#demo" className="hover:text-brand">Demo</a>
        </div>
        <div>© {new Date().getFullYear()} Roadmap</div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── Bits ─────────────────────────── */

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-sm font-semibold uppercase tracking-wider text-brand">{kicker}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
    </div>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6 L12 12 L18 6 M12 12 L12 20" />
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="12" cy="20" r="2.2" />
    </svg>
  );
}

const ico = "h-5 w-5";
function IconList() {
  return <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
}
function IconLink() {
  return <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>;
}
function IconDoc() {
  return <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h6" /></svg>;
}
function IconMic() {
  return <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>;
}
function IconSpark() {
  return <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>;
}
function IconPlug() {
  return <svg className={ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0zM12 16v5" /></svg>;
}
