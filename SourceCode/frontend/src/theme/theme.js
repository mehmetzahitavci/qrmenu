import { createTheme } from '@mui/material/styles';

// Akasya Bistro Color Palette - Deep Forest Green & Gold
const colors = {
  // Primary - Deep Forest Green (from logo)
  primary: {
    main: '#2E5D4B',
    light: '#4A7D6B',
    dark: '#1D3D32',
    contrastText: '#ffffff',
  },
  // Secondary - Gold/Bronze accent
  secondary: {
    main: '#C5A059',
    light: '#D9BC7A',
    dark: '#A68539',
    contrastText: '#1a1a1a',
  },
  // Tertiary - Warm coral for CTAs
  accent: {
    main: '#d4654a',
    light: '#e88a73',
    dark: '#b84a32',
  },
  // Background colors
  background: {
    default: '#f8f6f3',
    paper: '#ffffff',
    dark: '#2E5D4B',
    card: '#ffffff',
  },
  // Text colors
  text: {
    primary: '#1D3D32',
    secondary: '#2E5D4B',
    muted: '#5A7A6E',
    light: '#f8f6f3',
  },
  // Status colors
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    success: { main: colors.success },
    error: { main: colors.error },
    warning: { main: colors.warning },
    info: { main: colors.info },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      color: colors.text.muted,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(46, 93, 75, 0.05)',
    '0px 4px 8px rgba(46, 93, 75, 0.08)',
    '0px 6px 12px rgba(46, 93, 75, 0.1)',
    '0px 8px 16px rgba(46, 93, 75, 0.12)',
    '0px 12px 24px rgba(46, 93, 75, 0.15)',
    '0px 16px 32px rgba(46, 93, 75, 0.18)',
    ...Array(18).fill('0px 16px 32px rgba(46, 93, 75, 0.18)'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: colors.background.default,
        },
        '@import': [
          "url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap')",
        ],
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 6px 20px rgba(46, 93, 75, 0.25)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary.light} 0%, ${colors.primary.main} 100%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.secondary.dark} 100%)`,
          color: colors.text.primary,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.secondary.light} 0%, ${colors.secondary.main} 100%)`,
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(46, 93, 75, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: colors.background.card,
          boxShadow: '0px 4px 20px rgba(46, 93, 75, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 40px rgba(46, 93, 75, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 4px 20px rgba(46, 93, 75, 0.08)',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${colors.accent.main} 0%, ${colors.accent.dark} 100%)`,
          color: '#ffffff',
          boxShadow: '0px 6px 24px rgba(212, 101, 74, 0.4)',
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.accent.light} 0%, ${colors.accent.main} 100%)`,
            boxShadow: '0px 8px 32px rgba(212, 101, 74, 0.5)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: 'rgba(46, 93, 75, 0.08)',
          '&:hover': {
            backgroundColor: 'rgba(46, 93, 75, 0.15)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 24px 24px 0',
          backgroundColor: colors.background.paper,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(46, 93, 75, 0.97)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 2px 20px rgba(46, 93, 75, 0.15)',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: colors.accent.main,
          color: '#ffffff',
          fontWeight: 600,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(46, 93, 75, 0.08)',
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
});

// Export colors for use in components
export { colors };
export default theme;
