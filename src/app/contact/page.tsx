import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Rich from '@/components/ui/Rich';
import ContactForm from '@/components/contact/ContactForm';
import { colors, fontStacks } from '@/theme/tokens';
import { interestValues, siteConfig, type InterestValue } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact and Government Enquiries',
  description: "Let's discuss what a modern border could mean for your country. Request a confidential briefing with GVP's government team.",
};

const audiences = [
  'Ministries',
  'Border and immigration agencies',
  'Airport and port authorities',
  'Tourism boards',
  'Procurement committees',
];

type SearchParams = Promise<{ interest?: string; topic?: string }>;

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const defaultInterest = interestValues.includes(sp.interest as InterestValue) ? (sp.interest as InterestValue) : undefined;
  const defaultTopic = typeof sp.topic === 'string' ? sp.topic.slice(0, 120) : undefined;

  const contactRows = [
    { icon: <PlaceRoundedIcon />, label: 'Address', value: siteConfig.contact.address },
    { icon: <PhoneRoundedIcon />, label: 'Phone', value: siteConfig.contact.phone },
    { icon: <MailRoundedIcon />, label: 'Email', value: siteConfig.contact.email },
    { icon: <LinkedInIcon />, label: 'LinkedIn', value: siteConfig.contact.linkedin },
  ];

  return (
    <>
      <PageHero
        overline="Contact and government enquiries"
        title="Let's discuss what a modern border could mean for your country."
        subtitle="We welcome enquiries from ministries, border and immigration agencies, airport and port authorities, tourism boards and procurement committees. Our government team will arrange a confidential briefing tailored to your needs."
      />

      <Section tone="light">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '4fr 8fr' }, gap: { xs: 5, md: 8 }, alignItems: 'start' }}>
          <Box>
            <Typography variant="overline" component="h2" sx={{ color: colors.accentDark }}>
              Who we work with
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2 }}>
              {audiences.map((a) => (
                <Box component="li" key={a} sx={{ py: 1.25, borderBottom: `1px solid ${colors.line}`, color: colors.base, fontWeight: 500 }}>
                  {a}
                </Box>
              ))}
            </Box>

            <Typography variant="overline" component="h2" sx={{ color: colors.accentDark, display: 'block', mt: 6 }}>
              Contact details
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {contactRows.map((r) => (
                <Box key={r.label} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ color: colors.primary, display: 'flex', mt: '2px' }}>{r.icon}</Box>
                  <Box>
                    <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: colors.muted }}>
                      {r.label}
                    </Typography>
                    <Typography variant="body1" sx={{ color: colors.base }}>
                      <Rich text={r.value} />
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            <Box sx={{ mt: 6, p: 3, bgcolor: colors.base, color: '#fff', borderRadius: '2px' }}>
              <Typography variant="h5" component="p" sx={{ color: '#fff' }}>
                Confidential by default
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'rgb(var(--gvp-on-dark) / 0.75)' }}>
                Enquiries are handled only by GVP&apos;s government team and are never shared without your permission.
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h3" component="h2" sx={{ color: colors.base, mb: 3 }}>
              Request a confidential briefing
            </Typography>
            <ContactForm defaultInterest={defaultInterest} defaultTopic={defaultTopic} />
          </Box>
        </Box>
      </Section>
    </>
  );
}
