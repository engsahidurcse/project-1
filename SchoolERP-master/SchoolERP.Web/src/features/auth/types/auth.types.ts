import type { UserRole } from '@/config/permissions'

export interface LoginRequest {
  userName: string 
  password: string
}

export interface AuthUser {
  fullName: string
  role: UserRole
  permissions: string[]
  avatarUrl?: string
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}