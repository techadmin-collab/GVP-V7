import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import Split from '@/components/ui/Split';
import FeatureGrid from '@/components/ui/FeatureGrid';
import BulletList from '@/components/ui/BulletList';
import CtaBanner from '@/components/ui/CtaBanner';
import Rich from '@/components/ui/Rich';
import { colors } from '@/theme/tokens';

export const metadata: Metadata = {
  title: 'About GVP',
  description: 'A trusted partner to governments for secure, seamless and sustainable border management.',
};

const values = [
  { title: 'Sovereignty first', body: "Every system is designed to serve the State's laws, policies and security priorities." },
  { title: 'Transparency', body: 'We share our fees, our numbers and our performance openly.' },
  { title: 'Accountability', body: 'We take delivery risk and are measured on outcomes.' },
  { title: 'Respect for the traveller', body: 'Dignified, fast and clear processes for every visitor and citizen.' },
  { title: 'Partnership', body: 'We build local capability and work alongside national teams, not around them.' },
];

const whatWeDo = [
  'Border Management System (BMS)',
  'Electronic Travel Authorisation (ETA) and digital pre-arrival services',
  'eGates and automated immigration counters',
  'Passenger-experience design, analytics and reporting',
  'Destination promotion integrated into the travel journey',
  'Training, change management and long-term operations',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        overline="About GVP"
        title="A trusted partner to governments for secure, seamless and sustainable border management."
      />

      <Section tone="surface">
        <Split
          left={<SectionHeading overline="Who we are" title="Border technology, built around what governments need" />}
          right={
            <Typography variant="subtitle1" sx={{ color: colors.text, fontSize: { md: '1.25rem' }, lineHeight: 1.7 }}>
              <Rich text="GVP is a [UAE-headquartered] border technology and services company working with governments to modernise how travellers are screened, processed and welcomed. We combine deep experience in airport operations and biometric border technology with a partnership model built around what governments actually need: security, speed, transparency and no upfront burden on the public purse." />
            </Typography>
          }
        />
      </Section>

      <Section tone="dark" pattern>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 6, md: 10 } }}>
          <Box>
            <Typography variant="overline" component="p" sx={{ color: colors.accentLight, mb: 2 }}>
              Our mission
            </Typography>
            <Typography variant="h3" component="h2" sx={{ color: '#fff' }}>
              To help governments build secure, efficient and welcoming borders, funded and delivered by GVP, governed by the State and visible to
              the public.
            </Typography>
          </Box>
          <Box>
            <Typography variant="overline" component="p" sx={{ color: colors.accentLight, mb: 2 }}>
              Our vision
            </Typography>
            <Typography variant="h3" component="h2" sx={{ color: '#fff' }}>
              Borders that protect national security, delight travellers and strengthen the tourism and trade economy.
            </Typography>
          </Box>
        </Box>
      </Section>

      <Section tone="light">
        <SectionHeading overline="Our values" title="Five principles that shape every programme" />
        <FeatureGrid items={values} columns={3} numbered />
      </Section>

      <Section tone="surface">
        <Split
          left={<SectionHeading overline="What we do" title="At a glance" />}
          right={<BulletList items={whatWeDo} />}
        />
      </Section>

      <CtaBanner
        title="Meet the people behind GVP"
        body="Experienced leaders and specialist engineers, built for government delivery."
        actions={[
          { label: 'Our Team and Leadership', href: '/team' },
          { label: 'Speak to Our Government Team', href: '/contact' },
        ]}
      />
    </>
  );
}
