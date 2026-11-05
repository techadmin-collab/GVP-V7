import * as React from 'react';
import { colors, fontStacks } from '@/theme/tokens';

// Accent for graphics on a light card (the maroon palette's pink accent is too pale here)
const hi = colors.accentOnLight ?? colors.accent;

/**
 * Live-operations dashboard, as senior officials would see it.
 * Abstract bars and lines only: no figures, so nothing reads as a claim.
 * Original artwork, drawn for light backgrounds.
 */

const mono = fontStacks.mono;

const bars = [34, 52, 44, 70, 62, 84, 58, 76, 66, 90, 72, 80];
const line = [62, 54, 58, 44, 48, 36, 40, 30, 34, 24, 28, 20];

export default function DashboardIllustration() {
  const W = 440;
  return (
    <svg viewBox={`0 0 ${W} 300`} width="100%" role="img" aria-label="Illustration of the live BMS operations dashboard" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="gvp-dash-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hi} stopOpacity="0.28" />
          <stop offset="100%" stopColor={hi} stopOpacity="0" />
        </linearGradient>
        <filter id="gvp-dash-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor={colors.base} floodOpacity="0.16" />
        </filter>
      </defs>

      {/* window */}
      <g filter="url(#gvp-dash-shadow)">
        <rect x="6" y="6" width={W - 12} height="284" rx="10" fill={colors.surface} stroke={colors.line} />
      </g>
      <path d={`M16 6 H${W - 16} A10 10 0 0 1 ${W - 6} 16 V38 H6 V16 A10 10 0 0 1 16 6 Z`} fill={colors.base} />
      {[22, 36, 50].map((x, i) => (
        <circle key={x} cx={x} cy="22" r="4" fill={i === 0 ? hi : colors.pattern} fillOpacity={i === 0 ? 1 : 0.5} />
      ))}
      <text x="68" y="25.5" fill={colors.onDark} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.18em' }}>
        BMS · LIVE OPERATIONS
      </text>
      <circle cx={W - 62} cy="22" r="3.5" fill={colors.status.cleared} />
      <text x={W - 54} y="25.5" fill={colors.pattern} style={{ fontFamily: mono, fontSize: 8, letterSpacing: '0.16em' }}>
        LIVE
      </text>

      {/* KPI tiles */}
      {[
        { label: 'ARRIVALS', w: 70 },
        { label: 'QUEUE TIME', w: 46 },
        { label: 'REVENUE', w: 60 },
      ].map((k, i) => {
        const x = 22 + i * 136;
        return (
          <g key={k.label}>
            <rect x={x} y="52" width="124" height="58" rx="6" fill={colors.background} stroke={colors.line} />
            <text x={x + 12} y="70" fill={colors.accentDark} style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: '0.16em' }}>
              {k.label}
            </text>
            <rect x={x + 12} y="78" width={k.w} height="10" rx="3" fill={colors.base} fillOpacity="0.8" />
            {/* sparkline */}
            <polyline
              points={[0, 1, 2, 3, 4, 5].map((j) => `${x + 12 + j * 18},${100 - ((j * 7 + i * 5) % 9)}`).join(' ')}
              fill="none"
              stroke={i === 1 ? colors.status.cleared : colors.primary}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* bar chart: arrivals by hour */}
      <rect x="22" y="124" width="260" height="150" rx="6" fill={colors.background} stroke={colors.line} />
      <text x="34" y="142" fill={colors.accentDark} style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: '0.16em' }}>
        PASSENGER FLOW
      </text>
      {[0, 1, 2].map((g) => (
        <line key={g} x1="34" x2="270" y1={176 + g * 30} y2={176 + g * 30} stroke={colors.line} />
      ))}
      {bars.map((h, i) => (
        <rect key={i} className="gvp-bar" style={{ transitionDelay: `${i * 55}ms` }} x={38 + i * 19} y={260 - h} width="11" height={h} rx="2" fill={i === 9 ? hi : colors.primary} fillOpacity={i === 9 ? 1 : 0.8} />
      ))}
      {/* trend line + area */}
      <path
        d={`M43.5 260 ${line.map((v, i) => `L${43.5 + i * 19} ${190 + v - 40}`).join(' ')} L${43.5 + 11 * 19} 260 Z`}
        fill="url(#gvp-dash-area)"
      />
      <polyline
        points={line.map((v, i) => `${43.5 + i * 19},${190 + v - 40}`).join(' ')}
        className="gvp-draw"
        pathLength={100}
        strokeDasharray="100 100"
        fill="none"
        stroke={hi}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* gauge: service level */}
      <rect x="294" y="124" width="124" height="150" rx="6" fill={colors.background} stroke={colors.line} />
      <text x="306" y="142" fill={colors.accentDark} style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: '0.16em' }}>
        SERVICE LEVEL
      </text>
      <g transform="translate(356 206)">
        <circle r="36" fill="none" stroke={colors.surfaceDeep} strokeWidth="9" />
        <circle
          r="36"
          fill="none"
          stroke={colors.primary}
          strokeWidth="9"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="82 100"
          className="gvp-draw"
          style={{ '--gvp-draw-from': 82 } as React.CSSProperties}
          transform="rotate(-90)"
        />
        <circle r="24" fill={colors.surface} />
        <path d="M-9 0 L-3 6 L10 -7" fill="none" stroke={colors.status.cleared} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="320" y="252" width="72" height="6" rx="3" fill={colors.text} fillOpacity="0.15" />
    </svg>
  );
}
