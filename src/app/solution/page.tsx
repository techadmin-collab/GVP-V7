import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import Split from '@/components/ui/Split';
import FeatureGrid from '@/components/ui/FeatureGrid';
import BulletList from '@/components/ui/BulletList';
import CtaBanner from '@/components/ui/CtaBanner';
import { colors, fontStacks } from '@/theme/tokens';
import { contactHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Solution: Border Management System (BMS)',
  description: "One intelligent platform for the whole border journey. GVP's BMS connects pre-arrival authorisation, biometrics, automated border control and reporting.",
};

const journey = ['Pre-arrival authorisation', 'Biometric identity verification', 'Automated border control', 'Officer decision support', 'Real-time reporting'];

const modules = [
  {
    title: 'Electronic Travel Authorisation (ETA)',
    body: 'Travellers apply online before departure. Applications are checked against government watchlists and risk rules, and officers decide with full information. Fees are clear, published and paid digitally.',
    icon: <TravelExploreRoundedIcon />,
  },
  {
    title: 'eGates and automated immigration counters',
    body: "Biometric eGates verify the traveller against their travel document and application, typically in seconds. Officers focus on complex or higher-risk cases instead of routine checks. Gate and counter design is tailored to each airport's layout and passenger flows.",
    icon: <FingerprintRoundedIcon />,
  },
  {
    title: 'Officer and supervisor workstation',
    body: "A single screen shows the traveller's application, biometric match, alerts and history. Supervisors see live queues and staffing needs.",
    icon: <DesktopWindowsRoundedIcon />,
  },
  {
    title: 'Risk assessment and watchlist integration',
    body: 'Integration with national security, police, interior and international databases, under rules set and controlled by Government.',
    icon: <ShieldRoundedIcon />,
  },
  {
    title: 'Passenger-flow analytics and dashboards',
    body: 'Live and historical dashboards for senior officials: arrivals, processing times, queue lengths, peak-hour forecasts, nationalities, revenue and service-level performance.',
    icon: <InsightsRoundedIcon />,
  },
  {
    title: 'Integration layer',
    body: 'Open interfaces to airline systems, airport operations, customs, health and other agencies, so that the BMS fits into the existing national ecosystem.',
    icon: <SettingsEthernetRoundedIcon />,
  },
];

const govBenefits = [
  { title: 'Stronger security', body: 'Earlier risk screening, biometric assurance and consistent decisions.' },
  { title: 'Higher throughput', body: 'Shorter queues without adding counters or staff.' },
  { title: 'Better data', body: 'Reliable statistics for policy, planning and tourism strategy.' },
  { title: 'Revenue integrity', body: 'Digital collection and a clear audit trail.' },
  { title: 'Future-ready', body: 'Modular design that can adopt new technology as it matures.' },
];

const travellerBenefits = [
  'Simple online application and clear information in advance',
  'Faster, more predictable arrival',
  'Multilingual support and accessible design',
  'Privacy-respecting handling of personal data',
];

const govWays = [
  { title: 'Phased delivery', body: 'Start with a priority site, then expand.' },
  { title: 'Local hosting options', body: 'To meet data sovereignty requirements.' },
  { title: 'Government-defined policy rules', body: 'Eligibility, fees and risk criteria are set by Government, not by GVP.' },
  { title: 'Human oversight', body: 'Automation supports officers; decisions remain with the State.' },
];

export default function SolutionPage() {
  return (
    <>
      <PageHero
        overline="Our solution · Border Management System"
        title="One intelligent platform for the whole border journey."
        subtitle="From the moment a traveller applies to the moment they clear the border, GVP's BMS gives officers better information, gives travellers a faster journey and gives Government complete visibility."
      />

      <Section tone="surface">
        <Split
          left={<SectionHeading overline="Overview" title="Every stage of the journey, on a single secure platform" />}
          right={
            <Box>
              <Typography variant="subtitle1" sx={{ color: colors.text }}>
                GVP&apos;s Border Management System connects every stage of the travel journey on a single, secure platform. It is modular, so it can
                be introduced in phases, starting at one airport and extending across all border control points, including seaports, land crossings
                and other entry points.
              </Typography>
              {/* Journey strip */}
              <Box component="ol" aria-label="Stages connected by the BMS" sx={{ listStyle: 'none', p: 0, m: 0, mt: 5, display: 'grid', gap: 1.25 }}>
                {journey.map((step, i) => (
                  <Box
                    component="li"
                    key={step}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 1.5, bgcolor: colors.background, border: `1px solid ${colors.line}`, borderRadius: '2px' }}
                  >
                    <Box component="span" sx={{ fontFamily: fontStacks.mono, color: colors.accentDark, fontSize: 13 }}>
                      {String(i + 1).padStart(2, '0')}
                    </Box>
                    <Typography component="span" sx={{ fontWeight: 500, color: colors.base }}>
                      {step}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          }
        />
      </Section>

      <Section tone="light" id="modules">
        <SectionHeading overline="Core modules" title="Six modules. One accountable platform." />
        <FeatureGrid items={modules} columns={3} numbered />
      </Section>

      <Section tone="surface">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 7, md: 10 } }}>
          <Box>
            <SectionHeading overline="Benefits to Government" title="Security, speed and certainty" as="h2" />
            <BulletList items={govBenefits} />
          </Box>
          <Box>
            <SectionHeading overline="Benefits to travellers" title="A welcome, not a wait" as="h2" />
            <BulletList items={travellerBenefits} />
          </Box>
        </Box>
      </Section>

      <Section tone="dark" pattern>
        <SectionHeading tone="dark" overline="Designed around the way Governments work" title="Automation supports officers. Decisions remain with the State." />
        <FeatureGrid items={govWays} columns={4} dark />
      </Section>

      <CtaBanner
        title="See the BMS in detail"
        body="Get the BMS overview or arrange a demonstration for your officials."
        actions={[
          { label: 'Download the BMS Overview', href: contactHref('BMS', 'BMS Overview') },
          { label: 'Request a Demonstration', href: contactHref('BMS', 'BMS demonstration') },
        ]}
      />
    </>
  );
}
