"use client";

import { Search } from "lucide-react";
import { AnalysisSection } from "@/components/analyzer/analysis-section";
import { SeoPreview } from "@/components/analyzer/results/seo-preview";
import type { PageAnalysis } from "@/types/analysis";

export function SeoResults({ analysis }: { analysis: PageAnalysis }) {
  return (
    <AnalysisSection
      icon={Search}
      title="SEO"
      description="Search engine metadata"
    >
      <MetaRow label="Title" value={analysis.seo.title} />
      <MetaRow label="Description" value={analysis.seo.description} />
      <MetaRow label="Canonical" value={analysis.seo.canonical} />
      <MetaRow label="Robots" value={analysis.seo.robots} />
      <MetaRow label="Language" value={analysis.seo.language} />

      <div className="border-t pt-4">
        <SeoPreview analysis={analysis} />
      </div>
    </AnalysisSection>
  );
}

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: {
    value: string | null;
    exists: boolean;
  };
}) {
  const characterCount = value.value?.length ?? 0;
  const showCharacterCount = label === "Title" || label === "Description";

  return (
    <div className="flex flex-col gap-2 border-t py-4 first:border-t-0 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-sm font-medium">{label}</span>

      <div className="flex min-w-0 flex-col gap-1 sm:items-end">
        <p
          className={
            value.exists
              ? "max-w-xl wrap-break-word text-sm text-muted-foreground sm:text-right"
              : "text-sm text-amber-600 dark:text-amber-400"
          }
        >
          {value.exists ? value.value : "Not found"}
        </p>

        {showCharacterCount && value.exists && (
          <span className="text-xs text-muted-foreground/60">
            {characterCount} characters
          </span>
        )}
      </div>
    </div>
  );
}