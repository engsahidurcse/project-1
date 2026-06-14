import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { studentApi } from '../api/studentApi'
import { extractApiError } from '@/utils/helpers'
import type { Student, StudentListParams, StudentState } from '../types/student.types'

const initialState: StudentState = {
  list: [], selected: null,
  totalCount: 0, pageNumber: 1, pageSize: 10,
  isLoading: false, error: null,
}

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (params: StudentListParams | undefined, { rejectWithValue }) => {
    try { return (await studentApi.getAll(params)).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const fetchStudentById = createAsyncThunk(
  'students/fetchById',
  async (id: string, { rejectWithValue }) => {
    try { return (await studentApi.getById(id)).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const createStudent = createAsyncThunk(
  'students/create',
  async (data: Partial<Student>, { rejectWithValue }) => {
    try { return (await studentApi.create(data)).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, data }: { id: string; data: Partial<Student> }, { rejectWithValue }) => {
    try { return (await studentApi.update(id, data)).data.data }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id: string, { rejectWithValue }) => {
    try { await studentApi.remove(id); return id }
    catch (e) { return rejectWithValue(extractApiError(e)) }
  }
)

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearSelected: (s) => { s.selected = null },
    clearError:    (s) => { s.error = null },
  },
  extraReducers: (b) => {
    b.addCase(fetchStudents.pending,   (s) => { s.isLoading = true; s.error = null })
     .addCase(fetchStudents.fulfilled, (s, a) => {
        s.isLoading  = false
        s.list       = a.payload.items
        s.totalCount = a.payload.totalCount
        s.pageNumber = a.payload.pageNumber
        s.pageSize   = a.payload.pageSize
     })
     .addCase(fetchStudents.rejected, (s, a) => { s.isLoading = false; s.error = a.payload as string })

     .addCase(fetchStudentById.fulfilled, (s, a) => { s.selected = a.payload })

     .addCase(createStudent.fulfilled, (s, a) => { s.list.unshift(a.payload); s.totalCount++ })

     .addCase(updateStudent.fulfilled, (s, a) => {
       const i = s.list.findIndex((x) => x.id === a.payload.id)
       if (i !== -1) s.list[i] = a.payload
       if (s.selected?.id === a.payload.id) s.selected = a.payload
     })

     .addCase(deleteStudent.fulfilled, (s, a) => {
       s.list = s.list.filter((x) => x.id !== a.payload); s.totalCount--
     })
  },
})

export const { clearSelected, clearError } = studentSlice.actions
export default studentSlice.reducer