import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeHtml } from "@/lib/analyzer";
import { fetchUrl } from "@/lib/fetch-url";
import { generateSuggestions } from "@/lib/suggestions";

const requestSchema = z.object({
  url: z.url(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Please provide a valid URL.",
        },
        {
          status: 400,
        },
      );
    }

    const { url } = result.data;

    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        {
          error: "Only HTTP and HTTPS URLs are supported.",
        },
        {
          status: 400,
        },
      );
    }

    const page = await fetchUrl(url);

    const analysis = analyzeHtml(
      page.html,
      {
        status: page.status,
        contentType: page.contentType,
        contentLength: page.contentLength,
      },
      page.finalUrl,
    );

    analysis.suggestions = generateSuggestions(analysis);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis failed:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to analyze this URL.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}