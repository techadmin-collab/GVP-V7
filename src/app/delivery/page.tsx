import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import BulletList from '@/components/ui/BulletList';
import CtaBanner from '@/components/ui/CtaBanner';
import { PhaseTimeline } from '@/components/ui/Diagrams';

export const metadata: Metadata = {
  title: 'Delivery Approach and Local Capacity Building',
  description: 'A clear path from agreement to go-live, and beyond, with training, change management and local economic contribution.',
};

const phases = [
  { title: 'Discovery and design', body: 'Site visits, stakeholder workshops, process mapping, requirements baseline.' },
  { title: 'Build and integrate', body: 'Platform configuration, integrations, hardware procurement, testing.' },
  { title: 'Pilot', body: 'A controlled launch at a priority site, with close monitoring.' },
  { title: 'Scale', body: 'Phased roll-out to other airports, seaports and border posts.' },
  { title: 'Operate and improve', body: 'Service management, analytics and regular upgrades.' },
  { title: 'Transfer', body: 'Structured handover to Government at the end of the term.' },
];

const training = [
  'Officer training, from basic use to advanced supervision',
  'Train-the-trainer programmes so that skills stay in-country',
  'Stakeholder communication for airlines, travel agents and the public',
  'Clear user guides in local languages',
];

const local = [
  'Local jobs in operations, support and administration',
  'Use of local suppliers and service providers where possible',
  'Skills transfer in technology, security and data analysis',
];

export default function DeliveryPage() {
  return (
    <>
      <PageHero
        overline="Delivery approach and local capacity building"
        title="A clear path from agreement to go-live, and beyond."
        subtitle="Six structured phases, with national teams trained and ready to take over."
      />

      <Section tone="light">
        <SectionHeading overline="Delivery phases" title="From first workshop to full handover" />
        <PhaseTimeline phases={phases} />
      </Section>

      <Section tone="surface">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 7, md: 10 } }}>
          <Box>
            <SectionHeading overline="Change management and training" title="Officers ready and confident on day one" />
            <BulletList items={training} />
          </Box>
          <Box>
            <SectionHeading overline="Local economic contribution" title="Jobs, suppliers and skills that stay in-country" />
            <BulletList items={local} />
          </Box>
        </Box>
      </Section>

      <CtaBanner
        title="Plan your first site with us"
        body="We typically begin with a priority site and extend to other border posts."
        actions={[{ label: 'Request a Government Briefing', href: '/contact' }]}
      />
    </>
  );
}
