// ─────────────────────────────────────────────────────────────────────────────
// Shared API envelope types
// ─────────────────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  items: T[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  statusCode: number
}

export interface SelectOption {
  label: string
  value: string | number
}

export type SortDirection = 'asc' | 'desc'

export interface PaginationParams {
  pageNumber?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
  search?: string
}
