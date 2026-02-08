import type { Teacher, TeacherFilters, TeacherSortField, SortOrder } from '@/entities/teacher'

export function filterTeachers(
  teachers: Teacher[],
  filters: TeacherFilters
): Teacher[] {
  return teachers.filter((t) => {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const match =
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q)
      if (!match) return false
    }
    if (filters.ratingMin != null && t.rating < filters.ratingMin) return false
    if (filters.ratingMax != null && t.rating > filters.ratingMax) return false
    if (filters.status != null && t.status !== filters.status) return false
    return true
  })
}

export function sortTeachers(
  teachers: Teacher[],
  field: TeacherSortField,
  order: SortOrder
): Teacher[] {
  return [...teachers].sort((a, b) => {
    const aVal = a[field]
    const bVal = b[field]
    const cmp =
      typeof aVal === 'string' && typeof bVal === 'string'
        ? aVal.localeCompare(bVal)
        : (aVal as number) - (bVal as number)
    return order === 'asc' ? cmp : -cmp
  })
}
