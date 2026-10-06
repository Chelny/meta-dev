"use client";

import Link from "next/link";
import { ArrowUpRight, Braces, Code2, Search, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { PageFooter } from "@/components/layout/page-footer";

const previewCards = [
  {
    icon: Search,
    label: "SEO",
    value: "Title · Description · Canonical",
  },
  {
    icon: Share2,
    label: "SOCIAL",
    value: "Open Graph · Twitter Cards",
  },
  {
    icon: Braces,
    label: "SCHEMA",
    value: "@context · @type · @graph",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <motion.div
          className="absolute left-1/2 -top-70 h-150 w-225 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="text-sm font-semibold uppercase tracking-tight">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </div>

          <a
            href="https://github.com/Chelny/meta-dev"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.header>

        {/* Hero */}
        <div className="flex flex-1 items-center justify-center py-20">
          <div className="w-full max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 flex items-center justify-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>

                <span className="text-sm font-medium tracking-wide text-muted-foreground">
                  WEB METADATA INSPECTOR
                </span>
              </div>

              <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-7xl lg:text-8xl">
                Understand what your
                <br />
                <span className="bg-linear-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                  website says to the web.
                </span>
              </h1>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Inspect SEO metadata, Open Graph, social cards, Schema.org
                structured data, and technical information from any URL.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10"
            >
              <Link
                href="/analyze"
                className="group inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Search className="size-4" />
                Analyze a website
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Preview cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {previewCards.map((card) => (
                <PreviewCard key={card.label} {...card} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground/60"
            >
              <Code2 className="size-3.5" />
              <span>Built for developers</span>
              <span>·</span>
              <span>No account required</span>
            </motion.div>
          </div>
        </div>

        <PageFooter />
      </section>
    </main>
  );
}

function PreviewCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Search;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group rounded-xl border bg-background/50 p-4 text-left backdrop-blur-sm transition-colors hover:bg-muted/40"
    >
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md border bg-muted/50">
          <Icon className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
        </div>

        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-3 truncate text-xs text-muted-foreground">
        {value}
      </p>
    </motion.div>
  );
}