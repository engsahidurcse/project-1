import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { APP_ROUTES } from '@/config/constants'
import { ProtectedRoute } from '@/components/navigation/ProtectedRoute'
import { GuestRoute }     from '@/components/navigation/GuestRoute'
import { LoadingScreen }  from '@/components/feedback/LoadingScreen'
import MainLayout         from '@/components/layout/MainLayout'

// ── Lazy-loaded pages (Keeping your full application matrices fully intact) ──
const LoginPage       = lazy(() => import('@/features/auth/pages/LoginPage'))
const DashboardPage   = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const StudentListPage = lazy(() => import('@/features/students/pages/StudentListPage'))
const ExamPage        = lazy(() => import('@/features/exams/pages/ExamPage'))
const FinancePage     = lazy(() => import('@/features/finance/pages/FinancePage'))
const NotFoundPage    = lazy(() => import('@/pages/errors/NotFoundPage'))
const UnauthorizedPage = lazy(() => import('@/pages/errors/UnauthorizedPage'))

const Fallback = () => <LoadingScreen message="Loading page…" />

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Fallback />}>
      <Routes>
        {/* Root redirect */}
        <Route path={APP_ROUTES.ROOT} element={<Navigate to={APP_ROUTES.DASHBOARD} replace />} />

        {/* Guest-only routes */}
        <Route
          path={APP_ROUTES.LOGIN}
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        {/* Protected routes under MainLayout (Enhanced Security Layer) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard Endpoint */}
          <Route path={APP_ROUTES.DASHBOARD} element={<DashboardPage />} />

          {/* Student Access Endpoint with explicit permissions */}
          <Route
            path={APP_ROUTES.STUDENTS}
            element={
              <ProtectedRoute permission="students:read">
                <StudentListPage />
              </ProtectedRoute>
            }
          />

          {/* Exam Access Endpoint with explicit permissions */}
          <Route
            path={APP_ROUTES.EXAMS}
            element={
              <ProtectedRoute permission="exams:read">
                <ExamPage />
              </ProtectedRoute>
            }
          />

          {/* Finance Access Endpoint with explicit permissions */}
          <Route
            path={APP_ROUTES.FINANCE}
            element={
              <ProtectedRoute permission="finance:read">
                <FinancePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* System Error Pages */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path={APP_ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)