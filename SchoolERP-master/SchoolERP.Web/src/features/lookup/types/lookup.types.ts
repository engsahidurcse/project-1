export interface Class {
  id: string
  name: string
  sections: Section[]
}

export interface Section {
  id: string
  name: string
  classId: string
  teacherId?: string
  teacherName?: string
  capacity: number
  currentStrength: number
}

export interface Subject {
  id: string
  name: string
  code: string
  classId: string
}

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

export interface LookupState {
  classes: Class[]
  subjects: Subject[]
  dashboardStats: DashboardStats | null
  isLoading: boolean
}
