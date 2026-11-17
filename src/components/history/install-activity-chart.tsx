import { Line } from "@/components/charts/line"
import { LineChart } from "@/components/charts/line-chart"
import { chartCssVars } from "@/components/charts/chart-context"
import { Grid } from "@/components/charts/grid"
import { ChartTooltip } from "@/components/charts/tooltip"
import { XAxis } from "@/components/charts/x-axis"
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame"
import { installActivity } from "./history-data"

const applicationSeries = [
  {
    dataKey: "storefrontWeb",
    label: "Storefront Web",
    color: chartCssVars.linePrimary,
  },
  { dataKey: "iosApp", label: "iOS app", color: chartCssVars.lineSecondary },
  { dataKey: "adminConsole", label: "Admin console", color: "var(--chart-3)" },
  { dataKey: "billingApi", label: "Billing API", color: "var(--chart-4)" },
] as const

const numberFormatter = new Intl.NumberFormat("en-US")

export function InstallActivityChart() {
  return (
    <Frame className="min-w-0" spacing="default">
      <FrameHeader>
        <FrameTitle>Install activity</FrameTitle>
        <FrameDescription>
          Weekly flag installations across applications
        </FrameDescription>
      </FrameHeader>
      <FramePanel className="min-w-0">
        {installActivity.length > 0 ? (
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {applicationSeries.map((series) => (
                <span
                  className="flex items-center gap-1.5"
                  key={series.dataKey}
                >
                  <span
                    aria-hidden="true"
                    className="h-0.5 w-4"
                    style={{ backgroundColor: series.color }}
                  />
                  {series.label}
                </span>
              ))}
            </div>
            <LineChart
              aspectRatio="auto"
              className="h-56 min-w-0"
              data={installActivity}
              margin={{ top: 16, right: 20, bottom: 36, left: 20 }}
            >
              <Grid horizontal numTicksRows={4} />
              {applicationSeries.map((series) => (
                <Line
                  dataKey={series.dataKey}
                  key={series.dataKey}
                  stroke={series.color}
                />
              ))}
              <XAxis numTicks={6} />
              <ChartTooltip
                rows={(point) =>
                  applicationSeries.map((series) => ({
                    color: series.color,
                    label: series.label,
                    value: numberFormatter.format(
                      Number(point[series.dataKey])
                    ),
                  }))
                }
              />
            </LineChart>
          </div>
        ) : (
          <p
            className="py-12 text-center text-sm text-muted-foreground"
            role="status"
          >
            No installation activity is available yet.
          </p>
        )}
      </FramePanel>
    </Frame>
  )
}
