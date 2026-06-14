import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../api/authApi'
import { extractApiError } from '@/utils/helpers'
import { getSessionCache, setSessionCache, removeSessionCache } from '../../../utils/storage'
import type { AuthState, AuthUser, LoginRequest } from '../types/auth.types'

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!getSessionCache(),
  isLoading: false,
  error: null,
}// Complete permission array generated from your defined types to bypass all active system routes
const permissionList = [
  'students:read',
  'students:write',
  'students:delete',
  'exams:read',
  'exams:write',
  'exams:delete',
  'finance:read',
  'finance:write',
  'finance:delete',
  'reports:read',
  'settings:read',
  'settings:write',
  'users:read',
  'users:write'
];
// ── Async Thunk: Execute Cookie-Based Gateway Handshake ───────────────────
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials)
      const apiPayload = res.data // Extracting the flat JSON payload directly
            apiPayload.permissions=permissionList;
      // Cache session tracking flags locally to persist layout frames tokenlessly
      const customLocalSession = {
        loginSyncedAt: new Date().toISOString(),
        userDisplay: apiPayload.fullName || credentials.userName,
        status: 'ACTIVE_GATEWAY_SESSION'
      }
      setSessionCache(customLocalSession)
      
      return apiPayload
    } catch (err) {
      return rejectWithValue(extractApiError(err))
    }
  }
)

// ── Async Thunk: Terminate Live Session Pipeline ──────────────────────────
export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  try { 
    await authApi.logout() 
  } catch { 
    /* Swallow proxy or dropout endpoint errors silently */ 
  }
  removeSessionCache()
})

// ── Async Thunk: Sync Identity Profiles on Window Reloads ─────────────────
export const fetchMeThunk = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getMe()
      return res.data
    } catch (err) {
      removeSessionCache()
      return rejectWithValue(extractApiError(err))
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => { state.error = null },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    // login flows
    builder
      .addCase(loginThunk.pending, (s) => { s.isLoading = true; s.error = null })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.isLoading = false
        s.isAuthenticated = true
        // Map the API fields directly into the state to eliminate structure errors
        s.user = a.payload
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.isLoading = false
        s.error = a.payload as string
      })

    // logout flows
    builder.addCase(logoutThunk.fulfilled, (s) => {
      s.user = null
      s.isAuthenticated = false
    })

    // fetchMe flows
    builder
      .addCase(fetchMeThunk.fulfilled, (s, a) => {
        s.isAuthenticated = true
        s.user = a.payload
      })
      .addCase(fetchMeThunk.rejected, (s) => {
        s.user = null
        s.isAuthenticated = false
      })
  },
})

export const { clearAuthError, setUser } = authSlice.actions
export default authSlice.reducer 