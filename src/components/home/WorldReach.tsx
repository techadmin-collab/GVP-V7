import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import DirectionsBoatRoundedIcon from '@mui/icons-material/DirectionsBoatRounded';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';
import { colors, fontStacks } from '@/theme/tokens';
import Rich from '@/components/ui/Rich';
import { DOTS_PATH, HQ, MAP_H, MAP_W, REGIONS } from './worldDots';

/**
 * "Global by design": a dotted world map with the GVP headquarters and
 * animated flight arcs to illustrative regions. No countries are named
 * and no engagements are implied (see the pre-publishing checklist).
 */

function arc(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  // Control point lifted above the midpoint, so every arc bows upwards
  const lift = Math.min(140, dist * 0.35);
  return `M${x1} ${y1} Q${mx} ${my - lift} ${x2} ${y2}`;
}

const facts = [
  { icon: <FlightRoundedIcon />, title: 'Airports', body: 'Start with one priority airport.' },
  { icon: <DirectionsBoatRoundedIcon />, title: 'Seaports', body: 'Extend to seaports as the programme grows.' },
  { icon: <AltRouteRoundedIcon />, title: 'Land crossings', body: 'One platform for every border control point.' },
];

export default function WorldReach() {
  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          width="100%"
          role="img"
          aria-label="World map showing GVP's headquarters linked to illustrative regions around the world"
          style={{ display: 'block', overflow: 'visible' }}
        >
          {/* land */}
          <path d={DOTS_PATH} stroke={colors.pattern} strokeOpacity="0.42" strokeWidth="3.6" strokeLinecap="round" fill="none" />

          {/* arcs */}
          {REGIONS.map((r, i) => (
            <path
              key={r.name}
              d={arc(HQ.x, HQ.y, r.x, r.y)}
              fill="none"
              stroke={colors.accentLight}
              strokeOpacity="0.75"
              strokeWidth="1.6"
              strokeDasharray="4 7"
              strokeLinecap="round"
              className="gvp-arc"
              style={{ animationDelay: `${-i * 0.35}s` }}
            />
          ))}

          {/* region points */}
          {REGIONS.map((r, i) => (
            <g key={`${r.name}-pt`}>
              <circle cx={r.x} cy={r.y} r="4" fill={colors.onDark} />
              <circle cx={r.x} cy={r.y} r="9" fill="none" stroke={colors.onDark} strokeOpacity="0.6" className="gvp-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
            </g>
          ))}

          {/* headquarters */}
          <g>
            <circle cx={HQ.x} cy={HQ.y} r="16" fill="none" stroke={colors.accentLight} strokeWidth="1.5" className="gvp-pulse" />
            <circle cx={HQ.x} cy={HQ.y} r="16" fill="none" stroke={colors.accentLight} strokeWidth="1.5" className="gvp-pulse" style={{ animationDelay: '1.3s' }} />
            <circle cx={HQ.x} cy={HQ.y} r="8" fill={colors.accentLight} />
            <circle cx={HQ.x} cy={HQ.y} r="3" fill={colors.base} />
          </g>
        </svg>
      </Box>

      {/* legend */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 4 }, mt: { xs: 3, md: 4 }, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box component="span" sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: colors.accentLight, boxShadow: `0 0 0 4px rgb(var(--gvp-accent-light) / 0.25)` }} />
          <Typography variant="body2" sx={{ color: colors.onDark }}>
            Headquarters: <Rich text="[UAE]" />
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box component="span" sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: colors.onDark }} />
          <Typography variant="body2" sx={{ color: 'rgb(var(--gvp-on-dark) / 0.75)' }}>
            Illustrative regions: the model is designed to work for any country
          </Typography>
        </Box>
      </Box>

      {/* entry points */}
      <Box
        sx={{
          mt: { xs: 5, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
          borderTop: '1px solid rgb(var(--gvp-pattern) / 0.22)',
        }}
      >
        {facts.map((f, i) => (
          <Box
            key={f.title}
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'flex-start',
              pt: 3,
              pb: { xs: 1, sm: 0 },
              pl: { sm: i === 0 ? 0 : 4 },
              pr: { sm: 4 },
              borderLeft: { sm: i === 0 ? 'none' : '1px solid rgb(var(--gvp-pattern) / 0.22)' },
            }}
          >
            <Box
              sx={{
                flexShrink: 0,
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                border: `1.5px solid ${colors.accentLight}`,
                color: colors.accentLight,
              }}
            >
              {f.icon}
            </Box>
            <Box>
              <Typography sx={{ fontFamily: fontStacks.mono, fontSize: 12, letterSpacing: '0.16em', color: colors.accentLight, textTransform: 'uppercase' }}>
                {f.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgb(var(--gvp-on-dark) / 0.85)', mt: 0.5 }}>
                {f.body}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
