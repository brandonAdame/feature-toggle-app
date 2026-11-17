import { Card, CardContent } from "@/components/ui/card"
import { installEvents, previouslyInstalledFlags } from "./history-data"

const applications = new Set(
  previouslyInstalledFlags.map((flag) => flag.application)
).size
const currentlyInstalled = previouslyInstalledFlags.filter(
  (flag) => flag.state === "Installed"
).length
const successfulEvents = installEvents.filter(
  (event) => event.result === "Succeeded"
).length
const successRate = Math.round((successfulEvents / installEvents.length) * 100)

const summaryItems = [
  {
    label: "Previously installed",
    value: String(previouslyInstalledFlags.length),
    detail: "Flags across connected apps",
  },
  {
    label: "Installed now",
    value: String(currentlyInstalled),
    detail: `${previouslyInstalledFlags.length - currentlyInstalled} removed`,
  },
  {
    label: "Applications",
    value: String(applications),
    detail: "With recorded installs",
  },
  {
    label: "Event success rate",
    value: `${successRate}%`,
    detail: `${successfulEvents} of ${installEvents.length} recent events`,
  },
]

export function HistorySummary() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map((item) => (
        <Card key={item.label} size="sm">
          <CardContent>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="mt-1 font-heading text-2xl font-semibold tabular-nums">
              {item.value}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {item.detail}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
