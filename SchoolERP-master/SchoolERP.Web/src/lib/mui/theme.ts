import { createTheme, PaletteMode } from '@mui/material'

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: '#1A6FE8',
      light: '#4F94F0',
      dark: '#0F4EAA',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7C3AED',
      light: '#A06AF0',
      dark: '#5B27B8',
      contrastText: '#FFFFFF',
    },
    success: { main: '#10B981', light: '#34D399', dark: '#059669' },
    warning: { main: '#F59E0B', light: '#FCD34D', dark: '#D97706' },
    error:   { main: '#EF4444', light: '#F87171', dark: '#DC2626' },
    info:    { main: '#3B82F6', light: '#60A5FA', dark: '#2563EB' },
    ...(mode === 'light'
      ? {
          background: { default: '#F8FAFD', paper: '#FFFFFF' },
          text: { primary: '#111827', secondary: '#6B7280' },
          divider: '#E5E7EB',
        }
      : {
          background: { default: '#0F1117', paper: '#1A1D27' },
          text: { primary: '#F9FAFB', secondary: '#9CA3AF' },
          divider: '#2D3143',
        }),
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: { fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2 },
    h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: '1.5rem',   fontWeight: 700, lineHeight: 1.35 },
    h4: { fontSize: '1.25rem',  fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.45 },
    h6: { fontSize: '1rem',     fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem',  lineHeight: 1.57 },
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    button: { fontWeight: 600, textTransform: 'none' as const, letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 10 },
})

export const buildTheme = (mode: PaletteMode) =>
  createTheme({
    ...getDesignTokens(mode),
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 20px',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #1A6FE8 0%, #0F4EAA 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #4F94F0 0%, #1A6FE8 100%)' },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: 'none',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: mode === 'light'
              ? '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)'
              : '0 1px 3px rgba(0,0,0,0.3)',
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiTextField: {
        defaultProps: { size: 'small' as const, variant: 'outlined' as const },
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              backgroundColor: mode === 'light' ? '#F9FAFB' : theme.palette.background.paper,
            },
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500, borderRadius: 6 },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiTableCell-head': {
              fontWeight: 700,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: theme.palette.text.secondary,
              backgroundColor:
                mode === 'light' ? '#F3F4F6' : theme.palette.background.default,
              borderBottom: `2px solid ${theme.palette.divider}`,
            },
          }),
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            marginBottom: 2,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundImage: 'none' },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { backgroundImage: 'none', boxShadow: 'none' },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { width: 6, height: 6 },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': {
              background: mode === 'light' ? '#D1D5DB' : '#374151',
              borderRadius: 3,
            },
          },
        },
      },
    },
  })
