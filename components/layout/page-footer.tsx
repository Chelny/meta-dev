import Link from "next/link";

export function PageFooter() {
  return (
    <footer className="mt-auto pt-16">
      <div className="flex flex-col gap-4 border-t pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <span>SEO</span>
          <span>SOCIAL</span>
          <span>SCHEMA</span>
          <span>TECHNICAL</span>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </Link>

          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </Link>

          <span>© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}</span>
        </div>
      </div>
    </footer>
  );
}