// 🎯 FIXED: Wrapped axiosInstance in curly braces to support named exports from the axios layer
import { axiosInstance } from '@/lib/axios/axiosInstance'
import type { ApiResponse, PaginatedResponse } from '@/types'
import type { Exam, ExamResult, ExamListParams } from '../types/exam.types'

const BASE = '/api/exams'

export const examApi = {
  getAll: (params?: ExamListParams) =>
    axiosInstance.get<ApiResponse<PaginatedResponse<Exam>>>(BASE, { params }),

  getById: (id: string) =>
    axiosInstance.get<ApiResponse<Exam>>(`${BASE}/${id}`),

  create: (data: Partial<Exam>) =>
    axiosInstance.post<ApiResponse<Exam>>(BASE, data),

  update: (id: string, data: Partial<Exam>) =>
    axiosInstance.put<ApiResponse<Exam>>(`${BASE}/${id}`, data),

  remove: (id: string) =>
    axiosInstance.delete(`${BASE}/${id}`),

  getResults: (examId: string) =>
    axiosInstance.get<ApiResponse<ExamResult[]>>(`${BASE}/${examId}/results`),

  submitResults: (examId: string, results: Partial<ExamResult>[]) =>
    axiosInstance.post<ApiResponse<ExamResult[]>>(`${BASE}/${examId}/results`, { results }),

  getUpcoming: () =>
    axiosInstance.get<ApiResponse<Exam[]>>(`${BASE}/upcoming`),
}