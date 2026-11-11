import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import PieChartOutlineRoundedIcon from '@mui/icons-material/PieChartOutlineRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import { colors, fontStacks } from '@/theme/tokens';

/* ------------------------------------------------------------------ */
/* BOT lifecycle: Build → Operate → Share → Transfer                   */
/* ------------------------------------------------------------------ */

const botStages = [
  { title: 'Build', body: 'GVP designs, funds and installs the system.', icon: <ArchitectureRoundedIcon /> },
  { title: 'Operate', body: 'GVP runs the platform to agreed service levels, with continuous technology refresh.', icon: <SettingsSuggestRoundedIcon /> },
  { title: 'Share', body: 'Revenue is shared transparently with Government throughout the term.', icon: <PieChartOutlineRoundedIcon /> },
  {
    title: 'Transfer',
    body: 'At the end of the term, assets, data, source documentation and know-how pass to Government, with trained local staff ready to take over.',
    icon: <HandshakeRoundedIcon />,
  },
];

export function BotLifecycle({ dark = false }: { dark?: boolean }) {
  return (
    <Box
      component="ol"
      aria-label="Build, operate, share, transfer lifecycle"
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' },
        gap: { xs: 0, md: 0 },
        position: 'relative',
      }}
    >
      {botStages.map((s, i) => (
        <Box
          component="li"
          key={s.title}
          sx={{
            position: 'relative',
            px: { xs: 0, md: 2.5 },
            pl: { xs: 9, md: 2.5 },
            pb: { xs: 5, md: 0 },
            textAlign: { xs: 'left', md: 'center' },
            // connector line
            '&::before': {
              content: '""',
              position: 'absolute',
              bgcolor: dark ? 'rgb(var(--gvp-accent-light) / 0.45)' : colors.accent,
              opacity: i === botStages.length - 1 ? 0 : 1,
              // mobile: vertical line under the circle
              left: { xs: 27, md: '50%' },
              top: { xs: 56, md: 28 },
              width: { xs: '1.5px', md: '100%' },
              height: { xs: 'calc(100% - 56px)', md: '1.5px' },
            },
          }}
        >
          <Box
            sx={{
              position: { xs: 'absolute', md: 'relative' },
              left: { xs: 0, md: 'auto' },
              top: 0,
              zIndex: 1,
              width: 56,
              height: 56,
              mx: { md: 'auto' },
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              bgcolor: dark ? colors.base : colors.surface,
              border: `1.5px solid ${dark ? colors.accentLight : colors.accent}`,
              color: dark ? colors.accentLight : colors.primary,
              '& svg': { fontSize: 26 },
            }}
          >
            {s.icon}
          </Box>
          <Typography
            component="span"
            sx={{ display: 'block', mt: { xs: 0, md: 2.5 }, fontFamily: fontStacks.mono, fontSize: 12, letterSpacing: '0.16em', color: dark ? colors.pattern : colors.accentDark }}
          >
            STAGE {String(i + 1).padStart(2, '0')}
          </Typography>
          <Typography variant="h4" component="h3" sx={{ mt: 0.5, color: dark ? '#fff' : colors.base }}>
            {s.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: dark ? 'rgb(var(--gvp-on-dark) / 0.75)' : colors.muted, maxWidth: { md: 260 }, mx: { md: 'auto' } }}>
            {s.body}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Revenue waterfall                                                   */
/* ------------------------------------------------------------------ */

const waterfall = [
  'Traveller pays the published fee through the digital platform',
  'Funds are collected and recorded transparently',
  "Government's share is allocated first, per the agreed schedule",
  "GVP's share covers its investment, operations and return",
  'Dashboard, monthly reports and annual audit confirm all figures',
];

export function RevenueWaterfall() {
  return (
    <Box>
      <Box component="ol" aria-label="How the revenue share works" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {waterfall.map((text, i) => {
          const isGov = i === 2;
          return (
            <Box component="li" key={text} sx={{ display: 'flex', gap: { xs: 2, md: 3 }, alignItems: 'stretch' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '2px',
                    display: 'grid',
                    placeItems: 'center',
                    fontFamily: fontStacks.mono,
                    fontSize: 14,
                    bgcolor: isGov ? colors.primary : colors.surface,
                    color: isGov ? '#fff' : colors.primary,
                    border: `1.5px solid ${colors.primary}`,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </Box>
                {i < waterfall.length - 1 ? <Box aria-hidden="true" sx={{ width: '1.5px', flex: 1, minHeight: 20, bgcolor: colors.pattern }} /> : null}
              </Box>
              <Box
                sx={{
                  flex: 1,
                  mb: i < waterfall.length - 1 ? 2 : 0,
                  px: { xs: 2.5, md: 3 },
                  py: 1.6,
                  bgcolor: isGov ? 'rgb(var(--gvp-primary) / 0.07)' : colors.surface,
                  border: `1px solid ${isGov ? 'rgb(var(--gvp-primary) / 0.35)' : colors.line}`,
                  borderRadius: '2px',
                  // waterfall: each step steps in slightly on desktop
                  ml: { md: `${i * 28}px` },
                }}
              >
                <Typography variant="body1" sx={{ color: colors.base, fontWeight: isGov ? 600 : 400 }}>
                  {text}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/**
 * Unweighted split bar: equal halves by design, with no percentages, so it
 * cannot be read as an offer or anchor a negotiation. Shares are agreed with
 * Government for each programme.
 */
export function IllustrativeSplit() {
  return (
    <Box>
      <Box sx={{ display: 'flex', height: 54, borderRadius: '2px', overflow: 'hidden', border: `1px solid ${colors.line}` }} role="img" aria-label="Fee revenue is shared between Government and GVP; the split is agreed for each programme">
        <Box sx={{ flex: 1, bgcolor: colors.primary, color: '#fff', display: 'flex', alignItems: 'center', px: 2.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Government share
          </Typography>
        </Box>
        <Box sx={{ flex: 1, bgcolor: colors.accentLight, color: colors.base, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 2.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            GVP share
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ mt: 1.5, fontStyle: 'italic', color: colors.muted }}>
        Illustrative only, not an offer. Sections are not to scale: the split is agreed with Government for each programme, and Government&apos;s share is allocated first.
      </Typography>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered phase timeline (delivery approach)                         */
/* ------------------------------------------------------------------ */

export function PhaseTimeline({ phases }: { phases: { title: string; body: string }[] }) {
  return (
    <Box
      component="ol"
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
        gap: 0,
        borderTop: `1px solid ${colors.line}`,
        borderLeft: `1px solid ${colors.line}`,
      }}
    >
      {phases.map((p, i) => (
        <Box
          component="li"
          key={p.title}
          sx={{ p: { xs: 3, md: 4 }, borderRight: `1px solid ${colors.line}`, borderBottom: `1px solid ${colors.line}`, bgcolor: colors.surface }}
        >
          <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 13, letterSpacing: '0.14em', color: colors.accentDark }}>
            PHASE {String(i + 1).padStart(2, '0')}
          </Typography>
          <Typography variant="h4" component="h3" sx={{ mt: 1, mb: 1.25, color: colors.base }}>
            {p.title}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.muted }}>
            {p.body}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
