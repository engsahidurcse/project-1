import type { PaginationParams } from '@/types'

export interface Student {
  id: string
  studentId: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone?: string
  dateOfBirth: string
  gender: 'Male' | 'Female' | 'Other'
  classId: string
  className: string
  sectionId: string
  sectionName: string
  rollNumber: string
  admissionDate: string
  status: 'Active' | 'Inactive' | 'Graduated' | 'Transferred'
  avatarUrl?: string
  parentName?: string
  parentPhone?: string
  address?: string
}

export interface StudentListParams extends PaginationParams {
  classId?: string
  status?: string
  gender?: string
}

export interface StudentState {
  list: Student[]
  selected: Student | null
  totalCount: number
  pageNumber: number
  pageSize: number
  isLoading: boolean
  error: string | null
}
