import { configureStore } from '@reduxjs/toolkit'
import authReducer    from '@/features/auth/store/authSlice'
import studentReducer from '@/features/students/store/studentSlice'
import examReducer    from '@/features/exams/store/examSlice'
import financeReducer from '@/features/finance/store/financeSlice'
import lookupReducer  from '@/features/lookup/store/lookupSlice'
import uiReducer      from '@/store/slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth:     authReducer,
    students: studentReducer,
    exams:    examReducer,
    finance:  financeReducer,
    lookup:   lookupReducer,
    ui:       uiReducer,
  },
})

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
