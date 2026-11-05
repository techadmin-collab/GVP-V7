import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';
import { ApplyScene, ScreenScene, VerifyScene, WelcomeScene } from './JourneyScenes';
import Reveal from '@/components/ui/Reveal';

const steps = [
  {
    title: 'Apply online',
    body: 'Travellers apply for an ETA before departure and pay a clear, published fee.',
    Scene: ApplyScene,
  },
  {
    title: 'Pre-screened',
    body: 'Applications are checked against watchlists and risk rules set by Government.',
    Scene: ScreenScene,
  },
  {
    title: 'Verified at the gate',
    body: 'Biometric eGates confirm identity in seconds. Officers focus on complex cases.',
    Scene: VerifyScene,
  },
  {
    title: 'Welcomed',
    body: 'A faster, more predictable arrival, with destination information from the first click.',
    Scene: WelcomeScene,
  },
];

/** Four-step traveller journey with illustrated scenes and dashed connectors. */
export default function JourneyStrip() {
  return (
    <Box
      component="ol"
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        rowGap: { xs: 5, sm: 6 },
        columnGap: 3,
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
      }}
    >
      {steps.map(({ title, body, Scene }, i) => (
        <Box
          component="li"
          key={title}
          sx={{
            position: 'relative',
            textAlign: 'center',
            // dashed connector to the next step (desktop only)
            '&::after': {
              content: '""',
              display: { xs: 'none', lg: i === steps.length - 1 ? 'none' : 'block' },
              position: 'absolute',
              // scene is 220px wide (165px tall); its circle is centred
              // 85px down with a ~72px radius, so the line runs edge to edge
              top: 85,
              left: 'calc(50% + 80px)',
              width: 'calc(100% - 160px + 24px)',
              height: '2px',
              backgroundImage: `repeating-linear-gradient(90deg, ${colors.accent} 0 8px, transparent 8px 16px)`,
              backgroundSize: '16px 2px',
              opacity: 0.7,
              animation: 'gvp-dash 1.2s linear infinite',
            },
          }}
        >
          <Reveal delay={i * 140}>
          <Box data-tilt="" sx={{ width: '100%', maxWidth: 220, mx: 'auto' }}>
            <Scene />
          </Box>
          <Typography sx={{ mt: 2, fontFamily: fontStacks.mono, fontSize: 12.5, letterSpacing: '0.16em', color: colors.accentDark }}>
            STEP {String(i + 1).padStart(2, '0')}
          </Typography>
          <Typography variant="h4" component="h3" sx={{ mt: 0.75, color: colors.base }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: colors.muted, maxWidth: 260, mx: 'auto' }}>
            {body}
          </Typography>
          </Reveal>
        </Box>
      ))}
    </Box>
  );
}
