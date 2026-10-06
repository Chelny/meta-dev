"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Code2 } from "lucide-react";
import { AnalysisResults } from "@/components/analyzer/analysis-results";
import { AnalyzerForm } from "@/components/analyzer/analyzer-form";
import { PageBackground } from "@/components/layout/page-background";
import { PageFooter } from "@/components/layout/page-footer";
import { PageHeader } from "@/components/layout/page-header";
import type { PageAnalysis } from "@/types/analysis";

export default function AnalyzePage() {
  return (
    <Suspense fallback={null}>
      <AnalyzePageContent />
    </Suspense>
  );
}

function AnalyzePageContent() {
  const [analysis, setAnalysis] = useState<PageAnalysis | null>(null);
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get("url") ?? "";

  function handleAnalysis(result: PageAnalysis) {
    setAnalysis(result);

    const params = new URLSearchParams(window.location.search);
    params.set("url", result.url);

    window.history.replaceState(
      null,
      "",
      `/analyze?${params.toString()}`,
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <PageBackground />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <PageHeader />

        <div className="mx-auto w-full max-w-4xl py-20">
          <div className="text-center">
            <div className="mb-5 flex items-center justify-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>

              <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Web Metadata Inspector
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Analyze a website
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Inspect SEO, social metadata, Schema.org structured data,
              and technical information from any URL.
            </p>
          </div>

          <div className="mt-10">
            <AnalyzerForm
              initialUrl={initialUrl}
              onAnalysis={handleAnalysis}
            />

            {analysis && <AnalysisResults analysis={analysis} />}
          </div>

          {/* Empty state */}
          {!analysis && (
            <div className="mx-auto mt-16 max-w-2xl">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
                <Code2 className="size-3.5" />
                <span>
                  Inspect the metadata your website exposes to the web
                </span>
              </div>
            </div>
          )}
        </div>

        <PageFooter />
      </div>
    </main>
  );
}