import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setAxiosAuthConfig } from '@/shared/api/axios'
import { useAuthStore } from '@/features/auth'
import { mockRefresh } from '@/features/auth'
import { setupMockApi } from '@/app/api/setup-mock-api'
import { App } from '@/app/App'
import './index.css'

setupMockApi()

setAxiosAuthConfig({
  getToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  onRefresh: async (refreshToken) => {
    const res = await mockRefresh(refreshToken)
    useAuthStore.getState().setTokens(res.accessToken, refreshToken)
    return res.accessToken
  },
  onUnauthorized: () => {
    useAuthStore.getState().logout()
    window.location.href = '/login'
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
