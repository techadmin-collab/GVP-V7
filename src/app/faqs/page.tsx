import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Split from '@/components/ui/Split';
import FaqAccordion from '@/components/ui/FaqAccordion';
import CtaBanner from '@/components/ui/CtaBanner';
import { SectionHeading } from '@/components/ui/Section';
import { faqs } from '@/lib/faqs';
import { colors } from '@/theme/tokens';

export const metadata: Metadata = {
  title: 'FAQs for Government',
  description: 'Straight answers on investment, revenue, data ownership, policy control, procurement and handover.',
};

// FAQPage structured data helps search engines show answers directly
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function FaqsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero overline="FAQs for Government" title="Straight answers to the questions officials ask first." />

      <Section tone="surface">
        <Split
          ratio="4fr 8fr"
          left={
            <>
              <SectionHeading overline="Questions" title="Investment, control and handover" />
              <Typography variant="body2" sx={{ color: colors.muted }}>
                Can&apos;t find your question? Our government team will answer it in a confidential briefing.
              </Typography>
            </>
          }
          right={<FaqAccordion items={faqs} />}
        />
      </Section>

      <CtaBanner title="Have a question we haven't answered?" actions={[{ label: 'Ask Our Government Team', href: '/contact' }]} />
    </>
  );
}
