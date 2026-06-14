import {axiosInstance} from '@/lib/axios/axiosInstance'
import type { ApiResponse } from '@/types'
import type { Class, Section, Subject, DashboardStats } from '../types/lookup.types'

const BASE = '/api/lookup'

export const lookupApi = {
  getClasses:       () =>
    axiosInstance.get<ApiResponse<Class[]>>(`${BASE}/classes`),

  getSectionsByClass: (classId: string) =>
    axiosInstance.get<ApiResponse<Section[]>>(`${BASE}/classes/${classId}/sections`),

  getSubjectsByClass: (classId: string) =>
    axiosInstance.get<ApiResponse<Subject[]>>(`${BASE}/classes/${classId}/subjects`),

  getAllSubjects:    () =>
    axiosInstance.get<ApiResponse<Subject[]>>(`${BASE}/subjects`),

  getDashboardStats: () =>
    axiosInstance.get<ApiResponse<DashboardStats>>(`${BASE}/dashboard/stats`),
}
