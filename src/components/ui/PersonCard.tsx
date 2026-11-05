import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';
import Rich from './Rich';

type Props = {
  name: string;
  role: string;
  bio: string;
  quote?: string;
  /** Approved portrait under /public (optional; a monogram shows until supplied) */
  photo?: string;
};

function initials(name: string) {
  const clean = name.replace(/\[[^\]]*\]/g, '').trim();
  if (!clean) return 'GVP';
  const parts = clean.split(/\s+/).filter((p) => /^[A-Z]/.test(p));
  return (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '');
}

export default function PersonCard({ name, role, bio, quote, photo }: Props) {
  return (
    <Box
      component="article"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '120px 1fr' },
        gap: { xs: 2.5, sm: 3.5 },
        p: { xs: 3, md: 4 },
        bgcolor: colors.surface,
        border: `1px solid ${colors.line}`,
        borderRadius: '2px',
      }}
    >
      <Box
        aria-hidden={photo ? undefined : 'true'}
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: `1.5px solid ${colors.accent}`,
          outline: `6px solid ${colors.surfaceDeep}`,
          bgcolor: colors.primary,
          color: colors.accentLight,
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
          fontFamily: fontStacks.heading,
          fontSize: 38,
          backgroundImage: photo ? `url(${photo})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {photo ? null : initials(name)}
      </Box>
      <Box>
        <Typography variant="h4" component="h3" sx={{ color: colors.base }}>
          <Rich text={name} />
        </Typography>
        <Typography sx={{ mt: 0.5, fontFamily: fontStacks.mono, fontSize: 12.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.accentDark }}>
          <Rich text={role} />
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: colors.muted }}>
          <Rich text={bio} />
        </Typography>
        {quote ? (
          <Typography sx={{ mt: 2, fontFamily: fontStacks.heading, fontStyle: 'italic', fontSize: '1.15rem', color: colors.primary }}>
            “{quote}”
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
