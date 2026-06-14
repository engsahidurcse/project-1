import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { store } from '@/app/store/store'
import { buildTheme } from '@/lib/mui/theme'
import { useAppSelector } from '@/lib/redux/hooks'

// Inner component that reads themeMode from Redux
const ThemedApp = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useAppSelector((s) => s.ui.themeMode)
  const theme = useMemo(() => buildTheme(themeMode), [themeMode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <ThemedApp>{children}</ThemedApp>
  </Provider>
)
