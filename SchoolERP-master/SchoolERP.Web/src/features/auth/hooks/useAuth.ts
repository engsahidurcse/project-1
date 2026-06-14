import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { loginThunk, logoutThunk, clearAuthError } from '../store/authSlice'
import type { LoginRequest } from '../types/auth.types'
import { hasPermission } from '@/config/permissions'
import type { Permission } from '@/config/permissions'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, isLoading, error } = useAppSelector((s) => s.auth)

  const login  = (credentials: LoginRequest) => dispatch(loginThunk(credentials))
  const logout = () => dispatch(logoutThunk())
  const clearError = () => dispatch(clearAuthError())

  const can = (permission: Permission): boolean => {
    if (!user) return false
    return hasPermission(user.role, permission)
  }

  return { user, isAuthenticated, isLoading, error, login, logout, clearError, can }
}
