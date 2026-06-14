// 🎯 FIXED: Wrapped axiosInstance in curly braces to support named exports from the axios layer
import { axiosInstance } from '@/lib/axios/axiosInstance'
import type { ApiResponse, PaginatedResponse } from '@/types'
import type { Student, StudentListParams } from '../types/student.types'

const BASE = '/api/students'

export const studentApi = {
  getAll: (params?: StudentListParams) =>
    axiosInstance.get<ApiResponse<PaginatedResponse<Student>>>(BASE, { params }),

  getById: (id: string) =>
    axiosInstance.get<ApiResponse<Student>>(`${BASE}/${id}`),

  create: (data: Partial<Student>) =>
    axiosInstance.post<ApiResponse<Student>>(BASE, data),

  update: (id: string, data: Partial<Student>) =>
    axiosInstance.put<ApiResponse<Student>>(`${BASE}/${id}`, data),

  remove: (id: string) =>
    axiosInstance.delete(`${BASE}/${id}`),

  byClass: (classId: string) =>
    axiosInstance.get<ApiResponse<Student[]>>(`${BASE}/by-class/${classId}`),

  uploadAvatar: (id: string, file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    return axiosInstance.post(`${BASE}/${id}/avatar`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}