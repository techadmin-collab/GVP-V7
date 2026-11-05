import * as React from 'react';
import Box from '@mui/material/Box';

/** Two-column layout: heading on the left, content on the right (stacks on mobile). */
export default function Split({ left, right, ratio = '5fr 7fr', gap = 8 }: { left: React.ReactNode; right: React.ReactNode; ratio?: string; gap?: number }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: ratio }, gap: { xs: 4, md: gap }, alignItems: 'start' }}>
      <Box sx={{ position: { md: 'sticky' }, top: { md: 110 } }}>{left}</Box>
      <Box>{right}</Box>
    </Box>
  );
}
