import * as React from 'react';
import { colors, onAccent, fontStacks } from '@/theme/tokens';

/**
 * Four small scenes for the traveller journey: apply, pre-screen,
 * verify, welcome. Original artwork, drawn for light backgrounds.
 * Each is a 160 x 120 viewBox and scales to its container.
 */

const mono = fontStacks.mono;

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 160 120" width="100%" role="img" aria-label={label} style={{ display: 'block' }}>
      {/* soft backdrop */}
      <circle cx="80" cy="62" r="52" fill={colors.surfaceDeep} />
      <circle cx="80" cy="62" r="52" fill="none" stroke={colors.line} />
      {children}
    </svg>
  );
}

function Tick({ cx, cy, r = 9 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={colors.status.cleared} />
      <path
        d={`M${cx - r * 0.42} ${cy + r * 0.02} L${cx - r * 0.1} ${cy + r * 0.34} L${cx + r * 0.45} ${cy - r * 0.3}`}
        fill="none"
        stroke="#fff"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** 01 Apply online: phone with ETA form and a small globe */
export function ApplyScene() {
  return (
    <Frame label="Traveller applying for an ETA on a phone">
      {/* globe behind */}
      <g fill="none" stroke={colors.primary} strokeOpacity="0.35">
        <circle cx="112" cy="36" r="16" />
        <ellipse cx="112" cy="36" rx="7" ry="16" />
        <line x1="96" y1="36" x2="128" y2="36" />
      </g>
      {/* phone */}
      <rect x="56" y="18" width="48" height="88" rx="9" fill={colors.base} />
      <rect x="60" y="24" width="40" height="76" rx="5" fill={colors.surface} />
      <rect x="72" y="20" width="16" height="2.5" rx="1.25" fill={colors.pattern} />
      <text x="65" y="35" fill={colors.accentDark} style={{ fontFamily: mono, fontSize: 6, letterSpacing: '0.18em' }}>
        ETA
      </text>
      {[42, 52, 62].map((y, i) => (
        <g key={y}>
          <rect x="65" y={y} width={i === 1 ? 22 : 18} height="3" rx="1.5" fill={colors.accentDark} fillOpacity="0.45" />
          <rect x="65" y={y + 4.5} width="30" height="3.5" rx="1.75" fill={colors.text} fillOpacity="0.15" />
        </g>
      ))}
      <rect x="65" y="78" width="30" height="9" rx="4.5" fill={colors.accent} />
      <text x="80" y="84.5" textAnchor="middle" fill={onAccent} style={{ fontFamily: mono, fontSize: 4.6, letterSpacing: '0.12em', fontWeight: 500 }}>
        PAY FEE
      </text>
      {/* cursor tap */}
      <circle cx="92" cy="86" r="6" fill="none" stroke={colors.accent} strokeOpacity="0.6" />
      <circle cx="92" cy="86" r="2.2" fill={colors.accent} />
    </Frame>
  );
}

/** 02 Pre-screened: shield with radar sweep checking against watchlists */
export function ScreenScene() {
  return (
    <Frame label="Application checked against watchlists and risk rules">
      {/* radar rings */}
      <g fill="none" stroke={colors.primary} strokeOpacity="0.25">
        <circle cx="80" cy="62" r="40" />
        <circle cx="80" cy="62" r="28" strokeDasharray="2 3" />
      </g>
      <path d="M80 62 L80 22 A40 40 0 0 1 114.6 42 Z" fill={colors.primary} fillOpacity="0.12" />
      {/* shield */}
      <path
        d="M80 30 L104 39 V60 C104 76 94 87 80 94 C66 87 56 76 56 60 V39 Z"
        fill={colors.primary}
      />
      <path
        d="M80 36 L98 43 V60 C98 72 90.5 81 80 87 C69.5 81 62 72 62 60 V43 Z"
        fill="none"
        stroke={colors.accentLight}
        strokeOpacity="0.8"
      />
      {/* list lines on the shield */}
      {[52, 60, 68].map((y) => (
        <g key={y}>
          <circle cx="70" cy={y} r="1.8" fill={colors.accentLight} />
          <rect x="75" y={y - 1.5} width="16" height="3" rx="1.5" fill={colors.onDark} fillOpacity="0.7" />
        </g>
      ))}
      {/* blips */}
      <circle cx="40" cy="48" r="2.4" fill={colors.accent} />
      <circle cx="122" cy="74" r="2.4" fill={colors.accent} />
      <Tick cx={104} cy={88} />
    </Frame>
  );
}

/** 03 Verified at the gate: face scan and eGate flaps */
export function VerifyScene() {
  return (
    <Frame label="Biometric eGate verifying a traveller">
      {/* floor */}
      <ellipse cx="80" cy="104" rx="46" ry="5" fill={colors.primary} fillOpacity="0.18" />
      {/* pillars */}
      <rect x="34" y="40" width="14" height="64" rx="4" fill={colors.base} />
      <rect x="112" y="40" width="14" height="64" rx="4" fill={colors.base} />
      <rect x="37" y="44" width="8" height="3" rx="1.5" fill={colors.status.cleared} />
      <rect x="115" y="44" width="8" height="3" rx="1.5" fill={colors.status.cleared} />
      {/* flaps open */}
      <path d="M48 66 L66 62 L66 86 L48 90 Z" fill={colors.pattern} fillOpacity="0.35" stroke={colors.primary} strokeOpacity="0.5" />
      <path d="M112 66 L94 62 L94 86 L112 90 Z" fill={colors.pattern} fillOpacity="0.35" stroke={colors.primary} strokeOpacity="0.5" />
      {/* face with scan brackets */}
      <circle cx="80" cy="36" r="11" fill={colors.primary} fillOpacity="0.85" />
      <path d="M64 62 Q80 42 96 62 Z" fill={colors.primary} fillOpacity="0.85" />
      <g fill="none" stroke={colors.accent} strokeWidth="1.8" strokeLinecap="round">
        <path d="M64 28 V20 H72" />
        <path d="M88 20 H96 V28" />
        <path d="M96 46 V54 H88" />
        <path d="M72 54 H64 V46" />
      </g>
      <line x1="62" y1="38" x2="98" y2="38" stroke={colors.accent} strokeWidth="1.2" strokeDasharray="2.5 2.5" />
      <Tick cx={110} cy={24} />
    </Frame>
  );
}

/** 04 Welcomed: suitcase in front of a generic skyline, with a welcome card */
export function WelcomeScene() {
  return (
    <Frame label="Traveller welcomed into the country">
      {/* generic skyline (no specific landmark) */}
      <g fill={colors.primary} fillOpacity="0.22">
        <rect x="36" y="58" width="12" height="40" />
        <rect x="50" y="46" width="10" height="52" />
        <rect x="62" y="64" width="14" height="34" />
        <path d="M100 98 V60 Q107 44 114 60 V98 Z" />
        <rect x="116" y="52" width="9" height="46" />
        <rect x="86" y="70" width="12" height="28" />
      </g>
      {/* sun */}
      <circle cx="104" cy="30" r="9" fill={colors.accent} fillOpacity="0.85" />
      {/* suitcase */}
      <rect x="62" y="62" width="34" height="38" rx="5" fill={colors.accent} />
      <rect x="72" y="54" width="14" height="10" rx="3" fill="none" stroke={colors.base} strokeWidth="2.4" />
      <line x1="73" y1="66" x2="73" y2="96" stroke={colors.base} strokeOpacity="0.35" strokeWidth="2" />
      <line x1="85" y1="66" x2="85" y2="96" stroke={colors.base} strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="68" cy="102" r="2.4" fill={colors.base} />
      <circle cx="90" cy="102" r="2.4" fill={colors.base} />
      {/* welcome card */}
      <g transform="translate(22 22) rotate(-6)">
        <rect width="46" height="26" rx="4" fill={colors.surface} stroke={colors.line} />
        <text x="6" y="10" fill={colors.accentDark} style={{ fontFamily: mono, fontSize: 5.2, letterSpacing: '0.16em' }}>
          WELCOME
        </text>
        <rect x="6" y="14" width="30" height="3" rx="1.5" fill={colors.text} fillOpacity="0.2" />
        <rect x="6" y="19" width="22" height="3" rx="1.5" fill={colors.text} fillOpacity="0.2" />
      </g>
    </Frame>
  );
}
