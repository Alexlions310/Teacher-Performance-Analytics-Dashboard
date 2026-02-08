import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from '@tanstack/react-query'
import type { AxiosRequestConfig } from 'axios'
import { apiClient } from '@/shared/api/axios'

type UseFetchParams<TData> = {
  queryKey: QueryKey
  endpoint: string
  config?: AxiosRequestConfig
} & Omit<UseQueryOptions<TData, Error>, 'queryKey' | 'queryFn'>

export function useFetch<TData>({
  queryKey,
  endpoint,
  config,
  ...queryOptions
}: UseFetchParams<TData>) {
  return useQuery<TData, Error>({
    queryKey,
    queryFn: async () => {
      const { data } = await apiClient.get<TData>(endpoint, config)
      return data
    },
    ...queryOptions,
  })
}

type UseMutateParams<TData, TVariables> = {
  mutationKey?: QueryKey
  method?: 'post' | 'put' | 'patch' | 'delete'
  endpoint: string | ((variables: TVariables) => string)
} & Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>

export function useMutate<TData, TVariables = void>({
  mutationKey,
  method = 'post',
  endpoint,
  ...mutationOptions
}: UseMutateParams<TData, TVariables>) {
  return useMutation<TData, Error, TVariables>({
    mutationKey,
    mutationFn: async (variables) => {
      const url = typeof endpoint === 'function' ? endpoint(variables) : endpoint
      const { data } = await apiClient.request<TData>({
        method,
        url,
        data: variables as object,
      })
      return data
    },
    ...mutationOptions,
  })
}

export { useQueryClient }
