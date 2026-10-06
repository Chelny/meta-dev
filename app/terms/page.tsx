import type { Metadata } from "next";
import { PageBackground } from "@/components/layout/page-background";
import { PageFooter } from "@/components/layout/page-footer";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${process.env.NEXT_PUBLIC_APP_NAME?.toUpperCase()}.`,
};

export default function TermsPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden px-6 py-8">
      <PageBackground />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col">
        <PageHeader />

        <div className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Terms of Use
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: October 5, 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7">
            <section>
              <h2 className="text-lg font-semibold">1. Acceptance of These Terms</h2>
              <p className="mt-2">
                By accessing or using <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>, you agree to these Terms of Use.
                If you do not agree with these terms, please do not use the
                service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">2. Description of the Service</h2>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> is a web-based tool that analyzes publicly accessible web
                pages and displays information such as SEO metadata, social
                metadata, Schema.org structured data, and technical information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">3. Acceptable Use</h2>
              <p className="mt-2">
                You agree to use <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> only for lawful purposes and in a manner
                that does not interfere with the operation of the service.
              </p>
              <p className="mt-2">
                You must not use <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> to conduct abusive, automated, excessive,
                or otherwise harmful requests against websites or infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">4. Accuracy of Results</h2>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> provides automated analysis for informational purposes.
                Results may be incomplete, inaccurate, outdated, or affected by
                the configuration or availability of the analyzed website.
              </p>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> should not be relied upon as a substitute for professional
                SEO, technical, legal, security, or business advice.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">5. Availability</h2>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> is provided on an availability basis. The service may be
                modified, interrupted, suspended, or discontinued at any time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">6. Intellectual Property</h2>
              <p className="mt-2">
                The <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> application, interface, branding, and original
                content are protected by applicable intellectual property laws.
                These Terms do not grant you ownership of the service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">7. Third-Party Websites</h2>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> may retrieve information from websites operated by third
                parties. <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> does not control those websites and is not
                responsible for their content, availability, or policies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">8. Disclaimer</h2>
              <p className="mt-2">
                <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> is provided on an “as is” and “as available” basis, to the
                extent permitted by applicable law. No guarantee is made regarding
                the completeness, accuracy, reliability, or availability of the
                service or its results.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">9. Limitation of Liability</h2>
              <p className="mt-2">
                To the maximum extent permitted by applicable law, the owner of <span className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span> will not be liable for losses or damages arising from the
                use of, or inability to use, the service or its analysis results.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">10. Changes to These Terms</h2>
              <p className="mt-2">
                These Terms of Use may be updated from time to time. The updated
                version will be published on this page with a revised update date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">11. Contact</h2>
              <p className="mt-2">
                For questions regarding these Terms of Use, please contact <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="underline">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</a>.
              </p>
            </section>
          </div>
        </div>

        <PageFooter />
      </div>
    </main>
  );
}