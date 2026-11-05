'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { colors, onAccent, fontStacks } from '@/theme/tokens';

/**
 * Animated revenue waterfall: a traveller's fee is collected, Government's
 * share is allocated first, GVP's share covers investment and operations,
 * and everything is confirmed by dashboard, reports and audit.
 * Dots travel along both routes; they're hidden for reduced-motion users.
 * Two layouts: horizontal (desktop) and vertical (mobile).
 */

type Tone = 'plain' | 'gov' | 'gvp';
type Node = { step: string; x: number; y: number; w: number; h: number; tone: Tone; title: string; lines: string[] };
type Layout = { w: number; h: number; nodes: Node[]; govRoute: string; gvpRoute: string; label: number; sub: number };

const desktop: Layout = {
  w: 1120,
  h: 340,
  label: 15,
  sub: 12.5,
  nodes: [
    { step: '01', x: 10, y: 125, w: 220, h: 92, tone: 'plain', title: 'Traveller pays', lines: ['the published fee through', 'the digital platform'] },
    { step: '02', x: 300, y: 125, w: 210, h: 92, tone: 'plain', title: 'Collected', lines: ['and recorded', 'transparently'] },
    { step: '03', x: 590, y: 28, w: 240, h: 100, tone: 'gov', title: 'Government share', lines: ['allocated first, per the', 'agreed schedule'] },
    { step: '04', x: 590, y: 212, w: 240, h: 100, tone: 'gvp', title: 'GVP share', lines: ['covers investment,', 'operations and return'] },
    { step: '05', x: 910, y: 125, w: 200, h: 92, tone: 'plain', title: 'Verified', lines: ['dashboard, monthly reports', 'and annual audit'] },
  ],
  govRoute: 'M120 171 H510 C550 171 550 78 590 78 H830 C870 78 870 171 910 171 H1010',
  gvpRoute: 'M120 171 H510 C550 171 550 262 590 262 H830 C870 262 870 171 910 171 H1010',
};

const mobile: Layout = {
  w: 360,
  h: 600,
  label: 14,
  sub: 11.5,
  nodes: [
    { step: '01', x: 60, y: 8, w: 240, h: 84, tone: 'plain', title: 'Traveller pays', lines: ['the published fee through', 'the digital platform'] },
    { step: '02', x: 60, y: 136, w: 240, h: 84, tone: 'plain', title: 'Collected', lines: ['and recorded transparently'] },
    { step: '03', x: 6, y: 280, w: 166, h: 108, tone: 'gov', title: 'Government', lines: ['share allocated', 'first, per agreed', 'schedule'] },
    { step: '04', x: 188, y: 280, w: 166, h: 108, tone: 'gvp', title: 'GVP share', lines: ['covers investment,', 'operations and', 'return'] },
    { step: '05', x: 60, y: 448, w: 240, h: 84, tone: 'plain', title: 'Verified', lines: ['dashboard, monthly reports', 'and annual audit'] },
  ],
  govRoute: 'M180 50 V220 C180 250 89 250 89 280 V388 C89 418 180 418 180 448 V532',
  gvpRoute: 'M180 50 V220 C180 250 271 250 271 280 V388 C271 418 180 418 180 448 V532',
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

function Flow({ layout, idPrefix, animate }: { layout: Layout; idPrefix: string; animate: boolean }) {
  const { w, h, nodes, govRoute, gvpRoute, label, sub } = layout;
  const dots = [0, 1.6, 3.2];
  const dur = 4.8;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label="How the revenue share works: the traveller pays the published fee, it is collected and recorded, Government's share is allocated first, GVP's share covers investment and operations, and a dashboard, monthly reports and an annual audit confirm all figures." style={{ display: 'block' }}>
      {/* routes (visible in the gaps between boxes) */}
      <path id={`${idPrefix}-gov`} d={govRoute} fill="none" stroke={colors.primary} strokeOpacity="0.55" strokeWidth="2" strokeDasharray="6 6" />
      <path id={`${idPrefix}-gvp`} d={gvpRoute} fill="none" stroke={colors.accent} strokeOpacity="0.8" strokeWidth="2" strokeDasharray="6 6" />

      {/* moving funds (negative begin = already in motion on load, so no dot waits at 0,0) */}
      {animate
        ? dots.map((begin) => (
            <React.Fragment key={begin}>
              <circle r="6" fill={colors.primary}>
                <animateMotion dur={`${dur}s`} begin={`-${begin}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#${idPrefix}-gov`} />
                </animateMotion>
              </circle>
              <circle r="6" fill={colors.accent}>
                <animateMotion dur={`${dur}s`} begin={`-${begin + 0.8}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#${idPrefix}-gvp`} />
                </animateMotion>
              </circle>
            </React.Fragment>
          ))
        : null}

      {/* nodes, drawn over the routes */}
      {nodes.map((n) => {
        const gov = n.tone === 'gov';
        const gvp = n.tone === 'gvp';
        const titleColor = gov ? '#FFFFFF' : colors.base;
        const subColor = gov ? 'rgb(var(--gvp-on-dark) / 0.85)' : colors.muted;
        return (
          <g key={n.step}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx="8"
              fill={gov ? colors.primary : colors.surface}
              stroke={gvp ? colors.accent : gov ? colors.primary : colors.line}
              strokeWidth={gvp ? 1.8 : 1}
            />
            {gov ? (
              <g transform={`translate(${n.x + n.w - 18} ${n.y + 18})`}>
                <rect x="-46" y="-9" width="46" height="18" rx="9" fill={colors.accent} />
                <text x="-23" y="4" textAnchor="middle" fill={onAccent} style={{ fontFamily: fontStacks.mono, fontSize: 9, letterSpacing: '0.12em', fontWeight: 500 }}>
                  FIRST
                </text>
              </g>
            ) : null}
            <text x={n.x + 16} y={n.y + 24} fill={gov ? colors.accentLight : colors.accentDark} style={{ fontFamily: fontStacks.mono, fontSize: 11, letterSpacing: '0.16em' }}>
              {n.step}
            </text>
            <text x={n.x + 16} y={n.y + 46} fill={titleColor} style={{ fontFamily: fontStacks.body, fontSize: label, fontWeight: 600 }}>
              {n.title}
            </text>
            {n.lines.map((l, i) => (
              <text key={l} x={n.x + 16} y={n.y + 64 + i * (sub + 3)} fill={subColor} style={{ fontFamily: fontStacks.body, fontSize: sub }}>
                {l}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export default function RevenueFlow() {
  const reduced = usePrefersReducedMotion();
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Flow layout={desktop} idPrefix="gvp-flow-d" animate={!reduced} />
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' }, maxWidth: 420, mx: 'auto' }}>
        <Flow layout={mobile} idPrefix="gvp-flow-m" animate={!reduced} />
      </Box>
    </>
  );
}
