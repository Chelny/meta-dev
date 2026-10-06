import { validateAnalysis } from "@/lib/validation";
import type { PageAnalysis } from "@/types/analysis";
import type { Suggestion } from "@/types/suggestions";

export function generateSuggestions(
  analysis: PageAnalysis,
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  const issues = validateAnalysis(analysis);

  for (const issue of issues) {
    suggestions.push({
      id: issue.id,
      severity: issue.severity,
      title: getSuggestionTitle(issue.id),
      description: issue.message,
      recommendation: getRecommendation(issue.id),
    });
  }

  return suggestions;
}

function getSuggestionTitle(id: string): string {
  const titles: Record<string, string> = {
    "missing-title": "Missing page title",
    "short-title": "Page title may be too short",
    "long-title": "Page title may be too long",
    "missing-description": "Missing meta description",
    "short-description": "Meta description may be too short",
    "long-description": "Meta description may be too long",
    "missing-canonical": "Missing canonical URL",
    "invalid-canonical": "Invalid canonical URL",
    "cross-origin-canonical": "Canonical URL points to a different origin",

    "missing-og-title": "Missing Open Graph title",
    "missing-og-description": "Missing Open Graph description",
    "missing-og-image": "Missing Open Graph image",
    "missing-og-url": "Missing Open Graph URL",
    "invalid-og-url": "Invalid Open Graph URL",
    "cross-origin-og-url": "Open Graph URL points to another origin",

    "missing-twitter-card": "Missing Twitter Card",
    "missing-twitter-title": "Missing social title",
    "missing-twitter-description": "Missing social description",
    "missing-twitter-image": "Missing social image",

    "missing-schema": "No structured data detected",
    "article-missing-breadcrumbs": "Consider adding BreadcrumbList",
    "product-missing-breadcrumbs": "Consider adding BreadcrumbList",
    "organization-missing-website-schema": "Consider adding WebSite or WebPage",
  };

  if (titles[id]) {
    return titles[id];
  }

  if (id.startsWith("invalid-schema-")) {
    return "Invalid JSON-LD";
  }

  if (id.startsWith("missing-schema-context-")) {
    return "Missing Schema.org context";
  }

  if (id.startsWith("missing-schema-type-")) {
    return "Missing Schema.org type";
  }

  if (id.startsWith("invalid-schema-graph-")) {
    return "Invalid Schema.org graph";
  }

  if (id.startsWith("empty-schema-graph-")) {
    return "Empty Schema.org graph";
  }

  if (id.startsWith("invalid-schema-graph-item-")) {
    return "Invalid Schema.org graph item";
  }

  if (id.startsWith("missing-schema-graph-type-")) {
    return "Missing Schema.org graph type";
  }

  if (id.startsWith("missing-schema-property-")) {
    return "Missing Schema.org property";
  }

  return "Metadata issue detected";
}

function getRecommendation(id: string): string {
  const recommendations: Record<string, string> = {
    "missing-title":
      "Add a descriptive <title> element that clearly identifies the page.",

    "short-title":
      "Consider using a more descriptive title that clearly communicates the page's purpose.",

    "long-title":
      "Consider shortening the title so the most important information appears clearly in search results.",

    "missing-description":
      "Add a concise meta description that summarizes the page content.",

    "short-description":
      "Consider expanding the description to provide a clearer summary of the page.",

    "long-description":
      "Consider shortening the description so the most important information is easier to display in search results.",

    "missing-canonical":
      "Add a canonical link to indicate the preferred URL for this page.",

    "invalid-canonical":
      "Make sure the canonical link contains a valid URL.",

    "cross-origin-canonical":
      "Verify that the cross-origin canonical is intentional and points to the preferred version of the page.",

    "missing-og-title":
      "Add og:title so social platforms can display a specific title when the page is shared.",

    "missing-og-description":
      "Add og:description to control the description shown in social previews.",

    "missing-og-image":
      "Add an Open Graph image to create a richer social sharing preview.",

    "missing-og-url":
      "Add og:url to identify the preferred URL for social sharing.",

    "invalid-og-url":
      "Make sure og:url contains a valid URL.",

    "cross-origin-og-url":
      "Verify that the cross-origin og:url is intentional and points to the correct page.",

    "missing-twitter-card":
      "Add a Twitter Card type such as summary_large_image for richer X previews.",

    "missing-twitter-title":
      "Add either twitter:title or og:title so X can display a title when the page is shared.",

    "missing-twitter-description":
      "Add either twitter:description or og:description so X can display a description when the page is shared.",

    "missing-twitter-image":
      "Add either twitter:image or og:image to provide a visual preview when the page is shared.",

    "article-missing-breadcrumbs":
      "Consider adding BreadcrumbList structured data to describe the page's position within the site's hierarchy.",

    "product-missing-breadcrumbs":
      "Consider adding BreadcrumbList structured data to describe the product or service page's position within the site's hierarchy.",

    "organization-missing-website-schema":
      "Consider adding WebSite or WebPage structured data to provide additional context about the organization and its pages.",
  };

  if (id.startsWith("invalid-schema-")) {
    return "Fix the JSON-LD syntax and make sure the structured data contains valid JSON.";
  }

  if (id.startsWith("missing-schema-context-")) {
    return "Add an @context value such as https://schema.org to define the vocabulary being used.";
  }

  if (id.startsWith("missing-schema-type-")) {
    return "Add an appropriate @type such as WebSite, Organization, Article, Product, or another relevant Schema.org type.";
  }

  if (id.startsWith("invalid-schema-graph-")) {
    return "Make sure @graph contains an array of valid Schema.org objects.";
  }

  if (id.startsWith("empty-schema-graph-")) {
    return "Add at least one Schema.org object to the @graph.";
  }

  if (id.startsWith("invalid-schema-graph-item-")) {
    return "Make sure every @graph item is a valid JSON-LD object.";
  }

  if (id.startsWith("missing-schema-graph-type-")) {
    return "Add an appropriate @type to each object inside @graph.";
  }

  if (id.startsWith("missing-schema-property-")) {
    return "Consider adding this property to provide more complete structured data for the page.";
  }

  return (
    recommendations[id] ??
    "Review this metadata and make sure it accurately represents the page."
  );
}