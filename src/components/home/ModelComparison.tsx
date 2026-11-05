'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { colors, fontStacks } from '@/theme/tokens';

/**
 * "Traditional programme vs the GVP partnership" toggle.
 * Wording comes from the content brief ("The challenge we solve" and the
 * partnership model). It describes a typical approach, not any provider,
 * since the brief says not to name or compare competitors.
 */

type Mode = 'traditional' | 'gvp';

const rows: { aspect: string; traditional: string; gvp: string }[] = [
  {
    aspect: 'Upfront capital',
    traditional: 'A significant capital budget, often with a loan or sovereign guarantee.',
    gvp: 'None. GVP funds design, build, deployment and operation upfront.',
  },
  {
    aspect: 'Delivery risk',
    traditional: 'Delays and cost overruns fall on the public budget.',
    gvp: "Carried by GVP. If it is late, it is GVP's cost.",
  },
  {
    aspect: 'Getting started',
    traditional: 'Long procurement cycles before anything goes live.',
    gvp: 'Phased delivery, starting with one priority site, then expanding.',
  },
  {
    aspect: 'Technology over time',
    traditional: 'At risk of being outdated by the time it is delivered.',
    gvp: 'Technology refresh included. No obsolete systems at the end of the term.',
  },
  {
    aspect: 'Revenue',
    traditional: 'An ongoing cost that competes with health, education and infrastructure.',
    gvp: 'A new, recurring revenue stream, with Government’s share allocated first.',
  },
  {
    aspect: 'Visibility',
    traditional: 'Performance reported through standard budget processes.',
    gvp: 'Published fees, open books, real-time dashboard and independent audit.',
  },
];

export default function ModelComparison() {
  const [mode, setMode] = React.useState<Mode>('gvp');
  const gvp = mode === 'gvp';

  return (
    <Box>
      {/* Toggle */}
      <Box
        role="radiogroup"
        aria-label="Compare delivery models"
        sx={{
          display: 'inline-flex',
          p: 0.5,
          mb: { xs: 4, md: 5 },
          bgcolor: colors.surfaceDeep,
          border: `1px solid ${colors.line}`,
          borderRadius: 999,
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        {/* sliding highlight */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 4,
            bottom: 4,
            left: 4,
            width: 'calc(50% - 4px)',
            borderRadius: 999,
            bgcolor: gvp ? colors.primary : colors.base,
            transform: gvp ? 'translateX(100%)' : 'translateX(0)',
            transition: 'transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), background-color 0.35s ease',
          }}
        />
        {(['traditional', 'gvp'] as Mode[]).map((m) => {
          const active = mode === m;
          return (
            <ButtonBase
              key={m}
              role="radio"
              aria-checked={active}
              onClick={() => setMode(m)}
              sx={{
                position: 'relative',
                zIndex: 1,
                flex: 1,
                minWidth: { xs: 150, sm: 220 },
                px: { xs: 2, sm: 3 },
                py: 1.25,
                borderRadius: 999,
                fontWeight: 600,
                fontSize: { xs: '0.88rem', sm: '0.95rem' },
                color: active ? '#FFFFFF' : colors.muted,
                transition: 'color 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {m === 'gvp' ? 'GVP partnership' : 'Traditional programme'}
            </ButtonBase>
          );
        })}
      </Box>

      {/* Rows */}
      <Box
        aria-live="polite"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {rows.map((r, i) => (
          <Box
            key={r.aspect}
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'flex-start',
              p: { xs: 2.5, md: 3 },
              borderRadius: '4px',
              border: `1px solid ${gvp ? 'rgb(var(--gvp-primary) / 0.25)' : colors.line}`,
              bgcolor: gvp ? colors.surface : colors.background,
              transition: 'background-color 0.4s ease, border-color 0.4s ease',
            }}
          >
            <Box
              sx={{
                flexShrink: 0,
                width: 32,
                height: 32,
                mt: '2px',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                bgcolor: gvp ? colors.status.cleared : colors.surfaceDeep,
                color: gvp ? '#FFFFFF' : colors.muted,
                transition: 'background-color 0.4s ease, color 0.4s ease',
                '& svg': { fontSize: 18 },
              }}
            >
              {gvp ? <CheckRoundedIcon /> : <RemoveRoundedIcon />}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: colors.accentDark }}>
                {String(i + 1).padStart(2, '0')} · {r.aspect}
              </Typography>
              {/* key on mode re-runs the fade each time the toggle changes */}
              <Typography
                key={mode}
                variant="body1"
                className="gvp-swap"
                sx={{ mt: 0.75, color: gvp ? colors.base : colors.muted, fontWeight: gvp ? 500 : 400 }}
              >
                {gvp ? r.gvp : r.traditional}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
