"use client";

import { CheckCircle2 } from "lucide-react";
import { SchemaResults } from "@/components/analyzer/results/schema-results";
import { SeoResults } from "@/components/analyzer/results/seo-results";
import { SocialResults } from "@/components/analyzer/results/social-results";
import { SuggestionsResults } from "@/components/analyzer/results/suggestions-results";
import { TechnicalResults } from "@/components/analyzer/results/technical-results";
import {
  calculateScore,
  getScoreRating,
} from "@/lib/scoring";
import { validateAnalysis } from "@/lib/validation";
import type { PageAnalysis } from "@/types/analysis";

type AnalysisResultsProps = {
  analysis: PageAnalysis;
};

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const issues = validateAnalysis(analysis);
  const score = calculateScore(analysis);
  const rating = getScoreRating(score.overall);

  return (
    <div className="mt-10 space-y-4">
      <div className="rounded-xl border bg-background/80 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />

                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Analysis Complete
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

          <div className="border-t pt-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  Metadata score · {formatScoreRating(rating)}
                </p>

                <p className="mt-1 text-3xl font-semibold tracking-tight">
                  {score.overall}
                  <span className="text-sm font-normal text-muted-foreground">
                    {" "}
                    / 100
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs sm:flex sm:gap-5">
                <ScoreItem label="SEO" score={score.seo} max={40} />
                <ScoreItem label="Social" score={score.social} max={30} />
                <ScoreItem label="Schema" score={score.schema} max={20} />
                <ScoreItem
                  label="Technical"
                  score={score.technical}
                  max={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SeoResults analysis={analysis} />

      <SocialResults analysis={analysis} />

      <SchemaResults analysis={analysis} />

      <TechnicalResults analysis={analysis} />

      <SuggestionsResults
        suggestions={analysis.suggestions}
        issues={issues}
      />
    </div>
  );
}

function ScoreItem({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  return (
    <div className="text-center">
      <p className="font-medium">{label}</p>

      <p className="mt-1 text-muted-foreground">
        {score}
        <span className="text-muted-foreground/50">
          {" "}
          / {max}
        </span>
      </p>
    </div>
  );
}

function formatScoreRating(
  rating:
    | "excellent"
    | "good"
    | "needs-improvement"
    | "poor",
) {
  switch (rating) {
    case "excellent":
      return "Excellent";

    case "good":
      return "Good";

    case "needs-improvement":
      return "Needs improvement";

    case "poor":
      return "Poor";
  }
}