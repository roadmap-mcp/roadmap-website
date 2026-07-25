# Roadmap MCP — Website

Marketing landing page for **Roadmap MCP**, a modular plugin platform for AI-centered
software engineering, built with **Next.js 16 (App Router) + Tailwind CSS v4**.
Single-page technical-startup layout: hero, embedded promo video, plugin
architecture, recipes (the pattern language), how-it-works, and CTAs.

The promo video (`public/roadmap-pe-promo.mp4`, rendered by the `roadmap-pe-promo`
project) is embedded with a native `<video>` player and a poster frame
(`public/promo-poster.png`).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & run

```bash
npm run build
npm start
```

## Structure

```
src/app/
  layout.tsx     # metadata + root layout
  page.tsx       # the full landing page (nav, hero, video, architecture, recipes, how-it-works, CTA, footer)
  download/      # /download page + /registry/plugins.json proxy
  globals.css    # Tailwind v4 + brand theme tokens (navy #1a3a5c)
public/
  roadmap-pe-promo.mp4   # embedded promo video
  promo-poster.png       # video poster frame
```

Deploys cleanly to any Next.js host (e.g. Vercel). To swap the video, replace the
file in `public/` (and update `promo-poster.png`).
