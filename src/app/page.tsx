import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FlightLandRoundedIcon from '@mui/icons-material/FlightLandRounded';
import PageHero from '@/components/ui/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import FeatureGrid from '@/components/ui/FeatureGrid';
import CtaBanner from '@/components/ui/CtaBanner';
import Reveal from '@/components/ui/Reveal';
import Highlight from '@/components/ui/Highlight';
import StatCounters from '@/components/home/StatCounters';
import CapexCalculator from '@/components/home/CapexCalculator';
import RevenueFlow from '@/components/home/RevenueFlow';
import WorldReach from '@/components/home/WorldReach';
import ModelComparison from '@/components/home/ModelComparison';
import GovernanceStamps from '@/components/home/GovernanceStamps';
import LeadershipTeaser from '@/components/home/LeadershipTeaser';
import FitQuiz from '@/components/home/FitQuiz';
import HeroIllustration from '@/components/illustrations/HeroIllustration';
import JourneyStrip from '@/components/illustrations/JourneyStrip';
import DashboardIllustration from '@/components/illustrations/DashboardIllustration';
import Split from '@/components/ui/Split';
import { BotLifecycle } from '@/components/ui/Diagrams';
import { ButtonLink, TextLink } from '@/components/ui/links';
import { colors, fontStacks } from '@/theme/tokens';

const reasons = [
  { title: 'Integrated BMS', body: 'One platform for ETA, eGates, passenger processing and analytics.', icon: <HubRoundedIcon /> },
  { title: 'Expert team', body: 'Leaders and specialists from airports, biometrics, border technology and public-sector delivery.', icon: <GroupsRoundedIcon /> },
  { title: 'We invest first', body: 'GVP funds design, build, deployment and operation upfront.', icon: <SavingsRoundedIcon /> },
  { title: 'No capex for Government', body: 'No capital budget, no loan, no sovereign guarantee required.', icon: <AccountBalanceRoundedIcon /> },
  { title: 'Open revenue share', body: 'Published fee schedule, open books, independent audit.', icon: <VisibilityRoundedIcon /> },
  { title: 'Destination promotion', body: 'The border journey becomes a welcome, and a marketing channel, for your country.', icon: <FlightLandRoundedIcon /> },
];

const commitments = [
  { title: 'Government stays in control.', body: 'Policy, decisions and data remain with the State.' },
  { title: 'Risk sits with GVP.', body: 'We fund, build and operate against agreed service levels.' },
  { title: 'Everything is visible.', body: 'Fees, volumes and revenue are open to Government at all times.' },
];

