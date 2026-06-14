import { Box, CircularProgress, Typography } from '@mui/material'

interface Props { message?: string }

export const LoadingScreen = ({ message = 'Loading…' }: Props) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: 2,
    }}
  >
    <CircularProgress size={40} thickness={4} />
    <Typography variant="body2" color="text.secondary">{message}</Typography>
  </Box>
)
