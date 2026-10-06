import type { PageAnalysis } from "@/types/analysis";

export type ValidationIssue = {
  id: string;
  severity: "error" | "warning" | "info";
  message: string;
};

const schemaRecommendations: Record<string, string[]> = {
  Article: [
    "headline",
    "author",
    "datePublished",
    "image",
  ],

  Product: [
    "name",
    "image",
    "description",
  ],

  Organization: [
    "name",
    "url",
  ],

  WebSite: [
    "name",
    "url",
  ],

  WebPage: [
    "name",
    "url",
  ],

  Person: [
    "name",
  ],

  LocalBusiness: [
    "name",
    "address",
  ],
};

export function validateAnalysis(
  analysis: PageAnalysis,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  validateTitle(analysis, issues);
  validateDescription(analysis, issues);
  validateCanonical(analysis, issues);
  validateOpenGraph(analysis, issues);
  validateTwitter(analysis, issues);
  validateSchema(analysis, issues);

  return issues;
}

function validateTitle(
  analysis: PageAnalysis,
  issues: ValidationIssue[],
) {
  const title = analysis.seo.title.value;

  if (!analysis.seo.title.exists) {
    issues.push({
      id: "missing-title",
      severity: "error",
      message: "The page is missing a title.",
    });
    return;
  }

  if (!title) {
    return;
  }

  if (title.length < 30) {
    issues.push({
      id: "short-title",
      severity: "warning",
      message: `The title is only ${title.length} characters long.`,
    });
  }

  if (title.length > 60) {
    issues.push({
      id: "long-title",
      severity: "warning",
      message: `The title is ${title.length} characters long.`,
    });
  }
}

function validateDescription(
  analysis: PageAnalysis,
  issues: ValidationIssue[],
) {
  const description = analysis.seo.description.value;

  if (!analysis.seo.description.exists) {
    issues.push({
      id: "missing-description",
      severity: "warning",
      message: "The page is missing a meta description.",
    });
    return;
  }

  if (!description) {
    return;
  }

  if (description.length < 70) {
    issues.push({
      id: "short-description",
      severity: "info",
      message: `The meta description is only ${description.length} characters long.`,
    });
  }

  if (description.length > 160) {
    issues.push({
      id: "long-description",
      severity: "warning",
      message: `The meta description is ${description.length} characters long.`,
    });
  }
}

function validateCanonical(
  analysis: PageAnalysis,
  issues: ValidationIssue[],
) {
  const canonical = analysis.seo.canonical.value;

  if (!analysis.seo.canonical.exists) {
    issues.push({
      id: "missing-canonical",
      severity: "warning",
      message: "The page is missing a canonical URL.",
    });
    return;
  }

  if (!canonical) {
    return;
  }

  let canonicalUrl: URL;

  try {
    canonicalUrl = new URL(canonical, analysis.url);
  } catch {
    issues.push({
      id: "invalid-canonical",
      severity: "error",
      message: "The canonical URL is not valid.",
    });
    return;
  }

  const pageUrl = new URL(analysis.url);

  if (canonicalUrl.origin !== pageUrl.origin) {
    issues.push({
      id: "cross-origin-canonical",
      severity: "warning",
      message: "The canonical URL points to a different origin.",
    });
  }
}

function validateOpenGraph(
  analysis: PageAnalysis,
  issues: ValidationIssue[],
) {
  if (!analysis.openGraph.title.exists) {
    issues.push({
      id: "missing-og-title",
      severity: "warning",
      message: "The page is missing og:title.",
    });
  }

  if (!analysis.openGraph.description.exists) {
    issues.push({
      id: "missing-og-description",
      severity: "warning",
      message: "The page is missing og:description.",
    });
  }

  if (!analysis.openGraph.image.exists) {
    issues.push({
      id: "missing-og-image",
      severity: "warning",
      message: "The page is missing og:image.",
    });
  }

  const ogUrl = analysis.openGraph.url.value;

  if (!analysis.openGraph.url.exists) {
    issues.push({
      id: "missing-og-url",
      severity: "info",
      message: "The page is missing og:url.",
    });
    return;
  }

  if (!ogUrl) {
    return;
  }

  let parsedOgUrl: URL;

  try {
    parsedOgUrl = new URL(ogUrl, analysis.url);
  } catch {
    issues.push({
      id: "invalid-og-url",
      severity: "error",
      message: "The og:url value is not a valid URL.",
    });
    return;
  }

  const pageUrl = new URL(analysis.url);

  if (parsedOgUrl.origin !== pageUrl.origin) {
    issues.push({
      id: "cross-origin-og-url",
      severity: "warning",
      message: "The og:url points to a different origin.",
    });
  }
}

