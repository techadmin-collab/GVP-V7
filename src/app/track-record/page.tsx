import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import CtaBanner from '@/components/ui/CtaBanner';
import Rich from '@/components/ui/Rich';
import { colors, fontStacks } from '@/theme/tokens';

export const metadata: Metadata = {
  title: 'Experience and Track Record',
  description: 'Built on proven experience in airports, biometrics and government delivery.',
};

/*
 * Only publish references that are confirmed and approved by the relevant
 * client or authority. Do not mention any active negotiation or
 * country-specific proposal until the client approves.
 */
const keyFigures = [
  { value: '[Travellers processed]', label: 'Travellers processed' },
  { value: '[Airports supported]', label: 'Airports supported' },
  { value: '[Years of experience]', label: 'Years of combined experience' },
];

const references = [
  { project: '[Project]', country: '[Country]', scope: '[Scope]', outcome: '[Outcome]' },
  { project: '[Project]', country: '[Country]', scope: '[Scope]', outcome: '[Outcome]' },
];

const caseStudy = [
  { label: 'Challenge', text: '[Challenge summary]' },
  { label: 'Solution', text: '[Solution summary]' },
  { label: 'Result', text: '[Result summary]' },
];

export default function TrackRecordPage() {
  return (
    <>
      <PageHero
        overline="Experience and track record"
        title="Built on proven experience in airports, biometrics and government delivery."
      />

      {/* Key figures */}
      <Section tone="dark" pattern py={{ xs: 7, md: 9 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: { xs: 4, sm: 0 } }}>
          {keyFigures.map((f, i) => (
            <Box key={f.label} sx={{ px: { sm: 4 }, borderLeft: { sm: i === 0 ? 'none' : '1px solid rgb(var(--gvp-pattern) / 0.22)' } }}>
              <Typography variant="h2" component="p" sx={{ color: '#fff', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                <Rich text={f.value} />
              </Typography>
              <Typography sx={{ mt: 1, fontFamily: fontStacks.mono, fontSize: 12.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: colors.pattern }}>
                {f.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>

      <Section tone="light">
        <SectionHeading overline="Selected reference projects" title="Reference engagements" intro="Published only with the written consent of the relevant client or authority." />
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' } }}>
          {references.map((r, i) => (
            <Box key={i} component="article" sx={{ p: { xs: 3, md: 4 }, bgcolor: colors.surface, border: `1px solid ${colors.line}`, borderTop: `3px solid ${colors.accent}`, borderRadius: '2px' }}>
              <Typography variant="h4" component="h3" sx={{ color: colors.base }}>
                <Rich text={r.project} />
              </Typography>
              <Box component="dl" sx={{ m: 0, mt: 2.5, display: 'grid', gridTemplateColumns: '110px 1fr', rowGap: 1.25, '& dt': { fontFamily: fontStacks.mono, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.accentDark, pt: '3px' }, '& dd': { m: 0, color: colors.text } }}>
                <dt>Country</dt>
                <dd><Rich text={r.country} /></dd>
                <dt>Scope</dt>
                <dd><Rich text={r.scope} /></dd>
                <dt>Outcome</dt>
                <dd><Rich text={r.outcome} /></dd>
              </Box>
            </Box>
          ))}
        </Box>
      </Section>

      <Section tone="surface">
        <SectionHeading overline="Case study" title="[Case study title]" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 2, md: 3 } }}>
          {caseStudy.map((c) => (
            <Box key={c.label} sx={{ p: 3.5, bgcolor: colors.background, borderRadius: '2px' }}>
              <Typography variant="overline" component="h3" sx={{ color: colors.accentDark }}>
                {c.label}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: colors.text }}>
                <Rich text={c.text} />
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>

      <Section tone="light">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 6, md: 10 } }}>
          <Box>
            <SectionHeading overline="Testimonials and endorsements" title="In their words" as="h2" />
            <Box component="figure" sx={{ m: 0, p: { xs: 3, md: 4 }, bgcolor: colors.surface, borderLeft: `3px solid ${colors.accent}` }}>
              <Typography component="blockquote" sx={{ m: 0, fontFamily: fontStacks.heading, fontStyle: 'italic', fontSize: '1.35rem', color: colors.base }}>
                <Rich text="[Testimonial, with permission]" />
              </Typography>
              <Typography component="figcaption" variant="body2" sx={{ mt: 2, color: colors.muted }}>
                <Rich text="[Name, title, organisation]" />
              </Typography>
            </Box>
          </Box>
          <Box>
            <SectionHeading overline="Press and media" title="Leadership and airport initiatives in the news" as="h2" />
            <Typography variant="body1" sx={{ color: colors.muted }}>
              <Rich text="[Relevant coverage of leadership achievements and airport initiatives, with links]" />
            </Typography>
          </Box>
        </Box>
      </Section>

      <CtaBanner title="Ask us about our experience" actions={[{ label: 'Speak to Our Government Team', href: '/contact' }]} />
    </>
  );
}
