import { Box, Breadcrumbs, Link, Typography, Stack } from '@mui/material'
import { NavigateNext } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

interface Crumb {
  label: string
  to?: string
}

interface Props {
  title: string
  subtitle?: string
  breadcrumbs?: Crumb[]
  actions?: React.ReactNode
}

export const PageHeader = ({ title, subtitle, breadcrumbs, actions }: Props) => (
  <Box mb={3}>
    {breadcrumbs && breadcrumbs.length > 0 && (
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        sx={{ mb: 1 }}
      >
        {breadcrumbs.map((crumb, i) =>
          crumb.to ? (
            <Link
              key={i}
              component={RouterLink}
              to={crumb.to}
              underline="hover"
              color="text.secondary"
              variant="caption"
              fontWeight={500}
            >
              {crumb.label}
            </Link>
          ) : (
            <Typography key={i} variant="caption" fontWeight={600} color="text.primary">
              {crumb.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    )}
    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
      <Box>
        <Typography variant="h4" fontWeight={800} color="text.primary">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" mt={0.25}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Stack direction="row" spacing={1.5}>{actions}</Stack>}
    </Stack>
  </Box>
)
