import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setPageTitle } from '@/store/slices/uiSlice'
import { ENV } from '@/config/env'

export const usePageTitle = (title: string) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    document.title = `${title} | ${ENV.APP_NAME}`
    dispatch(setPageTitle(title))
    return () => { document.title = ENV.APP_NAME }
  }, [title, dispatch])
}
