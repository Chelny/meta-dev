# META.DEV

**Web Metadata Inspector**

META.DEV is a developer-focused web metadata inspector that analyzes a URL and exposes the metadata a website provides to search engines, social platforms, and structured-data consumers.

## Features

* **SEO**

  * Page title
  * Meta description
  * Canonical URL
  * Robots directives
  * Document language
  * Character counts for title and description

* **Open Graph**

  * Title
  * Description
  * URL
  * Type
  * Image preview

* **Twitter / X**

  * Card type
  * Title
  * Description
  * Image preview

* **Schema.org / JSON-LD**

  * Detected `@type` values
  * `@context`
  * JSON-LD blocks
  * Schema entities and properties
  * `@graph` validation
  * Recommended property checks
  * Raw JSON-LD inspection

* **Technical**

  * HTTP status
  * Content type
  * Content length

* **Validation & suggestions**

  * Missing metadata
  * Invalid URLs
  * Missing recommended Schema.org properties
  * Other metadata improvements

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Base UI
* Lucide
* Cheerio

## Getting Started

### Prerequisites

* Node.js
* pnpm

### Installation

Clone the repository and install dependencies:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000.

### Production

Create a production build:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## How It Works

META.DEV follows a simple analysis pipeline:

```text
URL
 ↓
Fetch page
 ↓
Parse HTML
 ↓
Extract metadata
 ├── SEO
 ├── Open Graph
 ├── Twitter / X
 ├── Schema.org / JSON-LD
 └── Technical information
 ↓
Validate
 ↓
Display results
```

The analyzer is designed to provide useful developer-facing information without requiring a browser extension or manually inspecting the page source.

## Project Structure

```text
app/
├── api/
│   └── analyze/
└── analyze/

components/
└── analyzer/
    ├── results/
    └── ...

lib/
└── ...

types/
├── analysis.ts
├── schema.ts
└── suggestions.ts
```

## Status

META.DEV is an actively developed project focused on providing a clean and practical way to inspect web metadata and structured data.

## License

This project is currently private and not licensed for redistribution.
