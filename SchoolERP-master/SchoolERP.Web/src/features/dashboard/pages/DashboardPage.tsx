import { useEffect } from 'react'
import { Box, Grid, Card, CardContent, CardHeader, Typography, Stack, Chip, Avatar, Divider } from '@mui/material'
import {
  People, School, Assignment, AccountBalance,
  TrendingUp, CheckCircleOutline,
} from '@mui/icons-material'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchDashboardStats } from '@/features/lookup/store/lookupSlice'
import { StatCard } from '@/components/data-display/StatCard'
import { PageHeader } from '@/components/data-display/PageHeader'
import { formatCurrency, getInitials, generateAvatarColor } from '@/utils/formatters'

// ── Mock chart data (replace with API data) ───────────────────────────────────
const feeChartData = [
  { month: 'Jun', collected: 420000, pending: 80000 },
  { month: 'Jul', collected: 390000, pending: 110000 },
  { month: 'Aug', collected: 470000, pending: 70000 },
  { month: 'Sep', collected: 510000, pending: 60000 },
  { month: 'Oct', collected: 460000, pending: 90000 },
  { month: 'Nov', collected: 540000, pending: 50000 },
]

const attendanceData = [
  { day: 'Mon', present: 92, absent: 8 },
  { day: 'Tue', present: 88, absent: 12 },
  { day: 'Wed', present: 95, absent: 5 },
  { day: 'Thu', present: 90, absent: 10 },
  { day: 'Fri', present: 85, absent: 15 },
]

const genderData = [
  { name: 'Male',   value: 58, color: '#1A6FE8' },
  { name: 'Female', value: 42, color: '#7C3AED' },
]

const recentStudents = [
  { name: 'Farhan Ahmed',   class: 'Class 10-A', date: '21 Nov 2024', status: 'Active' },
  { name: 'Tasnim Rahman',  class: 'Class 8-B',  date: '20 Nov 2024', status: 'Active' },
  { name: 'Rakib Hossain',  class: 'Class 9-C',  date: '19 Nov 2024', status: 'Active' },
  { name: 'Nusrat Jahan',   class: 'Class 7-A',  date: '18 Nov 2024', status: 'Active' },
  { name: 'Sabbir Islam',   class: 'Class 11-B', date: '17 Nov 2024', status: 'Active' },
]

