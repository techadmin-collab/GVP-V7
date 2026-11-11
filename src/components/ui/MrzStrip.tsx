import * as React from 'react';
import Box from '@mui/material/Box';
import { fontStacks } from '@/theme/tokens';

/**
 * Decorative strip styled like the machine-readable zone at the bottom of a
 * passport photo page.
 */
const DEFAULT_LINES = [
  'P<GVP<<BORDER<MANAGEMENT<PARTNERS<<SECURE<BORDERS<<OPEN<BOOKS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
  'GVP0000001<9ARE<FUNDED<BY<GVP<<GOVERNED<BY<THE<STATE<<SOVEREIGNTY<FIRST<<<<<<<<<<<<<<<<<<<<<',
];

export default function MrzStrip({ lines = DEFAULT_LINES, color = 'rgb(var(--gvp-pattern) / 0.55)' }: { lines?: string[]; color?: string }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        fontFamily: fontStacks.mono,
        fontSize: { xs: 11, md: 13 },
        letterSpacing: '0.32em',
        lineHeight: 1.7,
        color,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {lines.map((l, i) => (
        <div key={l} style={{ overflow: 'hidden' }}>
          {/* two copies side by side so the ticker loops seamlessly */}
          <span className={`gvp-marquee${i % 2 ? ' is-slow' : ''}`}>
            <span style={{ paddingRight: '3em' }}>{l}</span>
            <span style={{ paddingRight: '3em' }}>{l}</span>
          </span>
        </div>
      ))}
    </Box>
  );
}
