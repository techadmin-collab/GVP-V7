import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';
import Rich from './Rich';

type Row = { label: string; value: string };

type Props = {
  headers: [string, string];
  rows: Row[];
  caption?: string;
  numbered?: boolean;
};

/**
 * Two-column definition table. Uses a semantic <table> and collapses to
 * stacked rows on small screens.
 */
export default function InfoTable({ headers, rows, caption, numbered = false }: Props) {
  return (
    <Box sx={{ border: `1px solid ${colors.line}`, borderRadius: '2px', bgcolor: colors.surface, overflow: 'hidden' }}>
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          '& th, & td': { textAlign: 'left', verticalAlign: 'top', px: { xs: 2.5, md: 3.5 }, py: 2.25 },
          '& thead th': {
            fontFamily: fontStacks.mono,
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: colors.accentDark,
            bgcolor: colors.surfaceDeep,
            borderBottom: `1px solid ${colors.line}`,
          },
          '& tbody tr + tr': { borderTop: `1px solid ${colors.line}` },
          '& tbody th': { width: { md: '36%' }, fontWeight: 600, color: colors.base },
          '& tbody td': { color: colors.text },
          '@media (max-width: 599px)': {
            '& thead': { display: 'none' },
            '& tbody tr': { display: 'block', py: 1 },
            '& tbody th, & tbody td': { display: 'block', width: 'auto', py: 0.75 },
          },
        }}
      >
        {caption ? (
          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{caption}</caption>
        ) : null}
        <thead>
          <tr>
            <th scope="col">{headers[0]}</th>
            <th scope="col">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label}>
              <th scope="row">
                <Typography component="span" sx={{ fontWeight: 600, fontSize: '1rem', display: 'flex', gap: 1.5 }}>
                  {numbered ? (
                    <Box component="span" sx={{ fontFamily: fontStacks.mono, color: colors.accentDark, fontWeight: 500 }}>
                      {String(i + 1).padStart(2, '0')}
                    </Box>
                  ) : null}
                  {row.label}
                </Typography>
              </th>
              <td>
                <Typography component="span" variant="body2" sx={{ fontSize: '1rem' }}>
                  <Rich text={row.value} />
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
}
