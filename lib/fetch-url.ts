import dns from "node:dns/promises";
import net from "node:net";

const MAX_RESPONSE_SIZE = 5 * 1024 * 1024;
const MAX_REDIRECTS = 5;

export async function fetchUrl(url: string) {
  let currentUrl = new URL(url);

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount++) {
    await assertSafeUrl(currentUrl);

    const response = await fetch(currentUrl, {
      redirect: "manual",
      headers: {
        "User-Agent": `${process.env.NEXT_PUBLIC_APP_NAME}/1.0 (+${process.env.APP_URL})`,
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (isRedirect(response.status)) {
      const location = response.headers.get("location");

      if (!location) {
        throw new Error("The webpage returned an invalid redirect.");
      }

      currentUrl = new URL(location, currentUrl);
      continue;
    }

    if (!response.ok) {
      throw new Error(
        `The webpage returned HTTP ${response.status}.`,
      );
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.toLowerCase().includes("text/html")) {
      throw new Error("The URL does not point to an HTML page.");
    }

    const contentLength = response.headers.get("content-length");

    if (
      contentLength &&
      Number(contentLength) > MAX_RESPONSE_SIZE
    ) {
      throw new Error("The webpage is too large to analyze.");
    }

    const html = await readResponseBody(response);

    return {
      html,
      status: response.status,
      contentType,
      contentLength,
      finalUrl: response.url || currentUrl.toString(),
    };
  }

  throw new Error("The webpage has too many redirects.");
}

function isRedirect(status: number): boolean {
  return [301, 302, 303, 307, 308].includes(status);
}

async function assertSafeUrl(url: URL) {
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only HTTP and HTTPS URLs are supported.");
  }

  const hostname = url.hostname.toLowerCase();

  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "0.0.0.0" ||
    hostname === "::1"
  ) {
    throw new Error("This URL cannot be analyzed.");
  }

  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw new Error("This URL cannot be analyzed.");
    }

    return;
  }

  const addresses = await dns.lookup(hostname, {
    all: true,
    verbatim: true,
  });

  if (addresses.some(({ address }) => isPrivateIp(address))) {
    throw new Error("This URL cannot be analyzed.");
  }
}

function isPrivateIp(address: string): boolean {
  const version = net.isIP(address);

  if (version === 4) {
    const [a, b] = address.split(".").map(Number);

    return (
      a === 10 ||
      a === 127 ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 169 && b === 254) ||
      a === 0
    );
  }

  if (version === 6) {
    const normalized = address.toLowerCase();

    return (
      normalized === "::1" ||
      normalized.startsWith("fc") ||
      normalized.startsWith("fd") ||
      normalized.startsWith("fe80:")
    );
  }

  return false;
}

async function readResponseBody(
  response: Response,
): Promise<string> {
  if (!response.body) {
    throw new Error("Unable to read the webpage.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  const chunks: Uint8Array[] = [];
  let totalSize = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalSize += value.byteLength;

      if (totalSize > MAX_RESPONSE_SIZE) {
        await reader.cancel();
        throw new Error(
          "The webpage is too large to analyze.",
        );
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  return decoder.decode(concatChunks(chunks));
}

function concatChunks(chunks: Uint8Array[]): Uint8Array {
  const totalSize = chunks.reduce(
    (total, chunk) => total + chunk.byteLength,
    0,
  );

  const result = new Uint8Array(totalSize);

  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return result;
}