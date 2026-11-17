import type { ReactNode } from "react"
import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react"

import { LineSparkline } from "@/components/charts/sparkline"
import { chartCssVars } from "@/components/charts/chart-context"
import { Card, CardContent } from "@/components/ui/card"

type SparklinePoint = {
  value: number
}

type MetricCardProps = {
  label: string
  value: string
  change: string
  detail: string
  icon: ReactNode
  sparkline: SparklinePoint[]
  positive?: boolean
}

export function MetricCard({
  label,
  value,
  change,
  detail,
  icon,
  sparkline,
  positive,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
            <span className="[&>svg]:size-3.5">{icon}</span>
          </span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="font-heading text-2xl font-semibold">{value}</span>
            <span
              className={`flex items-center text-[10px] font-medium ${positive ? "text-emerald-600" : "text-rose-600"}`}
            >
              {positive ? (
                <ArrowUpRightIcon className="size-3" />
              ) : (
                <ArrowDownRightIcon className="size-3" />
              )}
              {change}
            </span>
          </div>
          <LineSparkline
            aria-label={`${label} trend`}
            className="w-24 shrink-0"
            color={chartCssVars.linePrimary}
            data={sparkline}
            dataKey="value"
            endDot
            height={40}
            interactive={false}
          />
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  )
}