const whatWeDo = [
  { label: 'Border Management System (BMS)', href: '/solution' },
  { label: 'Electronic Travel Authorisation (ETA) and digital pre-arrival services', href: '/solution#modules' },
  { label: 'eGates and automated immigration counters', href: '/solution#modules' },
  { label: 'Passenger-experience design, analytics and reporting', href: '/solution#modules' },
  { label: 'Destination promotion integrated into the travel journey', href: '/destination-promotion' },
  { label: 'Training, change management and long-term operations', href: '/delivery' },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        size="large"
        tone="light"
        overline="Border management for governments"
        title={
          <>
            Modern borders. <Highlight>Zero capital outlay</Highlight> for Government. Full transparency.
          </>
        }
        subtitle="GVP designs, funds, builds and operates intelligent border management systems, so governments can strengthen security, welcome more visitors and share in the revenue, without spending public capital."
        actions={
          <>
            <ButtonLink href="/solution" variant="contained" color="primary" size="large" endIcon={<ArrowForwardRoundedIcon />}>
              Explore Our Solution
            </ButtonLink>
            <ButtonLink href="/contact" variant="outlined" color="primary" size="large" sx={{ borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } }}>
              Speak to Our Government Team
            </ButtonLink>
          </>
        }
        aside={<HeroIllustration variant="light" />}
        asideOnMobile
        asideWidth={{ md: 400, lg: 500 }}
        // Runway video hidden for now. To bring it back:
        //   inside the maroon panel: video={{ mp4: '/videos/gvp-hero-runway.mp4', webm: '/videos/gvp-hero-runway.webm', poster: '/videos/gvp-hero-runway-poster.jpg' }}
        //   full-screen behind white text instead: also remove tone="light" and the aside lines, and add videoTint="neutral"
      />

      <StatCounters />

      {/* Six reasons */}
      <Section tone="light">
        <Reveal>
          <SectionHeading overline="Why governments choose GVP" title="Six reasons, one partnership" />
        </Reveal>
        <FeatureGrid items={reasons} columns={3} numbered />
      </Section>

      {/* Introduction */}
      <Section tone="surface">
        <Split
          left={
            <Reveal>
              <SectionHeading overline="The border, reimagined" title="A nation's first and last impression" />
            </Reveal>
          }
          right={
            <Reveal delay={120}>
            <Box>
              <Typography variant="subtitle1" sx={{ color: colors.text, fontSize: { md: '1.3rem' }, lineHeight: 1.65 }}>
                Borders are a nation&apos;s first and last impression. They must be secure, efficient and welcoming at the same time. Most governments
                want to modernise but face the same constraints: limited capital, competing priorities and the risk of large technology programmes.
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, color: colors.muted }}>
                GVP removes those constraints. We bring the technology, the investment and the operating expertise. Government keeps sovereignty,
                control and a transparent share of the revenue.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <TextLink href="/about" sx={{ fontWeight: 600, color: colors.primary }}>
                  About GVP →
                </TextLink>
              </Box>
            </Box>
            </Reveal>
          }
        />
      </Section>

      {/* Traveller journey */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            overline="How it works"
            title="One platform for the whole border journey"
            intro="From the moment a traveller applies to the moment they clear the border: better information for officers, a faster journey for travellers, complete visibility for Government."
            align="center"
          />
        </Reveal>
        <JourneyStrip />
      </Section>

      {/* Commitments */}
      <Section tone="surface">
        <Reveal>
          <SectionHeading overline="Our commitment" title="Three promises to every government we serve" />
        </Reveal>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 4, md: 0 } }}>
          {commitments.map((c, i) => (
            <Reveal key={c.title} delay={i * 140} style={{ height: '100%' }}>
            <Box
              sx={{
                height: '100%',
                pr: { md: 5 },
                pl: { md: i === 0 ? 0 : 5 },
                borderLeft: { md: i === 0 ? 'none' : `1px solid ${colors.line}` },
              }}
            >
              <Typography sx={{ fontFamily: fontStacks.mono, color: colors.accentDark, fontSize: 13, letterSpacing: '0.14em' }}>
                {String(i + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="h3" component="h3" sx={{ mt: 1.5, color: colors.base }}>
                {c.title}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1.5, color: colors.muted }}>
                {c.body}
              </Typography>
            </Box>
            </Reveal>
          ))}
        </Box>
      </Section>

      {/* What we do */}
      <Section tone="light">
        <Split
          left={
            <>
              <Reveal>
                <SectionHeading
                  overline="What we do"
                  title="Everything a modern border needs, delivered by one accountable partner"
                  intro="Introduced in phases, starting at one airport and extending across all border control points."
                />
              </Reveal>
              <Reveal delay={150} style={{ maxWidth: 460 }}>
                <Box sx={{ mt: { xs: -1, md: -2 } }}>
                  <DashboardIllustration />
                </Box>
              </Reveal>
            </>
          }
          right={
            <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, borderTop: `1px solid ${colors.line}` }}>
              {whatWeDo.map((item, i) => (
                <Box component="li" key={item.label} sx={{ borderBottom: `1px solid ${colors.line}` }}>
                  <Reveal delay={i * 70}>
                  <TextLink
                    href={item.href}
                    underline="none"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      py: 2.5,
                      color: colors.base,
                      transition: 'padding 0.2s ease, color 0.2s ease',
                      '&:hover': { pl: 1, color: colors.primary },
                    }}
                  >
                    <Box component="span" sx={{ fontFamily: fontStacks.mono, fontSize: 13, color: colors.accentDark, minWidth: 24 }}>
                      {String(i + 1).padStart(2, '0')}
                    </Box>
                    <Box component="span" sx={{ flex: 1, fontSize: { xs: '1.05rem', md: '1.15rem' }, fontWeight: 500 }}>
                      {item.label}
                    </Box>
                    <ArrowForwardRoundedIcon sx={{ color: colors.accent, fontSize: 20 }} />
                  </TextLink>
                  </Reveal>
                </Box>
              ))}
            </Box>
          }
        />
      </Section>

      {/* Global reach */}
      <Section tone="brand" video={{ mp4: '/videos/gvp-hero-runway.mp4', webm: '/videos/gvp-hero-runway.webm', poster: '/videos/gvp-hero-runway-poster.jpg' }}>
        <Reveal>
          <SectionHeading
            tone="brand"
            overline="Global by design"
            title="One model, ready for any country"
            intro="Built to travel: the same platform, funding model and governance can be deployed wherever a government wants to modernise its borders."
          />
        </Reveal>
        <Reveal delay={120}>
          <WorldReach />
        </Reveal>
      </Section>

      {/* BOT teaser */}
      <Section tone="surface">
        <Reveal>
          <SectionHeading
            overline="The GVP partnership model"
            title="Government pays nothing upfront. GVP invests first."
            intro="A build-operate-transfer partnership in which GVP carries the investment, the delivery risk and the technology refresh."
            align="center"
          />
        </Reveal>
        <Reveal>
          <BotLifecycle />
        </Reveal>
        <Box sx={{ textAlign: 'center', mt: { xs: 2, md: 7 } }}>
          <ButtonLink href="/partnership-model" variant="outlined" color="primary" size="large">
            See how the model works
          </ButtonLink>
        </Box>
      </Section>

      {/* Traditional vs GVP */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            overline="Two ways to modernise a border"
            title="Traditional programme, or GVP partnership?"
            intro="Modern border systems typically require significant capital, long procurement cycles and the risk that technology is outdated by the time it is delivered. Toggle to compare."
          />
        </Reveal>
        <Reveal delay={120}>
          <ModelComparison />
        </Reveal>
      </Section>

      {/* Zero-capex explainer */}
      <Section tone="brand" pattern>
        <Reveal>
          <SectionHeading
            tone="brand"
            overline="See the model in numbers"
            title="Zero capex for Government. Try it."
            intro="Move the sliders to see how a published traveller fee funds the border system and creates a new revenue stream for Government, with nothing drawn from the public budget."
          />
        </Reveal>
        <Reveal delay={120}>
          <CapexCalculator />
        </Reveal>
      </Section>

      {/* Revenue waterfall */}
      <Section tone="light">
        <Reveal>
          <SectionHeading
            overline="Open and transparent revenue share"
            title="What travellers pay is public. What Government receives is visible."
            intro="Every fee follows the same documented path, and Government's share is allocated first."
            align="center"
          />
        </Reveal>
        <Reveal delay={120}>
          <RevenueFlow />
        </Reveal>
      </Section>

      {/* Security and governance */}
      <Section tone="surface">
        <Reveal>
          <SectionHeading
            overline="Security, data sovereignty and governance"
            title="Your data. Your laws. Your control."
            intro="Every GVP programme is built around commitments Government can hold us to."
            align="center"
          />
        </Reveal>
        <Reveal delay={120}>
          <GovernanceStamps />
        </Reveal>
      </Section>

      {/* Leadership */}
      <Section tone="light">
        <Reveal>
          <LeadershipTeaser />
        </Reveal>
      </Section>

      {/* Fit check */}
      <Section tone="surface">
        <Reveal>
          <SectionHeading
            overline="Is GVP right for your country?"
            title="Find your starting point in four questions"
            intro="Answer four quick questions and we'll suggest where a GVP programme would begin."
            align="center"
          />
        </Reveal>
        <Reveal delay={120}>
          <Box sx={{ maxWidth: 920, mx: 'auto' }}>
            <FitQuiz />
          </Box>
        </Reveal>
      </Section>

      <CtaBanner
        title="Planning a border modernisation programme?"
        body="Our team will walk your officials through a tailored model, with no obligation."
        actions={[{ label: 'Request a Government Briefing', href: '/contact' }]}
      />
    </>
  );
}
