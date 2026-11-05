import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { colors } from '@/theme/tokens';
import SecurityPattern from './SecurityPattern';
import { ButtonLink } from './links';

export type CtaAction = { label: string; href: string };

type Props = {
  title: string;
  body?: string;
  actions: CtaAction[];
};

/** Closing call-to-action band used at the bottom of every page. */
export default function CtaBanner({ title, body, actions }: Props) {
  return (
    <Box component="section" aria-label="Next step" sx={{ position: 'relative', bgcolor: colors.primary, color: '#fff', overflow: 'hidden', py: { xs: 8, md: 10 } }}>
      <SecurityPattern opacity={0.07} color={colors.accentLight} lines={20} amplitude={110} animated />
      <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: 2, sm: 3 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 8 }} alignItems={{ md: 'center' }} justifyContent="space-between">
          <Box sx={{ maxWidth: 680 }}>
            <Typography variant="h3" component="h2" sx={{ color: '#fff' }}>
              {title}
            </Typography>
            {body ? (
              <Typography variant="subtitle1" sx={{ mt: 2, color: 'rgba(255,255,255,0.82)' }}>
                {body}
              </Typography>
            ) : null}
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }} spacing={2} sx={{ flexShrink: 0 }}>
            {actions.map((a, i) => (
              <ButtonLink
                key={a.label}
                href={a.href}
                size="large"
                variant={i === 0 ? 'contained' : 'outlined'}
                color={i === 0 ? 'secondary' : 'inherit'}
                endIcon={i === 0 ? <ArrowForwardRoundedIcon /> : undefined}
                sx={
                  i === 0
                    ? // When the accent shares the primary's hue (maroon palette), use a white button so it stands out on the band
                      colors.onAccent
                      ? { bgcolor: '#fff', color: colors.primary, '&:hover': { bgcolor: colors.accentLight } }
                      : undefined
                    : { borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }
                }
              >
                {a.label}
              </ButtonLink>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
