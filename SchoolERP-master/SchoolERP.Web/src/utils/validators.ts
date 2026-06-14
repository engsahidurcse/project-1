import { z } from 'zod'

export const loginSchema = z.object({
  UserName: z.string().min(1, 'Username is required'),
  Password: z.string().min(4, 'Password must be at least 4 characters'),
})

export const studentSchema = z.object({
  firstName:     z.string().min(1, 'First name is required'),
  lastName:      z.string().min(1, 'Last name is required'),
  email:         z.string().email('Invalid email address'),
  phone:         z.string().optional(),
  dateOfBirth:   z.string().min(1, 'Date of birth is required'),
  gender:        z.enum(['Male', 'Female', 'Other']),
  classId:       z.string().min(1, 'Class is required'),
  sectionId:     z.string().min(1, 'Section is required'),
  rollNumber:    z.string().min(1, 'Roll number is required'),
  admissionDate: z.string().min(1, 'Admission date is required'),
  parentName:    z.string().optional(),
  parentPhone:   z.string().optional(),
  address:       z.string().optional(),
})

export const examSchema = z.object({
  title:        z.string().min(1, 'Title is required'),
  examDate:     z.string().min(1, 'Exam date is required'),
  startTime:    z.string().min(1, 'Start time is required'),
  endTime:      z.string().min(1, 'End time is required'),
  classId:      z.string().min(1, 'Class is required'),
  subjectId:    z.string().min(1, 'Subject is required'),
  totalMarks:   z.number().min(1, 'Total marks must be at least 1'),
  passingMarks: z.number().min(1, 'Passing marks must be at least 1'),
  description:  z.string().optional(),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword:     z.string().min(4, 'Password must be at least 4 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type LoginFormData          = z.infer<typeof loginSchema>
export type StudentFormData        = z.infer<typeof studentSchema>
export type ExamFormData           = z.infer<typeof examSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
