'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { colors, fontStacks } from '@/theme/tokens';

type Stat = { from: number; to: number; prefix?: string; suffix?: string; label: string };

/* Values come straight from the content brief, so nothing here is an unconfirmed claim. */
const stats: Stat[] = [
  { from: 100, to: 0, prefix: '$', label: 'Capital outlay for Government' },
  { from: 0, to: 100, suffix: '%', label: 'Traveller data owned by Government' },
  { from: 0, to: 6, label: 'Integrated BMS modules on one platform' },
  { from: 0, to: 4, label: 'Stages: build, operate, share, transfer' },
];

const DURATION = 1600;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function Counter({ stat, start }: { stat: Stat; start: boolean }) {
  // Server and no-JS render show the final value
  const [value, setValue] = React.useState(stat.to);
  const ready = React.useRef(false);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ready.current = true;
    setValue(stat.from);
  }, [stat.from]);

  React.useEffect(() => {
    if (!start || !ready.current) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      setValue(Math.round(stat.from + (stat.to - stat.from) * easeOut(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, stat.from, stat.to]);

  return (
    <>
      <span aria-hidden="true">
        {stat.prefix}
        {value}
        {stat.suffix}
      </span>
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {stat.prefix}
        {stat.to}
        {stat.suffix}
      </span>
    </>
  );
}

/** Band of count-up figures shown under the hero. */
export default function StatCounters() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Box component="section" aria-label="GVP at a glance" sx={{ bgcolor: colors.surface, borderBottom: `1px solid ${colors.line}` }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          ref={ref}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(4, minmax(0, 1fr))' },
          }}
        >
          {stats.map((s, i) => (
            <Box
              key={s.label}
              sx={{
                position: 'relative',
                py: { xs: 4, md: 5 },
                px: { xs: 2, md: 4 },
                borderLeft: {
                  xs: i % 2 === 0 ? 'none' : `1px solid ${colors.line}`,
                  md: i === 0 ? 'none' : `1px solid ${colors.line}`,
                },
                borderTop: { xs: i >= 2 ? `1px solid ${colors.line}` : 'none', md: 'none' },
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontFamily: fontStacks.heading,
                  fontWeight: 500,
                  fontSize: { xs: '2.4rem', md: '3.2rem' },
                  lineHeight: 1,
                  color: colors.primary,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <Counter stat={s} start={start} />
              </Typography>
              <Box sx={{ width: 28, height: 3, bgcolor: colors.accentDark, my: 1.75 }} />
              <Typography variant="body2" sx={{ color: colors.muted, maxWidth: 220 }}>
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
