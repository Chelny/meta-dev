import { validateAnalysis } from "@/lib/validation";
import type { PageAnalysis } from "@/types/analysis";

export type AnalysisScore = {
  overall: number;
  seo: number;
  social: number;
  schema: number;
  technical: number;
};

export type ScoreRating =
  | "excellent"
  | "good"
  | "needs-improvement"
  | "poor";

const penalties: Record<string, number> = {
  // SEO
  "missing-title": 10,
  "short-title": 2,
  "long-title": 2,
  "missing-description": 7,
  "short-description": 1,
  "long-description": 2,
  "missing-canonical": 5,
  "invalid-canonical": 5,
  "cross-origin-canonical": 2,

  // Social
  "missing-og-title": 4,
  "missing-og-description": 4,
  "missing-og-image": 6,
  "missing-og-url": 2,
  "invalid-og-url": 2,
  "cross-origin-og-url": 1,
  "missing-twitter-card": 2,
  "missing-twitter-title": 1,
  "missing-twitter-description": 1,
  "missing-twitter-image": 1,

  // Schema
  "article-missing-breadcrumbs": 1,
  "product-missing-breadcrumbs": 1,
  "organization-missing-website-schema": 1,
};

export function calculateScore(
  analysis: PageAnalysis,
): AnalysisScore {
  const issues = validateAnalysis(analysis);

  let seo = 40;
  let social = 30;
  let schema = 20;

  for (const issue of issues) {
    const penalty = getPenalty(issue.id, issue.severity);

    if (isSeoIssue(issue.id)) {
      seo -= penalty;
    }

    if (isSocialIssue(issue.id)) {
      social -= penalty;
    }

    if (isSchemaIssue(issue.id)) {
      schema -= penalty;
    }
  }

  const technical = calculateTechnicalScore(analysis);

  seo = Math.max(0, seo);
  social = Math.max(0, social);
  schema = Math.max(0, schema);

  const overall = Math.round(
    seo + social + schema + technical,
  );

  return {
    overall,
    seo,
    social,
    schema,
    technical,
  };
}

function getPenalty(
  id: string,
  severity: string,
): number {
  const basePenalty =
    penalties[id] ??
    (id.startsWith("invalid-schema-") ||
      id.startsWith("missing-schema-") ||
      id.startsWith("empty-schema-")
      ? 2
      : 0);

  if (severity === "error") {
    return basePenalty;
  }

  if (severity === "warning") {
    return Math.ceil(basePenalty * 0.6);
  }

  return Math.ceil(basePenalty * 0.25);
}

function isSeoIssue(id: string): boolean {
  return [
    "missing-title",
    "short-title",
    "long-title",
    "missing-description",
    "short-description",
    "long-description",
    "missing-canonical",
    "invalid-canonical",
    "cross-origin-canonical",
  ].includes(id);
}

function isSocialIssue(id: string): boolean {
  return [
    "missing-og-title",
    "missing-og-description",
    "missing-og-image",
    "missing-og-url",
    "invalid-og-url",
    "cross-origin-og-url",
    "missing-twitter-card",
    "missing-twitter-title",
    "missing-twitter-description",
    "missing-twitter-image",
  ].includes(id);
}

function isSchemaIssue(id: string): boolean {
  return (
    id.startsWith("invalid-schema-") ||
    id.startsWith("missing-schema-") ||
    id.startsWith("empty-schema-") ||
    id === "article-missing-breadcrumbs" ||
    id === "product-missing-breadcrumbs" ||
    id === "organization-missing-website-schema"
  );
}

function calculateTechnicalScore(
  analysis: PageAnalysis,
): number {
  let score = 10;

  if (
    analysis.technical.status < 200 ||
    analysis.technical.status >= 400
  ) {
    score -= 5;
  }

  if (
    !analysis.technical.contentType ||
    !analysis.technical.contentType
      .toLowerCase()
      .includes("text/html")
  ) {
    score -= 5;
  }

  return Math.max(0, score);
}

export function getScoreRating(score: number): ScoreRating {
  if (score >= 90) {
    return "excellent";
  }

  if (score >= 75) {
    return "good";
  }

  if (score >= 50) {
    return "needs-improvement";
  }

  return "poor";
}