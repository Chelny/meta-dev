import { describe, expect, it } from "vitest";
import { analyzeHtml } from "@/lib/analyzer";

const technical = {
  status: 200,
  contentType: "text/html",
  contentLength: "12345",
};

const url = "https://example.com/page";

describe("analyzeHtml", () => {
  it("should extract SEO metadata", () => {
    const html = `
      <html lang="en">
        <head>
          <title>Example Page</title>
          <meta name="description" content="An example description." />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://example.com/page" />
        </head>
      </html>
    `;

    const result = analyzeHtml(html, technical, url);

    expect(result.seo.title).toEqual({
      value: "Example Page",
      exists: true,
    });

    expect(result.seo.description.value).toBe(
      "An example description.",
    );

    expect(result.seo.robots.value).toBe("index, follow");

    expect(result.seo.language.value).toBe("en");

    expect(result.seo.canonical.value).toBe(
      "https://example.com/page",
    );
  });

  it("should extract Open Graph metadata", () => {
    const html = `
      <head>
        <meta property="og:title" content="OG Title" />
        <meta property="og:description" content="OG Description" />
        <meta property="og:image" content="https://example.com/image.jpg" />
        <meta property="og:url" content="https://example.com/page" />
        <meta property="og:type" content="website" />
      </head>
    `;

    const result = analyzeHtml(html, technical, url);

    expect(result.openGraph.title.value).toBe("OG Title");
    expect(result.openGraph.description.value).toBe("OG Description");
    expect(result.openGraph.image.value).toBe(
      "https://example.com/image.jpg",
    );
    expect(result.openGraph.url.value).toBe(
      "https://example.com/page",
    );
    expect(result.openGraph.type.value).toBe("website");
  });

  it("should extract Twitter/X metadata", () => {
    const html = `
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Twitter Title" />
        <meta name="twitter:description" content="Twitter Description" />
        <meta name="twitter:image" content="https://example.com/twitter.jpg" />
      </head>
    `;

    const result = analyzeHtml(html, technical, url);

    expect(result.twitter.card.value).toBe("summary_large_image");
    expect(result.twitter.title.value).toBe("Twitter Title");
    expect(result.twitter.description.value).toBe(
      "Twitter Description",
    );
    expect(result.twitter.image.value).toBe(
      "https://example.com/twitter.jpg",
    );
  });

  it("should extract JSON-LD schema", () => {
    const html = `
      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Test Article",
          "author": {
            "@type": "Person",
            "name": "Jane Doe"
          }
        }
      </script>
    `;

    const result = analyzeHtml(html, technical, url);

    expect(result.schema.blocks).toHaveLength(1);

    const block = result.schema.blocks[0];

    expect(block.isValid).toBe(true);
    expect(block.context).toBe("https://schema.org");
    expect(block.types).toContain("Article");
    expect(block.entities).toHaveLength(2);

    expect(result.schema.types).toContain("Article");
    expect(result.schema.types).toContain("Person");
  });

  it("should extract multiple JSON-LD blocks", () => {
    const html = `
      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Example"
        }
      </script>

      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Example Site"
        }
      </script>
    `;

    const result = analyzeHtml(html, technical, url);

    expect(result.schema.blocks).toHaveLength(2);
    expect(result.schema.types).toEqual(
      expect.arrayContaining(["Organization", "WebSite"]),
    );
  });

  it("should handle @graph", () => {
    const html = `
      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              "headline": "Test"
            },
            {
              "@type": "Person",
              "name": "Jane Doe"
            }
          ]
        }
      </script>
    `;

    const result = analyzeHtml(html, technical, url);

    expect(result.schema.blocks).toHaveLength(1);
    expect(result.schema.types).toEqual(
      expect.arrayContaining(["Article", "Person"]),
    );
  });

  it("should not crash on malformed JSON-LD", () => {
    const html = `
      <script type="application/ld+json">
        { invalid json
      </script>
    `;

    const result = analyzeHtml(html, technical, url);

    expect(result.schema.blocks).toHaveLength(1);
    expect(result.schema.blocks[0].isValid).toBe(false);
    expect(result.schema.blocks[0].types).toEqual([]);
  });

  it("should mark missing metadata as not found", () => {
    const result = analyzeHtml(
      "<html><head></head></html>",
      technical,
      url,
    );

    expect(result.seo.title.exists).toBe(false);
    expect(result.seo.description.exists).toBe(false);
    expect(result.openGraph.title.exists).toBe(false);
    expect(result.twitter.card.exists).toBe(false);
  });
});