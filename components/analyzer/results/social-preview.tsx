import type { PageAnalysis } from "@/types/analysis";

type SocialPreviewProps = {
  analysis: PageAnalysis;
  platform: "open-graph" | "twitter";
};

export function SocialPreview({
  analysis,
  platform,
}: SocialPreviewProps) {
  const isTwitter = platform === "twitter";

  const title = isTwitter
    ? analysis.twitter.title.value ||
      analysis.openGraph.title.value ||
      analysis.seo.title.value
    : analysis.openGraph.title.value ||
      analysis.seo.title.value;

  const description = isTwitter
    ? analysis.twitter.description.value ||
      analysis.openGraph.description.value ||
      analysis.seo.description.value
    : analysis.openGraph.description.value ||
      analysis.seo.description.value;

  const image = isTwitter
    ? analysis.twitter.image.value ||
      analysis.openGraph.image.value
    : analysis.openGraph.image.value;

  const url = isTwitter
    ? analysis.url
    : analysis.openGraph.url.value || analysis.url;

  const hostname = getHostname(url);

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <div className="border-b px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {isTwitter ? "X Preview" : "Open Graph Preview"}
        </p>
      </div>

      {image ? (
        <div className="aspect-[1.91/1] overflow-hidden bg-muted/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="size-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
      ) : (
        <div className="flex aspect-[1.91/1] items-center justify-center bg-muted/30 text-sm text-muted-foreground">
          No image
        </div>
      )}

      <div className="space-y-1.5 p-4">
        <p className="truncate text-xs text-muted-foreground">
          {hostname}
        </p>

        <p className="line-clamp-2 text-sm font-semibold">
          {title || "No title"}
        </p>

        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
          {description || "No description"}
        </p>
      </div>
    </div>
  );
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}