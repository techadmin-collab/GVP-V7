import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';
import Rich from './Rich';
import Reveal from './Reveal';

export type Feature = { title: string; body: string; icon?: React.ReactNode };

type Props = {
  items: Feature[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
  dark?: boolean;
};

export default function FeatureGrid({ items, columns = 3, numbered = false, dark = false }: Props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: `repeat(${columns}, minmax(0, 1fr))`,
        },
      }}
    >
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % columns) * 90} style={{ height: '100%' }}>
        <Box
          data-tilt=""
          sx={{
            height: '100%',
            position: 'relative',
            p: { xs: 3, md: 3.5 },
            bgcolor: dark ? 'rgba(255,255,255,0.04)' : colors.surface,
            border: `1px solid ${dark ? 'rgb(var(--gvp-pattern) / 0.22)' : colors.line}`,
            borderTop: `3px solid ${colors.accent}`,
            borderRadius: '2px',
            '&:hover': {
              boxShadow: dark ? '0 18px 40px -24px rgba(0,0,0,0.7)' : '0 22px 40px -24px rgb(var(--gvp-base) / 0.4)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, minHeight: 28 }}>
            {item.icon ? (
              <Box sx={{ color: dark ? colors.accentLight : colors.primary, display: 'flex', '& svg': { fontSize: 30 } }}>
                {item.icon}
              </Box>
            ) : (
              <span />
            )}
            {numbered ? (
              <Typography
                component="span"
                sx={{ fontFamily: fontStacks.mono, fontSize: 13, letterSpacing: '0.12em', color: dark ? colors.pattern : colors.accentDark }}
              >
                {String(i + 1).padStart(2, '0')}
              </Typography>
            ) : null}
          </Box>
          <Typography variant="h5" component="h3" sx={{ color: dark ? '#FFFFFF' : colors.base, mb: 1.25 }}>
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: dark ? 'rgb(var(--gvp-on-dark) / 0.75)' : colors.muted }}>
            <Rich text={item.body} />
          </Typography>
        </Box>
        </Reveal>
      ))}
    </Box>
  );
}
