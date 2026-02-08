export type TeacherStatus = 'active' | 'inactive' | 'on_leave'

export type Teacher = {
  id: string
  name: string
  email: string
  subject: string
  rating: number
  status: TeacherStatus
  completedTrainings: number
  totalTrainings: number
  joinDate: string
}

export type TeacherStats = {
  totalTeachers: number
  activeTeachers: number
  averageRating: number
  completedTrainingsPercent: number
}

export type TeacherFilters = {
  search: string
  ratingMin: number | null
  ratingMax: number | null
  status: TeacherStatus | null
}

export type TeacherSortField = keyof Pick<Teacher, 'name' | 'rating' | 'status' | 'joinDate'>
export type SortOrder = 'asc' | 'desc'
