import { Box, Card, CardContent, Typography, Stack, Skeleton } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'

interface Props {
  title: string
  value: string | number
  subtitle?: string
  icon: SvgIconComponent
  color: string
  trend?: { value: number; label: string }
  loading?: boolean
}

export const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, loading }: Props) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ p: 2.5 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton width="60%" height={20} />
          <Skeleton width="40%" height={36} />
          <Skeleton width="50%" height={16} />
        </Stack>
      ) : (
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing="0.06em">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={800} mt={0.5} color="text.primary">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" mt={0.25} display="block">
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Typography
                variant="caption"
                fontWeight={600}
                color={trend.value >= 0 ? 'success.main' : 'error.main'}
                mt={0.5}
                display="block"
              >
                {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 48, height: 48, borderRadius: 3, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              bgcolor: `${color}18`,
            }}
          >
            <Icon sx={{ color, fontSize: 24 }} />
          </Box>
        </Stack>
      )}
    </CardContent>
  </Card>
)
