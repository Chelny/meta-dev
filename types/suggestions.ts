export type SuggestionSeverity = "error" | "warning" | "info";

export type Suggestion = {
  id: string;
  severity: SuggestionSeverity;
  title: string;
  description: string;
  recommendation: string;
};