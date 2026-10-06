"use client";

import type { PageAnalysis } from "@/types/analysis";

export function SeoPreview({
  analysis,
}: {
  analysis: PageAnalysis;
}) {
  const title = analysis.seo.title.value;
  const description = analysis.seo.description.value;
  const url = analysis.seo.canonical.value || analysis.url;

  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Search Preview
      </p>

      <div className="space-y-1">
        <p className="break-all text-xs text-muted-foreground">
          {url}
        </p>

        <p className="line-clamp-2 text-lg text-blue-600 dark:text-blue-400">
          {title || "Page title"}
        </p>

        <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
          {description || "Your meta description will appear here."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <StatusBadge
          label="Title"
          value={title}
          min={30}
          max={60}
        />

        <StatusBadge
          label="Description"
          value={description}
          min={70}
          max={160}
        />
      </div>
    </div>
  );
}

function StatusBadge({
  label,
  value,
  min,
  max,
}: {
  label: string;
  value: string | null;
  min: number;
  max: number;
}) {
  if (!value) {
    return (
      <span className="rounded-md border px-2 py-1 text-xs text-amber-600 dark:text-amber-400">
        ⚠ {label} missing
      </span>
    );
  }

  const length = value.length;

  if (length < min) {
    return (
      <span className="rounded-md border px-2 py-1 text-xs text-amber-600 dark:text-amber-400">
        ⚠ {label} too short · {length}
      </span>
    );
  }

  if (length > max) {
    return (
      <span className="rounded-md border px-2 py-1 text-xs text-amber-600 dark:text-amber-400">
        ⚠ {label} too long · {length}
      </span>
    );
  }

  return (
    <span className="rounded-md border px-2 py-1 text-xs text-emerald-600 dark:text-emerald-400">
      ✓ {label} good · {length}
    </span>
  );
}