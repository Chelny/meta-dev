import type { SchemaBlock } from "@/types/schema";
import type { Suggestion } from "@/types/suggestions";

export type MetaValue = {
  value: string | null;
  exists: boolean;
};

export type PageAnalysis = {
  url: string;

  seo: {
    title: MetaValue;
    description: MetaValue;
    canonical: MetaValue;
    robots: MetaValue;
    language: MetaValue;
  };

  openGraph: {
    title: MetaValue;
    description: MetaValue;
    image: MetaValue;
    url: MetaValue;
    type: MetaValue;
  };

  twitter: {
    card: MetaValue;
    title: MetaValue;
    description: MetaValue;
    image: MetaValue;
  };

  schema: {
    types: string[];
    blocks: SchemaBlock[];
  };

  technical: {
    status: number;
    contentType: string | null;
    contentLength: string | null;
    finalUrl: string;
  };

  suggestions: Suggestion[];
};