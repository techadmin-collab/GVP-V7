import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { colors } from '@/theme/tokens';
import SecurityPattern from './SecurityPattern';
import HeroVideo, { type HeroVideoSource } from './HeroVideo';
import MrzStrip from './MrzStrip';
import Rich from './Rich';

/** Near-black headline colour for light heroes */
const HERO_TEXT = '#141414';

type Props = {
  overline: string;
  title: React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
  /** Optional element shown to the right on large screens (e.g. a stamp) */
  aside?: React.ReactNode;
  /** Show the aside below the text on phones and tablets too */
  asideOnMobile?: boolean;
  /** Width of the aside on desktop */
  asideWidth?: { md: number; lg: number };
  /** Optional licensed background photograph (path under /public) */
  image?: string;
  /** Optional looping background video (muted, decorative) */
  video?: HeroVideoSource;
  size?: 'large' | 'standard';
  /** 'light': white background, dark text; the video plays inside the aside panel instead */
  tone?: 'dark' | 'light';
  /** Background-video overlay: 'brand' tints it with the palette, 'neutral' darkens it with black so the footage keeps its own colours */
  videoTint?: 'brand' | 'neutral';
};

export default function PageHero({ overline, title, subtitle, actions, aside, asideOnMobile = false, asideWidth, image, video, size = 'standard', tone = 'dark', videoTint = 'brand' }: Props) {
  const large = size === 'large';
  const light = tone === 'light';
  // On a light hero the video moves into the aside panel, behind the artwork
  const bgVideo = light ? undefined : video;
  const panelVideo = light ? video : undefined;
  // A large illustration sits beside the text only on wide screens (lg+);
  // below that it stacks under the text so the headline isn't squeezed.
  const wide = asideOnMobile;
  // Typed as plain breakpoint maps so MUI's responsive prop types accept them
  const stackDirection: Record<string, 'row' | 'column'> = wide ? { xs: 'column', lg: 'row' } : { xs: 'column', md: 'row' };
  const stackSpacing: Record<string, number> = wide ? { xs: 6, lg: 8 } : { xs: 5, md: 8 };
  const stackAlign: Record<string, string> = wide ? { lg: 'center' } : { md: 'center' };
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        bgcolor: light ? '#FFFFFF' : video && videoTint === 'neutral' ? '#000000' : colors.base,
        color: light ? HERO_TEXT : 'rgb(var(--gvp-on-dark))',
        overflow: 'hidden',
        pt: large ? { xs: 9, md: 14 } : { xs: 7, md: 10 },
        pb: 0,
        ...(light
          ? {}
          : image
          ? {
              backgroundImage: `linear-gradient(100deg, rgb(var(--gvp-base) / 0.96) 0%, rgb(var(--gvp-base) / 0.86) 45%, rgb(var(--gvp-base) / 0.55) 100%), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {
              backgroundImage: `radial-gradient(ellipse 80% 70% at 85% 20%, rgb(var(--gvp-primary) / 0.85) 0%, rgb(var(--gvp-base) / 0) 70%)`,
            }),
      }}
    >
      {bgVideo ? (
        <>
          <HeroVideo {...bgVideo} opacity={videoTint === 'neutral' ? 1 : 0.85} />
          {/* overlay: keeps the headline readable and blends the video into the palette */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                videoTint === 'neutral'
                  ? // darker on the left behind the headline, clear on the right so the footage shows
                    `linear-gradient(90deg, rgb(0 0 0 / 0.72) 0%, rgb(0 0 0 / 0.42) 45%, rgb(0 0 0 / 0.1) 100%), linear-gradient(180deg, rgb(0 0 0 / 0.25) 0%, rgb(0 0 0 / 0) 25%, rgb(0 0 0 / 0) 72%, rgb(0 0 0 / 0.6) 100%)`
                  : `linear-gradient(90deg, rgb(var(--gvp-base) / 0.9) 0%, rgb(var(--gvp-base) / 0.55) 40%, rgb(var(--gvp-base) / 0.2) 100%), linear-gradient(180deg, rgb(var(--gvp-base) / 0.3) 0%, rgb(var(--gvp-base) / 0) 25%, rgb(var(--gvp-base) / 0) 72%, rgb(var(--gvp-base) / 0.85) 100%), radial-gradient(ellipse 80% 70% at 85% 20%, rgb(var(--gvp-primary) / 0.45) 0%, rgb(var(--gvp-base) / 0) 70%)`,
            }}
          />
        </>
      ) : null}
      {/* line pattern only when there's no video, so the video stays the single backdrop */}
      {video || light ? null : <SecurityPattern opacity={0.07} lines={30} amplitude={large ? 180 : 130} centre={0.55} animated />}
      <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: 2, sm: 3 } }}>
        <Stack direction={stackDirection} spacing={stackSpacing} alignItems={stackAlign}>
          <Box className="gvp-hero-in" sx={{ flex: 1, maxWidth: large ? 820 : 780 }}>
            <Typography variant="overline" component="p" sx={{ color: light ? colors.accentDark : colors.accentLight, mb: 2 }}>
              {overline}
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              sx={{ color: light ? HERO_TEXT : '#FFFFFF', fontSize: large ? undefined : { xs: '2.3rem', md: '3.1rem' } }}
            >
              {title}
            </Typography>
            {subtitle ? (
              <Typography
                variant="subtitle1"
                component="p"
                sx={{ mt: 3, color: light ? colors.muted : 'rgb(var(--gvp-on-dark) / 0.8)', maxWidth: 680, fontSize: { md: large ? '1.3rem' : '1.2rem' } }}
              >
                <Rich text={subtitle} />
              </Typography>
            ) : null}
            {actions ? (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 5 }}>
                {actions}
              </Stack>
            ) : null}
          </Box>
          {aside ? (
            <Box
              sx={{
                display: asideOnMobile ? 'block' : { xs: 'none', md: 'block' },
                flexShrink: 0,
                width: asideWidth
                  ? asideOnMobile
                    ? { xs: '100%', lg: asideWidth.lg }
                    : { xs: '100%', md: asideWidth.md, lg: asideWidth.lg }
                  : undefined,
                maxWidth: asideOnMobile ? { xs: 460, md: 540, lg: 'none' } : { xs: 460, md: 'none' },
                mx: wide ? { xs: 'auto', lg: 0 } : { xs: 'auto', md: 0 },
                // A video behind the artwork on a light hero sits in a rounded panel
                ...(panelVideo
                  ? {
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '6px',
                      bgcolor: colors.base,
                      p: { xs: 2, md: 3 },
                      boxShadow: '0 32px 64px -32px rgb(var(--gvp-base) / 0.55)',
                    }
                  : {}),
              }}
            >
              {panelVideo ? (
                <>
                  <HeroVideo {...panelVideo} opacity={1} />
                  {/* light tint only, so the video shows at full strength behind the artwork */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      background: `linear-gradient(160deg, rgb(var(--gvp-base) / 0.08) 0%, rgb(var(--gvp-base) / 0.3) 100%)`,
                    }}
                  />
                  <Box sx={{ position: 'relative' }}>{aside}</Box>
                </>
              ) : (
                aside
              )}
            </Box>
          ) : null}
        </Stack>
      </Container>
      <Box sx={{ position: 'relative', mt: large ? { xs: 9, md: 13 } : { xs: 7, md: 9 }, py: 2, borderTop: light ? `1px solid ${colors.line}` : '1px solid rgb(var(--gvp-pattern) / 0.18)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <MrzStrip color={light ? 'rgb(var(--gvp-accent-dark) / 0.35)' : undefined} />
        </Container>
      </Box>
    </Box>
  );
}
