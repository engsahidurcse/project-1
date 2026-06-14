import { NavLink, useLocation } from 'react-router-dom'
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Avatar, Divider, Tooltip, IconButton, Stack, useTheme,
} from '@mui/material'
import {
  Dashboard, People, Assignment, AccountBalance,
  Settings, School, ChevronLeft, ChevronRight, Logout,
} from '@mui/icons-material'
import { DRAWER_WIDTH, DRAWER_COLLAPSED_WIDTH, APP_ROUTES } from '@/config/constants'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getInitials, generateAvatarColor } from '@/utils/formatters'

interface NavItem {
  label: string
  icon: React.ReactNode
  path: string
  permission?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: <Dashboard />,       path: APP_ROUTES.DASHBOARD },
  { label: 'Students',  icon: <People />,           path: APP_ROUTES.STUDENTS },
  { label: 'Exams',     icon: <Assignment />,       path: APP_ROUTES.EXAMS },
  { label: 'Finance',   icon: <AccountBalance />,   path: APP_ROUTES.FINANCE },
  { label: 'Settings',  icon: <Settings />,         path: APP_ROUTES.SETTINGS },
]

interface Props {
  collapsed: boolean
  mobileOpen: boolean
  onMobileClose: () => void
  onToggleCollapse: () => void
}

export const AppSidebar = ({ collapsed, mobileOpen, onMobileClose, onToggleCollapse }: Props) => {
  const theme    = useTheme()
  const location = useLocation()
  const { user, logout } = useAuth()
  const drawerWidth = collapsed ? DRAWER_COLLAPSED_WIDTH : DRAWER_WIDTH

  const isDark = theme.palette.mode === 'dark'
  const bg     = isDark ? '#13172A' : '#0F1F4B'
  const activeBg = 'rgba(255,255,255,0.12)'
  const hoverBg  = 'rgba(255,255,255,0.07)'

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        height: '100%',
        bgcolor: bg,
        display: 'flex',
        flexDirection: 'column',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 68 }}>
        <Box
          sx={{
            width: 36, height: 36, borderRadius: 2, flexShrink: 0,
            background: 'linear-gradient(135deg, #1A6FE8, #7C3AED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <School sx={{ color: 'white', fontSize: 20 }} />
        </Box>
        {!collapsed && (
          <Typography variant="h6" fontWeight={800} color="white" noWrap>
            SchoolERP
          </Typography>
        )}
        <Box sx={{ ml: 'auto' }}>
          <IconButton size="small" onClick={onToggleCollapse} sx={{ color: 'rgba(255,255,255,0.5)' }}>
            {collapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Navigation */}
      <List sx={{ px: 1.5, pt: 1.5, flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path)
          return (
            <Tooltip key={item.path} title={collapsed ? item.label : ''} placement="right" arrow>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  minHeight: 44,
                  px: collapsed ? 1.5 : 2,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  bgcolor: isActive ? activeBg : 'transparent',
                  '&:hover': { bgcolor: isActive ? activeBg : hoverBg },
                  position: 'relative',
                  '&::before': isActive ? {
                    content: '""',
                    position: 'absolute',
                    left: 0, top: '20%', bottom: '20%',
                    width: 3, borderRadius: '0 2px 2px 0',
                    bgcolor: '#1A6FE8',
                  } : {},
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 0 : 36,
                    color: isActive ? '#60A5FA' : 'rgba(255,255,255,0.55)',
                    mr: collapsed ? 0 : 1,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'white' : 'rgba(255,255,255,0.75)',
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          )
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* User profile bottom */}
      <Box sx={{ p: 1.5 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            p: 1.5, borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.06)',
            cursor: 'pointer',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          <Avatar
            sx={{
              width: 34, height: 34, flexShrink: 0,
              bgcolor: user ? generateAvatarColor(user.fullName) : '#1A6FE8',
              fontSize: '0.75rem', fontWeight: 700,
            }}
          >
            {user ? getInitials(user.fullName) : 'U'}
          </Avatar>
          {!collapsed && (
            <>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="caption" fontWeight={700} color="white" noWrap display="block">
                  {user?.fullName ?? 'User'}
                </Typography>
                <Typography variant="caption" color="rgba(255,255,255,0.5)" noWrap display="block">
                  {user?.role ?? ''}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => logout()} sx={{ color: 'rgba(255,255,255,0.5)' }}>
                <Logout fontSize="small" />
              </IconButton>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  )

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, border: 'none' } }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth, border: 'none', transition: theme.transitions.create('width') },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  )
}
