import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '@/theme/tokens';
import Rich from './Rich';
import Reveal from './Reveal';

export type Feature = { title: string; body: string; icon?: React.ReactNode };

type Props = { items: Feature[]; columns?: 2 | 3 | 4; numbered?: boolean; dark?: boolean };

/** v7 Modern bento: rounded tiles with a soft icon bubble that lift on hover. */
export default function FeatureGrid({ items, columns = 3, numbered = false, dark = false }: Props) {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: `repeat(${columns}, minmax(0, 1fr))` } }}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % columns) * 80} style={{ height: '100%' }}>
          <Box sx={{ height: '100%', p: { xs: 3, md: 3.5 }, borderRadius: '24px', bgcolor: dark ? 'rgba(255,255,255,0.08)' : colors.surface, border: `1px solid ${dark ? 'rgba(255,255,255,0.18)' : colors.line}`, transition: 'transform 0.25s ease, box-shadow 0.25s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: dark ? 'none' : '0 24px 40px -28px rgb(var(--gvp-base) / 0.45)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
              {item.icon ? (
                <Box sx={{ width: 52, height: 52, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: dark ? 'rgba(255,255,255,0.15)' : colors.background, color: dark ? '#fff' : colors.primary, '& svg': { fontSize: 26 } }}>{item.icon}</Box>
              ) : (
                <span />
              )}
              {numbered ? (
                <Box component="span" sx={{ px: 1.25, py: 0.25, borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, bgcolor: dark ? 'rgba(255,255,255,0.15)' : colors.background, color: dark ? '#fff' : colors.primary }}>
                  {String(i + 1).padStart(2, '0')}
                </Box>
              ) : null}
            </Box>
            <Typography variant="h5" component="h3" sx={{ color: dark ? '#fff' : colors.text, mb: 1 }}>{item.title}</Typography>
            <Typography variant="body2" sx={{ color: dark ? 'rgba(255,255,255,0.78)' : colors.muted }}>
              <Rich text={item.body} />
            </Typography>
          </Box>
        </Reveal>
      ))}
    </Box>
  );
}
