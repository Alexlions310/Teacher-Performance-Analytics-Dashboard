import { create } from 'zustand'
import type { TeacherStatus } from '@/entities/teacher'

export type PerformanceFilterState = {
  search: string
  ratingMin: number | null
  ratingMax: number | null
  status: TeacherStatus | null
  setSearch: (value: string) => void
  setRatingMin: (value: number | null) => void
  setRatingMax: (value: number | null) => void
  setStatus: (value: TeacherStatus | null) => void
  reset: () => void
}

const initialState = {
  search: '',
  ratingMin: null as number | null,
  ratingMax: null as number | null,
  status: null as TeacherStatus | null,
}

export const usePerformanceFilterStore = create<PerformanceFilterState>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setRatingMin: (ratingMin) => set({ ratingMin }),
  setRatingMax: (ratingMax) => set({ ratingMax }),
  setStatus: (status) => set({ status }),
  reset: () => set(initialState),
}))
