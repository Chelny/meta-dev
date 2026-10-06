import { describe, expect, it } from "vitest";
import { analyzeHtml } from "@/lib/analyzer";
import { validateAnalysis } from "@/lib/validation";

const technical = {
  status: 200,
  contentType: "text/html",
  contentLength: "1000",
};

const url = "https://example.com";

function validate(html: string) {
  const analysis = analyzeHtml(html, technical, url);
  return validateAnalysis(analysis);
}

describe("validateAnalysis", () => {
  it("should report a missing title", () => {
    const issues = validate("<html><head></head></html>");

    expect(issues).toContainEqual({
      id: "missing-title",
      severity: "error",
      message: "The page is missing a title.",
    });
  });

  it("should warn about a short title", () => {
    const issues = validate(`
      <title>Short title</title>
    `);

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "short-title",
        severity: "warning",
      }),
    );
  });

  it("should warn about a long title", () => {
    const title = "A".repeat(61);

    const issues = validate(`
      <title>${title}</title>
    `);

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "long-title",
        severity: "warning",
      }),
    );
  });

  it("should report a missing meta description", () => {
    const issues = validate(`
      <title>This is a perfectly reasonable page title here</title>
    `);

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "missing-description",
        severity: "warning",
      }),
    );
  });

  it("should report an invalid canonical URL", () => {
    const issues = validate(`
    <title>This is a perfectly reasonable page title here</title>
    <link rel="canonical" href="http://[invalid" />
  `);

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "invalid-canonical",
        severity: "error",
      }),
    );
  });

  it("should report a cross-origin canonical URL", () => {
    const issues = validate(`
      <title>This is a perfectly reasonable page title here</title>
      <link rel="canonical" href="https://other.com/page" />
    `);

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "cross-origin-canonical",
        severity: "warning",
      }),
    );
  });

  it("should report missing Open Graph metadata", () => {
    const issues = validate(`
      <title>This is a perfectly reasonable page title here</title>
    `);

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "missing-og-title",
        severity: "warning",
      }),
    );

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "missing-og-description",
        severity: "warning",
      }),
    );

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "missing-og-image",
        severity: "warning",
      }),
    );
  });

  it("should not report Twitter title when Open Graph title exists", () => {
    const issues = validate(`
      <title>This is a perfectly reasonable page title here</title>

      <meta property="og:title" content="OG title" />
    `);

    expect(issues).not.toContainEqual(
      expect.objectContaining({
        id: "missing-twitter-title",
      }),
    );
  });

  it("should detect missing recommended Article properties", () => {
    const issues = validate(`
      <title>This is a perfectly reasonable page title here</title>

      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Article"
        }
      </script>
    `);

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "missing-schema-property-Article-headline",
      }),
    );

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "missing-schema-property-Article-author",
      }),
    );
  });

  it("should report an Article without BreadcrumbList", () => {
    const issues = validate(`
      <title>This is a perfectly reasonable page title here</title>

      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Test article"
        }
      </script>
    `);

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "article-missing-breadcrumbs",
      }),
    );
  });

  it("should validate @graph items", () => {
    const issues = validate(`
      <title>This is a perfectly reasonable page title here</title>

      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article"
            },
            {
              "name": "Missing type"
            }
          ]
        }
      </script>
    `);

    expect(issues).toContainEqual(
      expect.objectContaining({
        id: "missing-schema-graph-type-0-1",
        severity: "warning",
      }),
    );
  });
});