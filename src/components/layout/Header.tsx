'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { colors } from '@/theme/tokens';
import { HOME_ONLY, moreNav, navHref, primaryNav } from '@/lib/site';
import LogoMark from '@/components/ui/LogoMark';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** v7 Modern bento: a floating white pill navigation bar over the blush page. */
export default function Header() {
  const pathname = usePathname() ?? '/';
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [moreAnchor, setMoreAnchor] = React.useState<null | HTMLElement>(null);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  React.useEffect(() => {
    setDrawerOpen(false);
    setMoreAnchor(null);
  }, [pathname]);

  const stay = (e: React.MouseEvent) => {
    if (HOME_ONLY) e.preventDefault();
  };
  const moreActive = moreNav.some((n) => isActive(pathname, n.href));

  const navSx = (active: boolean) => ({
    color: active ? colors.primary : colors.text,
    bgcolor: active ? colors.background : 'transparent',
    fontSize: '0.93rem',
    fontWeight: 600,
    px: 1.75,
    py: 0.9,
    minWidth: 0,
    borderRadius: 999,
    '&:hover': { bgcolor: colors.background },
  });

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none', pt: { xs: 1.5, md: 2 }, pointerEvents: 'none' }}>
      <Container maxWidth="lg" sx={{ pointerEvents: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            pl: { xs: 2.5, md: 3 },
            pr: 1,
            py: 1,
            bgcolor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(10px)',
            borderRadius: 999,
            border: `1px solid ${colors.line}`,
            boxShadow: scrolled ? '0 18px 40px -22px rgb(var(--gvp-base) / 0.45)' : '0 8px 24px -20px rgb(var(--gvp-base) / 0.35)',
            transition: 'box-shadow 0.25s ease',
          }}
        >
          <Box component={NextLink} href={navHref('/')} onClick={stay} aria-label="GVP, home" sx={{ display: 'flex', alignItems: 'center', mr: 'auto' }}>
            <LogoMark color={colors.primary} height={26} />
          </Box>
          <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.25 }}>
            {primaryNav.map((item) => (
              <Button key={item.href} component={NextLink} href={navHref(item.href)} onClick={stay} sx={navSx(isActive(pathname, item.href))}>
                {item.label}
              </Button>
            ))}
            <Button onClick={(e) => setMoreAnchor(e.currentTarget)} endIcon={<KeyboardArrowDownRoundedIcon />} aria-haspopup="true" aria-expanded={moreAnchor ? 'true' : undefined} sx={navSx(moreActive)}>
              More
            </Button>
            <Menu anchorEl={moreAnchor} open={Boolean(moreAnchor)} onClose={() => setMoreAnchor(null)} disableScrollLock anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} slotProps={{ paper: { sx: { mt: 1.5, minWidth: 340, borderRadius: '20px', p: 1, border: `1px solid ${colors.line}`, boxShadow: '0 24px 48px -24px rgb(var(--gvp-base) / 0.4)' } } }}>
              {moreNav.map((item) => (
                <MenuItem key={item.href} component={NextLink} href={navHref(item.href)} onClick={(e: React.MouseEvent) => { stay(e); setMoreAnchor(null); }} sx={{ borderRadius: '14px', py: 1.25, display: 'block', whiteSpace: 'normal' }}>
                  <Typography sx={{ fontWeight: 700, color: colors.text }}>{item.label}</Typography>
                  {item.description ? <Typography variant="body2" sx={{ color: colors.muted, fontSize: '0.85rem' }}>{item.description}</Typography> : null}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Button component={NextLink} href={navHref('/contact')} onClick={stay} variant="contained" color="primary" endIcon={<ArrowOutwardRoundedIcon />} sx={{ display: { xs: 'none', sm: 'inline-flex' }, ml: 1, whiteSpace: 'nowrap' }}>
            Request a Briefing
          </Button>
          <IconButton aria-label="Open menu" onClick={() => setDrawerOpen(true)} sx={{ display: { xs: 'inline-flex', lg: 'none' }, bgcolor: colors.background, color: colors.text }}>
            <MenuRoundedIcon />
          </IconButton>
        </Box>
      </Container>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: { xs: 'calc(100% - 24px)', sm: 400 }, m: 1.5, height: 'calc(100% - 24px)', borderRadius: '24px', p: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pl: 1 }}>
          <LogoMark color={colors.primary} height={24} />
          <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)} sx={{ bgcolor: colors.background }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box component="nav" aria-label="Mobile" sx={{ display: 'grid', gap: 0.75 }}>
          {[{ label: 'Home', href: '/' }, ...primaryNav, ...moreNav].map((item) => (
            <Box key={item.href} component={NextLink} href={navHref(item.href)} onClick={(e: React.MouseEvent) => { stay(e); setDrawerOpen(false); }} sx={{ px: 2, py: 1.5, borderRadius: '14px', bgcolor: colors.background, color: colors.text, textDecoration: 'none', fontWeight: 700 }}>
              {item.label}
            </Box>
          ))}
        </Box>
        <Button component={NextLink} href={navHref('/contact')} onClick={(e: React.MouseEvent) => { stay(e); setDrawerOpen(false); }} variant="contained" color="primary" fullWidth size="large" sx={{ mt: 2 }}>
          Request a Government Briefing
        </Button>
      </Drawer>
    </AppBar>
  );
}
