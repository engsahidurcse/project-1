export interface DashboardStats {
  totalStudents: number
  activeStudents: number
  totalTeachers: number
  totalClasses: number
  upcomingExams: number
  pendingFees: number
  collectedFeesThisMonth: number
  attendancePercentage: number
}

export interface MonthlyFeeData {
  month: string
  collected: number
  pending: number
}

export interface AttendanceTrend {
  date: string
  present: number
  absent: number
}
