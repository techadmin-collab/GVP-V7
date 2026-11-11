import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CtaBanner from '@/components/ui/CtaBanner';
import Reveal from '@/components/ui/Reveal';
import ModulesCarousel from '@/components/v7/ModulesCarousel';
import ModelDeck from '@/components/v7/ModelDeck';
import QuestionChips from '@/components/v7/QuestionChips';
import { ButtonLink, TextLink } from '@/components/ui/links';
import { colors } from '@/theme/tokens';
import { siteConfig } from '@/lib/site';

/*
 * v7 Modern bento home page, built from scratch. Rounded tiles of different
 * sizes, pill controls, a module carousel, a card deck for the model and
 * question chips. It reuses no v4, v5 or v6 home blocks.
 */

const tile = { borderRadius: '28px', border: `1px solid ${colors.line}`, bgcolor: colors.surface, p: { xs: 3, md: 3.5 }, position: 'relative', overflow: 'hidden' } as const;
const pill = { display: 'inline-block', px: 1.75, py: 0.6, borderRadius: 999, fontWeight: 700, fontSize: '0.82rem' } as const;

const govKeeps = ['Policy and fee levels', 'Decisions at the border', 'All traveller data', 'Its share of every fee, first', 'The system, at the end of the term'];
const gvpCarries = ['Design, build and financing', 'Operation and maintenance', 'Technology refresh', 'Delivery and volume risk', 'Agreed service levels and penalties'];
const safeguards = ['In-country hosting', 'Government owns the data', 'Encryption', 'Role-based access', 'Complete audit trails', 'Penetration testing', 'Steering committee', 'Change control', 'Officers decide', 'Independent audit'];

/** Small heading block used above each bento group. */
function Head({ label, title, intro, light = false }: { label: string; title: string; intro?: string; light?: boolean }) {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 }, maxWidth: 760 }}>
      <Box component="p" sx={{ ...pill, m: 0, mb: 2, bgcolor: light ? 'rgba(255,255,255,0.16)' : 'rgb(var(--gvp-primary) / 0.08)', color: light ? '#fff' : colors.primary }}>{label}</Box>
      <Typography variant="h2" component="h2" sx={{ color: light ? '#fff' : colors.text }}>{title}</Typography>
      {intro ? <Typography sx={{ mt: 1.5, fontSize: '1.15rem', color: light ? 'rgba(255,255,255,0.85)' : colors.muted }}>{intro}</Typography> : null}
    </Box>
  );
}

