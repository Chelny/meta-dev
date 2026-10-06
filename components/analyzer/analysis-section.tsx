"use client";

type AnalysisSectionProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AnalysisSection({
  icon: Icon,
  title,
  description,
  children,
}: AnalysisSectionProps) {
  return (
    <section className="rounded-xl border bg-background/80 p-6 shadow-xl backdrop-blur-xl">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
          <Icon className="size-4 text-muted-foreground" />
        </div>

        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      <div>{children}</div>
    </section>
  );
}
