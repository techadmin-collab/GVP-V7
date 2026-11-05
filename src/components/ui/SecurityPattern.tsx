import * as React from 'react';
import { colors } from '@/theme/tokens';

/**
 * Fine guilloche line art, like the security printing on passports and
 * banknotes. Deterministic, so it renders identically on server and client.
 */
type Props = {
  color?: string;
  opacity?: number;
  lines?: number;
  amplitude?: number;
  /** Vertical position of the band's centre, 0–1 */
  centre?: number;
  /** Slowly drift the pattern (decorative motion) */
  animated?: boolean;
};

function buildPaths(lines: number, amplitude: number, centre: number) {
  const width = 1440;
  const height = 600;
  const mid = height * centre;
  const paths: string[] = [];
  for (let i = 0; i < lines; i++) {
    const phase = (i / lines) * Math.PI * 2;
    let d = '';
    for (let x = 0; x <= width; x += 12) {
      const t = x / width;
      const y =
        mid +
        amplitude * Math.sin(t * Math.PI * 4 + phase) * Math.cos(t * Math.PI * 1.5 - phase / 2) +
        (amplitude / 3) * Math.sin(t * Math.PI * 11 + phase * 2);
      d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)} `;
    }
    paths.push(d.trim());
  }
  return { width, height, paths };
}

export default function SecurityPattern({
  color = colors.pattern,
  opacity = 0.22,
  lines = 26,
  amplitude = 150,
  centre = 0.5,
  animated = false,
}: Props) {
  const { width, height, paths } = buildPaths(lines, amplitude, centre);
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={animated ? 'gvp-drift' : undefined}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color} strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
