import React from "react";

export const TERMS_SECTIONS = [
  {
    id: "definitions",
    number: "1",
    title: "Definitions",
    content: (
      <>
        <p className="mb-2">
          “MeetMind” refers to the MeetMind platform, SDK, APIs, website,
          applications, and related services.
        </p>
        <p className="mb-2">
          “User” means any individual or organization using MeetMind.
        </p>
        <p className="mb-2">
          “Customer Data” means all data, audio, transcripts, documents,
          prompts, metadata, and content submitted to MeetMind by users.
        </p>
        <p>
          “Services” means all MeetMind products and features, including the web
          platform, APIs, SDKs, integrations, and AI participation systems.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    number: "2",
    title: "Eligibility",
    content: (
      <>
        <p className="mb-2">You must:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Be at least 18 years old</li>
          <li>
            Have authority to bind your organization if using MeetMind on behalf
            of a company
          </li>
          <li>
            Use the Services only in compliance with applicable laws and
            regulations
          </li>
          <li>
            You may not use MeetMind if you are prohibited from using similar
            services under applicable law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "account-registration",
    number: "3",
    title: "Account Registration",
    content: (
      <>
        <p className="mb-2 font-medium">
          To access certain features, you must create an account.
        </p>
        <p className="mb-2">You agree to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide accurate and complete information</li>
          <li>Keep your credentials secure</li>
          <li>Notify MeetMind immediately of unauthorized access</li>
          <li>You are responsible for all activity under your account.</li>
        </ul>
      </>
    ),
  },
  {
    id: "acceptable-use",
    number: "4",
    title: "Acceptable Use",
    content: (
      <>
        <p className="mb-2">You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Use MeetMind for unlawful purposes</li>
          <li>Record or monitor meetings without required consent</li>
          <li>Upload malicious code or harmful content</li>
          <li>Attempt to reverse engineer or disrupt the Services</li>
          <li>
            Use MeetMind to generate spam, harassment, fraud, or abusive
            behavior
          </li>
          <li>Circumvent rate limits, security systems, or access controls</li>
          <li>
            You remain responsible for ensuring your use complies with local
            recording and privacy laws.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ai-participation",
    number: "5",
    title: "AI Participation Disclosure",
    content: (
      <>
        <p className="mb-2 font-medium">
          MeetMind provides AI-generated outputs and voice participation
          features.
        </p>
        <p className="mb-2">You acknowledge:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>AI responses may be inaccurate or incomplete</li>
          <li>
            AI-generated summaries should be reviewed before relying on them
          </li>
          <li>MeetMind does not guarantee factual correctness of AI outputs</li>
          <li>
            Users are responsible for decisions made based on AI-generated
            content
          </li>
          <li>
            You are responsible for informing meeting participants when an AI
            agent joins or participates in a session where disclosure is legally
            required.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "customer-data",
    number: "6",
    title: "Customer Data and Privacy",
    content: (
      <>
        <p className="mb-2">You retain ownership of your Customer Data.</p>
        <p className="mb-2">
          By using MeetMind, you grant MeetMind a limited license to:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Process Customer Data to provide the Services</li>
          <li>Generate transcripts, summaries, and structured outputs</li>
          <li>Maintain platform security and reliability</li>
          <li>
            MeetMind will not sell Customer Data to advertisers or third
            parties.
          </li>
        </ul>
        <p className="mb-2 font-medium mt-4">MeetMind implements:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Encryption in transit and at rest</li>
          <li>Session-scoped storage policies</li>
          <li>Automatic audio buffer purging after session completion</li>
          <li>
            Data handling practices are governed by the MeetMind Privacy Policy.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sdk-api",
    number: "7",
    title: "SDK and API Usage",
    content: (
      <>
        <p className="mb-2">If you use the MeetMind SDK or APIs:</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>
            You may build commercial and non-commercial applications using the
            Services
          </li>
          <li>
            You may not resell access to MeetMind APIs without authorization
          </li>
          <li>
            You may not use the SDK to build competing infrastructure services
          </li>
        </ul>
        <p className="mb-2 font-medium mt-4">MeetMind may impose:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Rate limits</li>
          <li>Usage quotas</li>
          <li>Authentication requirements</li>
          <li>API keys are confidential and must not be shared publicly.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    number: "8",
    title: "Third-Party Integrations",
    content: (
      <>
        <p className="mb-2">
          MeetMind integrates with third-party platforms including:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Zoom</li>
          <li>Google Meet</li>
          <li>
            Your use of those services remains subject to their own terms and
            privacy policies.
          </li>
        </ul>
        <p className="mb-2 font-medium mt-4">
          MeetMind is not responsible for:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Third-party outages</li>
          <li>API changes</li>
          <li>Platform restrictions</li>
          <li>Authentication failures outside MeetMind&apos;s control</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    number: "9",
    title: "Intellectual Property",
    content: (
      <>
        <p className="mb-2">
          MeetMind retains all rights, title, and interest in:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>The platform</li>
          <li>SDKs</li>
          <li>APIs</li>
          <li>Documentation</li>
          <li>Branding</li>
          <li>AI infrastructure</li>
          <li>Software and models</li>
          <li>These Terms do not grant ownership rights to users.</li>
          <li>
            You retain ownership of your uploaded content and business data.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "open-source",
    number: "10",
    title: "Open Source Components",
    content: (
      <>
        <p className="mb-2">
          Some MeetMind components may be released under open-source licenses.
        </p>
        <p className="mb-2">
          Open-source components remain governed by their respective licenses.
        </p>
        <p>
          Where conflicts exist, the applicable open-source license controls for
          that component.
        </p>
      </>
    ),
  },
  {
    id: "subscription-billing",
    number: "11",
    title: "Subscription and Billing",
    content: (
      <>
        <p className="mb-2">Paid plans may include:</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Usage-based billing</li>
          <li>Subscription fees</li>
          <li>API consumption charges</li>
        </ul>
        <p className="mb-2 font-medium mt-4">Fees are:</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Non-refundable except where required by law</li>
          <li>Subject to change with reasonable notice</li>
        </ul>
        <p>Failure to pay may result in suspension or termination of access.</p>
      </>
    ),
  },
  {
    id: "governing-law",
    number: "12",
    title: "Governing Law and Dispute Resolution",
    content: (
      <>
        <p className="mb-2">
          These Terms are governed by the laws of the Federal Republic of
          Nigeria, unless otherwise required by applicable law.
        </p>
        <p>Disputes shall be resolved in courts located in Lagos, Nigeria.</p>
      </>
    ),
  },
  {
    id: "data-retention",
    number: "13",
    title: "Data Retention",
    content: (
      <>
        <p className="mb-2">MeetMind may:</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Store session outputs for account access</li>
          <li>Automatically purge temporary processing buffers</li>
          <li>
            Delete inactive accounts or expired data according to retention
            policies
          </li>
        </ul>
        <p>Users are responsible for exporting important records.</p>
      </>
    ),
  },
  {
    id: "security",
    number: "14",
    title: "Security",
    content: (
      <>
        <p className="mb-2">
          MeetMind uses commercially reasonable safeguards to protect data.
        </p>
        <p className="mb-2">
          However, no internet-based system is fully secure.
        </p>
        <p>You acknowledge the inherent risks of transmitting data online.</p>
      </>
    ),
  },
  {
    id: "confidentiality",
    number: "15",
    title: "Confidentiality",
    content: (
      <>
        <p className="mb-2">
          MeetMind will treat Customer Data as confidential except:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>When disclosure is required by law</li>
          <li>To prevent fraud or abuse</li>
          <li>With user authorization</li>
        </ul>
        <p>
          Users must also maintain confidentiality of non-public platform
          information.
        </p>
      </>
    ),
  },
  {
    id: "prohibited-industries",
    number: "16",
    title: "Prohibited Industries",
    content: (
      <>
        <p className="mb-2">You may not use MeetMind for:</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Illegal surveillance</li>
          <li>Unauthorized wiretapping</li>
          <li>Harmful or deceptive impersonation</li>
          <li>Biometric profiling without consent</li>
          <li>High-risk illegal activities</li>
        </ul>
        <p>MeetMind may suspend accounts engaged in prohibited use.</p>
      </>
    ),
  },
  {
    id: "disclaimer",
    number: "17",
    title: "Disclaimer of Warranties",
    content: (
      <>
        <p className="mb-2">
          MeetMind is provided &quot;as is&quot; and &quot;as available.&quot;
        </p>
        <p className="mb-2 font-medium mt-4">
          MeetMind disclaims all warranties including:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Merchantability</li>
          <li>Fitness for a particular purpose</li>
          <li>Non-infringement</li>
          <li>Accuracy of AI-generated outputs</li>
        </ul>
        <p className="mb-2 font-medium mt-4">MeetMind does not guarantee:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Continuous uptime</li>
          <li>Perfect transcription accuracy</li>
          <li>Error-free operation</li>
        </ul>
      </>
    ),
  },
  {
    id: "limitation",
    number: "18",
    title: "Limitation of Liability",
    content: (
      <>
        <p className="mb-2">
          To the maximum extent permitted by law, MeetMind will not be liable
          for:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>Indirect damages</li>
          <li>Lost profits</li>
          <li>Business interruption</li>
          <li>Loss of data</li>
          <li>AI-generated inaccuracies</li>
          <li>Third-party platform failures</li>
        </ul>
        <p>
          MeetMind&apos;s total liability will not exceed the amount paid by the
          user in the previous 12 months.
        </p>
      </>
    ),
  },
  {
    id: "changes-contact",
    number: "19",
    title: "Changes to Terms & Contact",
    content: (
      <>
        <p className="mb-2">MeetMind may update these Terms periodically.</p>
        <p className="mb-2">Material changes will be communicated through:</p>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          <li>Email</li>
          <li>Platform notifications</li>
          <li>Website updates</li>
        </ul>
        <p className="mb-4">
          Continued use after updates constitutes acceptance of the revised
          Terms.
        </p>
        <p className="font-medium">For legal or support inquiries:</p>
        <p>Email: legal@meetmind.ai</p>
        <p>Website: MeetMind</p>
      </>
    ),
  },
];
