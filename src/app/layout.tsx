import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roadmap MCP — a modular plugin platform for AI-centered software engineering",
  description:
    "Roadmap MCP is a plugin framework for building software with AI. Compose the tools a role or workflow needs from swappable plugins, or apply a recipe — a curated bundle of plugins and config. Open source, runs locally, database-free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900">{children}</body>
    </html>
  );
}
