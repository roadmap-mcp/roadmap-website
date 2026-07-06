// Branded plugin-registry endpoint: https://roadmap-mcp.com/registry/plugins.json
//
// Proxies `registry.json` from the public distribution repo (roadmap-dist), giving a
// stable, branded URL the app can point at. The upstream fetch is cached for an hour.
//
// Route Handlers are not cached by default in Next 16; we cache the upstream fetch via
// `next: { revalidate }` instead. See node_modules/next/dist/docs/.../route-handlers.md.

const REGISTRY_SOURCE =
  "https://raw.githubusercontent.com/roadmap-mcp/roadmap-dist/main/registry.json";

const REVALIDATE_SECONDS = 3600;

export async function GET() {
  try {
    const res = await fetch(REGISTRY_SOURCE, {
      redirect: "follow",
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (res.ok) {
      const data = await res.json();
      return Response.json(data, {
        headers: {
          "Cache-Control": `public, max-age=${REVALIDATE_SECONDS}, s-maxage=${REVALIDATE_SECONDS}`,
        },
      });
    }
  } catch {
    // fall through
  }
  return Response.json(
    { error: "Plugin registry is not available yet.", plugins: [] },
    { status: 502 },
  );
}
