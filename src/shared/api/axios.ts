import axios, { type AxiosError } from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export type AxiosAuthConfig = {
  getToken: () => string | null
  getRefreshToken: () => string | null
  onRefresh: (refreshToken: string) => Promise<string | null>
  onUnauthorized: () => void
}

let authConfig: AxiosAuthConfig | null = null

export function setAxiosAuthConfig(config: AxiosAuthConfig) {
  authConfig = config
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    const token = authConfig?.getToken() ?? null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean }

    if (error.response?.status === 401 && authConfig && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = authConfig.getRefreshToken()
      if (refreshToken) {
        try {
          const newAccessToken = await authConfig.onRefresh(refreshToken)
          if (newAccessToken && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          }
          return apiClient(originalRequest)
        } catch {
          authConfig.onUnauthorized()
          return Promise.reject(error)
        }
      }
      authConfig.onUnauthorized()
    }

    return Promise.reject(error)
  }
)
