import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import { DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH } from '@/config/constants'
import { AppSidebar } from './AppSidebar'
import { AppHeader }  from './AppHeader'
import { GlobalSnackbar } from '../feedback/GlobalSnackbar'

export default function MainLayout() {
  const theme      = useTheme()
  const isMobile   = useMediaQuery(theme.breakpoints.down('md'))
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawerWidth = collapsed && !isMobile ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          ml: { md: `${drawerWidth}px` },
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <AppHeader onMenuClick={() => setMobileOpen(true)} />

        <Box sx={{ flex: 1, p: { xs: 2, sm: 3 }, maxWidth: 1440, mx: 'auto', width: '100%' }}>
          <Outlet />
        </Box>
      </Box>

      <GlobalSnackbar />
    </Box>
  )
}
