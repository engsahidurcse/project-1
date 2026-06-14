import { useAppDispatch } from '@/lib/redux/hooks'
import { showSnackbar } from '@/store/slices/uiSlice'

export const useSnackbar = () => {
  const dispatch = useAppDispatch()
  return {
    success: (message: string) => dispatch(showSnackbar({ message, severity: 'success' })),
    error:   (message: string) => dispatch(showSnackbar({ message, severity: 'error' })),
    warning: (message: string) => dispatch(showSnackbar({ message, severity: 'warning' })),
    info:    (message: string) => dispatch(showSnackbar({ message, severity: 'info' })),
  }
}
