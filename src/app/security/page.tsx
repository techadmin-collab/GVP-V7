import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PrivacyTipRoundedIcon from '@mui/icons-material/PrivacyTipRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import BulletList, { type BulletItem } from '@/components/ui/BulletList';
import CtaBanner from '@/components/ui/CtaBanner';
import { colors } from '@/theme/tokens';

export const metadata: Metadata = {
  title: 'Security, Data Sovereignty and Governance',
  description: 'Your data. Your laws. Your control. How GVP protects data sovereignty, security and traveller rights.',
};

const pillars: { title: string; icon: ReactNode; items: (string | BulletItem)[] }[] = [
  {
    title: 'Data sovereignty',
    icon: <StorageRoundedIcon />,
    items: [
      'Hosting options in-country or in a Government-approved location',
      'Government owns all traveller and operational data',
      "GVP processes data only on Government's instructions and for agreed purposes",
      'Clear rules on access, retention and deletion',
    ],
  },
  {
    title: 'Security by design',
    icon: <LockRoundedIcon />,
    items: [
      'Alignment with recognised standards [for example ISO 27001 and relevant national requirements]',
      'Encryption, role-based access and complete audit trails',
      'Regular penetration testing and independent security review',
      'Business continuity and disaster recovery planning',
    ],
  },
  {
    title: 'Privacy and traveller rights',
    icon: <PrivacyTipRoundedIcon />,
    items: [
      'Data minimisation: only what is needed',
      'Compliance with applicable data protection law',
      'Transparent notices to travellers',
      'Clear process for correction and appeals, decided by Government',
    ],
  },
  {
    title: 'Governance',
    icon: <GavelRoundedIcon />,
    items: [
      { title: 'Steering committee', body: 'Senior Government and GVP leaders meet regularly.' },
      { title: 'Service levels', body: 'Measured, reported and enforced.' },
      { title: 'National security schedule', body: 'Government keeps rights over access, suspension and emergency measures.' },
      { title: 'Change control', body: 'Policy and system changes follow a documented approval process.' },
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        overline="Security, data sovereignty and governance"
        title="Your data. Your laws. Your control."
        subtitle="Every GVP system is designed to serve the State's laws, policies and security priorities, with Government holding the keys."
      />

      <Section tone="light">
        <Box sx={{ display: 'grid', gap: { xs: 2, md: 3 }, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' } }}>
          {pillars.map((p) => (
            <Box key={p.title} component="article" sx={{ p: { xs: 3, md: 4.5 }, bgcolor: colors.surface, border: `1px solid ${colors.line}`, borderRadius: '2px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: colors.primary, color: colors.accentLight }}>
                  {p.icon}
                </Box>
                <Typography variant="h4" component="h2" sx={{ color: colors.base }}>
                  {p.title}
                </Typography>
              </Box>
              <BulletList items={p.items} dense />
            </Box>
          ))}
        </Box>
      </Section>

      <Section tone="dark" pattern>
        <SectionHeading
          tone="dark"
          overline="Ethical use of technology"
          title="Automation supports, and never replaces, human judgment."
          intro="Biometric and risk tools are used within the limits of national law and policy."
        />
      </Section>

      <CtaBanner
        title="Brief your security and data protection teams"
        body="We will walk your officials through hosting, access control, audit and governance arrangements."
        actions={[{ label: 'Request a Security Briefing', href: '/contact?topic=Security%20and%20data%20sovereignty%20briefing' }]}
      />
    </>
  );
}
