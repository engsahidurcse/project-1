import { Box, Typography, Button, Stack } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '@/config/constants'

export default function UnauthorizedPage() {
  const navigate = useNavigate()
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2, textAlign: 'center', px: 2 }}>
      <LockOutlined sx={{ fontSize: 64, color: 'error.main', opacity: 0.7 }} />
      <Typography variant="h4" fontWeight={800}>Access Denied</Typography>
      <Typography variant="body1" color="text.secondary" maxWidth={380}>
        You don't have permission to view this page.
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <Button variant="outlined" onClick={() => navigate(-1)}>Go Back</Button>
        <Button variant="contained" onClick={() => navigate(APP_ROUTES.DASHBOARD)}>Dashboard</Button>
      </Stack>
    </Box>
  )
}
