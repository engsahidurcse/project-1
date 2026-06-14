import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
}

interface UiState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  themeMode: 'light' | 'dark'
  snackbar: SnackbarState
  pageTitle: string
}

const initialState: UiState = {
  sidebarOpen:     true,
  sidebarCollapsed: false,
  themeMode: (localStorage.getItem('themeMode') as 'light' | 'dark') ?? 'light',
  snackbar: { open: false, message: '', severity: 'info' },
  pageTitle: 'Dashboard',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar:         (s) => { s.sidebarOpen     = !s.sidebarOpen },
    toggleSidebarCollapse: (s) => { s.sidebarCollapsed = !s.sidebarCollapsed },
    setSidebarOpen:        (s, a: PayloadAction<boolean>) => { s.sidebarOpen = a.payload },
    setPageTitle:          (s, a: PayloadAction<string>)  => { s.pageTitle   = a.payload },
    toggleTheme: (s) => {
      s.themeMode = s.themeMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('themeMode', s.themeMode)
    },
    showSnackbar: (s, a: PayloadAction<{ message: string; severity: SnackbarState['severity'] }>) => {
      s.snackbar = { open: true, ...a.payload }
    },
    hideSnackbar: (s) => { s.snackbar.open = false },
  },
})

export const {
  toggleSidebar, toggleSidebarCollapse, setSidebarOpen,
  setPageTitle, toggleTheme, showSnackbar, hideSnackbar,
} = uiSlice.actions
export default uiSlice.reducer
