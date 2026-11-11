import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { colors } from '@/theme/tokens';
import HeroVideo, { type HeroVideoSource } from './HeroVideo';
import Rich from './Rich';

type Props = {
  overline: string;
  title: React.ReactNode;
  subtitle?: string;
  note?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  asideOnMobile?: boolean;
  asideWidth?: { md: number; lg: number };
  image?: string;
  video?: HeroVideoSource;
  size?: 'large' | 'standard';
  tone?: 'dark' | 'light';
  videoTint?: 'brand' | 'neutral';
};

/**
 * v7 Modern bento hero: two rounded tiles on the blush page, text in a white
 * tile and any artwork (or video) in a companion tile.
 */
export default function PageHero({ overline, title, subtitle, note, actions, aside, asideOnMobile = false, video, size = 'standard' }: Props) {
  const large = size === 'large';
  const side = aside || video;
  return (
    <Box component="header" sx={{ bgcolor: colors.background, pt: { xs: 3, md: 4 }, pb: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', lg: side ? '7fr 5fr' : '1fr' } }}>
          <Box className="gvp-hero-in" sx={{ bgcolor: colors.surface, borderRadius: '32px', border: `1px solid ${colors.line}`, p: { xs: 3.5, sm: 5, md: large ? 7 : 6 } }}>
            <Box component="p" sx={{ display: 'inline-block', m: 0, mb: 2.5, px: 1.75, py: 0.6, borderRadius: 999, bgcolor: 'rgb(var(--gvp-primary) / 0.08)', color: colors.primary, fontWeight: 700, fontSize: '0.82rem' }}>
              {overline}
            </Box>
            <Typography variant="h1" component="h1" sx={{ color: colors.text, fontSize: large ? undefined : { xs: '2.3rem', md: '3rem' } }}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography variant="subtitle1" component="p" sx={{ mt: 2.5, color: colors.muted, maxWidth: 640 }}>
                <Rich text={subtitle} />
              </Typography>
            ) : null}
            {actions ? (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
                {actions}
              </Stack>
            ) : null}
            {note ? <Typography sx={{ mt: 2.5, fontWeight: 600, color: colors.primary, fontSize: '0.95rem' }}>{note}</Typography> : null}
          </Box>
          {side ? (
            <Box sx={{ display: asideOnMobile || !aside ? 'block' : { xs: 'none', md: 'block' }, position: 'relative', overflow: 'hidden', borderRadius: '32px', bgcolor: aside ? colors.surface : colors.base, border: `1px solid ${colors.line}`, minHeight: 300, p: aside ? { xs: 2.5, md: 3.5 } : 0 }}>
              {video && !aside ? <HeroVideo {...video} opacity={1} /> : null}
              {aside ? <Box sx={{ position: 'relative', height: '100%', display: 'grid', placeItems: 'center' }}>{aside}</Box> : null}
            </Box>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
}
