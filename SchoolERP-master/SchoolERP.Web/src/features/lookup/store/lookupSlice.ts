import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { lookupApi } from '../api/lookupApi'
import { extractApiError } from '@/utils/helpers'
import type { LookupState } from '../types/lookup.types'

const initialState: LookupState = {
  classes: [], subjects: [], dashboardStats: null, isLoading: false,
}

export const fetchClasses = createAsyncThunk(
  'lookup/fetchClasses',
  async (_, { rejectWithValue }) => {
    try { return (await lookupApi.getClasses()).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const fetchDashboardStats = createAsyncThunk(
  'lookup/dashboardStats',
  async (_, { rejectWithValue }) => {
    try { return (await lookupApi.getDashboardStats()).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

const lookupSlice = createSlice({
  name: 'lookup',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchClasses.fulfilled,       (s, a) => { s.classes = a.payload })
     .addCase(fetchDashboardStats.pending,  (s) => { s.isLoading = true })
     .addCase(fetchDashboardStats.fulfilled,(s, a) => { s.isLoading = false; s.dashboardStats = a.payload })
     .addCase(fetchDashboardStats.rejected, (s) => { s.isLoading = false })
  },
})

export default lookupSlice.reducer
