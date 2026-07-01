'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Stack, Button, Box } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const navItems = [
  { href: '/signup', label: 'Sign Up' },
  { href: '/schema-demo', label: 'Schema Demo' },
  { href: '/products', label: 'Products' },
  { href: '/orders', label: 'Orders' },
];

export function NavBar() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 4 } }}>
        <Stack direction="row" alignItems="center" spacing={1.2} sx={{ flexGrow: 1 }}>
          <Inventory2OutlinedIcon sx={{ color: 'secondary.main' }} />
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              color: 'common.white',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            Manifest
          </Typography>
        </Stack>

        <Box component="nav">
          <Stack direction="row" spacing={1}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                sx={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
