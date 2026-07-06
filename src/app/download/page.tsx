import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download · Roadmap Personal Edition",
  description:
    "Download the Roadmap Personal Edition bundle and run it locally. Database-free, open source, bring your own AI provider.",
};

// Public distribution repo (roadmap-dist): the installer + plugin registry live here.
const DIST_REPO = "https://github.com/roadmap-mcp/roadmap-dist";
const INSTALLER_URL =
  "https://raw.githubusercontent.com/roadmap-mcp/roadmap-dist/main/install/roadmap-pe.zip";

export default function DownloadPage() {
  return (
    <>
      <TopBar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-brand">Download</div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            Run Roadmap on your machine
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            A single bundle: the app, its plugins, and a one-command launcher. Database-free
            and fully local. Requires <strong className="text-slate-900">Python&nbsp;3.13+</strong>.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={INSTALLER_URL}
              className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              Download installer (.zip)
            </a>
            <a
              href={DIST_REPO}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
            >
              All downloads on GitHub
            </a>
          </div>

          <QuickStart />
          <PluginsNote />
        </section>
      </main>
      <BottomBar />
    </>
  );
}

function QuickStart() {
  const steps = [
    ["Unzip", "Extract the bundle anywhere on your machine."],
    ["Run", "Windows: double-click start.bat. macOS/Linux: bash start.sh."],
    ["Open", "The app starts at http://localhost:8090. First run sets up a local environment."],
  ];
  return (
    <div className="mt-14">
      <h2 className="text-xl font-semibold text-slate-900">Quick start</h2>
      <ol className="mt-5 space-y-4">
        {steps.map(([t, b], i) => (
          <li key={t} className="flex gap-4">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              {i + 1}
            </span>
            <div>
              <div className="font-semibold text-slate-900">{t}</div>
              <div className="text-sm text-slate-600">{b}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PluginsNote() {
  return (
    <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-lg font-semibold text-slate-900">Plugins</h2>
      <p className="mt-2 text-sm text-slate-600">
        The bundle ships with the core plugins (Contexts, Atlassian, AI, File Viewers,
        Whisper). More can be installed from the plugin registry inside the app under{" "}
        <span className="font-medium text-slate-800">Settings → Admin</span>. The registry
        index is served at{" "}
        <a href="/registry/plugins.json" className="text-brand underline hover:no-underline">
          /registry/plugins.json
        </a>.
      </p>
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <a href="/" className="flex items-center gap-2 font-semibold text-brand">
          <span className="text-lg">Roadmap</span>
          <span className="rounded border border-brand/30 px-1.5 py-0.5 text-[11px] font-semibold text-brand/80">
            Personal
          </span>
        </a>
        <a
          href={DIST_REPO}
          className="ml-auto rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
        >
          Downloads on GitHub
        </a>
      </nav>
    </header>
  );
}

function BottomBar() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-slate-500">
        <a href="/" className="hover:text-brand">← Back to home</a>
        <span>© {new Date().getFullYear()} Roadmap</span>
      </div>
    </footer>
  );
}
