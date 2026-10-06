"use client";

import { useState } from "react";
import {
  Braces,
  Check,
  CircleAlert,
  Copy,
  ExternalLink,
} from "lucide-react";
import { AnalysisSection } from "@/components/analyzer/analysis-section";
import type { PageAnalysis } from "@/types/analysis";

export function SchemaResults({ analysis }: { analysis: PageAnalysis }) {
  const { types, blocks } = analysis.schema;

  return (
    <AnalysisSection
      icon={Braces}
      title="SCHEMA.ORG"
      description="Structured data found in JSON-LD"
    >
      {blocks.length === 0 ? (
        <div className="flex items-center gap-2 rounded-lg border border-dashed p-4">
          <CircleAlert className="size-4 text-amber-500" />

          <div>
            <p className="text-sm font-medium">
              No structured data found
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              No JSON-LD Schema.org data was detected on this page.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">
                DETECTED TYPES
              </p>

              <span className="text-xs text-muted-foreground">
                {types.length} {types.length === 1 ? "type" : "types"}
              </span>
            </div>

            {types.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <a
                    key={type}
                    href={getSchemaUrl(type)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border bg-muted/40 px-2.5 py-1.5 font-mono text-xs transition-colors hover:bg-muted"
                  >
                    <span className="text-muted-foreground">@type</span>
                    {type}
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                JSON-LD found, but no @type was detected.
              </p>
            )}
          </div>

          <div>
            <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground">
              JSON-LD
            </p>

            <div className="space-y-3">
              {blocks.map((block, index) => {
                const json =
                  typeof block.raw === "string"
                    ? block.raw
                    : JSON.stringify(block.raw, null, 2);

                return (
                  <details
                    key={index}
                    className="group/schema overflow-hidden rounded-lg border bg-muted/20"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium">
                      <span>JSON-LD block {index + 1}</span>

                      <span className="text-xs text-muted-foreground transition-transform duration-200 group-open/schema:-rotate-90">
                        →
                      </span>
                    </summary>

                    <div className="space-y-4 border-t p-4">
                      <div className="flex flex-wrap gap-2">
                        {block.types.map((type) => (
                          <span
                            key={type}
                            className="rounded-md border bg-muted/40 px-2.5 py-1.5 font-mono text-xs"
                          >
                            {type}
                          </span>
                        ))}

                        {block.context && (
                          <span className="rounded-md border bg-muted/40 px-2.5 py-1.5 font-mono text-xs text-muted-foreground">
                            {block.context}
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Entities
                        </p>

                        {block.entities.length > 0 ? (
                          <div className="space-y-3">
                            {block.entities.map((entity, entityIndex) => (
                              <details
                                key={`${entityIndex}-${entity.types.join("-")}`}
                                className="group/entity rounded-lg border bg-background/40"
                              >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3">
                                  <div className="flex flex-wrap gap-2">
                                    {entity.types.map((type) => (
                                      <span
                                        key={type}
                                        className="rounded-md border bg-muted/40 px-2.5 py-1.5 font-mono text-xs"
                                      >
                                        {type}
                                      </span>
                                    ))}
                                  </div>

                                  <span className="shrink-0 text-xs text-muted-foreground transition-transform duration-200 group-open/entity:-rotate-90">
                                    →
                                  </span>
                                </summary>

                                {entity.properties.length > 0 && (
                                  <div className="space-y-2 border-t p-3">
                                    {entity.properties.map((property) => (
                                      <div
                                        key={property.name}
                                        className="grid gap-1 rounded-md border bg-muted/20 px-3 py-2 sm:grid-cols-[140px_1fr]"
                                      >
                                        <span className="font-mono text-xs font-medium">
                                          {property.name}
                                        </span>

                                        <span className="break-all font-mono text-xs text-muted-foreground">
                                          <SchemaPropertyValue value={property.value} />
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </details>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No Schema.org entities detected.
                          </p>
                        )}
                      </div>

                      <div className="overflow-hidden rounded-lg border bg-muted/30">
                        <div className="flex items-center justify-between border-b px-3 py-2">
                          <p className="text-xs font-medium text-muted-foreground">
                            Raw JSON
                          </p>

                          <CopyButton value={json} />
                        </div>

                        <pre className="max-h-96 overflow-auto p-4 text-left font-mono text-xs leading-6 text-muted-foreground">
                          {json}
                        </pre>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </AnalysisSection>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          Copy
        </>
      )}
    </button>
  );
}

function SchemaPropertyValue({ value }: { value: unknown }) {
  if (typeof value === "string") {
    if (isUrl(value)) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="break-all text-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:decoration-foreground"
        >
          {value}
        </a>
      );
    }

    return <span>{value}</span>;
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-1">
        {value.map((item, index) => (
          <div
            key={index}
            className="rounded-md border bg-background/40 px-2 py-1"
          >
            <SchemaPropertyValue value={item} />
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all text-xs">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return <span>{String(value)}</span>;
}

function isUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function getSchemaUrl(type: string) {
  return `https://schema.org/${encodeURIComponent(type)}`;
}