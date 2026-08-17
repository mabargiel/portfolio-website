import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/site";
import { Section } from "./Section";

export function Contact() {
  return (
    <Section
      id="contact"
      tag="contact"
      title="Have a project in mind?"
      sub="One email. You will know within a day if I am the right fit."
      note="// response_time < 24h"
    >
      <a
        href={`mailto:${EMAIL}`}
        className="font-display text-mail text-gold hover:border-gold reveal inline-block border-b-2 border-transparent font-medium transition-colors"
      >
        {EMAIL}
      </a>

      <ul className="text-meta text-text-3 reveal mt-10 flex flex-wrap gap-x-7 gap-y-2 font-mono">
        <li>
          <a
            href={GITHUB_URL}
            className="text-text-2 hover:text-gold transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/mabargiel
          </a>
        </li>
        <li>
          <a
            href={LINKEDIN_URL}
            className="text-text-2 hover:text-gold transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/mbargiel
          </a>
        </li>
        <li>CET · remote-first · EU invoicing</li>
      </ul>
    </Section>
  );
}
