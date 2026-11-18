import type { ReactNode } from "react"
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  EyeIcon,
  InfoIcon,
  PauseCircleIcon,
  RefreshCwIcon,
} from "lucide-react"

import { Bar } from "@/components/charts/bar"
import { BarChart } from "@/components/charts/bar-chart"
import { BarXAxis } from "@/components/charts/bar-x-axis"
import { Grid } from "@/components/charts/grid"
import { LineSparkline } from "@/components/charts/sparkline"
import { ChartTooltip } from "@/components/charts/tooltip"
import { chartCssVars } from "@/components/charts/chart-context"
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Alert, AlertTitle, AlertDescription } from "../ui/alert"

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

type BreakdownRow = {
  label: string
  value: string
  detail: string
}

type MetricBreakdown = {
  title: string
  description: string
  rows: BreakdownRow[]
}

const trendDays = [
  "Nov 09",
  "Nov 10",
  "Nov 11",
  "Nov 12",
  "Nov 13",
  "Nov 14",
  "Nov 15",
  "Nov 16",
  "Nov 17",
]

const metricBreakdowns: Record<string, MetricBreakdown> = {
  "Active flags": {
    title: "Flags by environment",
    description: "24 flags across your workspace",
    rows: [
      { label: "Production", value: "14", detail: "Live" },
      { label: "Staging", value: "6", detail: "In review" },
      { label: "Development", value: "4", detail: "Internal" },
    ],
  },
  "Total evaluations": {
    title: "Evaluations by application",
    description: "Volume during the selected period",
    rows: [
      { label: "Storefront Web", value: "648K", detail: "54% of total" },
      { label: "iOS app", value: "360K", detail: "30% of total" },
      { label: "Admin console", value: "192K", detail: "16% of total" },
    ],
  },
  "Team members": {
    title: "Members by role",
    description: "18 people with workspace access",
    rows: [
      { label: "Engineering", value: "9", detail: "Full access" },
      { label: "Product", value: "5", detail: "Can edit flags" },
      { label: "QA and Platform", value: "4", detail: "View and test" },
    ],
  },
  "Avg. rollout time": {
    title: "Rollout time by environment",
    description: "Average time from draft to full rollout",
    rows: [
      { label: "Production", value: "2.4 days", detail: "Current average" },
      { label: "Staging", value: "1.8 days", detail: "0.6 days faster" },
      { label: "Development", value: "1.2 days", detail: "1.2 days faster" },
    ],
  },
}

const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
})

