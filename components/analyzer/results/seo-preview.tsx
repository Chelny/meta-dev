"use client";

import type { PageAnalysis } from "@/types/analysis";

export function SeoPreview({
  analysis,
}: {
  analysis: PageAnalysis;
}) {
  const title = analysis.seo.title.value || "Page title";
  const description =
    analysis.seo.description.value ||
    "Your meta description will appear here.";
  const url = analysis.seo.canonical.value || analysis.url;

  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground">
        SEARCH PREVIEW
      </p>

      <div className="space-y-1">
        <p className="break-all text-xs text-muted-foreground">
          {url}
        </p>

        <p className="line-clamp-2 text-lg text-blue-600 dark:text-blue-400">
          {title}
        </p>

        <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}