import type { PaginationParams } from '@/types'

export interface FeeType {
  id: string
  name: string
  amount: number
  description?: string
  isRecurring: boolean
  frequency?: 'Monthly' | 'Quarterly' | 'Yearly'
}

export interface FeePayment {
  id: string
  studentId: string
  studentName: string
  feeTypeId: string
  feeTypeName: string
  amount: number
  dueDate: string
  paidDate?: string
  status: 'Pending' | 'Paid' | 'Overdue' | 'Partial'
  transactionId?: string
  paymentMethod?: 'Cash' | 'BankTransfer' | 'OnlinePayment'
  remarks?: string
}

export interface FinanceListParams extends PaginationParams {
  studentId?: string
  status?: string
}

export interface FinanceState {
  payments: FeePayment[]
  feeTypes: FeeType[]
  overdue: FeePayment[]
  totalCount: number
  isLoading: boolean
  error: string | null
}