export function MetricCard({
  label,
  value,
  change,
  detail,
  icon,
  sparkline,
  positive,
}: MetricCardProps) {
  const trendData = sparkline.map((point, index) => ({
    date: trendDays[index] ?? `Day ${index + 1}`,
    value: point.value,
  }))
  const hasTrendData = trendData.length > 0
  const average = hasTrendData
    ? sparkline.reduce((sum, point) => sum + point.value, 0) / sparkline.length
    : 0
  const peak = sparkline.reduce(
    (currentPeak, point) => Math.max(currentPeak, point.value),
    0
  )
  const breakdown = metricBreakdowns[label] ?? {
    title: "Workspace breakdown",
    description: "Current metric coverage",
    rows: [
      { label: "Production", value, detail: "Current value" },
      { label: "Change", value: change, detail },
    ],
  }

  return (
    <Card size="sm" className="gap-0 py-0">
      <CardContent className="py-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
            <span className="[&>svg]:size-3.5">{icon}</span>
          </span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="font-heading text-2xl font-semibold whitespace-nowrap">
              {value}
            </span>
            <span
              className={`flex items-center text-[10px] font-medium whitespace-nowrap ${positive ? "text-success-foreground dark:text-success" : "text-destructive-foreground dark:text-destructive"}`}
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
            className="w-20 shrink-0"
            color={chartCssVars.linePrimary}
            data={sparkline}
            dataKey="value"
            endDot
            height={32}
            interactive={false}
          />
        </div>
        <p className="mt-1 text-[10px] text-muted-foreground">{detail}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 bg-muted px-1 py-2">
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                className="flex w-full min-w-0 cursor-pointer items-center justify-between text-muted-foreground outline-none hover:text-foreground"
              >
                View {label} <ArrowRightIcon className="size-3" />
              </Button>
            }
          ></SheetTrigger>
          <SheetContent presentation="floating">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <SheetHeader>
                <SheetTitle>{label}</SheetTitle>
                <SheetDescription>
                  {detail}. A workspace snapshot for the last nine days.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-6 pb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Button type="button" variant="outline">
                    <RefreshCwIcon aria-hidden="true" />
                    Sync Now
                  </Button>
                  <Button type="button" variant="outline">
                    <PauseCircleIcon aria-hidden="true" />
                    Pause
                  </Button>
                  <Button type="button" variant="outline">
                    <EyeIcon aria-hidden="true" />
                    Preview
                  </Button>
                </div>
                <Separator />
                <Alert role="status">
                  <AlertTitle className="flex items-center gap-2">
                    <InfoIcon aria-hidden="true" />
                    Sample insights
                  </AlertTitle>
                  <AlertDescription>
                    Illustrative workspace data; no live service is connected.
                  </AlertDescription>
                </Alert>

                <Frame className="min-w-0" spacing="sm">
                  <FrameHeader>
                    <FrameTitle>Trend summary</FrameTitle>
                    <FrameDescription>
                      Daily values for the selected period
                    </FrameDescription>
                  </FrameHeader>
                  <FramePanel className="grid min-w-0 grid-cols-3 gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Current</p>
                      <p className="truncate font-heading text-lg font-semibold tabular-nums">
                        {value}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Period avg.
                      </p>
                      <p className="truncate font-heading text-lg font-semibold tabular-nums">
                        {hasTrendData ? compactNumber.format(average) : "—"}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Peak</p>
                      <p className="truncate font-heading text-lg font-semibold tabular-nums">
                        {hasTrendData ? compactNumber.format(peak) : "—"}
                      </p>
                    </div>
                  </FramePanel>
                </Frame>

                <Frame className="min-w-0" spacing="sm">
                  <FrameHeader>
                    <FrameTitle>{label} trend</FrameTitle>
                    <FrameDescription>
                      Daily values from Nov 09 to Nov 17
                    </FrameDescription>
                  </FrameHeader>
                  <FramePanel className="min-w-0">
                    {hasTrendData ? (
                      <BarChart
                        aspectRatio="auto"
                        className="h-52 min-w-0"
                        data={trendData}
                        margin={{ top: 12, right: 8, bottom: 36, left: 8 }}
                        xDataKey="date"
                      >
                        <Grid horizontal numTicksRows={4} />
                        <Bar
                          animate={false}
                          dataKey="value"
                          fill={chartCssVars.linePrimary}
                        />
                        <BarXAxis maxLabels={5} />
                        <ChartTooltip
                          rows={(point) => [
                            {
                              color: chartCssVars.linePrimary,
                              label,
                              value: compactNumber.format(Number(point.value)),
                            },
                          ]}
                          showDatePill={false}
                        />
                      </BarChart>
                    ) : (
                      <p
                        className="py-12 text-center text-sm text-muted-foreground"
                        role="status"
                      >
                        No metric history is available yet.
                      </p>
                    )}
                  </FramePanel>
                </Frame>

                <Frame className="min-w-0" spacing="sm">
                  <FrameHeader>
                    <FrameTitle>{breakdown.title}</FrameTitle>
                    <FrameDescription>{breakdown.description}</FrameDescription>
                  </FrameHeader>
                  <FramePanel>
                    <dl className="flex flex-col divide-y divide-border">
                      {breakdown.rows.map((row) => (
                        <div
                          className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                          key={row.label}
                        >
                          <div className="min-w-0">
                            <dt className="truncate text-sm font-medium">
                              {row.label}
                            </dt>
                            <dd className="text-xs text-muted-foreground">
                              {row.detail}
                            </dd>
                          </div>
                          <dd className="shrink-0 text-sm font-medium tabular-nums">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </FramePanel>
                </Frame>

                <Frame className="min-w-0" spacing="sm">
                  <FrameHeader>
                    <FrameTitle>Recent activity</FrameTitle>
                    <FrameDescription>
                      Latest points recorded for this metric
                    </FrameDescription>
                  </FrameHeader>
                  <FramePanel>
                    {hasTrendData ? (
                      <ol className="flex flex-col divide-y divide-border">
                        {trendData
                          .slice(-4)
                          .reverse()
                          .map((point) => (
                            <li
                              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                              key={point.date}
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-medium">
                                  Snapshot recorded
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {label} updated automatically
                                </p>
                              </div>
                              <div className="shrink-0 text-right">
                                <p className="text-sm font-medium tabular-nums">
                                  {compactNumber.format(point.value)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {point.date}
                                </p>
                              </div>
                            </li>
                          ))}
                      </ol>
                    ) : (
                      <p
                        className="py-6 text-center text-sm text-muted-foreground"
                        role="status"
                      >
                        No recent activity is available.
                      </p>
                    )}
                  </FramePanel>
                </Frame>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  )
}
