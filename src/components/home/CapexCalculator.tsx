'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import { colors, fontStacks } from '@/theme/tokens';

/**
 * Interactive fee-model explainer.
 * All figures are ILLUSTRATIVE ONLY and are not an offer. It deliberately
 * shows NO revenue split: shares are agreed with Government for each
 * programme, and a public default could anchor negotiations or conflict
 * with a live financial proposal.
 */

const TERM_YEARS = 10; // illustrative operating term

function money(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(n >= 1e10 ? 0 : 1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(n >= 1e8 ? 0 : 1)}M`;
  if (n >= 1e3) return `$${Math.round(n / 1e3)}K`;
  return `$${Math.round(n)}`;
}

type SliderRowProps = {
  id: string;
  label: string;
  valueText: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
};

function SliderRow({ id, label, valueText, value, min, max, step, onChange, hint }: SliderRowProps) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 2 }}>
        <Typography id={id} component="label" sx={{ color: colors.onDark, fontWeight: 500 }}>
          {label}
        </Typography>
        <Typography sx={{ fontFamily: fontStacks.mono, color: colors.accentLight, fontSize: 15, whiteSpace: 'nowrap' }}>{valueText}</Typography>
      </Box>
      <Slider
        aria-labelledby={id}
        getAriaValueText={() => valueText}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_, v) => onChange(v as number)}
        color="secondary"
        sx={{
          mt: 0.5,
          height: 6,
          '& .MuiSlider-rail': { bgcolor: 'rgb(var(--gvp-pattern) / 0.35)', opacity: 1 },
          '& .MuiSlider-thumb': {
            width: 22,
            height: 22,
            bgcolor: colors.onDark,
            border: `3px solid ${colors.accent}`,
            '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 8px rgb(var(--gvp-accent) / 0.2)' },
          },
        }}
      />
      {hint ? (
        <Typography variant="body2" sx={{ color: 'rgb(var(--gvp-on-dark) / 0.6)', fontSize: '0.85rem', mt: -0.5 }}>
          {hint}
        </Typography>
      ) : null}
    </Box>
  );
}

export default function CapexCalculator() {
  const [arrivals, setArrivals] = React.useState(5); // millions per year
  const [fee, setFee] = React.useState(20); // USD per traveller

  const annual = arrivals * 1e6 * fee;
  const term = annual * TERM_YEARS;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '5fr 6fr' },
        gap: { xs: 5, md: 8 },
        alignItems: 'start',
      }}
    >
      {/* Inputs */}
      <Box>
        <SliderRow
          id="calc-arrivals"
          label="International arrivals per year"
          valueText={`${arrivals.toFixed(1)}M`}
          value={arrivals}
          min={0.5}
          max={20}
          step={0.5}
          onChange={setArrivals}
        />
        <SliderRow
          id="calc-fee"
          label="Traveller service fee"
          valueText={`$${fee}`}
          value={fee}
          min={5}
          max={60}
          step={1}
          onChange={setFee}
          hint="Set and published by Government."
        />
        <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start', mt: 1, color: 'rgb(var(--gvp-on-dark) / 0.65)' }}>
          <InfoOutlinedIcon sx={{ fontSize: 18, mt: '2px' }} />
          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
            Illustrative example only, not an offer. Fees, the revenue split and the term are agreed with Government for each programme.
          </Typography>
        </Box>
      </Box>

      {/* Results */}
      <Box
        aria-live="polite"
        sx={{
          bgcolor: colors.surface,
          color: colors.text,
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 30px 60px -30px rgba(0,0,0,0.6)',
        }}
      >
        <Box sx={{ px: { xs: 3, md: 4 }, py: 3.5 }}>
          <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 12, letterSpacing: '0.14em', color: colors.accentDark }}>
            PUBLISHED TRAVELLER FEES EACH YEAR
          </Typography>
          <Typography sx={{ fontFamily: fontStacks.heading, fontSize: { xs: '2.4rem', md: '2.9rem' }, lineHeight: 1.1, color: colors.base, fontVariantNumeric: 'tabular-nums' }}>
            {money(annual)}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.muted }}>
            About <strong style={{ color: colors.base }}>{money(term)}</strong> over an illustrative {TERM_YEARS}-year term, without drawing on the public budget.
          </Typography>

          {/* How the fees are shared: no percentages, by design */}
          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
            <Box sx={{ p: 2, border: `1px solid ${colors.line}`, borderLeft: `3px solid ${colors.primary}`, borderRadius: '3px' }}>
              <Typography sx={{ fontWeight: 600, color: colors.base }}>Government share</Typography>
              <Typography variant="body2" sx={{ color: colors.muted, fontSize: '0.85rem' }}>
                Allocated first, at the rate set in the agreed schedule.
              </Typography>
            </Box>
            <Box sx={{ p: 2, border: `1px solid ${colors.line}`, borderLeft: `3px solid ${colors.accentLight}`, borderRadius: '3px' }}>
              <Typography sx={{ fontWeight: 600, color: colors.base }}>GVP share</Typography>
              <Typography variant="body2" sx={{ color: colors.muted, fontSize: '0.85rem' }}>
                Recovers the investment and covers operations and technology refresh.
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ mt: 2, fontFamily: fontStacks.mono, fontSize: 11, letterSpacing: '0.12em', color: colors.muted }}>
            ILLUSTRATIVE EXAMPLE · NOT AN OFFER · SPLIT AGREED PER PROGRAMME
          </Typography>
        </Box>

        {/* Risk note */}
        <Box sx={{ px: { xs: 3, md: 4 }, py: 2.25, bgcolor: colors.primaryDark, color: colors.onDark, display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <ShieldOutlinedIcon sx={{ color: colors.accentLight, fontSize: 22 }} />
          <Typography variant="body2" sx={{ color: 'rgb(var(--gvp-on-dark) / 0.85)' }}>
            If traveller volumes are lower than planned, <strong style={{ color: '#fff' }}>GVP bears the shortfall</strong>, not the taxpayer.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
