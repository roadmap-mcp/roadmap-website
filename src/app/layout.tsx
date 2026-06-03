import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roadmap · Personal Edition — context, ready for any AI",
  description:
    "Assemble Confluence pages, Jira issues, files and notes into reusable contexts, preview them inline, and serve them to Claude, Cursor or your IDE over MCP. Database-free and runs locally.",
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
