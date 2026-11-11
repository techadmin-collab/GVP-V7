'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { onAccent, colors, fontStacks } from './tokens';

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
  shape: { borderRadius: 16 },
  typography: {
    // v7 Modern bento: bold, tight sans headlines, friendly body
    fontFamily: body,
    fontSize: 16,
    h1: { fontFamily: body, fontWeight: 800, fontSize: '4rem', lineHeight: 1.02, letterSpacing: '-0.04em' },
    h2: { fontFamily: body, fontWeight: 800, fontSize: '2.8rem', lineHeight: 1.08, letterSpacing: '-0.035em' },
    h3: { fontFamily: body, fontWeight: 750, fontSize: '1.8rem', lineHeight: 1.15, letterSpacing: '-0.025em' },
    h4: { fontFamily: body, fontWeight: 700, fontSize: '1.4rem', lineHeight: 1.25, letterSpacing: '-0.015em' },
    h5: { fontFamily: body, fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.35, letterSpacing: '-0.01em' },
    h6: { fontFamily: body, fontWeight: 700, fontSize: '1rem', lineHeight: 1.45 },
    subtitle1: { fontSize: '1.18rem', lineHeight: 1.6 },
    body1: { fontSize: '1.05rem', lineHeight: 1.7 },
    body2: { fontSize: '0.95rem', lineHeight: 1.65 },
    overline: { fontFamily: body, fontSize: '0.78rem', letterSpacing: '0.04em', fontWeight: 700, lineHeight: 1.6, textTransform: 'none' },
    button: { fontWeight: 700, letterSpacing: '0', textTransform: 'none' },
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
        root: { borderRadius: 999, paddingInline: 24, paddingBlock: 11, fontSize: '0.98rem' },
        sizeLarge: { paddingInline: 30, paddingBlock: 15, fontSize: '1.02rem' },
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
        root: { backgroundColor: '#FFFFFF', borderRadius: 12 },
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
