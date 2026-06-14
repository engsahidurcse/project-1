import { useEffect } from 'react'
import { AppRouter } from '@/app/router/AppRouter'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchMeThunk } from '@/features/auth/store/authSlice'
import { getSessionCache } from '@/utils/storage'

const AppInner = () => {
  const dispatch = useAppDispatch()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated } = useAppSelector((s) => s.auth)
  const hasSessionCache = !!getSessionCache() // Check memory layout availability via centralized helper function

  // ── Trigger Auth Sync Matrix ONLY during Hard Browser Window Reloads ───────
  useEffect(() => {
    if (hasSessionCache && !isAuthenticated) {
      // Sync auth status with gateway only when user manually refreshes the page
      dispatch(fetchMeThunk())
    }
  }, [isAuthenticated, hasSessionCache, dispatch])

  return <AppRouter />
}

export default AppInner