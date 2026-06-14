import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux' // 🎯 FIXED: Direct official hooks to completely bypass file path resolution errors
import { loginThunk, clearAuthError } from '../store/authSlice' 
import { loginSchema, LoginFormData } from '@/utils/validators'
import { APP_ROUTES } from '@/config/constants'

import {
  Box, Card, CardContent, TextField, Button,
  Typography, Alert, InputAdornment, IconButton,
  CircularProgress, Stack, Divider,
} from '@mui/material'
import {
  School, Visibility, VisibilityOff, Lock, Person,
} from '@mui/icons-material'

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch() // 🎯 Direct official dispatch assignment
  const [showPassword, setShowPassword] = useState(false)

  // ── Extract authentication state slices from unified Redux Store ───────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated, isLoading, error } = useSelector((state: any) => state.auth)

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { UserName: '', Password: '' },
  })

  // ── Lifecycle Watcher: Redirect immediately upon successful handshake ─────
  useEffect(() => {
    if (isAuthenticated) {
      navigate(APP_ROUTES.DASHBOARD)
    }
  }, [isAuthenticated, navigate])

  // ── Form Submission Handler ────────────────────────────────────────────────
  const onSubmit = async (data: LoginFormData) => {
    dispatch(clearAuthError())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(loginThunk(data) as any) // Dispatches our unified cookie-session action mapping
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F1F4B 0%, #1A6FE8 50%, #7C3AED 100%)',
        p: 2,
      }}
    >
      {/* Background decorative circles */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(4)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.08)',
              width: `${200 + i * 160}px`,
              height: `${200 + i * 160}px`,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </Box>

      <Card
        sx={{
          width: '100%',
          maxWidth: 440,
          position: 'relative',
          backdropFilter: 'blur(20px)',
          background: 'rgba(255,255,255,0.97)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        }}
      >
        <CardContent sx={{ p: 5 }}>
          {/* Logo */}
          <Stack alignItems="center" spacing={1.5} mb={4}>
            <Box
              sx={{
                width: 56, height: 56,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #1A6FE8, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(26,111,232,0.35)',
              }}
            >
              <School sx={{ color: 'white', fontSize: 30 }} />
            </Box>
            <Box textAlign="center">
              <Typography variant="h5" fontWeight={800} color="text.primary">
                SchoolERP
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to your account
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Alert 
              severity="error" 
              onClose={() => dispatch(clearAuthError())} 
              sx={{ mb: 3, borderRadius: 2 }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              <Controller
                name="UserName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="UserName"
                    fullWidth
                    error={!!errors.UserName}
                    helperText={errors.UserName?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Controller
                name="Password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    error={!!errors.Password}
                    helperText={errors.Password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowPassword((p) => !p)} edge="end">
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
                sx={{ py: 1.4, fontSize: '0.9375rem', fontWeight: 700, borderRadius: 2.5, mt: 1 }}
              >
                {isLoading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="caption" color="text.secondary" align="center" display="block">
            © {new Date().getFullYear()} SchoolERP. All rights reserved.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}