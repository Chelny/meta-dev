"use client";

import { Check, CircleAlert, Server } from "lucide-react";
import { AnalysisSection } from "@/components/analyzer/analysis-section";
import type { PageAnalysis } from "@/types/analysis";

export function TechnicalResults({
  analysis,
}: {
  analysis: PageAnalysis;
}) {
  const { technical } = analysis;

  return (
    <AnalysisSection
      icon={Server}
      title="TECHNICAL"
      description="HTTP response and page information"
    >
      <TechnicalRow
        label="HTTP status"
        value={`HTTP ${technical.status}`}
        status={technical.status >= 200 && technical.status < 400}
      />

      <TechnicalRow
        label="Final URL"
        value={technical.finalUrl}
        status={Boolean(technical.finalUrl)}
      />

      <TechnicalRow
        label="Content type"
        value={technical.contentType}
        status={Boolean(technical.contentType)}
      />

      <TechnicalRow
        label="Content length"
        value={
          technical.contentLength
            ? formatContentLength(technical.contentLength)
            : null
        }
        status={Boolean(technical.contentLength)}
      />
    </AnalysisSection>
  );
}

function TechnicalRow({
  label,
  value,
  status,
}: {
  label: string;
  value: string | null;
  status: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 border-t py-4 first:border-t-0 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        {status ? (
          <Check className="size-4 text-emerald-500" />
        ) : (
          <CircleAlert className="size-4 text-amber-500" />
        )}

        <span className="text-sm font-medium">{label}</span>
      </div>

      <p className="text-sm text-muted-foreground">
        {value ?? "Not available"}
      </p>
    </div>
  );
}

function formatContentLength(value: string): string {
  const bytes = Number(value);

  if (!Number.isFinite(bytes)) {
    return value;
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}