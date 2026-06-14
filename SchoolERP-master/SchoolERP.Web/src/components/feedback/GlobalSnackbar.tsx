import { Snackbar, Alert } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { hideSnackbar } from '@/store/slices/uiSlice'

export const GlobalSnackbar = () => {
  const dispatch = useAppDispatch()
  const { open, message, severity } = useAppSelector((s) => s.ui.snackbar)

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => dispatch(hideSnackbar())}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={() => dispatch(hideSnackbar())}
        sx={{ minWidth: 280, borderRadius: 2 }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
