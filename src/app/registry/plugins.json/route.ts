// Branded plugin-registry endpoint: https://roadmap-mcp.com/registry/plugins.json
//
// Proxies the `registry.json` published as a GitHub Release asset by the roadmap
// build pipeline (prefer the latest stable release, fall back to the rolling `edge`
// prerelease). This gives a stable, branded URL the app points at, without committing
// binaries or cross-pushing into this repo. The upstream fetch is cached for an hour.
//
// Route Handlers are not cached by default in Next 16; we cache the upstream fetch via
// `next: { revalidate }` instead. See node_modules/next/dist/docs/.../route-handlers.md.

const REPO = "roadmap-mcp/roadmap";
const SOURCES = [
  `https://github.com/${REPO}/releases/latest/download/registry.json`,
  `https://github.com/${REPO}/releases/download/edge/registry.json`,
];

const REVALIDATE_SECONDS = 3600;

export async function GET() {
  for (const url of SOURCES) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (!res.ok) continue;
      const data = await res.json();
      return Response.json(data, {
        headers: {
          "Cache-Control": `public, max-age=${REVALIDATE_SECONDS}, s-maxage=${REVALIDATE_SECONDS}`,
        },
      });
    } catch {
      // try the next source
    }
  }
  return Response.json(
    { error: "Plugin registry is not available yet.", plugins: [] },
    { status: 502 },
  );
}
