import {
  AppBar, Toolbar, IconButton, Typography, Box, Stack,
  Tooltip, Avatar, Badge, useTheme,
} from '@mui/material'
import {
  Menu, DarkMode, LightMode, Notifications, Search,
} from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { toggleTheme } from '@/store/slices/uiSlice'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getInitials, generateAvatarColor } from '@/utils/formatters'

interface Props { onMenuClick: () => void }

export const AppHeader = ({ onMenuClick }: Props) => {
  const theme    = useTheme()
  const dispatch = useAppDispatch()
  const { themeMode, pageTitle } = useAppSelector((s) => s.ui)
  const { user } = useAuth()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {/* Mobile menu toggle */}
        <IconButton edge="start" onClick={onMenuClick} sx={{ display: { md: 'none' } }}>
          <Menu />
        </IconButton>

        <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Tooltip title="Search">
            <IconButton size="small" color="inherit">
              <Search fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton size="small" color="inherit">
              <Badge badgeContent={3} color="error">
                <Notifications fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton size="small" onClick={() => dispatch(toggleTheme())} color="inherit">
              {themeMode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
            </IconButton>
          </Tooltip>

          <Box sx={{ ml: 1 }}>
            <Tooltip title={user?.fullName ?? 'Profile'}>
              <Avatar
                sx={{
                  width: 34, height: 34, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700,
                  bgcolor: user ? generateAvatarColor(user.fullName) : 'primary.main',
                }}
              >
                {user ? getInitials(user.fullName) : 'U'}
              </Avatar>
            </Tooltip>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
