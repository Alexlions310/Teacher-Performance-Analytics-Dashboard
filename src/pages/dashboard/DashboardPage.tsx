import { StatCards } from '@/widgets/stat-cards/StatCards'
import { PerformanceTable } from '@/widgets/performance-table/PerformanceTable'
import { PerformanceFilterForm } from '@/features/performance-filter'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

export function DashboardPage() {
  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Teacher Performance</h1>
        <p className="text-muted-foreground">
          Overview and analytics for teaching staff.
        </p>
      </div>

      <StatCards />

      <Card>
        <CardHeader>
          <CardTitle>Performance filter</CardTitle>
          <CardDescription>
            Controlled filters with independent state. Use the table filters below for inline filtering, or this block for a dedicated filter panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceFilterForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Teachers</CardTitle>
          <CardDescription>
            Search, filter by rating and status, and sort by column.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceTable />
        </CardContent>
      </Card>
    </div>
  )
}
