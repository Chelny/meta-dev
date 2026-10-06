import * as cheerio from "cheerio";
import type { MetaValue, PageAnalysis } from "@/types/analysis";
import type { SchemaBlock, SchemaEntity, SchemaProperty } from "@/types/schema";

function meta(value: string | undefined): MetaValue {
  return {
    value: value?.trim() || null,
    exists: Boolean(value?.trim()),
  };
}

export function analyzeHtml(
  html: string,
  technical: PageAnalysis["technical"],
  url: string,
): PageAnalysis {
  const $ = cheerio.load(html);

  const title = $("title").first().text();

  const description = $('meta[name="description"]')
    .attr("content");

  const canonical = $('link[rel="canonical"]')
    .attr("href");

  const robots = $('meta[name="robots"]')
    .attr("content");

  const language = $("html")
    .attr("lang");

  const faviconHref = $('link[rel~="icon"]')
    .first()
    .attr("href");

  const favicon = faviconHref
    ? new URL(faviconHref, url).toString()
    : null;

  const openGraph = {
    title: $('meta[property="og:title"]').attr("content"),
    description: $('meta[property="og:description"]').attr("content"),
    image: $('meta[property="og:image"]').attr("content"),
    url: $('meta[property="og:url"]').attr("content"),
    type: $('meta[property="og:type"]').attr("content"),
  };

  const twitter = {
    card: $('meta[name="twitter:card"]').attr("content"),
    title: $('meta[name="twitter:title"]').attr("content"),
    description: $('meta[name="twitter:description"]').attr("content"),
    image: $('meta[name="twitter:image"]').attr("content"),
  };

  const schemaBlocks: SchemaBlock[] = [];

  $('script[type="application/ld+json"]').each((_, element) => {
    const content = $(element).html();

    if (!content) {
      return;
    }

    try {
      const raw = JSON.parse(content);

      schemaBlocks.push({
        raw,
        types: extractSchemaTypes([raw]),
        context: extractSchemaContext(raw),
        properties: extractSchemaProperties(raw),
        entities: extractSchemaEntities(raw),
        isValid: true,
      });
    } catch {
      schemaBlocks.push({
        raw: content,
        types: [],
        context: null,
        properties: [],
        entities: [],
        isValid: false,
      });
    }
  });

  const schemaTypes = [
    ...new Set(schemaBlocks.flatMap((block) => block.types)),
  ];

  return {
    url,

    seo: {
      title: meta(title),
      description: meta(description),
      canonical: meta(canonical),
      robots: meta(robots),
      language: meta(language),
    },

    openGraph: {
      title: meta(openGraph.title),
      description: meta(openGraph.description),
      image: meta(openGraph.image),
      url: meta(openGraph.url),
      type: meta(openGraph.type),
    },

    twitter: {
      card: meta(twitter.card),
      title: meta(twitter.title),
      description: meta(twitter.description),
      image: meta(twitter.image),
    },

    schema: {
      types: schemaTypes,
      blocks: schemaBlocks,
    },

    technical: {
      ...technical,
      favicon,
    },

    suggestions: [],
  };
}

function extractSchemaTypes(schema: unknown[]): string[] {
  const types = new Set<string>();

  function visit(value: unknown) {
    if (!value || typeof value !== "object") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    const object = value as Record<string, unknown>;

    const type = object["@type"];

    if (typeof type === "string") {
      types.add(type);
    }

    if (Array.isArray(type)) {
      type.forEach((item) => {
        if (typeof item === "string") {
          types.add(item);
        }
      });
    }

    Object.values(object).forEach(visit);
  }

  schema.forEach(visit);

  return [...types];
}

function extractSchemaContext(schema: unknown): string | null {
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    return null;
  }

  const context = (schema as Record<string, unknown>)["@context"];

  return typeof context === "string" ? context : null;
}

function extractSchemaProperties(
  schema: unknown,
): SchemaProperty[] {
  const properties = new Map<string, SchemaProperty>();

  function visit(value: unknown) {
    if (!value || typeof value !== "object") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    const object = value as Record<string, unknown>;

    Object.entries(object).forEach(([key, propertyValue]) => {
      if (!key.startsWith("@")) {
        properties.set(key, {
          name: key,
          value: propertyValue,
          exists: propertyValue !== null && propertyValue !== undefined,
        });
      }

      visit(propertyValue);
    });
  }

  visit(schema);

  return [...properties.values()];
}

function extractSchemaEntities(schema: unknown): SchemaEntity[] {
  const entities: SchemaEntity[] = [];

  function visit(value: unknown) {
    if (!value || typeof value !== "object") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    const object = value as Record<string, unknown>;

    if (object["@type"]) {
      const types = extractTypesFromObject(object);

      if (types.length > 0) {
        const properties = Object.entries(object)
          .filter(([key]) => !key.startsWith("@"))
          .map(([name, propertyValue]) => ({
            name,
            value: propertyValue,
            exists:
              propertyValue !== null &&
              propertyValue !== undefined,
          }));

        entities.push({
          types,
          properties,
        });
      }
    }

    Object.values(object).forEach(visit);
  }

  visit(schema);

  return entities;
}

function extractTypesFromObject(
  object: Record<string, unknown>,
): string[] {
  const type = object["@type"];

  if (typeof type === "string") {
    return [type];
  }

  if (Array.isArray(type)) {
    return type.filter(
      (value): value is string => typeof value === "string",
    );
  }

  return [];
}