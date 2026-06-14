import { Box, Typography, Button, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/config/constants'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 2, textAlign: 'center', px: 2,
      }}
    >
      <Typography
        sx={{ fontSize: '8rem', fontWeight: 900, lineHeight: 1, color: 'primary.main', opacity: 0.15 }}
      >
        404
      </Typography>
      <Typography variant="h4" fontWeight={800} mt={-6}>Page Not Found</Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={400}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="outlined" onClick={() => navigate(-1)}>Go Back</Button>
        <Button variant="contained" onClick={() => navigate(APP_ROUTES.DASHBOARD)}>Dashboard</Button>
      </Stack>
    </Box>
  )
}
