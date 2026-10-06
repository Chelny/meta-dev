const MAX_RESPONSE_SIZE = 5 * 1024 * 1024;

export async function fetchUrl(url: string) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": `${process.env.NEXT_PUBLIC_APP_NAME}/1.0 (+${process.env.APP_URL})`,
      Accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(10_000),
  });

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("text/html")) {
    throw new Error("The URL does not point to an HTML page.");
  }

  const contentLength = response.headers.get("content-length");

  if (contentLength && Number(contentLength) > MAX_RESPONSE_SIZE) {
    throw new Error("The webpage is too large to analyze.");
  }

  const html = await response.text();

  if (new TextEncoder().encode(html).byteLength > MAX_RESPONSE_SIZE) {
    throw new Error("The webpage is too large to analyze.");
  }

  return {
    html,
    status: response.status,
    contentType,
    contentLength,
    finalUrl: response.url,
  };
}