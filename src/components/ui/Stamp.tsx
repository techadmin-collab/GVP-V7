import * as React from 'react';
import { colors, fontStacks } from '@/theme/tokens';

/**
 * Round passport entry-stamp motif. Decorative only.
 */
type Props = {
  ring: string; // text around the edge
  centreTop: string;
  centreMain: string;
  centreBottom?: string;
  size?: number;
  color?: string;
  rotate?: number;
};

export default function Stamp({
  ring,
  centreTop,
  centreMain,
  centreBottom,
  size = 190,
  color = colors.accentLight,
  rotate = -12,
}: Props) {
  // Stable id derived from the ring text (no hooks, so this stays a server component)
  const id = Array.from(ring + centreMain).reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7).toString(36);
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ transform: `rotate(${rotate}deg)`, display: 'block' }}
    >
      <defs>
        <path id={`ring-${id}`} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="100" cy="100" r="88" fill="none" stroke={color} strokeWidth="0.8" />
      <circle cx="100" cy="100" r="58" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="2 3" />
      <text
        fill={color}
        style={{ fontFamily: fontStacks.mono, fontSize: 11.5, letterSpacing: '0.22em', fontWeight: 500 }}
      >
        <textPath href={`#ring-${id}`} startOffset="0">
          {ring}
        </textPath>
      </text>
      <text
        x="100"
        y="82"
        textAnchor="middle"
        fill={color}
        style={{ fontFamily: fontStacks.mono, fontSize: 10, letterSpacing: '0.18em' }}
      >
        {centreTop}
      </text>
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fill={color}
        style={{ fontFamily: fontStacks.heading, fontSize: 30, fontWeight: 600 }}
      >
        {centreMain}
      </text>
      {centreBottom ? (
        <text
          x="100"
          y="134"
          textAnchor="middle"
          fill={color}
          style={{ fontFamily: fontStacks.mono, fontSize: 10, letterSpacing: '0.18em' }}
        >
          {centreBottom}
        </text>
      ) : null}
    </svg>
  );
}
