import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets:['latin'],variable:'--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${process.env.NEXT_PUBLIC_APP_NAME?.toUpperCase()} — Web Metadata Inspector`,
    template: `%s — ${process.env.NEXT_PUBLIC_APP_NAME?.toUpperCase()}`,
  },
  description:
    "Inspect SEO, social metadata, Schema.org structured data, and technical information from any URL.",
  applicationName: process.env.NEXT_PUBLIC_APP_NAME?.toUpperCase(),
  keywords: [
    "web metadata inspector",
    "SEO analyzer",
    "Open Graph",
    "Schema.org",
    "JSON-LD",
    "metadata analyzer",
  ],
  authors: [{ name: "Chelny Duplan" }],
  creator: "Chelny Duplan",
  metadataBase: new URL(process.env.APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: `{"${process.env.NEXT_PUBLIC_APP_NAME?.toUpperCase()}"} — Web Metadata Inspector`,
    description:
      "Inspect SEO, social metadata, Schema.org structured data, and technical information from any URL.",
    siteName: process.env.NEXT_PUBLIC_APP_NAME?.toUpperCase(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `{"${process.env.NEXT_PUBLIC_APP_NAME?.toUpperCase()}"} — Web Metadata Inspector`,
    description:
      "Inspect SEO, social metadata, Schema.org structured data, and technical information from any URL.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
