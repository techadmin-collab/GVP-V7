import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import FlightLandRoundedIcon from '@mui/icons-material/FlightLandRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import Split from '@/components/ui/Split';
import BulletList from '@/components/ui/BulletList';
import CtaBanner from '@/components/ui/CtaBanner';
import { colors, fontStacks } from '@/theme/tokens';
import { contactHref } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Destination Promotion',
  description: 'The border is the first chapter of the visitor experience. GVP builds destination promotion into the travel journey itself.',
};

const phases = [
  {
    label: 'Before the trip',
    title: 'The ETA portal as a welcome mat',
    icon: <FlightTakeoffRoundedIcon />,
    items: [
      'Destination-branded application experience in multiple languages',
      'Confirmation emails and pages featuring attractions, events and travel tips',
      'Links to approved tourism partners, airlines and tour operators',
    ],
  },
  {
    label: 'On arrival',
    title: 'A positive first impression',
    icon: <FlightLandRoundedIcon />,
    items: [
      'Fast, friendly processing that sets the tone',
      'Welcome messages, digital signage and national branding at gates and counters',
      'Guidance on transport, currency, SIM cards and local services',
    ],
  },
  {
    label: 'After arrival',
    title: 'Staying connected',
    icon: <ForumRoundedIcon />,
    items: [
      'Optional traveller communications from tourism authorities',
      'Feedback surveys that give tourism boards real insight',
      'Seasonal campaigns and event promotion',
    ],
  },
  {
    label: 'For planners',
    title: 'Insight for tourism planners',
    icon: <QueryStatsRoundedIcon />,
    items: [
      'Anonymised, aggregated data on source markets, travel patterns and peak periods',
      'Support for targeted marketing and airline route development',
      'Dashboards shared with the tourism authority and the ministry',
    ],
  },
];

const partnership = [
  'Co-design promotional content within the traveller journey',
  'Support roadshows and international trade events [as agreed]',
  'Help position the country as modern, secure and welcoming',
  'Dedicate a [defined marketing contribution or commitment] to destination promotion through the programme term',
];

export default function DestinationPromotionPage() {
  return (
    <>
      <PageHero
        overline="Destination promotion"
        title="The border is the first chapter of the visitor experience. We help you make it a good one."
        subtitle="GVP's platform is more than a security system. It is a channel for welcoming visitors, promoting your destination and growing tourism."
      />

      <Section tone="surface">
        <Split
          left={<SectionHeading overline="Why it matters" title="A rare moment to inform, reassure and inspire" />}
          right={
            <Typography variant="subtitle1" sx={{ color: colors.text, fontSize: { md: '1.25rem' } }}>
              Every visitor who applies for an ETA, uses an eGate or reaches an immigration counter is already engaged with your country. That
              moment is a rare opportunity to inform, reassure and inspire them. GVP builds destination promotion into the journey itself.
            </Typography>
          }
        />
      </Section>

      <Section tone="light">
        <SectionHeading overline="How GVP supports destination promotion" title="Across the whole visitor journey" />
        <Box
          component="ol"
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
            display: 'grid',
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
          }}
        >
          {phases.map((p, i) => (
            <Box component="li" key={p.label} sx={{ bgcolor: colors.surface, border: `1px solid ${colors.line}`, borderRadius: '2px', overflow: 'hidden' }}>
              <Box sx={{ px: 3, py: 2.25, bgcolor: i === 3 ? colors.base : colors.primary, color: '#fff', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: 'flex', color: colors.accentLight }}>{p.icon}</Box>
                <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 12.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{p.label}</Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" component="h3" sx={{ color: colors.base, mb: 2 }}>
                  {p.title}
                </Typography>
                <BulletList items={p.items} dense />
              </Box>
            </Box>
          ))}
        </Box>
      </Section>

      <Section tone="surface">
        <Split
          left={
            <SectionHeading
              overline="Destination promotion partnership"
              title="Working with the people who sell your country"
              intro="GVP works with the national tourism authority, airlines, airports, hotels and trade bodies to:"
            />
          }
          right={<BulletList items={partnership} />}
        />
      </Section>

      <Section tone="dark" pattern>
        <Box sx={{ maxWidth: 860 }}>
          <Typography variant="overline" component="p" sx={{ color: colors.accentLight, mb: 2 }}>
            The benefit
          </Typography>
          <Typography variant="h2" component="h2" sx={{ color: '#fff' }}>
            Secure borders and a better visitor experience are not in conflict.
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 3, color: 'rgb(var(--gvp-on-dark) / 0.8)' }}>
            Done well, they support each other and grow arrivals, spending and national reputation.
          </Typography>
        </Box>
      </Section>

      <CtaBanner
        title="Turn your border into a welcome"
        actions={[{ label: 'Talk to Us About Destination Promotion', href: contactHref('DESTINATION_PROMOTION') }]}
      />
    </>
  );
}
