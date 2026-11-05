import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { colors } from '@/theme/tokens';
import Rich from './Rich';

export type BulletItem = { title?: string; body: string };

type Props = {
  items: (BulletItem | string)[];
  dark?: boolean;
  columns?: 1 | 2;
  dense?: boolean;
};

export default function BulletList({ items, dark = false, columns = 1, dense = false }: Props) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        gap: dense ? 1.25 : 2,
        columnGap: 5,
        gridTemplateColumns: { xs: '1fr', md: columns === 2 ? 'repeat(2, minmax(0, 1fr))' : '1fr' },
      }}
    >
      {items.map((raw) => {
        const item: BulletItem = typeof raw === 'string' ? { body: raw } : raw;
        return (
          <Box component="li" key={(item.title ?? '') + item.body} sx={{ display: 'flex', gap: 1.75, alignItems: 'flex-start' }}>
            <Box
              aria-hidden="true"
              sx={{
                mt: '3px',
                flexShrink: 0,
                width: 22,
                height: 22,
                borderRadius: '50%',
                border: `1.5px solid ${dark ? colors.accentLight : colors.accent}`,
                color: dark ? colors.accentLight : colors.accentDark,
                display: 'grid',
                placeItems: 'center',
                '& svg': { fontSize: 14 },
              }}
            >
              <CheckRoundedIcon />
            </Box>
            <Typography variant="body1" sx={{ color: dark ? 'rgb(var(--gvp-on-dark) / 0.85)' : colors.text }}>
              {item.title ? (
                <Box component="strong" sx={{ color: dark ? '#FFFFFF' : colors.base, fontWeight: 600 }}>
                  {item.title}.{' '}
                </Box>
              ) : null}
              <Rich text={item.body} />
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
