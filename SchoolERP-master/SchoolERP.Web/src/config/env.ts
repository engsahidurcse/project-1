export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'SchoolERP',
  APP_VERSION: import.meta.env.VITE_APP_VERSION ?? '1.0.0',
  APP_ENV: import.meta.env.VITE_APP_ENV ?? 'development',
  API_GATEWAY_URL: import.meta.env.VITE_API_GATEWAY_URL ?? 'https://localhost:7501',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const
