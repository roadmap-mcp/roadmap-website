import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roadmap MCP — AI you can build on",
  description:
    "Reliable, inspectable AI tooling for the people who build business software. Context for AI assistants, AI-assisted end-to-end test design, and a shared Company Brain — open source, runs locally, database-free.",
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
