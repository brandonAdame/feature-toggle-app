import { Bar } from "@/components/charts/bar"
import { BarChart } from "@/components/charts/bar-chart"
import { BarXAxis } from "@/components/charts/bar-x-axis"
import { chartCssVars } from "@/components/charts/chart-context"
import { Grid } from "@/components/charts/grid"
import { ChartTooltip } from "@/components/charts/tooltip"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"

import { activityData } from "./dashboard-data"

const activitySeries = [
  {
    dataKey: "evaluations",
    label: "Evaluations",
    color: chartCssVars.linePrimary,
  },
  {
    dataKey: "uniqueUsers",
    label: "Unique users",
    color: chartCssVars.lineSecondary,
  },
] as const

export function ActivityChart() {
  return (
    <Card>
      <CardHeader className="border-b border-border/70">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Flag activity</CardTitle>
            <CardDescription className="mt-1">
              Evaluation volume across your workspace
            </CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm">
            Last 30 days
            <ChevronDownIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-heading text-3xl font-semibold">842,492</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
              14.8% from previous period
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {activitySeries.map((series) => (
              <span className="flex items-center gap-1.5" key={series.dataKey}>
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ backgroundColor: series.color }}
                />
                {series.label}
              </span>
            ))}
          </div>
        </div>
        {activityData.length > 0 ? (
          <div className="mt-4">
            <BarChart
              aspectRatio="auto"
              className="h-48"
              data={activityData}
              margin={{ top: 12, right: 12, bottom: 36, left: 12 }}
              xDataKey="date"
            >
              <Grid horizontal numTicksRows={4} />
              {activitySeries.map((series) => (
                <Bar
                  dataKey={series.dataKey}
                  fill={series.color}
                  key={series.dataKey}
                />
              ))}
              <BarXAxis maxLabels={6} />
              <ChartTooltip
                rows={(point) =>
                  activitySeries.map((series) => ({
                    color: series.color,
                    label: series.label,
                    value: Number(point[series.dataKey]).toLocaleString(),
                  }))
                }
                showDatePill={false}
              />
            </BarChart>
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No flag activity is available for this period.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
