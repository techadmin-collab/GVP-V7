import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import Split from '@/components/ui/Split';
import BulletList from '@/components/ui/BulletList';
import CtaBanner from '@/components/ui/CtaBanner';
import Rich from '@/components/ui/Rich';
import { RevenueWaterfall, IllustrativeSplit } from '@/components/ui/Diagrams';
import { colors, fontStacks } from '@/theme/tokens';
import { contactHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Open and Transparent Revenue Share',
  description: 'What travellers pay is public. What Government receives is visible. Open fees, open books and independent verification.',
};

const commitments = [
  {
    title: 'Published fee schedule',
    body: 'Every fee a traveller pays is defined in the agreement, approved by Government and published before launch. There are no hidden charges and no unannounced increases.',
  },
  {
    title: 'Clear revenue split',
    body: 'The agreement states, in plain terms, how each fee is divided between Government and GVP. The split is documented in a simple revenue waterfall that officials, auditors and the public can understand.',
  },
  {
    title: 'Government-visible collection',
    body: 'Revenue flows through transparent payment channels. Government has real-time access to transaction and collection data through a dedicated dashboard.',
  },
  { title: 'Open books', body: 'GVP gives Government and its auditors full access to the records relating to the project, with regular reporting.' },
  {
    title: 'Independent audit',
    body: "An independent auditor verifies volumes, collections and distributions [annually or as agreed]. Summary results can be shared with Parliament and the public at Government's discretion.",
  },
];

const gains = [
  'A new, recurring public revenue stream at no cost to the Treasury',
  'Full visibility of volumes and money',
  'Protection against disputes, because everything is documented and auditable',
  'Credibility with citizens, media and oversight bodies',
];

export default function RevenueSharePage() {
  return (
    <>
      <PageHero
        overline="Open and transparent revenue share"
        title="What travellers pay is public. What Government receives is visible. Nothing is hidden."
        subtitle="GVP believes that public trust in a border programme depends on transparency. Our model is built on open fees, open books and independent verification."
      />

      <Section tone="surface">
        <SectionHeading overline="Our five transparency commitments" title="Open by design, verified independently" />
        <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, borderTop: `1px solid ${colors.line}` }}>
          {commitments.map((c, i) => (
            <Box
              component="li"
              key={c.title}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '48px 1fr', md: '80px 320px 1fr' },
                gap: { xs: 1.5, md: 4 },
                py: { xs: 3, md: 4 },
                borderBottom: `1px solid ${colors.line}`,
                alignItems: 'baseline',
              }}
            >
              <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 14, color: colors.accentDark }}>{String(i + 1).padStart(2, '0')}</Typography>
              <Typography variant="h4" component="h3" sx={{ color: colors.base }}>
                {c.title}
              </Typography>
              <Typography variant="body1" sx={{ color: colors.muted, gridColumn: { xs: '2 / 3', md: 'auto' } }}>
                <Rich text={c.body} />
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>

      <Section tone="light">
        <Split
          ratio="5fr 7fr"
          left={
            <Box>
              <SectionHeading overline="How the revenue share works" title="Government's share is allocated first" intro="Every step is recorded, reported and auditable." />
              <IllustrativeSplit />
            </Box>
          }
          right={<RevenueWaterfall />}
        />
      </Section>

      <Section tone="surface">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: { xs: 6, md: 10 } }}>
          <Box>
            <SectionHeading overline="What Government gains" title="New revenue, full visibility, no cost to the Treasury" />
            <BulletList items={gains} />
          </Box>
          <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: colors.base, color: '#fff', alignSelf: 'start', borderRadius: '2px' }}>
            <Typography variant="overline" component="p" sx={{ color: colors.accentLight, mb: 1.5 }}>
              Fair to travellers
            </Typography>
            <Typography variant="h4" component="h2" sx={{ color: '#fff' }}>
              Fees are modest, predictable and justified by the service delivered.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: 'rgb(var(--gvp-on-dark) / 0.78)' }}>
              Travellers see the fee and the benefit before they pay.
            </Typography>
          </Box>
        </Box>
      </Section>

      <CtaBanner
        title="See the full transparency framework"
        body="How fees are set, published, collected, split, reported and audited."
        actions={[{ label: 'Download the Revenue Transparency Framework', href: contactHref('PARTNERSHIP_MODEL', 'Revenue Transparency Framework') }]}
      />
    </>
  );
}
