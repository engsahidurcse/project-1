# SchoolERP — React Frontend

Production-ready React + Vite + TypeScript frontend for SchoolERP microservices.

## Tech Stack

| Layer          | Library                          |
|----------------|----------------------------------|
| Framework      | React 18 + Vite 5                |
| Language       | TypeScript 5 (strict)            |
| Routing        | React Router DOM v6              |
| State          | Redux Toolkit + React Redux      |
| UI             | Material UI (MUI) v6             |
| HTTP           | Axios (with auto-refresh)        |
| Forms          | React Hook Form + Zod            |
| Charts         | Recharts                         |
| Date Handling  | Day.js                           |

## Enterprise Folder Structure

```
src/
├── app/
│   ├── providers/          # AppProviders (Redux + MUI Theme)
│   ├── router/             # AppRouter with lazy-loaded routes
│   └── store/              # Root Redux store
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── components/             # Shared reusable components
│   ├── data-display/       # StatCard, PageHeader, …
│   ├── feedback/           # GlobalSnackbar, LoadingScreen, EmptyState
│   ├── forms/              # ConfirmDialog, …
│   ├── layout/             # MainLayout, AppSidebar, AppHeader
│   └── navigation/         # ProtectedRoute, GuestRoute
├── config/
│   ├── constants.ts        # Routes, pagination, drawer widths
│   ├── env.ts              # Type-safe VITE_ env vars
│   └── permissions.ts      # Role → Permission mapping
├── features/               # Vertical-slice feature modules
│   ├── auth/
│   │   ├── api/            # authApi.ts
│   │   ├── components/
│   │   ├── hooks/          # useAuth.ts
│   │   ├── pages/          # LoginPage.tsx
│   │   ├── store/          # authSlice.ts
│   │   ├── types/          # auth.types.ts
│   │   └── utils/
│   ├── dashboard/
│   │   └── pages/          # DashboardPage.tsx (stats + charts)
│   ├── students/
│   │   ├── api/            # studentApi.ts
│   │   ├── hooks/          # useStudents.ts
│   │   ├── pages/          # StudentListPage.tsx
│   │   ├── store/          # studentSlice.ts
│   │   └── types/          # student.types.ts
│   ├── exams/
│   │   ├── api/ store/ pages/ types/
│   ├── finance/
│   │   ├── api/ store/ pages/ types/
│   └── lookup/
│       ├── api/ store/ types/
├── hooks/                  # Global custom hooks
│   ├── useDebounce.ts
│   ├── usePageTitle.ts
│   └── useSnackbar.ts
├── lib/
│   ├── axios/              # Configured Axios instance (token + auto-refresh)
│   ├── mui/                # MUI theme builder (light + dark)
│   └── redux/              # Typed useAppDispatch / useAppSelector
├── pages/
│   └── errors/             # NotFoundPage, UnauthorizedPage
├── store/
│   └── slices/             # uiSlice (sidebar, theme, snackbar, pageTitle)
├── types/                  # Global TypeScript types
└── utils/
    ├── formatters.ts       # formatDate, formatCurrency, getInitials, …
    ├── helpers.ts          # extractApiError, buildQueryString, …
    └── validators.ts       # Zod schemas (login, student, exam, password)
```

## Quick Start

```bash
# 1. Clone / extract to D:\SchoolERP.Web
cd D:\SchoolERP.Web

# 2. Install dependencies
npm install

# 3. Configure environment
copy .env.example .env.local
# Edit .env.local with your API URLs

# 4. Start dev server
npm run dev
# → http://localhost:3000
```

## Available Scripts

| Script            | Description                       |
|-------------------|-----------------------------------|
| `npm run dev`     | Start Vite dev server (port 3000) |
| `npm run build`   | TypeScript check + production build |
| `npm run preview` | Preview production build          |
| `npm run lint`    | ESLint check                      |
| `npm run type-check` | TypeScript check only          |
| `npm run format`  | Prettier format                   |

## API Proxy (dev)

Requests to `/api/auth` → `http://localhost:5001`  
Requests to `/api/students` → `http://localhost:5002`  
Requests to `/api/exams` → `http://localhost:5003`  
Requests to `/api/finance` → `http://localhost:5004`  
Requests to `/api/lookup` → `http://localhost:5005`

## Features

- **Role-Based Access Control** — SuperAdmin / Admin / Teacher / Accountant / Student / Parent
- **Auto-Refresh Tokens** — Axios interceptor silently refreshes expired JWT
- **Dark / Light Theme** — Persisted in localStorage, toggled from header
- **Collapsible Sidebar** — Full ↔ icon-only, mobile drawer
- **Code Splitting** — All pages lazy-loaded with `React.lazy`
- **Form Validation** — Zod schemas + React Hook Form
- **Global Snackbar** — `useSnackbar()` hook from anywhere in the app
