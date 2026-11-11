import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import Split from '@/components/ui/Split';
import InfoTable from '@/components/ui/InfoTable';
import BulletList from '@/components/ui/BulletList';
import FeatureGrid from '@/components/ui/FeatureGrid';
import CtaBanner from '@/components/ui/CtaBanner';
import Stamp from '@/components/ui/Stamp';
import { BotLifecycle } from '@/components/ui/Diagrams';
import { colors } from '@/theme/tokens';
import { contactHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The GVP Partnership Model: Financed by GVP, Governed by the State',
  description: 'A build-operate-transfer partnership in which GVP carries the investment, the delivery risk and the technology refresh.',
};

const investments = [
  { label: 'Design and engineering', value: 'Solution architecture, process design, site surveys, airport layout planning' },
  { label: 'Technology', value: 'BMS platform, ETA portal, eGate software, integrations, security tooling' },
  { label: 'Hardware', value: 'eGates, kiosks, biometric devices, servers, networking and cabling' },
  { label: 'Installation', value: 'Deployment, testing, commissioning and go-live support' },
  { label: 'People', value: 'Project team, local hires, training of government officers' },
  { label: 'Operations', value: 'Help desk, maintenance, monitoring, support and upgrades' },
  { label: 'Working capital', value: 'All costs until the system generates revenue' },
];

const govContributes = [
  'Legal authorisation and the contract framework',
  'Access to premises and agreed utilities (such as space and power at the site)',
  'Policy decisions: eligibility, fees, security rules',
  'Nominating counterparts for governance and integration',
];

const riskReducers = [
  { title: 'Tailor-made scope', body: 'Designed around the country\'s entry points, policies and priorities.' },
  { title: 'Delivery and volume risk with GVP', body: "If it is late, it is GVP's cost." },
  { title: 'Performance-linked', body: 'Service levels and penalties are written into the agreement.' },
  { title: 'Technology refresh included', body: 'No obsolete systems at the end of the term.' },
  { title: 'Clean exit', body: 'Defined handback and transfer obligations.' },
];

export default function PartnershipModelPage() {
  return (
    <>
      <PageHero
        overline="The GVP partnership model"
        title="GVP finances the programme. Government commits no upfront capital."
        subtitle="A build-operate-transfer (BOT) partnership in which GVP carries the investment, the delivery risk and the technology refresh, and Government receives a modern border system and a share of revenue."
        aside={<Stamp ring="BUILD · OPERATE · SHARE · TRANSFER · " centreTop="FUNDED BY" centreMain="GVP" centreBottom="STATE GOVERNED" size={220} />}
      />

      <Section tone="surface">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 5, md: 0 }, border: { md: `1px solid ${colors.line}` } }}>
          <Box sx={{ p: { xs: 0, md: 6 }, borderRight: { md: `1px solid ${colors.line}` } }}>
            <Typography variant="overline" component="p" sx={{ color: colors.accentDark, mb: 1.5 }}>
              The challenge we solve
            </Typography>
            <Typography variant="h4" component="h2" sx={{ color: colors.base, mb: 2 }}>
              Modern borders usually mean big capital, long procurement and ageing technology.
            </Typography>
            <Typography variant="body1" sx={{ color: colors.muted }}>
              Modern border systems typically require significant capital, long procurement cycles and the risk that technology is outdated by the
              time it is delivered. Many governments cannot commit those funds without displacing other priorities such as health, education and
              infrastructure.
            </Typography>
          </Box>
          <Box sx={{ p: { xs: 3, md: 6 }, bgcolor: colors.primary, color: '#fff' }}>
            <Typography variant="overline" component="p" sx={{ color: colors.accentLight, mb: 1.5 }}>
              The GVP answer
            </Typography>
            <Typography variant="h4" component="h2" sx={{ color: '#fff', mb: 2 }}>
              GVP finances and delivers the complete solution.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.82)' }}>
              GVP finances the programme and recovers its investment only through published, user-funded fees. Delivery and volume risk sit with GVP.
            </Typography>
          </Box>
        </Box>
      </Section>

      <Section tone="light">
        <Split
          left={<SectionHeading overline="What GVP invests upfront" title="We fund every part of the programme" intro="From the first site survey to the day the system generates revenue." />}
          right={<InfoTable headers={['Investment area', 'What GVP funds']} rows={investments} caption="What GVP invests upfront" />}
        />
      </Section>

      <Section tone="surface">
        <Split
          left={<SectionHeading overline="What Government contributes" title="Government's role is limited to enabling the project" />}
          right={
            <Box>
              <BulletList items={govContributes} />
              <Box sx={{ mt: 4, p: 3, borderLeft: `3px solid ${colors.accent}`, bgcolor: colors.background }}>
                <Typography variant="body1" sx={{ color: colors.base, fontWeight: 500 }}>
                  GVP funds the build and the technology; Government&apos;s role is to enable the project.
                </Typography>
              </Box>
            </Box>
          }
        />
      </Section>

      <Section tone="dark" pattern>
        <Split
          ratio="1fr 1fr"
          left={<SectionHeading tone="dark" overline="How GVP recovers its investment" title="GVP succeeds only when the system works well" />}
          right={
            <Typography variant="subtitle1" sx={{ color: 'rgb(var(--gvp-on-dark) / 0.82)' }}>
              GVP is paid only from user-funded fees, such as a published traveller service fee and transaction levy, in a share agreed in the
              contract, over the agreed operating period. If volumes are lower than planned, GVP bears the shortfall, not the taxpayer. This keeps
              incentives aligned: GVP succeeds when the system works well and travellers use it.
            </Typography>
          }
        />
      </Section>

      <Section tone="surface">
        <SectionHeading overline="The BOT lifecycle" title="Four stages, from first build to full handover" align="center" />
        <BotLifecycle />
      </Section>

      <Section tone="light">
        <SectionHeading overline="Why this model reduces risk for Government" title="Budget protected. Risk transferred. Exit defined." />
        <FeatureGrid items={riskReducers} columns={3} numbered />
      </Section>

      <CtaBanner
        title="Take the model to your finance and legal teams"
        body="We will brief your officials on the commercial structure, the BOT terms and the procurement route."
        actions={[
          { label: 'Read the Model in Detail', href: contactHref('PARTNERSHIP_MODEL', 'Partnership model in detail') },
          { label: 'Book a Briefing for Your Finance and Legal Teams', href: contactHref('PARTNERSHIP_MODEL', 'Finance and legal briefing') },
        ]}
      />
    </>
  );
}
