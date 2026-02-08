import { useMemo, useState, useCallback } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Input } from '@/shared/ui/input'
import { Badge } from '@/shared/ui/badge'
import { Select, type SelectOption } from '@/shared/ui/select'
import { useTeachersQuery } from '@/entities/teacher'
import {
  usePerformanceFilterStore,
  filterTeachers,
  sortTeachers,
} from '@/features/performance-filter'
import type { TeacherStatus, TeacherSortField, SortOrder } from '@/entities/teacher'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const STATUS_OPTIONS: SelectOption<TeacherStatus>[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on_leave', label: 'On Leave' },
]

const STATUS_BADGE_VARIANT: Record<TeacherStatus, 'success' | 'destructive' | 'warning'> = {
  active: 'success',
  inactive: 'destructive',
  on_leave: 'warning',
}

function StatusBadge({ status }: { status: TeacherStatus }) {
  const label = status.replace('_', ' ')
  return <Badge variant={STATUS_BADGE_VARIANT[status]}>{label}</Badge>
}

type SortConfig = { field: TeacherSortField; order: SortOrder }

export function PerformanceTable() {
  const { data: teachers = [], isLoading, isError, error } = useTeachersQuery()
  const search = usePerformanceFilterStore((s) => s.search)
  const setSearch = usePerformanceFilterStore((s) => s.setSearch)
  const ratingMin = usePerformanceFilterStore((s) => s.ratingMin)
  const ratingMax = usePerformanceFilterStore((s) => s.ratingMax)
  const setRatingMin = usePerformanceFilterStore((s) => s.setRatingMin)
  const setRatingMax = usePerformanceFilterStore((s) => s.setRatingMax)
  const status = usePerformanceFilterStore((s) => s.status)
  const setStatus = usePerformanceFilterStore((s) => s.setStatus)

  const [sort, setSort] = useState<SortConfig>({ field: 'name', order: 'asc' })

  const filteredAndSorted = useMemo(() => {
    const filtered = filterTeachers(teachers, {
      search,
      ratingMin,
      ratingMax,
      status,
    })
    return sortTeachers(filtered, sort.field, sort.order)
  }, [teachers, search, ratingMin, ratingMax, status, sort.field, sort.order])

  const handleSort = useCallback((field: TeacherSortField) => {
    setSort((prev) => ({
      field,
      order:
        prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }))
  }, [])

  const SortIcon = useCallback(
    ({ field }: { field: TeacherSortField }) => {
      if (sort.field !== field) return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
      return sort.order === 'asc' ? (
        <ArrowUp className="ml-1 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-1 h-4 w-4" />
      )
    },
    [sort.field, sort.order]
  )

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Loading…
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-destructive">
        {error?.message ?? 'Failed to load teachers'}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search by name, email, subject…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Input
          type="number"
          min={0}
          max={5}
          step={0.1}
          placeholder="Min rating"
          value={ratingMin ?? ''}
          onChange={(e) =>
            setRatingMin(e.target.value === '' ? null : Number(e.target.value))
          }
          className="w-28"
        />
        <Input
          type="number"
          min={0}
          max={5}
          step={0.1}
          placeholder="Max rating"
          value={ratingMax ?? ''}
          onChange={(e) =>
            setRatingMax(e.target.value === '' ? null : Number(e.target.value))
          }
          className="w-28"
        />
        <Select<TeacherStatus>
          value={status}
          onValueChange={setStatus}
          options={STATUS_OPTIONS}
          placeholder="Status"
          className="w-36"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  type="button"
                  className={cn(
                    'flex items-center font-medium hover:text-foreground',
                    sort.field === 'name' && 'text-foreground'
                  )}
                  onClick={() => handleSort('name')}
                >
                  Name
                  <SortIcon field="name" />
                </button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>
                <button
                  type="button"
                  className={cn(
                    'flex items-center font-medium hover:text-foreground',
                    sort.field === 'rating' && 'text-foreground'
                  )}
                  onClick={() => handleSort('rating')}
                >
                  Rating
                  <SortIcon field="rating" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  type="button"
                  className={cn(
                    'flex items-center font-medium hover:text-foreground',
                    sort.field === 'status' && 'text-foreground'
                  )}
                  onClick={() => handleSort('status')}
                >
                  Status
                  <SortIcon field="status" />
                </button>
              </TableHead>
              <TableHead>Trainings</TableHead>
              <TableHead>
                <button
                  type="button"
                  className={cn(
                    'flex items-center font-medium hover:text-foreground',
                    sort.field === 'joinDate' && 'text-foreground'
                  )}
                  onClick={() => handleSort('joinDate')}
                >
                  Join Date
                  <SortIcon field="joinDate" />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSorted.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell className="text-muted-foreground">{teacher.email}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.rating.toFixed(1)}</TableCell>
                <TableCell>
                  <StatusBadge status={teacher.status} />
                </TableCell>
                <TableCell>
                  {teacher.completedTrainings} / {teacher.totalTrainings}
                </TableCell>
                <TableCell className="text-muted-foreground">{teacher.joinDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredAndSorted.length === 0 && (
          <div className="flex h-24 items-center justify-center text-muted-foreground">
            No teachers match the current filters.
          </div>
        )}
      </div>
    </div>
  )
}
