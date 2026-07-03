import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download · Roadmap Personal Edition",
  description:
    "Download the Roadmap Personal Edition bundle and run it locally. Database-free, open source, bring your own AI provider.",
};

const REPO = "roadmap-mcp/roadmap";
const RELEASES_PAGE = `https://github.com/${REPO}/releases`;

type GhAsset = { name: string; browser_download_url: string };
type GhRelease = {
  tag_name: string;
  name: string | null;
  prerelease: boolean;
  draft: boolean;
  assets: GhAsset[];
};

type Channel = { version: string; url: string } | null;

/** Resolve the stable + edge bundle downloads from the GitHub Releases API. */
async function resolveDownloads(): Promise<{ stable: Channel; edge: Channel }> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=20`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return { stable: null, edge: null };
    const releases: GhRelease[] = await res.json();

    const zip = (r: GhRelease) =>
      r.assets.find((a) => a.name.endsWith(".zip"))?.browser_download_url ?? null;

    const stableRel = releases.find((r) => !r.draft && !r.prerelease && zip(r));
    const edgeRel = releases.find((r) => !r.draft && r.tag_name === "edge" && zip(r));

    return {
      stable: stableRel ? { version: stableRel.tag_name, url: zip(stableRel)! } : null,
      edge: edgeRel ? { version: edgeRel.name ?? "edge", url: zip(edgeRel)! } : null,
    };
  } catch {
    return { stable: null, edge: null };
  }
}

export default async function DownloadPage() {
  const { stable, edge } = await resolveDownloads();

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

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <DownloadCard
              label="Stable"
              blurb="The recommended release."
              channel={stable}
              fallbackHref={`${RELEASES_PAGE}/latest`}
              primary
            />
            <DownloadCard
              label="Edge"
              blurb="Latest build from main — newest features, less battle-tested."
              channel={edge}
              fallbackHref={`${RELEASES_PAGE}/tag/edge`}
            />
          </div>

          <QuickStart />
          <PluginsNote />

          <p className="mt-12 text-sm text-slate-500">
            All releases and checksums live on{" "}
            <a href={RELEASES_PAGE} className="text-brand underline hover:no-underline">
              GitHub Releases
            </a>.
          </p>
        </section>
      </main>
      <BottomBar />
    </>
  );
}

function DownloadCard({
  label,
  blurb,
  channel,
  fallbackHref,
  primary,
}: {
  label: string;
  blurb: string;
  channel: Channel;
  fallbackHref: string;
  primary?: boolean;
}) {
  const href = channel?.url ?? fallbackHref;
  const version = channel?.version;
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-slate-900">{label}</span>
        {version && (
          <span className="rounded border border-slate-200 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500">
            {version}
          </span>
        )}
      </div>
      <p className="mt-1 flex-1 text-sm text-slate-600">{blurb}</p>
      <a
        href={href}
        className={
          "mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition " +
          (primary
            ? "bg-brand text-white hover:bg-brand-600"
            : "border border-slate-300 text-slate-800 hover:bg-slate-50")
        }
      >
        {channel ? "Download .zip" : "View on GitHub"}
      </a>
    </div>
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
          href={RELEASES_PAGE}
          className="ml-auto rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
        >
          GitHub Releases
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
