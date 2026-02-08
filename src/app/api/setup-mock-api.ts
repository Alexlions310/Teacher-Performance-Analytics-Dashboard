import type { InternalAxiosRequestConfig } from 'axios'
import { apiClient } from '@/shared/api/axios'
import { MOCK_TEACHERS, getMockTeacherStats } from './mock-teachers'

export function setupMockApi() {
  const defaultAdapter = apiClient.defaults.adapter
  const defaultAdapterFn =
    typeof defaultAdapter === 'function'
      ? defaultAdapter
      : Array.isArray(defaultAdapter) && typeof defaultAdapter[0] === 'function'
        ? defaultAdapter[0]
        : null

  apiClient.defaults.adapter = (config: InternalAxiosRequestConfig) => {
    const url = config.url ?? ''
    if (url === '/teachers' && config.method === 'get') {
      return Promise.resolve({
        data: MOCK_TEACHERS,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      })
    }
    if (url === '/teachers/stats' && config.method === 'get') {
      return Promise.resolve({
        data: getMockTeacherStats(),
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      })
    }
    if (url?.startsWith('/teachers/') && config.method === 'patch') {
      const id = url.replace('/teachers/', '').replace(/\/$/, '')
      const updated = { ...MOCK_TEACHERS.find((t) => t.id === id), ...(config.data as object) }
      return Promise.resolve({
        data: updated,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      })
    }
    if (defaultAdapterFn) return defaultAdapterFn(config)
    return Promise.reject(new Error('No adapter'))
  }
}
