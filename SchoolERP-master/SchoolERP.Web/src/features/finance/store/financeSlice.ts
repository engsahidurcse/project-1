import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { financeApi } from '../api/financeApi'
import { extractApiError } from '@/utils/helpers'
import type { FinanceState, FinanceListParams } from '../types/finance.types'

const initialState: FinanceState = {
  payments: [], feeTypes: [], overdue: [],
  totalCount: 0, isLoading: false, error: null,
}

export const fetchPayments = createAsyncThunk(
  'finance/fetchPayments',
  async (params: FinanceListParams | undefined, { rejectWithValue }) => {
    try { return (await financeApi.getPayments(params)).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const fetchFeeTypes = createAsyncThunk(
  'finance/fetchFeeTypes',
  async (_, { rejectWithValue }) => {
    try { return (await financeApi.getFeeTypes()).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const fetchOverdue = createAsyncThunk(
  'finance/fetchOverdue',
  async (_, { rejectWithValue }) => {
    try { return (await financeApi.getOverdue()).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: { clearError: (s) => { s.error = null } },
  extraReducers: (b) => {
    b.addCase(fetchPayments.pending,   (s) => { s.isLoading = true })
     .addCase(fetchPayments.fulfilled, (s, a) => {
       s.isLoading = false; s.payments = a.payload.items; s.totalCount = a.payload.totalCount
     })
     .addCase(fetchPayments.rejected, (s, a) => { s.isLoading = false; s.error = a.payload as string })
     .addCase(fetchFeeTypes.fulfilled, (s, a) => { s.feeTypes = a.payload })
     .addCase(fetchOverdue.fulfilled,  (s, a) => { s.overdue  = a.payload })
  },
})

export const { clearError } = financeSlice.actions
export default financeSlice.reducer
