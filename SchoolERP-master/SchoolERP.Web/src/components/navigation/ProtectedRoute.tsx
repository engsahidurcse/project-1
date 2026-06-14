import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { APP_ROUTES } from '@/config/constants'
import type { Permission } from '@/config/permissions'
import { Box, CircularProgress } from '@mui/material'
import { getSessionCache } from '@/utils/storage' // IMPORT CENTRAL MANAGER

interface Props {
  children: React.ReactNode
  permission?: Permission
}

export const ProtectedRoute = ({ children, permission }: Props) => {
  const location = useLocation()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated, isLoading, user } = useSelector((state: any) => state.auth)
  const hasSessionCache = !!getSessionCache() // Query centralized manager function boundary reference

  // Evaluate dynamic access control matrices using store profile permissions
  const can = (perm: Permission): boolean => {
debugger;
    if (!user || !user.permissions) return false
debugger;
    return user.permissions.includes(perm)
  }

  // 1. Loading State Gate
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  // 2. Authentication Enforcement Gate
  // Ejection to login happens ONLY if there is no central session indicator left
  if (!isAuthenticated && !hasSessionCache) {
    return <Navigate to={APP_ROUTES.LOGIN} state={{ from: location }} replace />
  }

  // 3. Authorization Permission Gate
  if (permission && !can(permission)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}