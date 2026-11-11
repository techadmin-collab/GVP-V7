'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { colors } from '@/theme/tokens';
import { faqs } from '@/lib/faqs';

/** v7: questions as pill chips; picking one shows its answer in a large tile. */
export default function QuestionChips() {
  const items = faqs.slice(0, 8);
  const [i, setI] = React.useState(0);
  const f = items[i];
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '6fr 6fr' }, gap: 2, alignItems: 'start' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} role="tablist" aria-label="Questions">
        {items.map((x, k) => (
          <ButtonBase
            key={x.q}
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            sx={{ px: 2, py: 1.25, borderRadius: 999, textAlign: 'left', fontWeight: 700, fontSize: '0.92rem', bgcolor: k === i ? colors.primary : colors.surface, color: k === i ? '#fff' : colors.text, border: `1px solid ${k === i ? colors.primary : colors.line}`, '&:hover': { borderColor: colors.primary } }}
          >
            {x.q}
          </ButtonBase>
        ))}
      </Box>
      <Box role="tabpanel" key={f.q} className="gvp-swap" sx={{ borderRadius: '28px', bgcolor: colors.surface, border: `1px solid ${colors.line}`, p: { xs: 3, md: 4.5 }, minHeight: 240 }}>
        <Box sx={{ width: 48, height: 48, borderRadius: '16px', display: 'grid', placeItems: 'center', bgcolor: colors.background, color: colors.primary }}>
          <ChatBubbleOutlineRoundedIcon />
        </Box>
        <Typography sx={{ mt: 2.5, fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{f.q}</Typography>
        <Typography sx={{ mt: 1.5, fontSize: '1.08rem', color: colors.muted, lineHeight: 1.7 }}>{f.a}</Typography>
      </Box>
    </Box>
  );
}
