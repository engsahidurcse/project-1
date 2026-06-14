import { Box, Typography, Button } from '@mui/material'
import { InboxOutlined } from '@mui/icons-material'

interface Props {
  title?: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export const EmptyState = ({
  title = 'No data found',
  description = 'There is nothing to show here yet.',
  action,
}: Props) => (
  <Box
    sx={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      py: 8, textAlign: 'center',
    }}
  >
    <InboxOutlined sx={{ fontSize: 56, color: 'text.disabled', mb: 2 }} />
    <Typography variant="h6" fontWeight={700} color="text.secondary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.disabled" maxWidth={320}>
      {description}
    </Typography>
    {action && (
      <Button variant="outlined" sx={{ mt: 3 }} onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </Box>
)
