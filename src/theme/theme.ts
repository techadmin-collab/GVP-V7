'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { onAccent, colors, fontStacks, layout } from './tokens';

const { heading, body, mono } = fontStacks;

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.primary, light: colors.primaryLight, dark: colors.primaryDark, contrastText: '#FFFFFF' },
    secondary: { main: colors.accent, dark: colors.accentHover ?? colors.accentDark, light: colors.accentLight, contrastText: onAccent },
    success: { main: colors.status.cleared },
    warning: { main: colors.status.pending },
    error: { main: colors.status.denied },
    info: { main: colors.status.hold },
    background: { default: colors.background, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.muted },
    divider: colors.line,
  },
  shape: { borderRadius: layout.radius },
  typography: {
    fontFamily: body,
    fontSize: 16,
    h1: { fontFamily: heading, fontWeight: 500, fontSize: '3.6rem', lineHeight: 1.08, letterSpacing: '-0.015em' },
    h2: { fontFamily: heading, fontWeight: 500, fontSize: '2.6rem', lineHeight: 1.15, letterSpacing: '-0.01em' },
    h3: { fontFamily: heading, fontWeight: 500, fontSize: '1.9rem', lineHeight: 1.2 },
    h4: { fontFamily: heading, fontWeight: 500, fontSize: '1.45rem', lineHeight: 1.3 },
    h5: { fontFamily: body, fontWeight: 600, fontSize: '1.15rem', lineHeight: 1.4 },
    h6: { fontFamily: body, fontWeight: 600, fontSize: '1rem', lineHeight: 1.45 },
    subtitle1: { fontSize: '1.2rem', lineHeight: 1.6 },
    body1: { fontSize: '1.0625rem', lineHeight: 1.7 },
    body2: { fontSize: '0.95rem', lineHeight: 1.65 },
    overline: { fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.14em', fontWeight: 500, lineHeight: 1.6 },
    button: { fontWeight: 600, letterSpacing: '0.01em', textTransform: 'none' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth' },
        body: { backgroundColor: colors.background, color: colors.text },
        '::selection': { backgroundColor: colors.accentLight, color: colors.base },
        a: { color: 'inherit' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 2, paddingInline: 22, paddingBlock: 11, fontSize: '0.98rem' },
        sizeLarge: { paddingInline: 28, paddingBlock: 14, fontSize: '1.02rem' },
        outlined: { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } },
      },
    },
    // Dropdowns and popovers don't lock page scroll. Locking hides the
    // scrollbar and shifts the whole layout sideways while a menu is open.
    MuiMenu: {
      defaultProps: { disableScrollLock: true },
    },
    MuiPopover: {
      defaultProps: { disableScrollLock: true },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: `1px solid ${colors.line}`, backgroundColor: colors.surface } },
    },
    MuiAccordion: {
      defaultProps: { elevation: 0, disableGutters: true },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderBottom: `1px solid ${colors.line}`,
          '&::before': { display: 'none' },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', fullWidth: true },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: '#FFFFFF', borderRadius: 2 },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: colors.base, fontSize: '0.8rem' },
        arrow: { color: colors.base },
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 2.4 });

export default theme;
