import type { ReactNode } from "react";

export const GITHUB_URL = "https://github.com/roadmap-mcp/roadmap";

/** The Roadmap MCP mark. */
export function Logo({ className }: { className?: string }) {
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

/**
 * Sticky top bar shared across pages. Section links point at the home page
 * (`/#…`) so they work from anywhere; "Patterns" is its own page.
 */
export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <a href="/" className="flex items-center gap-2 font-semibold text-brand">
          <Logo className="h-6 w-6" />
          <span className="text-lg">Roadmap MCP</span>
        </a>
        <div className="ml-auto hidden items-center gap-7 text-sm text-slate-600 md:flex">
          <a href="/#architecture" className="hover:text-brand">Architecture</a>
          <a href="/patterns" className="hover:text-brand">Patterns</a>
          <a href="/#how" className="hover:text-brand">How it works</a>
        </div>
        <a
          href="/download"
          className="ml-auto rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 md:ml-0"
        >
          Download
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo className="h-5 w-5 text-brand" />
          <span>Roadmap MCP</span>
        </div>
        <div className="flex items-center gap-6">
          <a href={GITHUB_URL} className="hover:text-brand">GitHub</a>
          <a href="/#architecture" className="hover:text-brand">Architecture</a>
          <a href="/patterns" className="hover:text-brand">Patterns</a>
        </div>
        <div>© {new Date().getFullYear()} Roadmap MCP</div>
      </div>
    </footer>
  );
}

/** Centered section heading with a kicker and optional sub-paragraph. */
export function SectionHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-sm font-semibold uppercase tracking-wider text-brand">{kicker}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-slate-600">{sub}</p>}
    </div>
  );
}

export function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
      <span className="h-px w-8 bg-slate-300" />
      {children}
    </h3>
  );
}
