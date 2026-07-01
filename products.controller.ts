'use client';

import { createTheme } from '@mui/material/styles';

/**
 * Design direction: "Warehouse Manifest"
 * — Ink/slate base with a single amber signal accent (used for stock/status cues)
 * — Monospace reserved for SKUs, order numbers, and IDs (they are literally codes)
 * — Sans-serif for everything else, set with a slightly tightened scale for density
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1F2A37', // deep ink slate
      light: '#3A4A5C',
      dark: '#10161D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E08A2C', // warm amber — the single accent
      light: '#F2A954',
      dark: '#B66B17',
      contrastText: '#10161D',
    },
    background: {
      default: '#F6F5F2', // warm paper, not stark white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A2026',
      secondary: '#5C6773',
    },
    success: { main: '#2E7D5B' },
    warning: { main: '#E08A2C' },
    error: { main: '#C0432F' },
    divider: '#E2DFD8',
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1F2A37',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

// Monospace font stack used inline for SKUs / order numbers / IDs
export const monoFont = '"JetBrains Mono", "SFMono-Regular", Consolas, monospace';
