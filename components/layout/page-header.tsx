import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PageHeader() {
  return (
    <header className="flex items-center justify-between">
      <Link
        href="/"
        className="text-sm font-semibold uppercase tracking-tight transition-opacity hover:opacity-70"
      >
        {process.env.NEXT_PUBLIC_APP_NAME}
      </Link>

      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Home
      </Link>
    </header>
  );
}