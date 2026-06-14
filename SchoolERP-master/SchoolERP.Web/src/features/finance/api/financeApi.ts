import {axiosInstance} from '@/lib/axios/axiosInstance'
import type { ApiResponse, PaginatedResponse } from '@/types'
import type { FeePayment, FeeType, FinanceListParams } from '../types/finance.types'

const BASE = '/api/finance'

export const financeApi = {
  getFeeTypes:     () =>
    axiosInstance.get<ApiResponse<FeeType[]>>(`${BASE}/fee-types`),

  getPayments:     (params?: FinanceListParams) =>
    axiosInstance.get<ApiResponse<PaginatedResponse<FeePayment>>>(`${BASE}/payments`, { params }),

  getPaymentById:  (id: string) =>
    axiosInstance.get<ApiResponse<FeePayment>>(`${BASE}/payments/${id}`),

  collectPayment:  (data: Partial<FeePayment>) =>
    axiosInstance.post<ApiResponse<FeePayment>>(`${BASE}/payments`, data),

  getStudentFees:  (studentId: string) =>
    axiosInstance.get<ApiResponse<FeePayment[]>>(`${BASE}/students/${studentId}/fees`),

  getMonthlySummary: (year: number, month: number) =>
    axiosInstance.get(`${BASE}/summary/monthly`, { params: { year, month } }),

  getOverdue:      () =>
    axiosInstance.get<ApiResponse<FeePayment[]>>(`${BASE}/payments/overdue`),
}
