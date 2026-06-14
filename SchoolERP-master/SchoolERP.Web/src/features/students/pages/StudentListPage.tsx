import { useEffect, useState } from 'react'
import {
  Box, Button, Card, CardContent, Chip, Avatar, IconButton,
  Typography, TextField, InputAdornment, Stack, Tooltip,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, Skeleton, MenuItem, Select,
  FormControl, InputLabel,
} from '@mui/material'
import {
  Add, Search, Edit, Delete, Visibility,
  FilterList, Download,
} from '@mui/icons-material'
import { useStudents } from '../hooks/useStudents'
import { formatDate, getInitials, generateAvatarColor } from '@/utils/formatters'
import { PAGINATION_DEFAULTS } from '@/config/constants'
import type { Student } from '../types/student.types'

const STATUS_COLORS: Record<Student['status'], 'success' | 'error' | 'warning' | 'default'> = {
  Active: 'success', Inactive: 'error', Graduated: 'default', Transferred: 'warning',
}

export default function StudentListPage() {
  const { list, totalCount, isLoading, loadStudents } = useStudents()
  const [search,   setSearch]   = useState('')
  const [status,   setStatus]   = useState('')
  const [page,     setPage]     = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(PAGINATION_DEFAULTS.PAGE_SIZE)

  useEffect(() => {
    loadStudents({ pageNumber: page + 1, pageSize: rowsPerPage, search, status: status || undefined })
  }, [page, rowsPerPage, search, status, loadStudents])

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Students</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all student records
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<Download />}>Export</Button>
          <Button variant="contained" startIcon={<Add />}>Add Student</Button>
        </Stack>
      </Stack>

      <Card>
        <CardContent sx={{ pb: 0 }}>
          {/* Filters */}
          <Stack direction="row" spacing={2} mb={2.5} flexWrap="wrap">
            <TextField
              placeholder="Search students..."
              size="small"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0) }}
              sx={{ minWidth: 260 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => { setStatus(e.target.value); setPage(0) }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Graduated">Graduated</MenuItem>
                <MenuItem value="Transferred">Transferred</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" startIcon={<FilterList />} size="small">More Filters</Button>
          </Stack>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Roll</TableCell>
                  <TableCell>Admission Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading
                  ? [...Array(rowsPerPage)].map((_, i) => (
                      <TableRow key={i}>
                        {[...Array(7)].map((_, j) => (
                          <TableCell key={j}><Skeleton /></TableCell>
                        ))}
                      </TableRow>
                    ))
                  : list.map((student) => (
                      <TableRow key={student.id} hover>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Avatar
                              src={student.avatarUrl}
                              sx={{
                                bgcolor: generateAvatarColor(student.fullName),
                                width: 36, height: 36, fontSize: '0.8rem',
                              }}
                            >
                              {getInitials(student.fullName)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {student.fullName}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {student.email}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontFamily="'JetBrains Mono', monospace">
                            {student.studentId}
                          </Typography>
                        </TableCell>
                        <TableCell>{student.className} — {student.sectionName}</TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{formatDate(student.admissionDate)}</TableCell>
                        <TableCell>
                          <Chip
                            label={student.status}
                            color={STATUS_COLORS[student.status]}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="View"><IconButton size="small"><Visibility fontSize="small" /></IconButton></Tooltip>
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
            rowsPerPageOptions={PAGINATION_DEFAULTS.PAGE_SIZE_OPTIONS}
          />
        </CardContent>
      </Card>
    </Box>
  )
}
