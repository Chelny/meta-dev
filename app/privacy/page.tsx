import type { Metadata } from "next";
import { PageBackground } from "@/components/layout/page-background";
import { PageFooter } from "@/components/layout/page-footer";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${process.env.NEXT_PUBLIC_APP_NAME?.toUpperCase()}.`,
};

export default function PrivacyPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden px-6 py-8">
      <PageBackground />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <PageHeader />

        <div className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: October 5, 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7">
            <section>
              <h2 className="text-lg font-semibold">1. Overview</h2>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
                is a web-based tool that analyzes metadata and structured
                data from publicly accessible web pages. This Privacy Policy
                explains how information may be processed when you use the service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">2. Information You Submit</h2>
              <p className="mt-2">
                When you use <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>, you may submit a URL for analysis. The URL
                and information retrieved from the corresponding web page may be
                processed by <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> in order to provide the requested analysis.
              </p>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> does not require you to create an account to use the
                service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">3. How Information Is Used</h2>
              <p className="mt-2">
                Information submitted to <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> is used to perform the requested
                metadata analysis, including analysis of SEO metadata, Open Graph data, Twitter/X metadata, Schema.org structured data, and technical information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">4. Data Retention</h2>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> is designed to analyze submitted URLs without requiring
                permanent storage of the analyzed page content. However, technical logs may be retained for security, debugging, reliability, and operational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">5. Third-Party Services</h2>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> may use third-party infrastructure or hosting services to
                operate the application. Such services may process technical information necessary to provide and secure the service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">6. Security</h2>
              <p className="mt-2">
                Reasonable measures are used to protect information processed by <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>. However, no internet service can guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">7. Your Rights</h2>
              <p className="mt-2">
                Depending on where you live, you may have rights regarding personal
                information, including rights to access, correct, or request
                deletion of personal information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">8. Changes to This Policy</h2>
              <p className="mt-2">
                This Privacy Policy may be updated from time to time. The updated
                version will be published on this page with a revised update date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">9. Contact</h2>
              <p className="mt-2">
                For questions regarding this Privacy Policy, please contact <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="underline">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</a>.
              </p>
            </section>
          </div>
        </div>

        <PageFooter />
      </div>
    </main>
  );
}