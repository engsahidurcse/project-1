import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import {
  fetchStudents, fetchStudentById, createStudent, updateStudent, deleteStudent, clearSelected, clearError,
} from '../store/studentSlice'
import type { Student, StudentListParams } from '../types/student.types'

export const useStudents = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector((s) => s.students)

  return {
    ...state,
    loadStudents:    useCallback((p?: StudentListParams) => dispatch(fetchStudents(p)), [dispatch]),
    loadStudentById: useCallback((id: string) => dispatch(fetchStudentById(id)), [dispatch]),
    addStudent:      useCallback((data: Partial<Student>) => dispatch(createStudent(data)), [dispatch]),
    editStudent:     useCallback((id: string, data: Partial<Student>) => dispatch(updateStudent({ id, data })), [dispatch]),
    removeStudent:   useCallback((id: string) => dispatch(deleteStudent(id)), [dispatch]),
    clearSelected:   useCallback(() => dispatch(clearSelected()), [dispatch]),
    clearError:      useCallback(() => dispatch(clearError()), [dispatch]),
  }
}
