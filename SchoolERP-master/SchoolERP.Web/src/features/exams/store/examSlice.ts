import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { examApi } from '../api/examApi'
import { extractApiError } from '@/utils/helpers'
import type { ExamState, ExamListParams, Exam } from '../types/exam.types'

const initialState: ExamState = {
  list: [], selected: null, results: [], upcoming: [],
  totalCount: 0, isLoading: false, error: null,
}

export const fetchExams = createAsyncThunk(
  'exams/fetchAll',
  async (params: ExamListParams | undefined, { rejectWithValue }) => {
    try { return (await examApi.getAll(params)).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const fetchUpcomingExams = createAsyncThunk(
  'exams/upcoming',
  async (_, { rejectWithValue }) => {
    try { return (await examApi.getUpcoming()).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const fetchExamResults = createAsyncThunk(
  'exams/fetchResults',
  async (examId: string, { rejectWithValue }) => {
    try { return (await examApi.getResults(examId)).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const createExam = createAsyncThunk(
  'exams/create',
  async (data: Partial<Exam>, { rejectWithValue }) => {
    try { return (await examApi.create(data)).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

const examSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    clearError:    (s) => { s.error = null },
    setSelected:   (s, a) => { s.selected = a.payload },
  },
  extraReducers: (b) => {
    b.addCase(fetchExams.pending,   (s) => { s.isLoading = true })
     .addCase(fetchExams.fulfilled, (s, a) => {
        s.isLoading = false; s.list = a.payload.items; s.totalCount = a.payload.totalCount
     })
     .addCase(fetchExams.rejected,  (s, a) => { s.isLoading = false; s.error = a.payload as string })
     .addCase(fetchUpcomingExams.fulfilled, (s, a) => { s.upcoming = a.payload })
     .addCase(fetchExamResults.fulfilled,  (s, a) => { s.results  = a.payload })
     .addCase(createExam.fulfilled,        (s, a) => { s.list.unshift(a.payload); s.totalCount++ })
  },
})

export const { clearError, setSelected } = examSlice.actions
export default examSlice.reducer