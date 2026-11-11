import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { colors } from '@/theme/tokens';
import { ButtonLink } from './links';

export type CtaAction = { label: string; href: string };

type Props = { title: string; body?: string; actions: CtaAction[] };

/** v7 Modern bento: a large rounded white tile with soft concentric rings in the corner. */
export default function CtaBanner({ title, body, actions }: Props) {
  return (
    <Box component="section" aria-label="Next step" sx={{ bgcolor: colors.background, py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '36px',
            bgcolor: colors.surface,
            border: `1px solid ${colors.line}`,
            px: { xs: 3.5, sm: 6, md: 8 },
            py: { xs: 5, md: 7 },
            backgroundImage: `repeating-radial-gradient(circle at 100% 0%, transparent 0 38px, rgb(var(--gvp-primary) / 0.06) 38px 40px)`,
          }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 6 }} alignItems={{ md: 'center' }} justifyContent="space-between" sx={{ position: 'relative' }}>
            <Box sx={{ maxWidth: 640 }}>
              <Typography variant="h2" component="h2" sx={{ color: colors.text }}>{title}</Typography>
              {body ? <Typography variant="subtitle1" sx={{ mt: 1.5, color: colors.muted }}>{body}</Typography> : null}
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ flexShrink: 0 }}>
              {actions.map((a, i) => (
                <ButtonLink key={a.label} href={a.href} size="large" color="primary" variant={i === 0 ? 'contained' : 'outlined'} endIcon={i === 0 ? <ArrowOutwardRoundedIcon /> : undefined}>
                  {a.label}
                </ButtonLink>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
