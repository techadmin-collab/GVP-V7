'use client';

import * as React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { colors, fontStacks, layout } from '@/theme/tokens';
import { HOME_ONLY, moreNav, navHref, primaryNav } from '@/lib/site';

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname() ?? '/';
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [moreAnchor, setMoreAnchor] = React.useState<null | HTMLElement>(null);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  // Reading progress: a thin copper line under the header fills as you scroll.
  // Updated directly on the element (no re-renders), once per animation frame.
  const progressRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = progressRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  React.useEffect(() => {
    setDrawerOpen(false);
    setMoreAnchor(null);
  }, [pathname]);

  const moreActive = moreNav.some((n) => isActive(pathname, n.href));

  // Home-only preview: links stay clickable but don't navigate; menus still close.
  const stay = (e: React.MouseEvent) => {
    if (HOME_ONLY) e.preventDefault();
  };
  const closeMore = (e: React.MouseEvent) => {
    stay(e);
    setMoreAnchor(null);
  };
  const closeDrawer = (e: React.MouseEvent) => {
    stay(e);
    setDrawerOpen(false);
  };

  const navButtonSx = (active: boolean) => ({
    color: active ? '#FFFFFF' : 'rgb(var(--gvp-on-dark) / 0.78)',
    fontWeight: 500,
    fontSize: '0.95rem',
    px: 1.5,
    py: 1,
    borderRadius: 0,
    position: 'relative' as const,
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      left: 12,
      right: 12,
      bottom: 4,
      height: '2px',
      bgcolor: colors.accent,
      transform: active ? 'scaleX(1)' : 'scaleX(0)',
      transition: 'transform 0.2s ease',
    },
    '&:hover': { color: '#FFFFFF', bgcolor: 'transparent' },
    '&:hover::after': { transform: 'scaleX(1)' },
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: scrolled ? 'rgb(var(--gvp-base) / 0.96)' : colors.base,
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgb(var(--gvp-pattern) / 0.18)' : 'transparent'}`,
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: layout.headerHeight }, gap: 2 }}>
          <Box component={NextLink} href={navHref('/')} onClick={stay} aria-label="GVP Global Visit Permit, home" sx={{ display: 'flex', alignItems: 'center', mr: 'auto' }}>
            <Image src="/brand/gvp-mark-white.png" alt="GVP Global Visit Permit" width={1349} height={370} priority style={{ height: 30, width: 'auto' }} />
          </Box>

          {/* Desktop navigation */}
          <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}>
            {primaryNav.map((item) => (
              <Button key={item.href} component={NextLink} href={navHref(item.href)} onClick={stay} sx={navButtonSx(isActive(pathname, item.href))} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
                {item.label}
              </Button>
            ))}
            <Button
              id="more-button"
              aria-controls={moreAnchor ? 'more-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={moreAnchor ? 'true' : undefined}
              onClick={(e) => setMoreAnchor(e.currentTarget)}
              endIcon={<KeyboardArrowDownRoundedIcon />}
              sx={navButtonSx(moreActive)}
            >
              More
            </Button>
            <Menu
              id="more-menu"
              anchorEl={moreAnchor}
              open={Boolean(moreAnchor)}
              onClose={() => setMoreAnchor(null)}
              // Don't lock page scroll: locking hides the scrollbar and shifts the layout
              disableScrollLock
              MenuListProps={{ 'aria-labelledby': 'more-button' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              slotProps={{ paper: { sx: { mt: 1, minWidth: 320, bgcolor: colors.surface, border: `1px solid ${colors.line}`, borderRadius: '2px' } } }}
            >
              {moreNav.map((item) => (
                <MenuItem key={item.href} component={NextLink} href={navHref(item.href)} onClick={closeMore} selected={isActive(pathname, item.href)} sx={{ py: 1.5, display: 'block', whiteSpace: 'normal' }}>
                  <Typography sx={{ fontWeight: 600, color: colors.base }}>{item.label}</Typography>
                  {item.description ? (
                    <Typography variant="body2" sx={{ color: colors.muted, fontSize: '0.85rem' }}>
                      {item.description}
                    </Typography>
                  ) : null}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Button
            component={NextLink}
            href={navHref('/contact')}
            onClick={stay}
            variant="contained"
            color="secondary"
            sx={{ display: { xs: 'none', sm: 'inline-flex' }, ml: { lg: 1.5 }, whiteSpace: 'nowrap', ...briefingSx }}
          >
            Request a Briefing
          </Button>

          <IconButton
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'inline-flex', lg: 'none' }, color: '#fff', border: '1px solid rgb(var(--gvp-pattern) / 0.35)', borderRadius: '2px' }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* reading progress */}
      <Box aria-hidden="true" sx={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 3, pointerEvents: 'none' }}>
        <Box
          ref={progressRef}
          sx={{
            height: '100%',
            bgcolor: colors.accent,
            transform: 'scaleX(0)',
            transformOrigin: '0 50%',
            boxShadow: '0 0 12px rgb(var(--gvp-accent) / 0.6)',
          }}
        />
      </Box>

      {/* Mobile / tablet drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 380 }, bgcolor: colors.base, color: 'rgb(var(--gvp-on-dark))', display: 'flex', flexDirection: 'column' } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, minHeight: 64 }}>
          <Image src="/brand/gvp-mark-white.png" alt="GVP Global Visit Permit" width={1349} height={370} style={{ height: 26, width: 'auto' }} />
          <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgb(var(--gvp-pattern) / 0.18)' }} />
        <Box component="nav" aria-label="Mobile">
          <List sx={{ py: 1 }}>
            <ListItemButton component={NextLink} href={navHref('/')} onClick={closeDrawer} selected={pathname === '/'} sx={drawerItemSx}>
              <ListItemText primary="Home" />
            </ListItemButton>
            {[...primaryNav, ...moreNav].map((item) => (
              <ListItemButton key={item.href} component={NextLink} href={navHref(item.href)} onClick={closeDrawer} selected={isActive(pathname, item.href)} sx={drawerItemSx}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Box sx={{ p: 2, mt: 'auto' }}>
          <Button component={NextLink} href={navHref('/contact')} onClick={closeDrawer} variant="contained" color="secondary" fullWidth size="large" sx={briefingSx}>
            Request a Government Briefing
          </Button>
          <Typography sx={{ mt: 2, fontFamily: fontStacks.mono, fontSize: 11, letterSpacing: '0.2em', color: colors.pattern, textAlign: 'center' }}>
            GLOBAL VISIT PERMIT
          </Typography>
        </Box>
      </Drawer>
    </AppBar>
  );
}

// "Request a Briefing": white button with maroon (primary) text on the maroon header
const briefingSx = {
  bgcolor: '#FFFFFF',
  color: colors.primary,
  boxShadow: 'none',
  '&:hover': { bgcolor: colors.accentLight, color: colors.primaryDark, boxShadow: 'none' },
};

const drawerItemSx = {
  px: 2.5,
  py: 1.25,
  '& .MuiListItemText-primary': { fontSize: '1.05rem', fontWeight: 500 },
  '&.Mui-selected': { bgcolor: 'rgb(var(--gvp-accent) / 0.16)', borderLeft: `3px solid ${colors.accent}` },
  '&.Mui-selected:hover': { bgcolor: 'rgb(var(--gvp-accent) / 0.22)' },
};
