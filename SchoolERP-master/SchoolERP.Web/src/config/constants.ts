// ===================================================================================
// 🌐 GLOBAL APPLICATION ROUTING MATRIX
// ===================================================================================
export const APP_ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  STUDENTS: '/students',
  STUDENT_DETAIL: '/students/:id',
  STUDENT_NEW: '/students/new',
  EXAMS: '/exams',
  EXAM_DETAIL: '/exams/:id',
  EXAM_RESULTS: '/exams/:id/results',
  FINANCE: '/finance',
  FINANCE_PAYMENTS: '/finance/payments',
  FINANCE_FEE_TYPES: '/finance/fee-types',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  NOT_FOUND: '*',
} as const;

// 🚨 COOKIE-DRIVEN SYSTEM: No manual access or refresh token objects needed here!

// ===================================================================================
// 📊 SYSTEM WIDE PAGINATION DEFAULTS
// ===================================================================================
export const PAGINATION_DEFAULTS = {
  PAGE_NUMBER: 1,
  PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// ===================================================================================
// 📅 STANDARDIZED DATE & TIME FORMAT MATRICES
// ===================================================================================
export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  DISPLAY_TIME: 'DD MMM YYYY hh:mm A',
  API: 'YYYY-MM-DD',
  MONTH_YEAR: 'MMM YYYY',
} as const;

// ===================================================================================
// 📐 APPLICATION LAYOUT SIDEBAR DIMENSIONS (MUI DRAWER CONFIG)
// ===================================================================================
export const DRAWER_WIDTH = 260;
export const DRAWER_COLLAPSED_WIDTH = 72;

// ===================================================================================
// 🚻 UI DROPDOWN LIST MATRICES
// ===================================================================================
export const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
] as const;

export const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'
] as const;

export const ACADEMIC_SHIFTS = [
  { label: 'Morning', value: 'Morning' },
  { label: 'Day', value: 'Day' },
] as const;