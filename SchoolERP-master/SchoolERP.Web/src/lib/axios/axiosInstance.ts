import axios from 'axios'
import { removeSessionCache } from '@/utils/storage' 

export const axiosInstance = axios.create({
  // 🎯 FIXED: Aligned perfectly with your env variable name (VITE_API_GATEWAY_URL) and fallback protocol (https)
  baseURL: import.meta.env.VITE_API_GATEWAY_URL || 'https://localhost:7501',
  
  // Secure HTTP-Only cookies are automatically passed with every request
  withCredentials: true, 
})

// ── Response Interceptor: Purely transparent error handling ────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Catch gateway handshake failures (401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Clean up using central manager utility without clearing fields or reloading live page
      removeSessionCache()
    }
    return Promise.reject(error)
  }
)