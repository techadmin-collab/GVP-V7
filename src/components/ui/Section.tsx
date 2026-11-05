import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { colors } from '@/theme/tokens';
import SecurityPattern from './SecurityPattern';
import HeroVideo, { type HeroVideoSource } from './HeroVideo';
import Rich from './Rich';

export type Tone = 'light' | 'surface' | 'dark' | 'brand';

const toneStyles: Record<Tone, { bg: string; fg: string; muted: string }> = {
  light: { bg: colors.background, fg: colors.text, muted: colors.muted },
  surface: { bg: colors.surface, fg: colors.text, muted: colors.muted },
  dark: { bg: colors.base, fg: 'rgb(var(--gvp-on-dark))', muted: 'rgb(var(--gvp-on-dark) / 0.72)' },
  brand: { bg: colors.primary, fg: '#FFFFFF', muted: 'rgba(255, 255, 255, 0.78)' },
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
  /** Optional looping background video, tinted with the section colour (dark and brand tones) */
  video?: HeroVideoSource;
};

export default function Section({
  id,
  tone = 'light',
  pattern = false,
  py = { xs: 8, md: 12 },
  children,
  ariaLabel,
  narrow = false,
  video,
}: SectionProps) {
  const t = toneStyles[tone];
  // RGB variable of the section colour, used to tint a background video
  const tint = tone === 'brand' ? '--gvp-primary' : '--gvp-base';
  return (
    <Box
      component="section"
      id={id}
      aria-label={ariaLabel}
      sx={{ position: 'relative', bgcolor: t.bg, color: t.fg, py, overflow: 'hidden' }}
    >
      {video ? (
        <>
          <HeroVideo {...video} opacity={1} />
          {/* tint keeps the content readable; heavier at the edges so the section blends into its neighbours */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `linear-gradient(180deg, rgb(var(${tint}) / 0.92) 0%, rgb(var(${tint}) / 0.7) 30%, rgb(var(${tint}) / 0.7) 70%, rgb(var(${tint}) / 0.92) 100%)`,
            }}
          />
        </>
      ) : pattern ? (
        <SecurityPattern opacity={0.07} />
      ) : null}
      <Container maxWidth={narrow ? 'md' : 'lg'} sx={{ position: 'relative', px: { xs: 2, sm: 3 } }}>
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

export function SectionHeading({ overline, title, intro, tone = 'light', align = 'left', maxWidth = 760, as = 'h2' }: HeadingProps) {
  const dark = isDark(tone);
  return (
    <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth, mx: align === 'center' ? 'auto' : 0, textAlign: align }}>
      {overline ? (
        <Typography
          variant="overline"
          component="p"
          sx={{ color: dark ? colors.accentLight : colors.accentDark, display: 'block', mb: 1.5 }}
        >
          {overline}
        </Typography>
      ) : null}
      <Typography variant={as === 'h2' ? 'h2' : 'h3'} component={as} sx={{ color: dark ? '#FFFFFF' : colors.base }}>
        <Rich text={title} />
      </Typography>
      {intro ? (
        <Typography variant="subtitle1" sx={{ mt: 2.5, color: dark ? toneStyles[tone].muted : colors.muted }}>
          <Rich text={intro} />
        </Typography>
      ) : null}
    </Box>
  );
}
