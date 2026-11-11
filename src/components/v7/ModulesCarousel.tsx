'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import FaceRetouchingNaturalRoundedIcon from '@mui/icons-material/FaceRetouchingNaturalRounded';
import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { colors } from '@/theme/tokens';

const modules = [
  { icon: <AppRegistrationRoundedIcon />, title: 'Electronic Travel Authorisation', body: 'Travellers apply and pay a published fee online, before they travel.' },
  { icon: <FaceRetouchingNaturalRoundedIcon />, title: 'eGates and automated counters', body: 'Biometric checks confirm identity in seconds at the border.' },
  { icon: <AirlineSeatReclineNormalRoundedIcon />, title: 'Passenger processing', body: 'One flow from arrival to exit, with officers focused on complex cases.' },
  { icon: <InsightsRoundedIcon />, title: 'Analytics and reporting', body: 'Volumes, queues and service levels visible to Government in real time.' },
  { icon: <CampaignRoundedIcon />, title: 'Destination promotion', body: 'The journey becomes a welcome, and a marketing channel, from the first click.' },
  { icon: <SchoolRoundedIcon />, title: 'Training and operations', body: 'Change management, local capacity and long-term service management.' },
];

/** v7: a horizontally scrolling, snap-aligned row of module cards with arrow controls. */
export default function ModulesCarousel() {
  const track = React.useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 380), behavior: 'smooth' });
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
        <IconButton aria-label="Previous modules" onClick={() => scroll(-1)} sx={{ bgcolor: colors.surface, border: `1px solid ${colors.line}`, '&:hover': { bgcolor: colors.accentLight } }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <IconButton aria-label="Next modules" onClick={() => scroll(1)} sx={{ bgcolor: colors.primary, color: '#fff', '&:hover': { bgcolor: colors.primaryDark } }}>
          <ArrowForwardRoundedIcon />
        </IconButton>
      </Box>
      <Box
        ref={track}
        role="list"
        aria-label="Platform modules"
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: { xs: '82%', sm: '46%', md: '31%' },
          gap: 2,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          pb: 1.5,
          scrollbarWidth: 'thin',
        }}
      >
        {modules.map((m, i) => (
          <Box
            role="listitem"
            key={m.title}
            sx={{
              scrollSnapAlign: 'start',
              minHeight: 280,
              borderRadius: '28px',
              p: 3.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              bgcolor: i % 3 === 0 ? colors.primary : colors.surface,
              color: i % 3 === 0 ? '#fff' : colors.text,
              border: i % 3 === 0 ? 'none' : `1px solid ${colors.line}`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '20px', display: 'grid', placeItems: 'center', bgcolor: i % 3 === 0 ? 'rgba(255,255,255,0.16)' : colors.background, color: i % 3 === 0 ? '#fff' : colors.primary, '& svg': { fontSize: 32 } }}>
                {m.icon}
              </Box>
              <Typography sx={{ fontWeight: 800, opacity: 0.5 }}>{String(i + 1).padStart(2, '0')}</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.45rem', letterSpacing: '-0.02em', lineHeight: 1.15 }}>{m.title}</Typography>
              <Typography sx={{ mt: 1, opacity: i % 3 === 0 ? 0.85 : 1, color: i % 3 === 0 ? undefined : colors.muted }}>{m.body}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