function validateTwitter(
  analysis: PageAnalysis,
  issues: ValidationIssue[],
) {
  if (!analysis.twitter.card.exists) {
    issues.push({
      id: "missing-twitter-card",
      severity: "info",
      message: "No Twitter Card type was found.",
    });
  }

  if (!analysis.twitter.title.exists && !analysis.openGraph.title.exists) {
    issues.push({
      id: "missing-twitter-title",
      severity: "info",
      message:
        "No Twitter/X title or Open Graph title was found.",
    });
  }

  if (
    !analysis.twitter.description.exists &&
    !analysis.openGraph.description.exists
  ) {
    issues.push({
      id: "missing-twitter-description",
      severity: "info",
      message:
        "No Twitter/X description or Open Graph description was found.",
    });
  }

  if (!analysis.twitter.image.exists && !analysis.openGraph.image.exists) {
    issues.push({
      id: "missing-twitter-image",
      severity: "info",
      message:
        "No Twitter/X image or Open Graph image was found.",
    });
  }
}

function validateSchema(
  analysis: PageAnalysis,
  issues: ValidationIssue[],
) {
  for (const [index, block] of analysis.schema.blocks.entries()) {
    if (!block.isValid) {
      continue;
    }

    if (
      block.raw &&
      typeof block.raw === "object" &&
      "@graph" in block.raw
    ) {
      validateSchemaGraph(
        (block.raw as Record<string, unknown>)["@graph"],
        index,
        issues,
      );
    }

    for (const entity of block.entities) {
      for (const type of entity.types) {
        const recommendedProperties = schemaRecommendations[type];

        if (!recommendedProperties) {
          continue;
        }

        for (const property of recommendedProperties) {
          const exists = entity.properties.some(
            (item) => item.name === property && item.exists,
          );

          if (!exists) {
            issues.push({
              id: `missing-schema-property-${type}-${property}`,
              severity: "info",
              message: `${type} schema does not include the recommended ${property} property.`,
            });
          }
        }
      }
    }
  }

  const types = new Set(analysis.schema.types);

  if (types.has("Article") && !types.has("BreadcrumbList")) {
    issues.push({
      id: "article-missing-breadcrumbs",
      severity: "info",
      message:
        "An Article schema was found, but no BreadcrumbList schema was detected.",
    });
  }

  if (
    (types.has("Product") || types.has("Service")) &&
    !types.has("BreadcrumbList")
  ) {
    issues.push({
      id: "product-missing-breadcrumbs",
      severity: "info",
      message:
        "A Product or Service schema was found, but no BreadcrumbList schema was detected.",
    });
  }

  if (
    types.has("Organization") &&
    !types.has("WebSite") &&
    !types.has("WebPage")
  ) {
    issues.push({
      id: "organization-missing-website-schema",
      severity: "info",
      message:
        "An Organization schema was found without a related WebSite or WebPage schema.",
    });
  }
}

function validateSchemaGraph(
  graph: unknown,
  index: number,
  issues: ValidationIssue[],
) {
  if (!Array.isArray(graph)) {
    issues.push({
      id: `invalid-schema-graph-${index}`,
      severity: "error",
      message: `JSON-LD block ${index + 1} has an invalid @graph.`,
    });

    return;
  }

  if (graph.length === 0) {
    issues.push({
      id: `empty-schema-graph-${index}`,
      severity: "warning",
      message: `JSON-LD block ${index + 1} contains an empty @graph.`,
    });

    return;
  }

  graph.forEach((item, itemIndex) => {
    if (!item || typeof item !== "object") {
      issues.push({
        id: `invalid-schema-graph-item-${index}-${itemIndex}`,
        severity: "error",
        message:
          `JSON-LD block ${index + 1} contains an invalid @graph item.`,
      });

      return;
    }

    const object = item as Record<string, unknown>;

    if (!object["@type"]) {
      issues.push({
        id: `missing-schema-graph-type-${index}-${itemIndex}`,
        severity: "warning",
        message:
          `JSON-LD block ${index + 1} contains a @graph item without @type.`,
      });
    }
  });
}