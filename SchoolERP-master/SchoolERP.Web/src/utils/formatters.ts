import dayjs from 'dayjs'
// 🎯 FIXED PATH: Changed from '../' to correctly locate the constants file from the utils folder
import { DATE_FORMATS } from '../config/constants'

// ── Format standard readable dates (e.g., 12 Jun 2026) ───────────────────────
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '—'
  return dayjs(date).format(DATE_FORMATS.DISPLAY)
}

// ── Format standard dates with exact time matrix ─────────────────────────────
export const formatDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return '—'
  return dayjs(date).format(DATE_FORMATS.DISPLAY_TIME)
}

// ── Format transactional currency amounts natively with BDT styling ──────────
export const formatCurrency = (amount: number, currency = 'BDT'): string =>
  new Intl.NumberFormat('en-BD', { style: 'currency', currency }).format(amount)

// ── Format large numbers with local numeric comma separations ────────────────
export const formatNumber = (value: number): string =>
  new Intl.NumberFormat('en-BD').format(value)

// ── Extract user profile initials for custom avatar fallbacks ────────────────
export const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

// ── Limit structural string lengths smoothly across grids ────────────────────
export const truncate = (str: string, length = 40): string =>
  str.length > length ? `${str.slice(0, length)}...` : str

// ── Generate distinct background palette vectors based on user name code keys 
export const generateAvatarColor = (name: string): string => {
  const colors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#009688',
    '#4CAF50',
    '#FF9800',
    '#795548'
  ]

  if (!name) return colors[0]

  let hash = 0

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}