const upcomingExams = [
  { subject: 'Mathematics',  class: 'Class 10', date: '25 Nov', marks: 100 },
  { subject: 'English',      class: 'Class 9',  date: '27 Nov', marks: 100 },
  { subject: 'Physics',      class: 'Class 11', date: '29 Nov', marks: 75 },
  { subject: 'Chemistry',    class: 'Class 12', date: '02 Dec', marks: 75 },
]

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const { dashboardStats, isLoading } = useAppSelector((s) => s.lookup)

  useEffect(() => { dispatch(fetchDashboardStats()) }, [dispatch])

  const stats = dashboardStats

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back! Here's what's happening at your school today.`}
        breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
      />

      {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
      <Grid container spacing={2.5} mb={3}>
        {[
          { title: 'Total Students',   value: stats?.totalStudents ?? 0,           icon: People,         color: '#1A6FE8', subtitle: `${stats?.activeStudents ?? 0} active`,       trend: { value: 4.2, label: 'vs last month' } },
          { title: 'Total Teachers',   value: stats?.totalTeachers ?? 0,           icon: School,         color: '#7C3AED', subtitle: 'Across all classes',                          trend: { value: 2.1, label: 'vs last month' } },
          { title: 'Upcoming Exams',   value: stats?.upcomingExams ?? 0,           icon: Assignment,     color: '#F59E0B', subtitle: 'Scheduled this month',                        trend: { value: -1,  label: 'vs last month' } },
          { title: 'Fees Collected',   value: formatCurrency(stats?.collectedFeesThisMonth ?? 0), icon: AccountBalance, color: '#10B981', subtitle: 'This month',          trend: { value: 8.5, label: 'vs last month' } },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} xl={3} key={i}>
            <StatCard {...card} loading={isLoading} />
          </Grid>
        ))}
      </Grid>

      {/* ── Charts Row ─────────────────────────────────────────────────────── */}
      <Grid container spacing={2.5} mb={3}>
        {/* Fee Collection Area Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title={<Typography fontWeight={700}>Fee Collection Overview</Typography>}
              subheader="Monthly collected vs pending (BDT)"
              action={<Chip label="Last 6 months" size="small" />}
            />
            <CardContent sx={{ pt: 0 }}>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={feeChartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1A6FE8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1A6FE8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Legend />
                  <Area type="monotone" dataKey="collected" name="Collected" stroke="#1A6FE8" strokeWidth={2} fill="url(#colorCollected)" />
                  <Area type="monotone" dataKey="pending"   name="Pending"   stroke="#EF4444" strokeWidth={2} fill="url(#colorPending)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Gender Distribution Pie */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={<Typography fontWeight={700}>Student Distribution</Typography>} subheader="Gender breakdown" />
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={genderData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                    {genderData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <Stack spacing={1} mt={1}>
                {genderData.map((g) => (
                  <Stack key={g.name} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: g.color }} />
                      <Typography variant="body2">{g.name}</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={700}>{g.value}%</Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ── Attendance Bar + Tables Row ─────────────────────────────────────── */}
      <Grid container spacing={2.5}>
        {/* Attendance Bar Chart */}
        <Grid item xs={12} lg={5}>
          <Card>
            <CardHeader
              title={<Typography fontWeight={700}>Weekly Attendance</Typography>}
              subheader="Present vs absent this week (%)"
            />
            <CardContent sx={{ pt: 0 }}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={attendanceData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} unit="%" />
                  <Tooltip unit="%" />
                  <Legend />
                  <Bar dataKey="present" name="Present" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="absent"  name="Absent"  fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Admissions */}
        <Grid item xs={12} sm={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={<Typography fontWeight={700}>Recent Admissions</Typography>} />
            <CardContent sx={{ pt: 0 }}>
              <Stack divider={<Divider />} spacing={0}>
                {recentStudents.map((s, i) => (
                  <Stack key={i} direction="row" spacing={1.5} alignItems="center" py={1.25}>
                    <Avatar sx={{ width: 34, height: 34, bgcolor: generateAvatarColor(s.name), fontSize: '0.75rem', fontWeight: 700 }}>
                      {getInitials(s.name)}
                    </Avatar>
                    <Box flex={1} minWidth={0}>
                      <Typography variant="body2" fontWeight={600} noWrap>{s.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{s.class}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" flexShrink={0}>{s.date}</Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Exams */}
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={<Typography fontWeight={700}>Upcoming Exams</Typography>} />
            <CardContent sx={{ pt: 0 }}>
              <Stack spacing={1.5}>
                {upcomingExams.map((e, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 1.5, borderRadius: 2,
                      bgcolor: 'action.hover',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" fontWeight={700}>{e.subject}</Typography>
                        <Typography variant="caption" color="text.secondary">{e.class}</Typography>
                      </Box>
                      <Chip label={e.date} size="small" color="primary" variant="outlined" />
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                      <TrendingUp fontSize="small" sx={{ color: 'text.disabled', fontSize: 14 }} />
                      <Typography variant="caption" color="text.secondary">
                        Total Marks: {e.marks}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ── Quick Stats Footer ─────────────────────────────────────────────── */}
      <Grid container spacing={2.5} mt={0.5}>
        {[
          { label: 'Total Classes',        value: stats?.totalClasses ?? 0,           icon: <School />,             color: '#7C3AED' },
          { label: 'Attendance Rate',      value: `${stats?.attendancePercentage ?? 0}%`, icon: <CheckCircleOutline />, color: '#10B981' },
          { label: 'Pending Fee Accounts', value: stats?.pendingFees ?? 0,             icon: <AccountBalance />,     color: '#F59E0B' },
        ].map((item, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ color: item.color }}>{item.icon}</Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>{item.label}</Typography>
                    <Typography variant="h6" fontWeight={800}>{item.value}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
