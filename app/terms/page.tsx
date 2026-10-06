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
            Last updated: October 6, 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7">
            <section>
              <h2 className="text-lg font-semibold">
                1. Acceptance of These Terms
              </h2>
              <p className="mt-2">
                By accessing or using{" "}
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>
                , you agree to these Terms of Use. If you do not agree with
                these terms, please do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                2. Description of the Service
              </h2>
              <p className="mt-2">
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                is a web-based tool that analyzes publicly accessible web
                pages and displays information such as SEO metadata, social
                metadata, Schema.org structured data, and technical information.
              </p>
              <p className="mt-2">
                The service is provided for informational and development
                purposes and does not guarantee that the information displayed
                is complete, accurate, current, or suitable for a particular
                purpose.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">3. Acceptable Use</h2>
              <p className="mt-2">
                You agree to use{" "}
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                only for lawful purposes and in a manner that does not
                interfere with the operation or security of the service.
              </p>
              <p className="mt-2">
                You must not use the service to send abusive, excessive,
                malicious, automated, or otherwise harmful requests to
                third-party websites or infrastructure.
              </p>
              <p className="mt-2">
                You are responsible for ensuring that you have the right to
                submit any URL you analyze and that your use of the service
                complies with applicable laws and third-party terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">4. Accuracy of Results</h2>
              <p className="mt-2">
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                provides automated analysis for informational purposes.
                Results may be incomplete, inaccurate, outdated, or affected by
                the configuration, accessibility, or availability of the
                analyzed website.
              </p>
              <p className="mt-2">
                The service should not be relied upon as a substitute for
                professional SEO, technical, legal, security, or business
                advice.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">5. Availability</h2>
              <p className="mt-2">
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                is provided on an availability basis. The service may be
                modified, interrupted, suspended, or discontinued at any time,
                with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                6. Intellectual Property
              </h2>
              <p className="mt-2">
                The{" "}
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                application, interface, branding, and original content are
                protected by applicable intellectual property laws. These Terms
                do not grant you ownership of the service or its original
                content.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                7. Third-Party Websites and Content
              </h2>
              <p className="mt-2">
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                may retrieve information from websites operated by third
                parties. The service does not control those websites and is not
                responsible for their content, availability, accuracy,
                security, or policies.
              </p>
              <p className="mt-2">
                Analyzed websites are independent third parties. Their
                appearance in the service does not imply affiliation,
                sponsorship, or endorsement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">8. Disclaimer</h2>
              <p className="mt-2">
                To the extent permitted by applicable law,{" "}
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                is provided on an “as is” and “as available” basis, without
                warranties or guarantees regarding the completeness, accuracy,
                reliability, suitability, or availability of the service or
                its results.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                9. Limitation of Liability
              </h2>
              <p className="mt-2">
                To the maximum extent permitted by applicable law, the operator
                of{" "}
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                will not be liable for losses or damages arising from or
                related to your use of, or inability to use, the service or its
                analysis results.
              </p>
              <p className="mt-2">
                Nothing in these Terms is intended to exclude or limit any
                liability or rights that cannot lawfully be excluded or limited
                under applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                10. Changes to These Terms
              </h2>
              <p className="mt-2">
                These Terms of Use may be updated from time to time. The updated
                version will be published on this page with a revised update
                date. Your continued use of the service after an update means
                that you accept the revised Terms, to the extent permitted by
                applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">11. Contact</h2>
              <p className="mt-2">
                For questions regarding these Terms of Use, please contact{" "}
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                  className="underline"
                >
                  {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
        </div>

        <PageFooter />
      </div>
    </main>
  );
}
