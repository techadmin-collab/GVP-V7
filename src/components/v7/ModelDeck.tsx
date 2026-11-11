'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { colors } from '@/theme/tokens';

const moves = [
  { word: 'Build', icon: <ConstructionRoundedIcon />, body: 'GVP designs, finances and installs the system, starting at one priority site.', who: 'Financed by GVP' },
  { word: 'Operate', icon: <SettingsSuggestRoundedIcon />, body: 'GVP runs and maintains it against agreed service levels, with technology refresh included.', who: 'Risk with GVP' },
  { word: 'Share', icon: <PieChartRoundedIcon />, body: 'Published fees are collected and recorded. Government’s share is allocated first.', who: 'Revenue shared openly' },
  { word: 'Transfer', icon: <KeyRoundedIcon />, body: 'At the end of the agreed term, the system is handed over to Government.', who: 'Owned by Government' },
];

/** v7: the partnership model as a stack of cards you step through, with pill indicators. */
export default function ModelDeck() {
  const [i, setI] = React.useState(0);
  const go = (d: number) => setI((v) => (v + d + moves.length) % moves.length);
  const m = moves[i];
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 2 }}>
      {/* pill index */}
      <Box sx={{ display: 'grid', gap: 1, alignContent: 'start' }} role="tablist" aria-label="Partnership model stages">
        {moves.map((x, k) => (
          <ButtonBase
            key={x.word}
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            sx={{ justifyContent: 'space-between', px: 2.5, py: 2, borderRadius: 999, fontWeight: 800, fontSize: '1.15rem', bgcolor: k === i ? colors.text : colors.surface, color: k === i ? '#fff' : colors.text, border: `1px solid ${k === i ? colors.text : colors.line}`, transition: 'background-color 0.25s ease' }}
          >
            <span>{x.word}</span>
            <Box component="span" sx={{ fontSize: '0.85rem', opacity: 0.6 }}>0{k + 1}</Box>
          </ButtonBase>
        ))}
      </Box>

      {/* card stack */}
      <Box sx={{ position: 'relative', minHeight: 330 }}>
        <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, transform: 'translate(16px, 16px) rotate(2deg)', borderRadius: '32px', bgcolor: colors.accentLight }} />
        <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, transform: 'translate(8px, 8px) rotate(1deg)', borderRadius: '32px', bgcolor: colors.surface, border: `1px solid ${colors.line}` }} />
        <Box role="tabpanel" key={m.word} className="gvp-swap" sx={{ position: 'relative', height: '100%', minHeight: 330, borderRadius: '32px', bgcolor: colors.primary, color: '#fff', p: { xs: 3.5, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ width: 72, height: 72, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'rgba(255,255,255,0.16)', '& svg': { fontSize: 36 } }}>{m.icon}</Box>
            <Box sx={{ px: 1.75, py: 0.6, borderRadius: 999, bgcolor: 'rgba(255,255,255,0.16)', fontWeight: 700, fontSize: '0.85rem' }}>{m.who}</Box>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: '3rem', md: '4.2rem' }, letterSpacing: '-0.05em', lineHeight: 1 }}>{m.word}</Typography>
            <Typography sx={{ mt: 1.5, fontSize: '1.15rem', opacity: 0.9, maxWidth: 520 }}>{m.body}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 0.75 }}>
              {moves.map((x, k) => (
                <Box key={x.word} sx={{ width: k === i ? 28 : 8, height: 8, borderRadius: 999, bgcolor: k === i ? '#fff' : 'rgba(255,255,255,0.4)', transition: 'width 0.3s ease' }} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton aria-label="Previous stage" onClick={() => go(-1)} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.16)', '&:hover': { bgcolor: 'rgba(255,255,255,0.28)' } }}>
                <ArrowBackRoundedIcon />
              </IconButton>
              <IconButton aria-label="Next stage" onClick={() => go(1)} sx={{ color: colors.primary, bgcolor: '#fff', '&:hover': { bgcolor: colors.accentLight } }}>
                <ArrowForwardRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
