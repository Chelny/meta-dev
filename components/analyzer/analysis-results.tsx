"use client";

import { CheckCircle2 } from "lucide-react";
import { SchemaResults } from "@/components/analyzer/results/schema-results";
import { SeoResults } from "@/components/analyzer/results/seo-results";
import { SocialResults } from "@/components/analyzer/results/social-results";
import { SuggestionsResults } from "@/components/analyzer/results/suggestions-results";
import { TechnicalResults } from "@/components/analyzer/results/technical-results";
import { validateAnalysis } from "@/lib/validation";
import type { PageAnalysis } from "@/types/analysis";

type AnalysisResultsProps = {
  analysis: PageAnalysis;
};

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const issues = validateAnalysis(analysis);

  return (
    <div className="mt-10 space-y-4">
      <div className="rounded-xl border bg-background/80 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-500" />

              <p className="text-xs font-medium tracking-wide text-muted-foreground">
                ANALYSIS COMPLETE
              </p>
            </div>

            <p className="mt-2 truncate text-sm font-medium">
              {analysis.url}
            </p>
          </div>

          <div className="shrink-0 rounded-md border px-2.5 py-1 text-xs font-medium">
            HTTP {analysis.technical.status}
          </div>
        </div>
      </div>

      <SeoResults analysis={analysis} />

      <SocialResults analysis={analysis} />

      <SchemaResults analysis={analysis} />

      <TechnicalResults analysis={analysis} />

      <SuggestionsResults suggestions={analysis.suggestions} issues={issues} />
    </div>
  );
}