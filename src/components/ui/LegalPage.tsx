import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import PageHero from './PageHero';
import Section from './Section';
import Rich from './Rich';
import { colors } from '@/theme/tokens';

export type LegalSection = { heading: string; body: string[] };

export default function LegalPage({ title, overline, sections }: { title: string; overline: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero overline={overline} title={title} />
      <Section tone="surface" narrow>
        <Alert severity="warning" sx={{ mb: 5 }}>
          Draft for legal review. This page must be confirmed by counsel before the site is published.
        </Alert>
        {sections.map((s) => (
          <Box key={s.heading} component="section" sx={{ mb: 5 }}>
            <Typography variant="h4" component="h2" sx={{ color: colors.base, mb: 1.5 }}>
              {s.heading}
            </Typography>
            {s.body.map((p, i) => (
              <Typography key={i} variant="body1" sx={{ color: colors.text, mb: 1.5 }}>
                <Rich text={p} />
              </Typography>
            ))}
          </Box>
        ))}
      </Section>
    </>
  );
}
