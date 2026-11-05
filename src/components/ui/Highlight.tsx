import * as React from 'react';
import { colors } from '@/theme/tokens';

/**
 * Highlights a phrase with a hand-drawn copper underline that draws itself
 * shortly after the page loads (static for reduced-motion users).
 */
export default function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
      {children}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 300 20"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: '-2%', bottom: '-0.12em', width: '104%', height: '0.32em', overflow: 'visible', pointerEvents: 'none' }}
      >
        <path
          className="gvp-underline"
          d="M3 13 C 60 5, 120 4, 180 8 S 270 15, 297 7"
          pathLength={100}
          fill="none"
          stroke={colors.accentOnLight ?? colors.accent}
          strokeWidth="5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}
