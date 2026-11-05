import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import Split from '@/components/ui/Split';
import InfoTable from '@/components/ui/InfoTable';
import PersonCard from '@/components/ui/PersonCard';
import CtaBanner from '@/components/ui/CtaBanner';
import Rich from '@/components/ui/Rich';
import { colors } from '@/theme/tokens';
import { contactHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Team and Leadership',
  description: 'Experienced leaders. Specialist engineers. A team built for government delivery.',
};

/*
 * Biographies and photos must be approved by each individual before publishing.
 * Add approved portraits under /public/team and set `photo` below.
 */
const leaders = [
  {
    name: 'Mohammed Al Bulooki',
    role: 'Chairman, Governance and Strategic Oversight',
    bio: '[Short biography: senior airport operations and aviation leadership, including senior roles at Zayed International Airport in Abu Dhabi, work on touchless biometric travel initiatives, and technology and innovation partnerships in the UAE. Confirm wording and approvals before publishing.]',
    quote: 'Exceptional quality and no compromise on standards.',
  },
  {
    name: 'Fahad Mohammed S AlHadi',
    role: 'Chief Operating Officer [confirm title]',
    bio: '[Short biography: responsibility for programme delivery, government engagement and operations.]',
  },
  {
    name: '[Name]',
    role: 'Chief Programme Director',
    bio: '[Short biography: leads end-to-end delivery from design to go-live.]',
  },
];

const capabilities = [
  { label: 'Programme and project management', value: 'Structured governance, milestones and risk control' },
  { label: 'Solution architecture and engineering', value: 'Secure, scalable, standards-based systems' },
  { label: 'Biometrics and identity', value: 'Accurate, privacy-respecting verification' },
  { label: 'Cybersecurity and data protection', value: 'Protection against modern threats, compliance with national law' },
  { label: 'Airport and border operations', value: 'Practical designs that work in real terminals' },
  { label: 'Passenger experience and design', value: 'Clear journeys, accessibility, multilingual support' },
  { label: 'Legal, commercial and finance', value: 'Clean contracts, transparent models, audited reporting' },
  { label: 'Training and change management', value: 'Officers ready and confident on day one' },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        overline="Our team and leadership"
        title="Experienced leaders. Specialist engineers. A team built for government delivery."
        subtitle="Border programmes succeed or fail on people. GVP brings a multidisciplinary team with experience in airport operations, border technology, biometrics, public-sector programmes and large-scale delivery."
      />

      <Section tone="light">
        <SectionHeading overline="Leadership" title="Accountable leadership, from board to go-live" />
        <Box sx={{ display: 'grid', gap: 3 }}>
          {leaders.map((l) => (
            <PersonCard key={l.name + l.role} {...l} />
          ))}
          <Box sx={{ p: 3, border: `1px dashed ${colors.pattern}`, borderRadius: '2px' }}>
            <Typography variant="h5" component="h3" sx={{ color: colors.base }}>
              Supporting leadership
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: colors.muted }}>
              <Rich text="[names and one-line bios: technology, security, finance, legal, operations]" />
            </Typography>
          </Box>
        </Box>
      </Section>

      <Section tone="surface">
        <Split
          left={<SectionHeading overline="Team capabilities" title="Every discipline a border programme requires" intro="GVP's team of [25+] professionals covers every discipline a border programme requires." />}
          right={<InfoTable headers={['Capability', 'What it means for Government']} rows={capabilities} caption="Team capabilities" />}
        />
      </Section>

      <Section tone="dark" pattern>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 6, md: 10 } }}>
          <Box>
            <Typography variant="overline" component="p" sx={{ color: colors.accentLight, mb: 2 }}>
              Working with local talent
            </Typography>
            <Typography variant="h3" component="h2" sx={{ color: '#fff' }}>
              National staff who can operate, and eventually own, the system.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2.5, color: 'rgb(var(--gvp-on-dark) / 0.78)' }}>
              GVP builds local teams alongside its international experts: recruiting, training and transferring skills so that national staff can
              operate and eventually own the system.
            </Typography>
          </Box>
          <Box>
            <Typography variant="overline" component="p" sx={{ color: colors.accentLight, mb: 2 }}>
              Advisory and delivery partners
            </Typography>
            <Typography variant="h3" component="h2" sx={{ color: '#fff' }}>
              One accountable partner for the whole solution.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2.5, color: 'rgb(var(--gvp-on-dark) / 0.78)' }}>
              GVP works with selected technology, consulting and integration partners where specialist expertise adds value. GVP remains accountable
              to Government for the whole solution.
            </Typography>
          </Box>
        </Box>
      </Section>

      <CtaBanner
        title="Meet the team behind your programme"
        actions={[
          { label: 'Meet the Full Team', href: contactHref('PARTNERSHIP_MODEL', 'Meet the full team') },
          { label: 'Download Team Profiles', href: contactHref('OTHER', 'Team profiles') },
        ]}
      />
    </>
  );
}
