import { Line } from "@/components/charts/line"
import { LineChart } from "@/components/charts/line-chart"
import { chartCssVars } from "@/components/charts/chart-context"
import { Grid } from "@/components/charts/grid"
import { ChartTooltip } from "@/components/charts/tooltip"
import { XAxis } from "@/components/charts/x-axis"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type UsagePoint = {
  date: Date
  storefront: number
  ios: number
  admin: number
  usageTrend: number
}

type UsageSample = Omit<UsagePoint, "usageTrend">

const usageSamples: UsageSample[] = [
  {
    date: new Date("2026-10-20T12:00:00Z"),
    storefront: 12_300,
    ios: 6_200,
    admin: 2_100,
  },
  {
    date: new Date("2026-10-22T12:00:00Z"),
    storefront: 13_100,
    ios: 6_600,
    admin: 2_300,
  },
  {
    date: new Date("2026-10-24T12:00:00Z"),
    storefront: 12_800,
    ios: 6_800,
    admin: 2_400,
  },
  {
    date: new Date("2026-10-26T12:00:00Z"),
    storefront: 14_200,
    ios: 7_100,
    admin: 2_500,
  },
  {
    date: new Date("2026-10-28T12:00:00Z"),
    storefront: 14_800,
    ios: 7_500,
    admin: 2_600,
  },
  {
    date: new Date("2026-10-30T12:00:00Z"),
    storefront: 15_400,
    ios: 7_300,
    admin: 2_700,
  },
  {
    date: new Date("2026-11-01T12:00:00Z"),
    storefront: 15_100,
    ios: 8_000,
    admin: 2_900,
  },
  {
    date: new Date("2026-11-03T12:00:00Z"),
    storefront: 16_400,
    ios: 8_300,
    admin: 3_000,
  },
  {
    date: new Date("2026-11-05T12:00:00Z"),
    storefront: 17_000,
    ios: 8_600,
    admin: 3_100,
  },
  {
    date: new Date("2026-11-07T12:00:00Z"),
    storefront: 17_800,
    ios: 9_100,
    admin: 3_200,
  },
  {
    date: new Date("2026-11-10T12:00:00Z"),
    storefront: 18_200,
    ios: 9_400,
    admin: 3_300,
  },
  {
    date: new Date("2026-11-14T12:00:00Z"),
    storefront: 20_100,
    ios: 10_600,
    admin: 3_600,
  },
]

function addUsageTrend(samples: UsageSample[]): UsagePoint[] {
  const totals = samples.map(
    ({ storefront, ios, admin }) => storefront + ios + admin
  )
  const meanIndex = (samples.length - 1) / 2
  const meanTotal =
    totals.reduce((sum, total) => sum + total, 0) / totals.length
  const variance = totals.reduce(
    (sum, _, index) => sum + (index - meanIndex) ** 2,
    0
  )
  const covariance = totals.reduce(
    (sum, total, index) => sum + (index - meanIndex) * (total - meanTotal),
    0
  )
  const slope = variance === 0 ? 0 : covariance / variance

  return samples.map((sample, index) => ({
    ...sample,
    usageTrend: Math.round(meanTotal + slope * (index - meanIndex)),
  }))
}

const usageData = addUsageTrend(usageSamples)
const usageSeries = [
  {
    dataKey: "storefront",
    label: "Storefront web",
    color: chartCssVars.linePrimary,
  },
  { dataKey: "ios", label: "iOS app", color: chartCssVars.lineSecondary },
  { dataKey: "admin", label: "Admin console", color: "var(--chart-3)" },
] as const
const trendSeries = {
  dataKey: "usageTrend",
  label: "Overall trend",
  color: chartCssVars.foregroundMuted,
} as const

const numberFormatter = new Intl.NumberFormat("en-US")

export function FeatureUsageChart() {
  const latest = usageData.at(-1)
  const latestTotal = latest
    ? latest.storefront + latest.ios + latest.admin
    : null

  return (
    <Card>
      <CardHeader className="border-b border-border/70">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <CardTitle>Flag usage by app</CardTitle>
            <CardDescription>
              Daily evaluations across connected applications
            </CardDescription>
          </div>
          {latestTotal !== null ? (
            <div className="flex flex-col gap-0.5 text-right">
              <p className="font-heading text-2xl font-semibold tabular-nums">
                {numberFormatter.format(latestTotal)}
              </p>
              <p className="text-xs text-muted-foreground">
                evaluations on Nov 14
              </p>
            </div>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        {usageData.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {[...usageSeries, trendSeries].map((series) => (
                <span
                  className="flex items-center gap-1.5"
                  key={series.dataKey}
                >
                  <span
                    aria-hidden="true"
                    className={
                      series.dataKey === trendSeries.dataKey
                        ? "w-4 border-t-2 border-dashed"
                        : "h-0.5 w-4"
                    }
                    style={
                      series.dataKey === trendSeries.dataKey
                        ? { borderColor: series.color }
                        : { backgroundColor: series.color }
                    }
                  />
                  {series.label}
                </span>
              ))}
            </div>
            <LineChart
              aspectRatio="auto"
              className="h-64 min-w-0"
              data={usageData}
              margin={{ top: 16, right: 24, bottom: 40, left: 24 }}
            >
              <Grid horizontal numTicksRows={4} />
              {usageSeries.map((series) => (
                <Line
                  dataKey={series.dataKey}
                  key={series.dataKey}
                  stroke={series.color}
                />
              ))}
              <Line
                animate={false}
                dataKey={trendSeries.dataKey}
                dashArray="6,4"
                dashFromIndex={0}
                key={trendSeries.dataKey}
                showHighlight={false}
                stroke={trendSeries.color}
                strokeWidth={2}
              />
              <XAxis numTicks={6} />
              <ChartTooltip
                rows={(point) => [
                  ...usageSeries.map((series) => ({
                    color: series.color,
                    label: series.label,
                    value: numberFormatter.format(
                      Number(point[series.dataKey])
                    ),
                  })),
                  {
                    color: trendSeries.color,
                    label: trendSeries.label,
                    value: numberFormatter.format(
                      Number(point[trendSeries.dataKey])
                    ),
                  },
                ]}
              />
            </LineChart>
          </div>
        ) : (
          <p
            className="py-16 text-center text-sm text-muted-foreground"
            role="status"
          >
            No application usage is available for this period.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
