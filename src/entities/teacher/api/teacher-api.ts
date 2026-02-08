import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFetch } from '@/shared/hooks/useFetch'
import { apiClient } from '@/shared/api/axios'
import type { Teacher, TeacherStats } from '../model/types'

const TEACHERS_KEY = ['teachers'] as const
const TEACHER_STATS_KEY = ['teachers', 'stats'] as const

export function useTeachersQuery() {
  return useFetch<Teacher[]>({
    queryKey: TEACHERS_KEY,
    endpoint: '/teachers',
  })
}

export function useTeacherStatsQuery() {
  return useFetch<TeacherStats>({
    queryKey: TEACHER_STATS_KEY,
    endpoint: '/teachers/stats',
  })
}

type UpdateTeacherVariables = { id: string; payload: Partial<Teacher> }

export function useUpdateTeacherMutation() {
  const queryClient = useQueryClient()
  return useMutation<Teacher, Error, UpdateTeacherVariables, { previous: Teacher[] | undefined }>({
    mutationKey: TEACHERS_KEY,
    mutationFn: async ({ id, payload }) => {
      const { data } = await apiClient.patch<Teacher>(`/teachers/${id}`, payload)
      return data
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: TEACHERS_KEY })
      const previous = queryClient.getQueryData<Teacher[]>(TEACHERS_KEY)
      queryClient.setQueryData<Teacher[]>(TEACHERS_KEY, (old) => {
        if (!old) return old
        return old.map((t) =>
          t.id === variables.id ? { ...t, ...variables.payload } : t
        )
      })
      return { previous }
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(TEACHERS_KEY, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TEACHERS_KEY })
    },
  })
}
