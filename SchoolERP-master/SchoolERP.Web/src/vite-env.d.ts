/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENV: string
  readonly VITE_API_GATEWAY_URL: string
  readonly VITE_AUTH_SERVICE_URL: string
  readonly VITE_STUDENT_SERVICE_URL: string
  readonly VITE_EXAM_SERVICE_URL: string
  readonly VITE_FINANCE_SERVICE_URL: string
  readonly VITE_LOOKUP_SERVICE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
