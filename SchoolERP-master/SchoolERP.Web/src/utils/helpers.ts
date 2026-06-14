import { AxiosError } from 'axios'

export const extractApiError = (err: unknown): string => {
  if (err instanceof AxiosError) {
    return (
      err.response?.data?.message ??
      err.response?.data?.title ??
      err.message ??
      'An unexpected error occurred'
    )
  }
  if (err instanceof Error) return err.message
  return 'An unexpected error occurred'
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const buildQueryString = (params: Record<string, unknown>): string => {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')
  return qs ? `?${qs}` : ''
}

export const classNames = (...args: (string | undefined | null | false)[]): string =>
  args.filter(Boolean).join(' ')

export const generateAvatarColor = (name: string): string => {
  const colors = ['#1A6FE8', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4']
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}
