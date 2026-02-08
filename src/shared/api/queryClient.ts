import { QueryClient } from '@tanstack/react-query'

const STALE_TIME = 5 * 60 * 1000
const CACHE_TIME = 10 * 60 * 1000

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: CACHE_TIME,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
})
