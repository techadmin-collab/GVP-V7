import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { colors, fontStacks } from '@/theme/tokens';
import { ButtonLink } from '@/components/ui/links';
import Rich from '@/components/ui/Rich';

/**
 * Leadership teaser: the Chairman's commitment, from the content brief.
 * No portrait is shown until an approved photo is supplied (brief:
 * "Biographies and photos: obtain approval from each individual").
 * Add one later via the `photo` constant below (path under /public).
 */
const photo: string | null = null;

export default function LeadershipTeaser() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
        gap: { xs: 4, md: 8 },
        alignItems: 'center',
      }}
    >
      {/* Portrait / monogram */}
      <Box sx={{ position: 'relative', width: { xs: 160, md: 220 }, height: { xs: 160, md: 220 }, mx: { xs: 'auto', md: 0 } }}>
        <Box
          aria-hidden="true"
          sx={{ position: 'absolute', inset: -14, borderRadius: '50%', border: `1px dashed rgb(var(--gvp-accent) / 0.6)` }}
        />
        <Box
          role={photo ? 'img' : undefined}
          aria-label={photo ? 'Mohammed Al Bulooki' : undefined}
          aria-hidden={photo ? undefined : 'true'}
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `2px solid ${colors.accent}`,
            bgcolor: colors.primary,
            backgroundImage: photo ? `url(${photo})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'grid',
            placeItems: 'center',
            color: colors.accentLight,
            fontFamily: fontStacks.heading,
            fontSize: { xs: 56, md: 76 },
          }}
        >
          {photo ? null : 'MB'}
        </Box>
      </Box>

      {/* Quote */}
      <Box component="figure" sx={{ m: 0 }}>
        <Typography variant="overline" component="p" sx={{ color: colors.accentDark, mb: 2 }}>
          Leadership
        </Typography>
        <Typography
          component="blockquote"
          sx={{
            m: 0,
            fontFamily: fontStacks.heading,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: { xs: '2rem', md: '3rem' },
            lineHeight: 1.15,
            color: colors.base,
            position: 'relative',
          }}
        >
          <Box component="span" aria-hidden="true" sx={{ color: colors.accent, mr: 0.5 }}>
            “
          </Box>
          Exceptional quality and no compromise on standards.
          <Box component="span" aria-hidden="true" sx={{ color: colors.accent, ml: 0.25 }}>
            ”
          </Box>
        </Typography>
        <Box component="figcaption" sx={{ mt: 3 }}>
          <Typography sx={{ fontWeight: 600, color: colors.base, fontSize: '1.1rem' }}>Mohammed Al Bulooki</Typography>
          <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 12.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: colors.accentDark, mt: 0.5 }}>
            Chairman, Governance and Strategic Oversight
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: colors.muted, maxWidth: 620 }}>
            <Rich text="[Short biography: senior airport operations and aviation leadership, including senior roles at Zayed International Airport in Abu Dhabi. Confirm wording and approvals before publishing.]" />
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <ButtonLink href="/team" variant="outlined" color="primary" size="large" endIcon={<ArrowForwardRoundedIcon />}>
            Meet the leadership team
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}
