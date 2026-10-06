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
            Last updated: October 6, 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7">
            <section>
              <h2 className="text-lg font-semibold">1. Overview</h2>
              <p className="mt-2">
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                is a web-based tool operated by Chelny Duplan that analyzes
                metadata and structured data from publicly accessible web
                pages.
              </p>
              <p className="mt-2">
                This Privacy Policy explains what information may be processed
                when you use the service and how that information may be used.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                2. Information You Submit
              </h2>
              <p className="mt-2">
                When you use{" "}
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>
                , you may submit a URL for analysis. The submitted URL and
                information retrieved from the corresponding web page may be
                processed in order to provide the requested analysis.
              </p>
              <p className="mt-2">
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                does not currently require you to create an account to use the
                service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                3. Information Collected Automatically
              </h2>
              <p className="mt-2">
                When you access the service, technical information may be
                processed by the application or its hosting and infrastructure
                providers. This may include information such as IP address,
                browser or device information, timestamps, request information,
                and error or diagnostic information.
              </p>
              <p className="mt-2">
                This information may be used for security, debugging,
                reliability, performance, and operational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                4. How Information Is Used
              </h2>
              <p className="mt-2">
                Information processed by{" "}
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                may be used to:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>perform the requested metadata analysis;</li>
                <li>operate and maintain the service;</li>
                <li>detect and prevent abuse or security issues;</li>
                <li>diagnose errors and improve reliability; and</li>
                <li>comply with applicable legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">5. Data Retention</h2>
              <p className="mt-2">
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                is designed to analyze submitted URLs without requiring
                permanent storage of the analyzed page content.
              </p>
              <p className="mt-2">
                Technical logs or other operational information may be retained
                for a limited period when reasonably necessary for security,
                debugging, reliability, legal compliance, or other legitimate
                operational purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                6. Cookies and Similar Technologies
              </h2>
              <p className="mt-2">
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                does not currently use advertising cookies or third-party
                analytics cookies.
              </p>
              <p className="mt-2">
                The service or its infrastructure providers may use technologies
                that are necessary for security, functionality, or reliable
                operation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                7. Third-Party Services
              </h2>
              <p className="mt-2">
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>{" "}
                may use third-party hosting, infrastructure, networking, or
                other services necessary to operate the application.
              </p>
              <p className="mt-2">
                These providers may process technical information or other
                information necessary to provide their services. Where
                applicable, information may be processed in jurisdictions
                outside Québec or Canada.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">8. Security</h2>
              <p className="mt-2">
                Reasonable technical and organizational measures are used to
                protect information processed by{" "}
                <span className="uppercase">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>
                . However, no internet service or transmission can guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">9. Your Privacy Rights</h2>
              <p className="mt-2">
                Depending on where you live, you may have rights regarding your
                personal information, including rights to access, correct, or
                request deletion of personal information, subject to applicable
                law.
              </p>
              <p className="mt-2">
                To make a privacy-related request, please contact us using the
                contact information below. We may need to verify your identity
                before responding to certain requests.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                10. Changes to This Policy
              </h2>
              <p className="mt-2">
                This Privacy Policy may be updated from time to time. The
                updated version will be published on this page with a revised
                update date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">11. Contact</h2>
              <p className="mt-2">
                For questions or requests regarding this Privacy Policy, please
                contact{" "}
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
