/**
 * Self-hosted fonts (bundled from npm via Fontsource).
 *
 * The build never downloads anything from Google Fonts, so it can't fail
 * because of a network hiccup on the build server, and visitors' browsers
 * don't contact Google either.
 *
 * Each font is registered under its Fontsource "Variable" family name and
 * exposed through the CSS variables used by the theme (see globals.css):
 *   --font-heading  Newsreader (with italics)
 *   --font-body     Hanken Grotesk
 *   --font-mono     Geist Mono
 */
import '@fontsource-variable/newsreader/wght.css';
import '@fontsource-variable/newsreader/wght-italic.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import '@fontsource-variable/geist-mono/wght.css';

/** Kept for layout.tsx; the font variables themselves are defined in globals.css */
export const fontVariables = 'gvp-fonts';
