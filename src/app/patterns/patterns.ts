/**
 * The Roadmap MCP pattern language.
 *
 * Each entry follows the classic pattern form — Name, Context, "Consider first",
 * Problem, Solution, "Consider next" — and adds the concrete plugins + config that
 * realize the pattern in Roadmap MCP. Cross-references are by `slug`.
 */

export type PatternKind = "Pattern" | "Role";

export interface Pattern {
  /** URL segment + DOM id (kebab-case). */
  slug: string;
  /** PascalCase pattern name, as used in a pattern language ("ChocolateChipRatio"). */
  name: string;
  /** Human-readable title for headings and cards. */
  title: string;
  kind: PatternKind;
  /** One-line summary for cards and lists. */
  tagline: string;
  context: string;
  problem: string;
  solution: string;
  /** Slugs of patterns to consider before this one. */
  considerFirst: string[];
  /** Slugs of patterns to consider after this one. */
  considerNext: string[];
  /** Plugin short-names the pattern composes. */
  plugins: string[];
  /** The configuration the pattern applies. */
  config: string;
}

export const patterns: Pattern[] = [
  {
    slug: "context-engineering",
    name: "ContextEngineering",
    title: "Context Engineering",
    kind: "Pattern",
    tagline: "Compose scattered knowledge into reusable, previewable contexts.",
    context:
      "You are assembling the information an AI needs to work on a real task — spread across repo files, tickets, documentation and notes — and you want it reusable, not re-gathered from scratch every session.",
    problem:
      "How do you give an AI the right, complete context for a task without hand-pasting it every time, and without burying the model in irrelevant material?",
    solution:
      "Model context as a first-class, named artifact. Group the relevant items — repo files, Confluence pages, Jira issues, instructions, scratch notes — into a context, with mixins for fragments shared across contexts. Preview it inline to see exactly what the model will read, and serve it over MCP so any AI pulls the same curated context with a single tool call.",
    considerFirst: [],
    considerNext: ["source-enrichment", "ai-assisted-roundtrip"],
    plugins: ["context", "context-assistant", "scratchdir", "fileviewer"],
    config: "Context item types, mixins, live inline preview.",
  },
  {
    slug: "source-enrichment",
    name: "SourceEnrichment",
    title: "Source Enrichment & Augmentation",
    kind: "Pattern",
    tagline: "Pull living sources into a clean, AI-ready knowledge base.",
    context:
      "Your knowledge lives in systems of record — git history, Confluence, Jira — that speak their own formats, change continuously, and are noisy for a language model to read directly.",
    problem:
      "How do you turn continuously-changing operational sources into clean, current, LLM-friendly material an AI can actually reason over?",
    solution:
      "Connect the sources and render them down at the point of use: Confluence pages and Jira issues stripped to their substance as markdown, git commits summarized, repo files browsable inline. Enrich each item with the metadata and tags that make it findable, then fold it into a context — so augmentation is a step in composition, not a separate pipeline to maintain.",
    considerFirst: ["context-engineering"],
    considerNext: ["ai-assisted-roundtrip"],
    plugins: ["jira", "context", "ai"],
    config: "Atlassian connection, Git Repos, AI providers.",
  },
  {
    slug: "ai-assisted-roundtrip",
    name: "AiAssistedRoundtrip",
    title: "AI-Assisted Roundtrip",
    kind: "Pattern",
    tagline: "Generate, review and refine artifacts in a grounded loop.",
    context:
      "You have an AI-ready context and want the AI to produce an artifact — a spec, a test plan, a design — that you will review and improve, rather than accept blindly.",
    problem:
      "How do you get from raw context to a trustworthy artifact without a one-shot, black-box generation you can neither verify nor iterate on?",
    solution:
      "Make generation a roundtrip. Capture intent (typed or dictated), let a configured AI task draft the artifact from the context, review and correct it, then fold the result back into the context as a new item that grounds the next pass. Each loop tightens the artifact and enriches the context it came from.",
    considerFirst: ["context-engineering", "source-enrichment"],
    considerNext: ["test-design"],
    plugins: ["ai", "context-assistant", "whisper"],
    config: "Per-artifact AI tasks, Whisper post-processing.",
  },
  {
    slug: "test-design",
    name: "TestDesignByConversation",
    title: "AI-Assisted Test Design",
    kind: "Pattern",
    tagline: "Build and run end-to-end web tests by talking to an AI that drives a live browser.",
    context:
      "You need automated end-to-end tests for a web application, but authoring them by hand is slow and brittle. The selectors are the hard part, and the same fragments — a cookie dialog, a header menu, a data table — recur across pages and get re-implemented in every test.",
    problem:
      "How do you author reliable, reusable UI tests without hand-writing selectors and rebuilding the same page interactions again and again?",
    solution:
      "Design tests by conversation. An AI drives a real (headless) browser, sees the live page and its interactive elements — extracting robust selectors for you — and performs your instructions, recording each action. It groups actions into reusable page-object components (a cookie popup, a login, a table) that nest and compose, then assembles them into scenarios. Scenarios run headless with a step-through report — per-step status, captured field values and screenshots — and can be pinned into a context or invoked over MCP.",
    considerFirst: ["context-engineering", "ai-assisted-roundtrip"],
    considerNext: [],
    plugins: ["e2e", "e2e-selenium", "e2e-assistant", "ai"],
    config: "Selenium driver, the webtest_design AI task, sites → components → scenarios → runs.",
  },
];

export function getPattern(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug);
}
