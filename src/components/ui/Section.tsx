import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { colors } from '@/theme/tokens';
import SecurityPattern from './SecurityPattern';
import HeroVideo, { type HeroVideoSource } from './HeroVideo';
import Rich from './Rich';

export type Tone = 'light' | 'surface' | 'dark' | 'brand';

/* v7 Modern bento: blush page and white bands; dark/brand become a rounded maroon tile */
const toneStyles: Record<Tone, { bg: string; fg: string; muted: string }> = {
  light: { bg: colors.background, fg: colors.text, muted: colors.muted },
  surface: { bg: colors.surface, fg: colors.text, muted: colors.muted },
  dark: { bg: colors.base, fg: '#FFFFFF', muted: 'rgba(255,255,255,0.78)' },
  brand: { bg: colors.primary, fg: '#FFFFFF', muted: 'rgba(255,255,255,0.8)' },
};

export function isDark(tone: Tone) {
  return tone === 'dark' || tone === 'brand';
}

type SectionProps = {
  id?: string;
  tone?: Tone;
  pattern?: boolean;
  py?: { xs: number; md: number } | number;
  children: React.ReactNode;
  ariaLabel?: string;
  narrow?: boolean;
  video?: HeroVideoSource;
};

export default function Section({ id, tone = 'light', pattern = false, py = { xs: 6, md: 9 }, children, ariaLabel, narrow = false, video }: SectionProps) {
  const t = toneStyles[tone];
  const dark = isDark(tone);
  const tint = tone === 'brand' ? '--gvp-primary' : '--gvp-base';
  if (dark) {
    // Dark sections sit in a big rounded tile on the blush page
    return (
      <Box component="section" id={id} aria-label={ariaLabel} sx={{ bgcolor: colors.background, py: { xs: 2, md: 3 } }}>
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '36px', bgcolor: t.bg, color: t.fg, px: { xs: 3, sm: 5, md: 7 }, py: { xs: 6, md: 8 } }}>
            {video ? (
              <>
                <HeroVideo {...video} opacity={1} />
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `rgb(var(${tint}) / 0.8)` }} />
              </>
            ) : pattern ? (
              <SecurityPattern opacity={0.06} color="#FFFFFF" />
            ) : null}
            <Box sx={{ position: 'relative', maxWidth: narrow ? 900 : 'none', mx: 'auto' }}>{children}</Box>
          </Box>
        </Container>
      </Box>
    );
  }
  return (
    <Box component="section" id={id} aria-label={ariaLabel} sx={{ position: 'relative', bgcolor: t.bg, color: t.fg, py, overflow: 'hidden' }}>
      <Container maxWidth={narrow ? 'md' : 'lg'} sx={{ position: 'relative' }}>
        {children}
      </Container>
    </Box>
  );
}

type HeadingProps = {
  overline?: string;
  title: string;
  intro?: string;
  tone?: Tone;
  align?: 'left' | 'center';
  maxWidth?: number;
  as?: 'h2' | 'h3';
};

/** Bento heading: a soft pill label above a bold, tight headline. */
export function SectionHeading({ overline, title, intro, tone = 'light', align = 'left', maxWidth = 760, as = 'h2' }: HeadingProps) {
  const t = toneStyles[tone];
  const dark = isDark(tone);
  return (
    <Box sx={{ mb: { xs: 4, md: 5 }, maxWidth, mx: align === 'center' ? 'auto' : 0, textAlign: align }}>
      {overline ? (
        <Box component="p" sx={{ display: 'inline-block', m: 0, mb: 2, px: 1.75, py: 0.6, borderRadius: 999, bgcolor: dark ? 'rgba(255,255,255,0.14)' : 'rgb(var(--gvp-primary) / 0.08)', color: dark ? '#fff' : colors.primary, fontWeight: 700, fontSize: '0.82rem' }}>
          {overline}
        </Box>
      ) : null}
      <Typography variant={as === 'h2' ? 'h2' : 'h3'} component={as} sx={{ color: t.fg }}>
        <Rich text={title} />
      </Typography>
      {intro ? (
        <Typography variant="subtitle1" sx={{ mt: 2, color: t.muted }}>
          <Rich text={intro} />
        </Typography>
      ) : null}
    </Box>
  );
}
