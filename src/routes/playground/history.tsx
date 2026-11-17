import { createFileRoute } from "@tanstack/react-router"

import { InstallActivityChart } from "@/components/history/install-activity-chart"
import { InstallHistoryTable } from "@/components/history/install-history-table"
import { PreviouslyInstalledFlags } from "@/components/history/previously-installed-flags"
import { HistorySummary } from "@/components/history/history-summary"

export const Route = createFileRoute("/playground/history")({
  component: InstallationHistoryPage,
})

function InstallationHistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Installation history
          </h1>
          <p className="text-sm text-muted-foreground">
            Review past flag installs across connected applications.
          </p>
        </div>
      </header>
      <HistorySummary />
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,1fr)]">
        <InstallActivityChart />
        <PreviouslyInstalledFlags />
      </div>
      <InstallHistoryTable />
    </div>
  )
}