function Band({ children, py = { xs: 5, md: 8 } }: { children: React.ReactNode; py?: { xs: number; md: number } }) {
  return (
    <Box component="section" sx={{ bgcolor: colors.background, py }}>
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Hero bento                                                    */}
      {/* ------------------------------------------------------------ */}
      <Band py={{ xs: 3, md: 4 }}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' } }}>
          {/* headline */}
          <Box className="gvp-hero-in" sx={{ ...tile, gridColumn: { md: 'span 8' }, gridRow: { md: 'span 2' }, p: { xs: 3.5, sm: 5, md: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 4 }}>
            <Box component="p" sx={{ ...pill, m: 0, alignSelf: 'flex-start', bgcolor: 'rgb(var(--gvp-primary) / 0.08)', color: colors.primary }}>Border management for governments</Box>
            <Box>
              <Typography variant="h1" component="h1" sx={{ color: colors.text, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.4rem' } }}>
                Modern borders, <Box component="span" sx={{ color: colors.primary }}>financed by GVP.</Box> Governed by the State. Revenue shared openly.
              </Typography>
              <Typography sx={{ mt: 2.5, fontSize: '1.12rem', color: colors.muted, maxWidth: 640 }}>
                GVP finances, builds and operates intelligent border management systems through a build-operate-transfer partnership, and recovers its
                investment only through published, user-funded fees.
              </Typography>
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <ButtonLink href="/solution" variant="contained" color="primary" size="large" endIcon={<ArrowOutwardRoundedIcon />}>
                Explore Our Solution
              </ButtonLink>
              <ButtonLink href="/contact" variant="outlined" color="primary" size="large">
                Speak to Our Government Team
              </ButtonLink>
            </Stack>
          </Box>

          {/* tagline tile with a slowly turning ring */}
          <Box sx={{ ...tile, gridColumn: { md: 'span 4' }, bgcolor: colors.primary, border: 'none', color: '#fff', minHeight: 230, display: 'flex', alignItems: 'flex-end' }}>
            <Box aria-hidden="true" className="gvp7-spin" sx={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.35)' }} />
            <Box aria-hidden="true" sx={{ position: 'absolute', right: -20, top: -20, width: 140, height: 140, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.08)' }} />
            <Box sx={{ position: 'relative' }}>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.3rem' }, letterSpacing: '-0.04em', lineHeight: 1 }}>{siteConfig.tagline}</Typography>
              <Typography sx={{ mt: 1, opacity: 0.85, fontSize: '0.92rem' }}>{siteConfig.nameLine}</Typography>
            </Box>
          </Box>

          {/* phased roll-out tile with pinging dots */}
          <Box sx={{ ...tile, gridColumn: { md: 'span 4' }, minHeight: 230, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box aria-hidden="true" sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 1.25, maxWidth: 240 }}>
              {Array.from({ length: 24 }).map((_, k) => (
                <Box key={k} className={k === 0 ? undefined : 'gvp7-ping'} sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: k === 0 ? colors.primary : colors.accentLight, animationDelay: `${(k % 8) * 0.18 + Math.floor(k / 8) * 0.3}s` }} />
              ))}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>Start with one site</Typography>
              <Typography variant="body2" sx={{ color: colors.muted }}>A controlled pilot at a priority airport, then phased roll-out.</Typography>
            </Box>
          </Box>

          {/* three fact tiles */}
          <Box sx={{ ...tile, gridColumn: { md: 'span 4' }, bgcolor: colors.accentLight, border: 'none' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '3.2rem', letterSpacing: '-0.05em', lineHeight: 1, color: colors.primaryDark }}>100%</Typography>
            <Typography sx={{ mt: 1, fontWeight: 600, color: colors.primaryDark }}>of build and deployment financed by GVP</Typography>
          </Box>
          <Box sx={{ ...tile, gridColumn: { md: 'span 4' }, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flexShrink: 0, width: 56, height: 56, borderRadius: '18px', display: 'grid', placeItems: 'center', bgcolor: colors.background, color: colors.primary }}>
              <LockRoundedIcon />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.15rem' }}>Data stays sovereign</Typography>
              <Typography variant="body2" sx={{ color: colors.muted }}>Government owns all traveller and operational data.</Typography>
            </Box>
          </Box>
          <Box sx={{ ...tile, gridColumn: { md: 'span 4' }, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flexShrink: 0, width: 56, height: 56, borderRadius: '18px', display: 'grid', placeItems: 'center', bgcolor: colors.background, color: colors.primary }}>
              <ReceiptLongRoundedIcon />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.15rem' }}>Funded by published fees</Typography>
              <Typography variant="body2" sx={{ color: colors.muted }}>Shared openly with Government.</Typography>
            </Box>
          </Box>
        </Box>
      </Band>

      {/* ------------------------------------------------------------ */}
      {/* Modules carousel                                              */}
      {/* ------------------------------------------------------------ */}
      <Band>
        <Head label="Inside the platform" title="Six modules. One accountable partner." intro="Introduced in phases, starting at one airport and extending across all border control points." />
        <ModulesCarousel />
      </Band>

      {/* ------------------------------------------------------------ */}
      {/* Model deck                                                    */}
      {/* ------------------------------------------------------------ */}
      <Band>
        <Head label="The partnership model" title="Four moves, from first site to handover" intro="GVP finances the programme. Government commits no upfront capital." />
        <ModelDeck />
        <Box sx={{ mt: 4 }}>
          <TextLink href="/partnership-model" sx={{ fontWeight: 700, color: colors.primary }}>See the full model →</TextLink>
        </Box>
      </Band>

      {/* ------------------------------------------------------------ */}
      {/* Who keeps what                                                */}
      {/* ------------------------------------------------------------ */}
      <Band>
        <Head label="Roles" title="Who keeps what" />
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Reveal>
            <Box sx={{ ...tile, height: '100%', p: { xs: 3, md: 4.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '16px', display: 'grid', placeItems: 'center', bgcolor: colors.background, color: colors.primary }}>
                  <AccountBalanceRoundedIcon />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.03em' }}>Government keeps</Typography>
              </Box>
              <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {govKeeps.map((g) => (
                  <Box key={g} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.75, py: 1, borderRadius: 999, bgcolor: colors.background, fontWeight: 600, fontSize: '0.95rem' }}>
                    <CheckRoundedIcon sx={{ fontSize: 18, color: colors.primary }} />
                    {g}
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
          <Reveal delay={120}>
            <Box sx={{ ...tile, height: '100%', p: { xs: 3, md: 4.5 }, bgcolor: colors.primary, border: 'none', color: '#fff' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '16px', display: 'grid', placeItems: 'center', bgcolor: 'rgba(255,255,255,0.16)' }}>
                  <ArrowOutwardRoundedIcon />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.03em' }}>GVP carries</Typography>
              </Box>
              <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {gvpCarries.map((g) => (
                  <Box key={g} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.75, py: 1, borderRadius: 999, bgcolor: 'rgba(255,255,255,0.14)', fontWeight: 600, fontSize: '0.95rem' }}>
                    <CheckRoundedIcon sx={{ fontSize: 18 }} />
                    {g}
                  </Box>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Band>

      {/* ------------------------------------------------------------ */}
      {/* Open books bento                                              */}
      {/* ------------------------------------------------------------ */}
      <Band>
        <Head label="Open books" title="Every figure, visible to Government" intro="Government’s share of every fee is allocated first. The split is agreed for each programme." />
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' } }}>
          {/* live dashboard tile with decorative bars */}
          <Box sx={{ ...tile, gridColumn: { md: 'span 7' }, gridRow: { md: 'span 3' }, p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3, minHeight: 320 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>Real-time dashboard</Typography>
              <Box sx={{ ...pill, bgcolor: colors.background, color: colors.primary, display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
                <Box component="span" className="gvp7-ping" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.status.cleared }} />
                Live
              </Box>
            </Box>
            <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'flex-end', gap: 1.25, height: 140 }}>
              {[60, 85, 45, 95, 70, 100, 55, 80, 65, 90, 75, 88].map((h, k) => (
                <Box key={k} className="gvp7-bar" sx={{ flex: 1, height: `${h}%`, borderRadius: '10px', bgcolor: k === 9 ? colors.primary : colors.accentLight, animationDelay: `${k * 0.15}s` }} />
              ))}
            </Box>
            <Typography variant="body2" sx={{ color: colors.muted }}>Government has live access to transaction and collection data. Illustration only.</Typography>
          </Box>
          {[
            { icon: <ReceiptLongRoundedIcon />, t: 'Published fee schedule', b: 'Set and published by Government.' },
            { icon: <SummarizeRoundedIcon />, t: 'Regular reporting', b: 'Volumes, collections and distributions, on an agreed schedule.' },
            { icon: <VerifiedRoundedIcon />, t: 'Independent audit', b: 'Figures verified independently, records open to Government’s auditors.' },
          ].map((x, k) => (
            <Box key={x.t} sx={{ ...tile, gridColumn: { md: 'span 5' }, display: 'flex', gap: 2, alignItems: 'flex-start', bgcolor: k === 2 ? colors.accentLight : colors.surface, border: k === 2 ? 'none' : tile.border }}>
              <Box sx={{ flexShrink: 0, width: 48, height: 48, borderRadius: '16px', display: 'grid', placeItems: 'center', bgcolor: k === 2 ? 'rgba(255,255,255,0.6)' : colors.background, color: colors.primary }}>{x.icon}</Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.1rem' }}>{x.t}</Typography>
                <Typography variant="body2" sx={{ color: k === 2 ? colors.primaryDark : colors.muted }}>{x.b}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Band>

      {/* ------------------------------------------------------------ */}
      {/* Safeguards chip cloud                                         */}
      {/* ------------------------------------------------------------ */}
      <Band>
        <Box sx={{ ...tile, bgcolor: colors.primary, border: 'none', color: '#fff', p: { xs: 3.5, md: 6 } }}>
          <Head light label="Safeguards" title="Your data. Your laws. Your control." intro="Built around commitments Government can hold GVP to." />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
            {safeguards.map((s, k) => (
              <Box key={s} sx={{ px: 2.25, py: 1.25, borderRadius: 999, fontWeight: 700, bgcolor: k % 4 === 0 ? '#fff' : 'rgba(255,255,255,0.14)', color: k % 4 === 0 ? colors.primary : '#fff', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                {s}
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 4 }}>
            <ButtonLink href="/security" variant="contained" sx={{ bgcolor: '#fff', color: colors.primary, '&:hover': { bgcolor: colors.accentLight } }} endIcon={<ArrowOutwardRoundedIcon />}>
              Security and governance
            </ButtonLink>
          </Box>
        </Box>
      </Band>

      {/* ------------------------------------------------------------ */}
      {/* Questions                                                     */}
      {/* ------------------------------------------------------------ */}
      <Band>
        <Head label="Questions" title="Ask us anything" intro="Pick a question to see the answer." />
        <QuestionChips />
      </Band>

      <CtaBanner
        title="Planning a border modernisation programme?"
        body="Our team will walk your officials through a tailored model, with no obligation."
        actions={[{ label: 'Request a Government Briefing', href: '/contact' }]}
      />
    </>
  );
}
