import { useEffect, useState } from 'react'
import {
  Box, Button, Card, CardContent, Chip, Typography,
  Stack, TextField, InputAdornment, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Skeleton, MenuItem, Select,
  FormControl, InputLabel, IconButton, Tooltip,
} from '@mui/material'
import { Add, Search, Edit, Delete, Visibility, Download } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchExams } from '../store/examSlice'
import { PageHeader } from '@/components/data-display/PageHeader'
import { formatDate } from '@/utils/formatters'
import { APP_ROUTES } from '@/config/constants'
import type { Exam } from '../types/exam.types'

const STATUS_COLOR: Record<Exam['status'], 'default' | 'primary' | 'success' | 'error'> = {
  Scheduled: 'primary', Ongoing: 'default', Completed: 'success', Cancelled: 'error',
}

export default function ExamPage() {
  const dispatch  = useAppDispatch()
  const { list, totalCount, isLoading } = useAppSelector((s) => s.exams)
  const [search, setSearch]   = useState('')
  const [status, setStatus]   = useState('')
  const [page,   setPage]     = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    dispatch(fetchExams({ pageNumber: page + 1, pageSize: rowsPerPage, status: status || undefined }))
  }, [dispatch, page, rowsPerPage, status])

  return (
    <Box>
      <PageHeader
        title="Exams"
        subtitle="Schedule and manage all examinations"
        breadcrumbs={[{ label: 'Home', to: APP_ROUTES.DASHBOARD }, { label: 'Exams' }]}
        actions={
          <>
            <Button variant="outlined" startIcon={<Download />}>Export</Button>
            <Button variant="contained" startIcon={<Add />}>Schedule Exam</Button>
          </>
        }
      />

      <Card>
        <CardContent sx={{ pb: 0 }}>
          <Stack direction="row" spacing={2} mb={2.5} flexWrap="wrap">
            <TextField
              placeholder="Search exams…"
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
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Total Marks</TableCell>
                  <TableCell>Passing Marks</TableCell>
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
                  : list.map((exam) => (
                      <TableRow key={exam.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>{exam.title}</Typography>
                          {exam.description && (
                            <Typography variant="caption" color="text.secondary">{exam.description}</Typography>
                          )}
                        </TableCell>
                        <TableCell>{exam.className}</TableCell>
                        <TableCell>{exam.subjectName}</TableCell>
                        <TableCell>{formatDate(exam.examDate)}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontFamily="'JetBrains Mono', monospace" fontSize="0.8rem">
                            {exam.startTime} – {exam.endTime}
                          </Typography>
                        </TableCell>
                        <TableCell>{exam.totalMarks}</TableCell>
                        <TableCell>{exam.passingMarks}</TableCell>
                        <TableCell>
                          <Chip label={exam.status} color={STATUS_COLOR[exam.status]} size="small" />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View Results"><IconButton size="small"><Visibility fontSize="small" /></IconButton></Tooltip>
                          <Tooltip title="Edit"><IconButton size="small"><Edit fontSize="small" /></IconButton></Tooltip>
                          <Tooltip title="Delete"><IconButton size="small" color="error"><Delete fontSize="small" /></IconButton></Tooltip>
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
