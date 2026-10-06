"use client";

import { Check, CircleAlert, Lightbulb } from "lucide-react";
import { AnalysisSection } from "@/components/analyzer/analysis-section";
import type { ValidationIssue } from "@/lib/validation";
import type { Suggestion } from "@/types/suggestions";

export function SuggestionsResults({
  suggestions,
  issues,
}: {
  suggestions: Suggestion[];
  issues: ValidationIssue[];
}) {
  return (
    <AnalysisSection
      icon={Lightbulb}
      title="SUGGESTIONS"
      description="Potential improvements detected from the page metadata"
    >
      <div className="space-y-6">
        {issues.length > 0 && (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground">
                VALIDATION
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Checks based on common metadata and Schema.org recommendations.
              </p>
            </div>

            {issues.map((issue) => (
              <div
                key={issue.id}
                className="rounded-lg border p-4"
              >
                <div className="flex gap-3">
                  <ValidationIcon severity={issue.severity} />

                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {issue.message}
                    </p>

                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {issue.severity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {suggestions.length === 0 ? (
          <div className="flex items-center gap-2 rounded-lg border border-dashed p-4">
            <Check className="size-4 text-emerald-500" />

            <div>
              <p className="text-sm font-medium">
                No obvious issues found
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                The metadata checked by {process.env.NEXT_PUBLIC_APP_NAME} looks good.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="rounded-lg border p-4"
              >
                <div className="flex gap-3">
                  <SuggestionIcon severity={suggestion.severity} />

                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {suggestion.title}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {suggestion.description}
                    </p>

                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Recommendation:
                      </span>{" "}
                      {suggestion.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnalysisSection>
  );
}

function SuggestionIcon({
  severity,
}: {
  severity: Suggestion["severity"];
}) {
  if (severity === "error") {
    return (
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
    );
  }

  if (severity === "warning") {
    return (
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber-500" />
    );
  }

  return (
    <Lightbulb className="mt-0.5 size-4 shrink-0 text-blue-500" />
  );
}

function ValidationIcon({
  severity,
}: {
  severity: ValidationIssue["severity"];
}) {
  if (severity === "error") {
    return (
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
    );
  }

  if (severity === "warning") {
    return (
      <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber-500" />
    );
  }

  return (
    <Lightbulb className="mt-0.5 size-4 shrink-0 text-blue-500" />
  );
}