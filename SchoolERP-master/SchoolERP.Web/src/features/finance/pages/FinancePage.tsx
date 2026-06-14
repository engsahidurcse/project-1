import { useEffect, useState } from 'react'
import {
  Box, Button, Card, CardContent, Chip, Typography, Grid,
  Stack, TextField, InputAdornment, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Skeleton, MenuItem, Select,
  FormControl, InputLabel, IconButton, Tooltip,
} from '@mui/material'
import { Add, Search, Receipt, Download } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchPayments, fetchFeeTypes } from '../store/financeSlice'
import { StatCard } from '@/components/data-display/StatCard'
import { PageHeader } from '@/components/data-display/PageHeader'
import { formatDate, formatCurrency } from '@/utils/formatters'
import { APP_ROUTES } from '@/config/constants'
import { AccountBalance, Warning } from '@mui/icons-material'
import type { FeePayment } from '../types/finance.types'

const STATUS_COLOR: Record<FeePayment['status'], 'success' | 'error' | 'warning' | 'default'> = {
  Paid: 'success', Overdue: 'error', Pending: 'warning', Partial: 'default',
}

export default function FinancePage() {
  const dispatch = useAppDispatch()
  const { payments, feeTypes, totalCount, isLoading } = useAppSelector((s) => s.finance)
  const [status,      setStatus]      = useState('')
  const [search,      setSearch]      = useState('')
  const [page,        setPage]        = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    dispatch(fetchFeeTypes())
    dispatch(fetchPayments({ pageNumber: page + 1, pageSize: rowsPerPage, status: status || undefined }))
  }, [dispatch, page, rowsPerPage, status])

  const paidTotal    = payments.filter((p) => p.status === 'Paid').reduce((acc, p) => acc + p.amount, 0)
  const overdueCount = payments.filter((p) => p.status === 'Overdue').length

  return (
    <Box>
      <PageHeader
        title="Finance"
        subtitle="Track fee collections and payments"
        breadcrumbs={[{ label: 'Home', to: APP_ROUTES.DASHBOARD }, { label: 'Finance' }]}
        actions={
          <>
            <Button variant="outlined" startIcon={<Download />}>Export</Button>
            <Button variant="contained" startIcon={<Add />}>Collect Fee</Button>
          </>
        }
      />

      {/* Summary Cards */}
      <Grid container spacing={2.5} mb={3}>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Fee Types"
            value={feeTypes.length}
            subtitle="Configured fee types"
            icon={Receipt}
            color="#7C3AED"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Collected (shown)"
            value={formatCurrency(paidTotal)}
            subtitle="From current page"
            icon={AccountBalance}
            color="#10B981"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Overdue"
            value={overdueCount}
            subtitle="Require attention"
            icon={Warning}
            color="#EF4444"
          />
        </Grid>
      </Grid>

      <Card>
        <CardContent sx={{ pb: 0 }}>
          <Stack direction="row" spacing={2} mb={2.5} flexWrap="wrap">
            <TextField
              placeholder="Search by student…"
              size="small"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0) }}
              sx={{ minWidth: 240 }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search fontSize="small" color="action" /></InputAdornment>,
              }}
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select value={status} label="Status" onChange={(e) => { setStatus(e.target.value); setPage(0) }}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
                <MenuItem value="Partial">Partial</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Fee Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Paid Date</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading
                  ? [...Array(rowsPerPage)].map((_, i) => (
                      <TableRow key={i}>
                        {[...Array(9)].map((_, j) => <TableCell key={j}><Skeleton /></TableCell>)}
                      </TableRow>
                    ))
                  : payments.map((payment) => (
                      <TableRow key={payment.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>{payment.studentName}</Typography>
                        </TableCell>
                        <TableCell>{payment.feeTypeName}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600} color="primary.main">
                            {formatCurrency(payment.amount)}
                          </Typography>
                        </TableCell>
                        <TableCell>{formatDate(payment.dueDate)}</TableCell>
                        <TableCell>{payment.paidDate ? formatDate(payment.paidDate) : '—'}</TableCell>
                        <TableCell>{payment.paymentMethod ?? '—'}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontFamily="'JetBrains Mono', monospace" fontSize="0.75rem">
                            {payment.transactionId ?? '—'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={payment.status} color={STATUS_COLOR[payment.status]} size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View Receipt">
                            <IconButton size="small"><Receipt fontSize="small" /></IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0) }}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  )
}
