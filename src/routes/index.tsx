import { createFileRoute } from "@tanstack/react-router"
import {
  ActivityIcon,
  CircleHelpIcon,
  FlagIcon,
  SlidersHorizontalIcon,
  UsersIcon,
} from "lucide-react"

import { ActivityChart } from "@/components/dashboard/activity-chart"
import { FeatureUsageChart } from "@/components/dashboard/feature-usage-chart"
import { FeatureFlagsTable } from "@/components/dashboard/feature-flags-table"
import { MetricCard } from "@/components/dashboard/metric-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { CreateFlag } from "@/components/create-flag-sheet"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({ component: Dashboard })

const sparklineData = (...values: number[]) =>
  values.map((value) => ({ value }))

const metrics = [
  {
    label: "Active flags",
    value: "24",
    change: "+12.5%",
    detail: "vs. last month",
    icon: <FlagIcon />,
    sparkline: sparklineData(18, 19, 20, 19, 21, 22, 21, 23, 24),
    positive: true,
  },
  {
    label: "Total evaluations",
    value: "1.2M",
    change: "+8.2%",
    detail: "vs. last month",
    icon: <ActivityIcon />,
    sparkline: sparklineData(
      760_000,
      790_000,
      820_000,
      900_000,
      925_000,
      970_000,
      1_040_000,
      1_090_000,
      1_200_000
    ),
    positive: true,
  },
  {
    label: "Team members",
    value: "18",
    change: "+2",
    detail: "this month",
    icon: <UsersIcon />,
    sparkline: sparklineData(12, 13, 14, 14, 15, 16, 16, 17, 18),
    positive: true,
  },
  {
    label: "Avg. rollout time",
    value: "2.4 days",
    change: "-18.4%",
    detail: "vs. last month",
    icon: <SlidersHorizontalIcon />,
    sparkline: sparklineData(4.1, 3.8, 3.6, 3.5, 3.2, 3.1, 2.9, 2.6, 2.4),
    positive: true,
  },
]

function Dashboard() {
  return (
    <div className="min-h-[calc(100svh-57px)]">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-foreground">Overview</span>
          </div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Good morning, Alex <span className="text-amber-500">✦</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening with your feature flags today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm">
            <CircleHelpIcon />
            Help center
          </Button>
          <CreateFlag />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
        <ActivityChart />
        <RecentActivity />
      </div>

      <div className="mt-5 min-w-0">
        <FeatureUsageChart />
      </div>

      <FeatureFlagsTable />
    </div>
  )
}
