import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';

/**
 * Side-by-side comparison of a publicly funded programme and the GVP
 * partnership. Both columns are always visible, and each row states the
 * trade-off on both sides (including where the traditional route is
 * stronger, such as keeping all fee revenue), so it reads as a fair
 * comparison rather than a strawman. No provider is named or compared.
 */

const rows: { aspect: string; traditional: string; gvp: string }[] = [
  {
    aspect: 'Funding',
    traditional: 'Funded from the public budget, through a capital allocation or a loan.',
    gvp: 'Financed by GVP and repaid from published user fees. Government commits no upfront capital.',
  },
  {
    aspect: 'Fee revenue',
    traditional: 'Government keeps all fee revenue the system generates.',
    gvp: 'Fee revenue is shared, with Government’s share allocated first under the agreed schedule.',
  },
  {
    aspect: 'Ownership',
    traditional: 'Government owns the system from handover.',
    gvp: 'GVP operates the system for the agreed term, then transfers it to Government.',
  },
  {
    aspect: 'Delivery and volume risk',
    traditional: 'Managed through the supplier contract; overruns and volume shortfalls usually fall on the budget.',
    gvp: 'Delivery and volume risk sit with GVP, against agreed service levels.',
  },
  {
    aspect: 'Getting started',
    traditional: 'Standard public procurement, with scope and funding approved upfront.',
    gvp: 'Phased delivery, starting with one priority site, then expanding.',
  },
  {
    aspect: 'Technology over time',
    traditional: 'Upgrades are funded and procured separately when needed.',
    gvp: 'Technology refresh is included through the term.',
  },
  {
    aspect: 'Commitment',
    traditional: 'Shorter supplier contracts that can be re-tendered.',
    gvp: 'A long-term agreement, with defined service levels, penalties and exit terms.',
  },
  {
    aspect: 'Oversight',
    traditional: 'Reported through standard budget and audit processes.',
    gvp: 'Published fees, open books, a real-time dashboard and independent audit.',
  },
];

const COLS = { aspect: 'What differs', traditional: 'Publicly funded programme', gvp: 'GVP partnership' } as const;

export default function ModelComparison() {
  const cell = { p: { xs: 2, md: 2.5 }, borderTop: `1px solid ${colors.line}` } as const;
  const head = { fontFamily: fontStacks.mono, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' } as const;
  return (
    <Box
      role="table"
      aria-label="Comparison of a publicly funded programme and the GVP partnership"
      sx={{ bgcolor: colors.surface, border: `1px solid ${colors.line}`, borderRadius: '4px', overflow: 'hidden' }}
    >
      {/* header row (desktop) */}
      <Box role="row" sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: '1fr 2fr 2fr', bgcolor: colors.surfaceDeep }}>
        <Typography role="columnheader" sx={{ ...head, p: 2.5, color: colors.muted }}>{COLS.aspect}</Typography>
        <Typography role="columnheader" sx={{ ...head, p: 2.5, color: colors.text }}>{COLS.traditional}</Typography>
        <Typography role="columnheader" sx={{ ...head, p: 2.5, color: colors.primary }}>{COLS.gvp}</Typography>
      </Box>
      {rows.map((r) => (
        <Box key={r.aspect} role="row" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr 2fr' } }}>
          <Typography role="rowheader" sx={{ ...cell, ...head, color: colors.accentDark, pb: { xs: 0, md: 2.5 } }}>
            {r.aspect}
          </Typography>
          <Box role="cell" sx={{ ...cell, borderTop: { xs: 'none', md: `1px solid ${colors.line}` }, pb: { xs: 1, md: 2.5 } }}>
            <Typography sx={{ display: { md: 'none' }, fontSize: 12, fontWeight: 600, color: colors.muted }}>{COLS.traditional}</Typography>
            <Typography variant="body1" sx={{ color: colors.text }}>{r.traditional}</Typography>
          </Box>
          <Box role="cell" sx={{ ...cell, borderTop: { xs: 'none', md: `1px solid ${colors.line}` }, bgcolor: 'rgb(var(--gvp-primary) / 0.035)' }}>
            <Typography sx={{ display: { md: 'none' }, fontSize: 12, fontWeight: 600, color: colors.primary }}>{COLS.gvp}</Typography>
            <Typography variant="body1" sx={{ color: colors.text }}>{r.gvp}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
