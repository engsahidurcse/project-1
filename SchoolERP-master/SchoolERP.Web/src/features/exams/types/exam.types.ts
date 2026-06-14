import type { PaginationParams } from '@/types'

export interface Exam {
  id: string
  title: string
  description?: string
  examDate: string
  startTime: string
  endTime: string
  classId: string
  className: string
  subjectId: string
  subjectName: string
  totalMarks: number
  passingMarks: number
  status: 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled'
}

export interface ExamResult {
  id: string
  examId: string
  studentId: string
  studentName: string
  marksObtained: number
  grade: string
  remarks?: string
  isPassed: boolean
}

export interface ExamListParams extends PaginationParams {
  classId?: string
  status?: string
}

export interface ExamState {
  list: Exam[]
  selected: Exam | null
  results: ExamResult[]
  upcoming: Exam[]
  totalCount: number
  isLoading: boolean
  error: string | null
}
