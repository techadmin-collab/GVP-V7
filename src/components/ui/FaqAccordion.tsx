'use client';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { colors } from '@/theme/tokens';

export type Faq = { q: string; a: string };

export default function FaqAccordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | false }) {
  const [expanded, setExpanded] = React.useState<number | false>(defaultOpen);
  return (
    <div style={{ borderTop: `1px solid ${colors.line}` }}>
      {items.map((item, i) => (
        <Accordion key={item.q} expanded={expanded === i} onChange={(_, open) => setExpanded(open ? i : false)}>
          <AccordionSummary
            expandIcon={<AddRoundedIcon sx={{ color: colors.accentDark }} />}
            aria-controls={`faq-${i}-content`}
            id={`faq-${i}-header`}
            sx={{
              px: 0,
              py: 1.5,
              '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(45deg)' },
            }}
          >
            <Typography variant="h5" component="h3" sx={{ color: colors.base, pr: 2 }}>
              {item.q}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 0, pb: 3 }}>
            <Typography variant="body1" sx={{ color: colors.muted, maxWidth: 760 }}>
              {item.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
