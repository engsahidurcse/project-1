import {
  Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button, CircularProgress,
} from '@mui/material'

interface Props {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  confirmColor?: 'error' | 'primary' | 'warning'
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  open, title, message,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  confirmColor = 'error', loading, onConfirm, onCancel,
}: Props) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth
    PaperProps={{ sx: { borderRadius: 3 } }}
  >
    <DialogTitle fontWeight={700}>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
      <Button onClick={onCancel} variant="outlined" disabled={loading}>
        {cancelLabel}
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        color={confirmColor}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}
      >
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
)
