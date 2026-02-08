import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Select, type SelectOption } from '@/shared/ui/select'
import { usePerformanceFilterStore } from '../model/filter-state'
import type { TeacherStatus } from '@/entities/teacher'

const STATUS_OPTIONS: SelectOption<TeacherStatus>[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on_leave', label: 'On Leave' },
]

export function PerformanceFilterForm() {
  const search = usePerformanceFilterStore((s) => s.search)
  const setSearch = usePerformanceFilterStore((s) => s.setSearch)
  const ratingMin = usePerformanceFilterStore((s) => s.ratingMin)
  const ratingMax = usePerformanceFilterStore((s) => s.ratingMax)
  const setRatingMin = usePerformanceFilterStore((s) => s.setRatingMin)
  const setRatingMax = usePerformanceFilterStore((s) => s.setRatingMax)
  const status = usePerformanceFilterStore((s) => s.status)
  const setStatus = usePerformanceFilterStore((s) => s.setStatus)
  const reset = usePerformanceFilterStore((s) => s.reset)

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border bg-card p-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Search</label>
        <Input
          placeholder="Name, email, subject…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Rating (min)</label>
        <Input
          type="number"
          min={0}
          max={5}
          step={0.1}
          placeholder="0"
          value={ratingMin ?? ''}
          onChange={(e) =>
            setRatingMin(e.target.value === '' ? null : Number(e.target.value))
          }
          className="w-24"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Rating (max)</label>
        <Input
          type="number"
          min={0}
          max={5}
          step={0.1}
          placeholder="5"
          value={ratingMax ?? ''}
          onChange={(e) =>
            setRatingMax(e.target.value === '' ? null : Number(e.target.value))
          }
          className="w-24"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Status</label>
        <Select<TeacherStatus>
          value={status}
          onValueChange={setStatus}
          options={STATUS_OPTIONS}
          placeholder="All"
          className="w-36"
        />
      </div>
      <Button variant="outline" size="sm" onClick={reset}>
        Reset filters
      </Button>
    </div>
  )
}
