"use client";

import { useState } from "react";
import { AtSign, Check, Copy, Share2 } from "lucide-react";
import { AnalysisSection } from "@/components/analyzer/analysis-section";
import { SocialPreview } from "@/components/analyzer/results/social-preview";
import type { MetaValue, PageAnalysis } from "@/types/analysis";

export function SocialResults({ analysis }: { analysis: PageAnalysis }) {
  return (
    <>
      <AnalysisSection
        icon={Share2}
        title="OPEN GRAPH"
        description="Social sharing metadata"
      >
        <MetaRow label="Title" value={analysis.openGraph.title} />
        <MetaRow
          label="Description"
          value={analysis.openGraph.description}
        />
        <MetaRow label="URL" value={analysis.openGraph.url} />
        <MetaRow label="Type" value={analysis.openGraph.type} />

        <ImageRow
          label="Image"
          value={analysis.openGraph.image}
          alt="Open Graph preview"
        />

        <div className="border-t pt-4">
          <SocialPreview
            analysis={analysis}
            platform="open-graph"
          />
        </div>
      </AnalysisSection>

      <AnalysisSection
        icon={AtSign}
        title="TWITTER / X"
        description="Twitter Card metadata"
      >
        <MetaRow label="Card" value={analysis.twitter.card} />
        <MetaRow label="Title" value={analysis.twitter.title} />
        <MetaRow
          label="Description"
          value={analysis.twitter.description}
        />

        <ImageRow
          label="Image"
          value={analysis.twitter.image}
          alt="Twitter Card preview"
        />

        <div className="border-t pt-4">
          <SocialPreview
            analysis={analysis}
            platform="twitter"
          />
        </div>
      </AnalysisSection>
    </>
  );
}

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: MetaValue;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!value.value) return;

    await navigator.clipboard.writeText(value.value);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <div className="flex flex-col gap-2 border-t py-4 first:border-t-0 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-sm font-medium">{label}</span>

      {value.exists ? (
        <div className="flex min-w-0 items-center gap-2 sm:max-w-xl">
          <p className="min-w-0 wrap-break-word text-sm text-muted-foreground sm:text-right">
            {value.value}
          </p>

          <button
            type="button"
            onClick={() => void handleCopy()}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
      ) : (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Not found
        </p>
      )}
    </div>
  );
}

function ImageRow({
  label,
  value,
  alt,
}: {
  label: string;
  value: MetaValue;
  alt: string;
}) {
  return (
    <div className="border-t py-4">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium">{label}</span>

        {value.exists ? (
          <>
            <p className="break-all text-sm text-muted-foreground">
              {value.value}
            </p>

            <div className="overflow-hidden rounded-lg border bg-muted/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value.value!}
                alt={alt}
                className="max-h-64 w-full object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.parentElement?.classList.add(
                    "p-4",
                  );
                  event.currentTarget.parentElement!.textContent =
                    "Image could not be loaded";
                }}
              />
            </div>
          </>
        ) : (
          <p className="text-sm text-amber-600 dark:text-amber-400">
            Not found
          </p>
        )}
      </div>
    </div>
  );
}