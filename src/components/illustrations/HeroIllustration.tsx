import * as React from 'react';
import { colors, fontStacks } from '@/theme/tokens';

/**
 * Hero scene: an automated border eGate.
 * Two pedestal cabinets with a passport reader, glass flap doors that open
 * once the traveller is verified, a face-capture screen with a scan line,
 * lane arrows, and a plane circling the globe behind.
 * Original artwork, drawn in code. Animations are CSS classes in
 * globals.css (gvp-*) and switch off for reduced-motion users.
 */

const mono = fontStacks.mono;

const PLANE =
  'M12 0 L14 8 L24 13 L24 15 L14 12 L14 19 L17 21 L17 23 L12 22 L7 23 L7 21 L10 19 L10 12 L0 15 L0 13 L10 8 Z';

function Check({ x, y, size, color, width = 3 }: { x: number; y: number; size: number; color: string; width?: number }) {
  return (
    <path
      d={`M${x} ${y + size * 0.55} L${x + size * 0.38} ${y + size * 0.9} L${x + size} ${y + size * 0.1}`}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export default function HeroIllustration({
  title = 'Illustration of an automated border eGate verifying a traveller',
  variant = 'dark',
}: {
  title?: string;
  /** 'light' redraws the backdrop (globe, orbit, plane, lane) for a white background */
  variant?: 'dark' | 'light';
}) {
  const id = `gvp-egate-${variant}`;
  const light = variant === 'light';
  // Backdrop colours: pale on dark backgrounds, palette maroon on white
  const deco = light ? colors.primary : colors.accentLight;
  const grid = light ? colors.primary : colors.pattern;
  const lane = light ? colors.primary : colors.accent;
  const cx = 260;
  const cy = 250;
  const cleared = colors.status.cleared;

  // Cabinet geometry (front faces)
  const L = { x: 112, w: 88 }; // left cabinet front
  const Rc = { x: 320, w: 88 }; // right cabinet front
  const top = 268; // top edge of front faces
  const floor = 404; // bottom edge
  const depth = 14; // how far the top/inner faces recede

  return (
    <svg viewBox="0 0 520 480" width="100%" role="img" aria-label={title} className="gvp-hero-art" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={light ? colors.accentLight : colors.primaryLight} stopOpacity={light ? 0.7 : 0.55} />
          <stop offset="70%" stopColor={light ? colors.accentLight : colors.primary} stopOpacity={light ? 0.18 : 0.12} />
          <stop offset="100%" stopColor={light ? colors.accentLight : colors.primary} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.baseSoft} />
          <stop offset="100%" stopColor={colors.base} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={colors.pattern} stopOpacity="0.55" />
          <stop offset="100%" stopColor={colors.pattern} stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.primaryLight} />
          <stop offset="100%" stopColor={colors.primary} />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.accentLight} stopOpacity="0" />
          <stop offset="100%" stopColor={colors.accentLight} stopOpacity="0.55" />
        </linearGradient>
        <clipPath id={`${id}-screen-clip`}>
          <rect x="212" y="122" width="96" height="66" rx="6" />
        </clipPath>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor={light ? colors.base : '#000'} floodOpacity={light ? 0.25 : 0.45} />
        </filter>
      </defs>

      {/* Globe */}
      <circle cx={cx} cy={cy} r="220" fill={`url(#${id}-glow)`} />
      <g fill="none" stroke={grid} strokeOpacity={light ? 0.14 : 0.2} strokeWidth="1">
        <circle cx={cx} cy={cy} r="200" />
        <ellipse cx={cx} cy={cy} rx="120" ry="200" />
        <ellipse cx={cx} cy={cy} rx="200" ry="56" />
      </g>
      {[
        [96, 172, 0],
        [436, 190, 0.8],
        [92, 330, 1.6],
        [430, 336, 2.4],
      ].map(([x, y, d]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="3" fill={deco} />
          <circle cx={x} cy={y} r="9" fill="none" stroke={deco} className="gvp-pulse" style={{ animationDelay: `${d}s` }} />
        </g>
      ))}

      {/* Orbit and plane */}
      <circle cx={cx} cy={cy} r="214" fill="none" stroke={deco} strokeOpacity={light ? 0.35 : 0.4} strokeWidth="1.4" strokeDasharray="4 9" />
      <g className="gvp-orbit" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <g transform={`translate(${cx} ${cy - 214}) rotate(90) translate(-12 -11.5)`}>
          <path d={PLANE} fill={deco} />
        </g>
      </g>

      {/* Floor and lane */}
      <ellipse cx={cx} cy={floor + 4} rx="190" ry="18" fill={colors.primary} fillOpacity={light ? 0.14 : 0.5} />
      <path d={`M${L.x + L.w} ${floor} L${L.x + L.w + depth} ${floor - 14} L${Rc.x - depth} ${floor - 14} L${Rc.x} ${floor} Z`} fill={lane} fillOpacity={light ? 0.08 : 0.12} />
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M${cx - 14} ${floor - 2 - i * 14} L${cx} ${floor - 12 - i * 14} L${cx + 14} ${floor - 2 - i * 14}`}
          fill="none"
          stroke={lane}
          strokeOpacity={i === 0 ? 0.9 : 0.5}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* Face-capture unit at the exit: post + screen */}
      <rect x={cx - 5} y="186" width="10" height={floor - 14 - 186} rx="3" fill={colors.base} stroke={colors.pattern} strokeOpacity="0.35" />
      <g filter={`url(#${id}-shadow)`}>
        <rect x="204" y="112" width="112" height="84" rx="10" fill={colors.base} stroke={colors.pattern} strokeOpacity="0.55" strokeWidth="1.5" />
        <rect x="212" y="122" width="96" height="66" rx="6" fill={`url(#${id}-screen)`} />
      </g>
      {/* camera dot */}
      <circle cx={cx} cy="117" r="2.2" fill={colors.accentLight} />
      <g clipPath={`url(#${id}-screen-clip)`}>
        {/* face */}
        <circle cx={cx} cy="148" r="11" fill={colors.onDark} fillOpacity="0.9" />
        <path d={`M${cx - 20} 188 Q${cx} 158 ${cx + 20} 188 Z`} fill={colors.onDark} fillOpacity="0.9" />
        {/* scan brackets */}
        <g fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round">
          <path d={`M${cx - 22} 138 V130 H${cx - 14}`} />
          <path d={`M${cx + 14} 130 H${cx + 22} V138`} />
          <path d={`M${cx + 22} 160 V168 H${cx + 14}`} />
          <path d={`M${cx - 14} 168 H${cx - 22} V160`} />
        </g>
        {/* sweeping scan line */}
        <g className="gvp-face-scan">
          <rect x="212" y="82" width="96" height="40" fill={`url(#${id}-beam)`} />
          <rect x="212" y="120" width="96" height="2" fill={colors.accentLight} />
        </g>
      </g>

      {/* Glass flap doors (open after the scan) */}
      <g className="gvp-flap-left" style={{ transformOrigin: `${L.x + L.w + depth}px 330px` }}>
        <path d={`M${L.x + L.w + depth} 300 L${cx - 4} 306 L${cx - 4} 352 L${L.x + L.w + depth} 360 Z`} fill={`url(#${id}-glass)`} stroke={light ? colors.primary : colors.accentLight} strokeOpacity="0.6" />
      </g>
      <g className="gvp-flap-right" style={{ transformOrigin: `${Rc.x - depth}px 330px` }}>
        <path d={`M${Rc.x - depth} 300 L${cx + 4} 306 L${cx + 4} 352 L${Rc.x - depth} 360 Z`} fill={`url(#${id}-glass)`} stroke={light ? colors.primary : colors.accentLight} strokeOpacity="0.6" />
      </g>

      {/* Left cabinet */}
      <g>
        {/* inner side face (towards the lane) */}
        <path d={`M${L.x + L.w} ${top} L${L.x + L.w + depth} ${top - 16} L${L.x + L.w + depth} ${floor - 14} L${L.x + L.w} ${floor} Z`} fill={colors.base} stroke={colors.pattern} strokeOpacity="0.35" />
        {/* top face */}
        <path d={`M${L.x} ${top} L${L.x + L.w} ${top} L${L.x + L.w + depth} ${top - 16} L${L.x + depth + 6} ${top - 16} Z`} fill={colors.primary} stroke={colors.pattern} strokeOpacity="0.45" />
        {/* front face */}
        <rect x={L.x} y={top} width={L.w} height={floor - top} rx="4" fill={`url(#${id}-front)`} stroke={colors.pattern} strokeOpacity="0.45" />
        {/* passport reader glass on top */}
        <path d={`M${L.x + 22} ${top - 3} L${L.x + 70} ${top - 3} L${L.x + 78} ${top - 13} L${L.x + 32} ${top - 13} Z`} fill={colors.accentLight} fillOpacity="0.45" className="gvp-blink" />
        {/* status strip + small screen */}
        <rect x={L.x + 12} y={top + 12} width={L.w - 24} height="5" rx="2.5" fill={cleared} className="gvp-blink" />
        <rect x={L.x + 16} y={top + 30} width={L.w - 32} height="34" rx="4" fill={colors.base} stroke={colors.accentLight} strokeOpacity="0.45" />
        <text x={L.x + L.w / 2} y={top + 45} textAnchor="middle" fill={colors.accentLight} style={{ fontFamily: mono, fontSize: 7, letterSpacing: '0.12em' }}>
          PLACE
        </text>
        <text x={L.x + L.w / 2} y={top + 56} textAnchor="middle" fill={colors.accentLight} style={{ fontFamily: mono, fontSize: 7, letterSpacing: '0.12em' }}>
          PASSPORT
        </text>
        <line x1={L.x + 14} y1={top + 82} x2={L.x + L.w - 14} y2={top + 82} stroke={colors.pattern} strokeOpacity="0.25" />
      </g>

      {/* Passport resting on the reader */}
      <g className="gvp-bob">
        <g transform={`translate(${L.x + 30} ${top - 66}) rotate(-10)`} filter={`url(#${id}-shadow)`}>
          <rect width="40" height="54" rx="5" fill={colors.primaryLight} stroke={colors.accentLight} strokeOpacity="0.85" strokeWidth="1.2" />
          <g transform="translate(20 22)" fill="none" stroke={colors.accentLight} strokeWidth="1.2">
            <circle r="9" />
            <ellipse rx="4" ry="9" />
            <line x1="-9" y1="0" x2="9" y2="0" />
          </g>
          <rect x="15" y="40" width="10" height="6" rx="1.5" fill="none" stroke={colors.accentLight} strokeOpacity="0.85" />
        </g>
      </g>

      {/* Right cabinet */}
      <g>
        <path d={`M${Rc.x} ${top} L${Rc.x - depth} ${top - 16} L${Rc.x - depth} ${floor - 14} L${Rc.x} ${floor} Z`} fill={colors.base} stroke={colors.pattern} strokeOpacity="0.35" />
        <path d={`M${Rc.x} ${top} L${Rc.x + Rc.w} ${top} L${Rc.x + Rc.w - depth - 6} ${top - 16} L${Rc.x - depth} ${top - 16} Z`} fill={colors.primary} stroke={colors.pattern} strokeOpacity="0.45" />
        <rect x={Rc.x} y={top} width={Rc.w} height={floor - top} rx="4" fill={`url(#${id}-front)`} stroke={colors.pattern} strokeOpacity="0.45" />
        <rect x={Rc.x + 12} y={top + 12} width={Rc.w - 24} height="5" rx="2.5" fill={cleared} className="gvp-blink" style={{ animationDelay: '0.6s' }} />
        {/* green go arrow */}
        <circle cx={Rc.x + Rc.w / 2} cy={top + 46} r="16" fill={cleared} fillOpacity="0.18" stroke={cleared} />
        <path
          d={`M${Rc.x + Rc.w / 2 - 6} ${top + 46} H${Rc.x + Rc.w / 2 + 6} M${Rc.x + Rc.w / 2 + 1} ${top + 40} L${Rc.x + Rc.w / 2 + 7} ${top + 46} L${Rc.x + Rc.w / 2 + 1} ${top + 52}`}
          fill="none"
          stroke={cleared}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1={Rc.x + 14} y1={top + 82} x2={Rc.x + Rc.w - 14} y2={top + 82} stroke={colors.pattern} strokeOpacity="0.25" />
      </g>

      {/* Verified badge on the screen */}
      <g transform="translate(318 110)">
        <circle r="17" fill="none" stroke={cleared} className="gvp-pulse" />
        <circle r="17" fill={cleared} />
        <Check x={-8} y={-8} size={16} color="#fff" />
      </g>

      {/* Status chip */}
      <g transform={`translate(${cx - 84} ${floor + 30})`}>
        <rect width="168" height="32" rx="16" fill={colors.base} fillOpacity={light ? 1 : 0.9} stroke={colors.pattern} strokeOpacity="0.5" />
        <circle cx="18" cy="16" r="4" fill={cleared} />
        <circle cx="18" cy="16" r="8" fill="none" stroke={cleared} strokeOpacity="0.5" />
        <text x="34" y="20" fill={colors.onDark} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em' }}>
          IDENTITY VERIFIED
        </text>
      </g>
    </svg>
  );
}
