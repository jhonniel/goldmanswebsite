import { ArrowLeft } from "lucide-react";
import { company, companyAddressLines } from "../config/company";

const collectedDetails = [
  "Full name",
  "Email address",
  "Telephone number",
  "Company or organization",
  "Subject and content of your inquiry",
  "Other information you choose to provide",
];

const technicalDetails = [
  "IP address",
  "Browser and device type",
  "Pages visited",
  "Date and time of access",
  "Referring website",
  "Basic website usage information",
];

const uses = [
  "Respond to questions, quotations, and service inquiries",
  "Communicate regarding our products and services",
  "Process requests from clients and potential clients",
  "Improve the performance, security, and usability of our website",
  "Maintain business and communication records",
  "Prevent fraud, abuse, or unauthorized access",
  "Comply with legal and regulatory obligations",
];

const shareWith = [
  "Authorized company personnel",
  "Service providers supporting website hosting, email, security, or communications",
  "Professional advisers where necessary",
  "Government authorities when required by law or a valid legal process",
];

const retention = [
  "Respond to and manage inquiries",
  "Maintain appropriate business records",
  "Fulfill contractual or operational requirements",
  "Comply with legal and regulatory obligations",
  "Resolve disputes and protect legitimate business interests",
];

const rights = [
  "Access personal information held about you",
  "Correct inaccurate or incomplete information",
  "Object to or restrict certain processing activities",
  "Withdraw consent where processing is based on consent",
  "Request deletion or blocking of information, when legally applicable",
  "Obtain information regarding how your data has been processed",
  "File a complaint with the National Privacy Commission",
];

export default function Privacy() {
  return (
    <section
      id="privacy"
      className="relative min-h-[70vh] scroll-mt-24 pt-[calc(5.25rem+env(safe-area-inset-top,0px))] pb-16 sm:pt-32 sm:pb-24"
    >
      <div className="container-page max-w-3xl">
        <a
          href="#home"
          className="inline-flex items-center gap-2 text-sm text-gold-bright hover:underline"
        >
          <ArrowLeft size={16} strokeWidth={1.7} />
          Back to Home
        </a>
        <p className="mt-8 text-[11px] tracking-[0.18em] text-gold-bright">
          PRIVACY POLICY
        </p>
        <h1 className="mt-4 text-[1.75rem] font-normal tracking-[-0.03em] text-ink sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Effective Date: {company.privacyEffectiveDate}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-ink-muted">
          Goldman’s Supply Corporation respects your privacy and is committed
          to protecting the personal information you provide through this
          website.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          This Privacy Policy explains how we collect, use, store, and protect
          information when you visit our website, submit an inquiry, or
          communicate with us through our online contact channels.
        </p>

        <h2 className="mt-10 text-xl text-ink">1. Information We Collect</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We may collect information that you voluntarily provide, including:
        </p>
        <List items={collectedDetails} />
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Our website may also automatically collect limited technical
          information, such as:
        </p>
        <List items={technicalDetails} />

        <h2 className="mt-10 text-xl text-ink">2. How We Use Your Information</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We may use the information collected to:
        </p>
        <List items={uses} />
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          We will not use your personal information for purposes that are
          materially different from those described in this policy without
          providing appropriate notice or obtaining consent when required.
        </p>

        <h2 className="mt-10 text-xl text-ink">3. Products and Services</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Goldman’s Supply Corporation provides supplies, equipment,
          procurement support, technology solutions, website development,
          information systems, and mobile application development.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Mobile applications or digital platforms developed or operated by
          Goldman’s Supply Corporation may have separate privacy policies
          based on their features, users, and information-processing
          activities. This website Privacy Policy does not automatically
          replace the privacy policy applicable to a specific mobile
          application or client system.
        </p>

        <h2 className="mt-10 text-xl text-ink">4. Legal Basis and Consent</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          By submitting information through our website, you consent to its
          collection and processing for the purposes described in this Privacy
          Policy.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We process personal information in accordance with applicable
          Philippine laws, including Republic Act No. 10173, or the Data
          Privacy Act of 2012, and its implementing rules and regulations.
        </p>

        <h2 className="mt-10 text-xl text-ink">5. Sharing of Information</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We do not sell or rent personal information.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We may share information only when reasonably necessary with:
        </p>
        <List items={shareWith} />
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Service providers are expected to process information only for
          authorized purposes and apply appropriate safeguards.
        </p>

        <h2 className="mt-10 text-xl text-ink">6. Data Retention</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We retain personal information only for as long as necessary to:
        </p>
        <List items={retention} />
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Information that is no longer necessary will be securely deleted,
          anonymized, or disposed of when reasonably practicable.
        </p>

        <h2 className="mt-10 text-xl text-ink">7. Data Security</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We apply reasonable organizational, administrative, and technical
          safeguards designed to protect personal information against
          unauthorized access, disclosure, alteration, loss, misuse, or
          destruction.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          However, no website, email service, or internet transmission can be
          guaranteed to be completely secure.
        </p>

        <h2 className="mt-10 text-xl text-ink">8. Cookies and Analytics</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Our website may use essential cookies required for security and
          proper website operation. We may also use limited analytics
          technologies to understand general website usage and improve our
          services.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          If non-essential cookies or analytics are introduced, appropriate
          notice and consent options will be provided when required.
        </p>

        <h2 className="mt-10 text-xl text-ink">9. Third-Party Links</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Our website may contain links to websites or services operated by
          third parties. Goldman’s Supply Corporation is not responsible for
          the content, security, or privacy practices of those third-party
          services. Users should review their respective privacy policies
          before providing personal information.
        </p>

        <h2 className="mt-10 text-xl text-ink">10. Your Privacy Rights</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Subject to applicable law, you may request to:
        </p>
        <List items={rights} />
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Requests may be subject to identity verification and applicable legal
          limitations.
        </p>

        <h2 className="mt-10 text-xl text-ink">11. Children’s Privacy</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          This corporate website is not intentionally directed toward children.
          We do not knowingly collect personal information from children
          through this website without appropriate consent or legal authority.
        </p>

        <h2 className="mt-10 text-xl text-ink">12. Changes to This Policy</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          We may update this Privacy Policy to reflect changes in our
          operations, services, technologies, or legal obligations. The revised
          version will be posted on this page with an updated effective date.
        </p>

        <h2 className="mt-10 text-xl text-ink">13. Contact Us</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          For privacy-related questions, concerns, or requests, please contact:
        </p>
        <address className="mt-4 not-italic text-sm leading-relaxed text-ink">
          <p className="font-medium">{company.name}</p>
          <p className="mt-1 text-ink-muted">{company.dbaPhrase}</p>
          {companyAddressLines().map((line) => (
            <p key={line} className="mt-1 text-ink-muted">
              {line}
            </p>
          ))}
          <p className="mt-3 text-ink-muted">
            Email:{" "}
            <a
              className="text-gold-bright underline underline-offset-2"
              href={`mailto:${company.email}`}
            >
              {company.email}
            </a>
          </p>
          <p className="mt-1 text-ink-muted">
            Telephone:{" "}
            <a
              className="text-gold-bright underline underline-offset-2"
              href={`tel:${company.phone.replace(/\s/g, "")}`}
            >
              {company.phone}
            </a>
          </p>
        </address>
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-muted">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
