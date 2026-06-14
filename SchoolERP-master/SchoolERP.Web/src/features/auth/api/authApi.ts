import { axiosInstance } from '@/lib/axios/axiosInstance'
import type { LoginRequest } from '../types/auth.types'

const BASE = '/api/auth'

export const authApi = {
  // Dispatches login handshake payload directly to the gateway portal
  login: (data: LoginRequest) =>
    axiosInstance.post(`${BASE}/login`, data),

  // Clears active sessions on the remote authentication core
  logout: () =>
    axiosInstance.post(`${BASE}/logout`),

  // Re-hydrates security claims on direct browser window refreshes
  getMe: () =>
    axiosInstance.get(`${BASE}/me`),
}

export default authApi