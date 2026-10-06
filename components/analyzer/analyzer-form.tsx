"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe, Search } from "lucide-react";
import type { PageAnalysis } from "@/types/analysis";

type AnalyzerFormProps = {
  initialUrl?: string;
  onAnalysis: (analysis: PageAnalysis) => void;
};

export function AnalyzerForm({ initialUrl = "", onAnalysis }: AnalyzerFormProps) {
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const hasAnalyzedInitialUrl = useRef(false);

  useEffect(() => {
    if (!initialUrl || hasAnalyzedInitialUrl.current) {
      return;
    }

    hasAnalyzedInitialUrl.current = true;

    setUrl(initialUrl);
    void handleAnalyze(initialUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUrl]);

  async function handleAnalyze(valueOverride?: string) {
    setError(null);

    const value = (valueOverride ?? url).trim();

    if (!value) {
      setError("Enter a URL to analyze.");
      return;
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(value);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      setError("Only HTTP and HTTPS URLs are supported.");
      return;
    }

    try {
      setIsAnalyzing(true);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: parsedUrl.toString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to analyze this URL.");
      }

      onAnalysis(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to analyze this URL.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleAnalyze();
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-1 rounded-xl bg-linear-to-r from-primary/20 via-primary/5 to-primary/20 opacity-60 blur-lg" />

      <div className="relative flex gap-2 rounded-xl border bg-background/80 p-1.5 shadow-2xl shadow-black/5 backdrop-blur-xl">
        <div className="flex min-w-0 flex-1 items-center">
          <Globe className="ml-3 size-4 shrink-0 text-muted-foreground" />

          <input
            type="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com"
            disabled={isAnalyzing}
            className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <button
          type="button"
          onClick={() => void handleAnalyze()}
          disabled={isAnalyzing}
          className="group flex h-11 min-w-27 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isAnalyzing ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Analyzing
            </>
          ) : (
            <>
              <Search className="size-4" />
              Analyze
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-left text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}