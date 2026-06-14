import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { APP_ROUTES } from '@/config/constants'
import { getSessionCache } from '@/utils/storage' // IMPORT CENTRAL MANAGER

export const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated } = useSelector((state: any) => state.auth)
  const hasSessionCache = !!getSessionCache() // Evaluate storage via central matrix helper

  // Prevent authenticated user flows from viewing the login page layout layout
  if (isAuthenticated || hasSessionCache) {
    return <Navigate to={APP_ROUTES.DASHBOARD} replace />
  }

  return <>{children}</>
}