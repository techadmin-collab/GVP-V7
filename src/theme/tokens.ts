/**
 * GVP design tokens.
 *
 * Several palettes are kept here. Choose one with NEXT_PUBLIC_THEME in .env:
 *   NEXT_PUBLIC_THEME="maroon-blush"         (default) maroon, blush and pink, mostly light
 *   NEXT_PUBLIC_THEME="indigo-lime"          indigo, violet-blue and lime, mostly light
 *   NEXT_PUBLIC_THEME="navy-saffron"         navy, cobalt and saffron, mostly light
 *   NEXT_PUBLIC_THEME="passport-ink"         emerald, parchment and copper
 *   NEXT_PUBLIC_THEME="diplomatic-oxblood"   oxblood, bone and celadon
 *
 * Components only use the neutral names below (primary, base, background,
 * accent, ...), so switching palettes re-themes the whole site.
 * Plain constants so they work in both server and client components.
 */

type Palette = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  base: string; // headers, heroes, footer
  baseSoft: string;
  background: string; // page background
  surfaceDeep: string;
  surface: string; // cards and panels
  accent: string; // buttons, rules, highlights
  accentDark: string; // accent for text on light backgrounds (AA contrast)
  accentLight: string; // accent for text on dark backgrounds
  pattern: string; // security-pattern lines
  onDark: string; // text on dark backgrounds
  text: string; // body text
  muted: string;
  line: string;
  onAccent?: string; // text on accent-filled buttons and pills (defaults to base)
  accentHover?: string; // accent button hover fill (defaults to accentDark)
  accentOnLight?: string; // accent for charts and graphics on light backgrounds (defaults to accent)
  status: { cleared: string; pending: string; denied: string; hold: string };
};

const status = { cleared: '#2F7D5B', pending: '#C08A2E', denied: '#A63A3A', hold: '#5B4B8A' };

export const palettes = {
  /** Direction A: deep emerald ink, visa parchment and brushed copper */
  'passport-ink': {
    primary: '#0F4C45',
    primaryLight: '#1C6B61',
    primaryDark: '#0C1F1E',
    base: '#0C1F1E',
    baseSoft: '#132E2C',
    background: '#F4EFE6',
    surfaceDeep: '#EAE2D3',
    surface: '#FBF8F2',
    accent: '#B8763E',
    accentDark: '#8F5A2C',
    accentLight: '#D9A273',
    pattern: '#9FB8B1',
    onDark: '#F4EFE6',
    text: '#1C2321',
    muted: '#4A5552',
    line: 'rgba(15, 76, 69, 0.16)',
    status,
  },
  /** Mostly light: maroon on blush and white, maroon toolbar and bands, pink accent (version 4 default) */
  'maroon-blush': {
    primary: '#8B0E3C',
    primaryLight: '#A3234F',
    primaryDark: '#77173B',
    base: '#77173B',
    baseSoft: '#8B0E3C',
    background: '#F7EFF0',
    surfaceDeep: '#EFE0E3',
    surface: '#FFFFFF',
    accent: '#F4C6D2',
    accentDark: '#8B0E3C',
    accentLight: '#F4C6D2',
    accentHover: '#EBAFC0',
    accentOnLight: '#C2335F',
    pattern: '#E3A9B9',
    onDark: '#FBF3F5',
    text: '#2A1A1F',
    muted: '#6A5A60',
    line: 'rgba(139, 14, 60, 0.14)',
    onAccent: '#77173B',
    status,
  },
  /** Mostly light: deep indigo, violet-blue and lime on cool white */
  'indigo-lime': {
    primary: '#4338CA',
    primaryLight: '#5B51E0',
    primaryDark: '#1A1446',
    base: '#1A1446',
    baseSoft: '#251D5E',
    background: '#F7F7FB',
    surfaceDeep: '#EDEDF6',
    surface: '#FFFFFF',
    accent: '#A3D93B',
    accentDark: '#4A6B12',
    accentLight: '#C3EB72',
    pattern: '#A8A3D6',
    onDark: '#F3F2FB',
    text: '#1C1838',
    muted: '#55536B',
    line: 'rgba(67, 56, 202, 0.14)',
    status,
  },
  /** Mostly light: navy, cobalt and saffron on near-white */
  'navy-saffron': {
    primary: '#1D4E89',
    primaryLight: '#2D66A8',
    primaryDark: '#0F2340',
    base: '#0F2340',
    baseSoft: '#173057',
    background: '#F7F8FA',
    surfaceDeep: '#EDF0F5',
    surface: '#FFFFFF',
    accent: '#E3A33B',
    accentDark: '#93600F',
    accentLight: '#F2C46D',
    pattern: '#9FB1C9',
    onDark: '#F2F5FA',
    text: '#14213A',
    muted: '#4F5B6E',
    line: 'rgba(29, 78, 137, 0.14)',
    status,
  },
  /** Saved for later: passport-cover oxblood, bone and a celadon seal */
  'diplomatic-oxblood': {
    primary: '#6B1E2E',
    primaryLight: '#8A2B3E',
    primaryDark: '#521624',
    base: '#1E1014',
    baseSoft: '#2A161C',
    background: '#F3EFE8',
    surfaceDeep: '#E9E2D8',
    surface: '#FBF9F5',
    accent: '#7FB3A2',
    accentDark: '#2F6B5A',
    accentLight: '#9CCBBB',
    pattern: '#C9B8B4',
    onDark: '#F3EFE8',
    text: '#221A1C',
    muted: '#5A4F51',
    line: 'rgba(107, 30, 46, 0.14)',
    status,
  },
} satisfies Record<string, Palette>;

export type ThemeName = keyof typeof palettes;

const requested = process.env.NEXT_PUBLIC_THEME as ThemeName | undefined;
export const themeName: ThemeName = requested && requested in palettes ? requested : 'maroon-blush';

export const colors: Palette = palettes[themeName];
/** Text colour on accent-filled buttons, pills and badges */
export const onAccent: string = colors.onAccent ?? colors.base;

/** "#0F4C45" -> "15 76 69", for use as rgb(var(--gvp-x) / alpha) */
function rgbTriplet(hex: string): string {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(' ');
}

/**
 * CSS variables set on <html> so translucent colours in components
 * (e.g. 'rgb(var(--gvp-on-dark) / 0.75)') follow the active palette.
 */
export const cssVariables: Record<string, string> = {
  '--gvp-primary': rgbTriplet(colors.primary),
  '--gvp-base': rgbTriplet(colors.base),
  '--gvp-accent': rgbTriplet(colors.accent),
  '--gvp-accent-dark': rgbTriplet(colors.accentDark),
  '--gvp-accent-light': rgbTriplet(colors.accentLight),
  '--gvp-pattern': rgbTriplet(colors.pattern),
  '--gvp-on-dark': rgbTriplet(colors.onDark),
  '--gvp-on-accent': rgbTriplet(onAccent),
};

export const fontStacks = {
  heading: 'var(--font-heading), "Newsreader", Georgia, "Times New Roman", serif',
  body: 'var(--font-body), "Hanken Grotesk", "Noto Sans", system-ui, -apple-system, sans-serif',
  mono: 'var(--font-mono), "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
} as const;

export const layout = {
  maxWidth: 1200,
  headerHeight: 76,
  radius: 4,
} as const;
