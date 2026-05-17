import TableOfContents from './TableOfContents';
import PolicySection from './PolicySection';
import ContactCTA from './ContactCTA';

export default function ContentContainer() {
  return (
    <section className="px-4 md:px-6 max-w-7xl mx-auto w-full mb-20 overflow-visible">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 relative">
        {/* Left Column: Table of Contents */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start h-fit">
          <TableOfContents />
        </aside>

        {/* Right Column: Policy Content */}
        <div className="flex-1 w-full">
          <PolicySection id="introduction" number={1} title="Introduction">
            <p>
              MeetMind is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our website, SDK, and AI voice
              participation services. Please read this privacy policy carefully.
              If you do not agree with the terms of this privacy policy, please
              do not access the site or use our services.
            </p>
          </PolicySection>

          <PolicySection
            id="information-collection"
            number={2}
            title="Information Collection"
          >
            <p>
              We collect information from you when you visit our site, register
              on our platform, or use our services. The types of information we
              may collect include your name, email address, phone number, and
              usage data.
            </p>
          </PolicySection>

          <PolicySection
            id="use-of-information"
            number={3}
            title="Use of Information"
          >
            <p>
              We may use the information we collect for various purposes,
              including to provide and maintain our services, notify you about
              changes, provide customer support, gather analysis or valuable
              information so that we can improve our services.
            </p>
          </PolicySection>

          <PolicySection
            id="information-disclosure"
            number={4}
            title="Information Disclosure"
          >
            <p>
              We do not sell or rent your personal information to third parties.
              We may share your information with trusted third parties who
              assist us in operating our website, conducting our business, or
              servicing you, as long as those parties agree to keep this
              information confidential.
            </p>
          </PolicySection>

          <PolicySection id="data-security" number={5} title="Data Security">
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information. However, no method of transmission
              over the internet or method of electronic storage is 100% secure.
            </p>
          </PolicySection>

          <PolicySection
            id="changes-to-policy"
            number={6}
            title="Changes to This Policy"
          >
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              You are advised to review this Privacy Policy periodically for any
              changes.
            </p>
          </PolicySection>

          <ContactCTA />
        </div>
      </div>
    </section>
  );
}
