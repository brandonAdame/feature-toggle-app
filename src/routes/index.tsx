import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import {
  ActivityIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleHelpIcon,
  FilterIcon,
  FlagIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  Settings2Icon,
  SlidersHorizontalIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreateFlag } from "@/components/create-flag-sheet"

export const Route = createFileRoute("/")({ component: App })

type FeatureFlag = {
  name: string
  key: string
  description: string
  status: "Live" | "Draft" | "Paused"
  environment: string
  rollout: number
  updated: string
  owner: string
  color: string
}

const initialFlags: FeatureFlag[] = [
  {
    name: "New navigation",
    key: "new-navigation",
    description: "A simplified navigation experience for the dashboard.",
    status: "Live",
    environment: "Production",
    rollout: 100,
    updated: "2 hours ago",
    owner: "AM",
    color: "bg-sky-100 text-sky-700",
  },
  {
    name: "Smart recommendations",
    key: "smart-recommendations",
    description: "Personalized recommendations based on recent activity.",
    status: "Live",
    environment: "Production",
    rollout: 64,
    updated: "Yesterday",
    owner: "JD",
    color: "bg-violet-100 text-violet-700",
  },
  {
    name: "Billing redesign",
    key: "billing-redesign",
    description: "Updated billing flows for self-serve customers.",
    status: "Draft",
    environment: "Staging",
    rollout: 0,
    updated: "3 days ago",
    owner: "SK",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Faster search",
    key: "faster-search",
    description: "A quicker search index with improved relevance.",
    status: "Paused",
    environment: "Production",
    rollout: 18,
    updated: "1 week ago",
    owner: "RL",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Team insights",
    key: "team-insights",
    description: "Weekly summaries that help teams spot trends.",
    status: "Live",
    environment: "Production",
    rollout: 82,
    updated: "1 week ago",
    owner: "AM",
    color: "bg-emerald-100 text-emerald-700",
  },
]

function StatusPill({ status }: { status: FeatureFlag["status"] }) {
  const styles = {
    Live: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Draft: "bg-amber-50 text-amber-700 ring-amber-200",
    Paused: "bg-slate-100 text-slate-600 ring-slate-200",
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${styles[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

function App() {
  const [flags] = React.useState(initialFlags)
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("All statuses")

  const filteredFlags = React.useMemo(
    () =>
      statusFilter === "All statuses"
        ? flags
        : flags.filter((flag) => flag.status === statusFilter),
    [flags, statusFilter]
  )

  const features = React.useMemo(() => tableFeatures({}), [])
  const columnHelper = React.useMemo(
    () => createColumnHelper<typeof features, FeatureFlag>(),
    [features]
  )
  const columns = React.useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor("name", {
          header: "Feature flag",
          cell: ({ row }) => (
            <div className="flex items-center gap-3">
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${row.original.color}`}
              >
                {row.original.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground">
                  {row.original.name}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {row.original.key}
                </p>
              </div>
            </div>
          ),
        }),
        columnHelper.accessor("status", {
          header: "Status",
          cell: ({ getValue }) => <StatusPill status={getValue()} />,
        }),
        columnHelper.accessor("environment", {
          header: "Environment",
          cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue()}</span>
          ),
        }),
        columnHelper.accessor("rollout", {
          header: "Rollout",
          cell: ({ getValue }) => (
            <div className="flex w-28 items-center gap-2">
              <Progress value={getValue()} className="w-16" />
              <span className="text-muted-foreground tabular-nums">
                {getValue()}%
              </span>
            </div>
          ),
        }),
        columnHelper.accessor("updated", {
          header: "Last updated",
          cell: ({ getValue }) => (
            <span className="text-muted-foreground">{getValue()}</span>
          ),
        }),
        columnHelper.display({
          id: "actions",
          cell: () => (
            <Button variant="ghost" size="icon-sm" aria-label="More actions">
              <MoreHorizontalIcon />
            </Button>
          ),
        }),
      ]),
    [columnHelper]
  )

  const table = useTable({
    features,
    data: filteredFlags,
    columns,
  })

  const visibleRows = table
    .getRowModel()
    .rows.filter((row) =>
      `${row.original.name} ${row.original.key}`
        .toLowerCase()
        .includes(globalFilter.toLowerCase())
    )

  function toggleStatusFilter() {
    const statuses = ["All statuses", "Live", "Draft", "Paused"]
    const nextIndex = (statuses.indexOf(statusFilter) + 1) % statuses.length
    setStatusFilter(statuses[nextIndex])
  }

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
          <Button variant="outline" size="sm">
            <CircleHelpIcon />
            Help center
          </Button>
          <CreateFlag />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Active flags"
          value="24"
          change="+12.5%"
          detail="vs. last month"
          icon={<FlagIcon />}
          positive
        />
        <MetricCard
          label="Total evaluations"
          value="1.2M"
          change="+8.2%"
          detail="vs. last month"
          icon={<ActivityIcon />}
          positive
        />
        <MetricCard
          label="Team members"
          value="18"
          change="+2"
          detail="this month"
          icon={<UsersIcon />}
          positive
        />
        <MetricCard
          label="Avg. rollout time"
          value="2.4 days"
          change="-18.4%"
          detail="vs. last month"
          icon={<SlidersHorizontalIcon />}
          positive
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
        <Card>
          <CardHeader className="border-b border-border/70">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>Flag activity</CardTitle>
                <CardDescription className="mt-1">
                  Evaluation volume across your workspace
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Last 30 days
                <ChevronDownIcon />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-heading text-3xl font-semibold">842,492</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                  <ArrowUpRightIcon className="size-3.5" />
                  14.8% from previous period
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary" />{" "}
                  Evaluations
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-sky-200" /> Unique
                  users
                </span>
              </div>
            </div>
            <div className="relative mt-6 h-36">
              <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-muted-foreground/70">
                {["40k", "30k", "20k", "10k", "0"].map((label) => (
                  <div className="flex items-center gap-3" key={label}>
                    <span className="w-6 text-right">{label}</span>
                    <span className="h-px flex-1 border-t border-dashed border-border" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-x-9 inset-y-0 flex items-end justify-between gap-2">
                {[48, 61, 43, 74, 58, 68, 51, 82, 64, 77, 70, 92].map(
                  (height, index) => (
                    <div
                      className="group relative flex h-full flex-1 items-end"
                      key={index}
                    >
                      <div
                        className="w-full rounded-t-sm bg-primary/80 transition-all group-hover:bg-primary"
                        style={{ height: `${height}%` }}
                      />
                      <div
                        className="absolute bottom-0 w-full rounded-t-sm bg-sky-100/70"
                        style={{ height: `${height * 0.62}%` }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="mt-2 flex justify-between pl-9 text-[10px] text-muted-foreground">
              {["Oct 15", "Oct 20", "Oct 25", "Oct 30", "Nov 5", "Nov 10"].map(
                (label) => (
                  <span key={label}>{label}</span>
                )
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-border/70">
            <CardTitle>Recent activity</CardTitle>
            <CardDescription className="mt-1">
              Updates from your workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-5">
            {[
              ["AM", "Alex Morgan", "enabled", "New navigation", "2h ago"],
              [
                "JD",
                "Jamie Davis",
                "updated",
                "Smart recommendations",
                "5h ago",
              ],
              ["SK", "Sam Kim", "created", "Billing redesign", "1d ago"],
              ["RL", "Riley Lee", "paused", "Faster search", "1d ago"],
            ].map(([initials, person, action, flag, time]) => (
              <div className="flex gap-3" key={`${person}-${flag}`}>
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">
                  {initials}
                </div>
                <p className="min-w-0 flex-1 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{person}</span>{" "}
                  {action}{" "}
                  <span className="font-medium text-foreground">{flag}</span>
                </p>
                <span className="shrink-0 text-[10px] text-muted-foreground">
                  {time}
                </span>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View all activity
              <ChevronRightIcon />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader className="border-b border-border/70">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle>Feature flags</CardTitle>
              <CardDescription className="mt-1">
                Manage and monitor your feature releases
              </CardDescription>
            </div>
            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <div className="relative min-w-[220px] flex-1 sm:flex-none">
                <SearchIcon className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
                <Input
                  value={globalFilter}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  placeholder="Search flags..."
                  className="h-9 pl-8 text-xs sm:w-52"
                />
              </div>
              <Button variant="outline" size="sm" onClick={toggleStatusFilter}>
                <FilterIcon />
                {statusFilter}
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Table settings"
              >
                <Settings2Icon />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-5 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase"
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id} className="px-5 py-3.5">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t border-border/70 px-5 py-3 text-xs text-muted-foreground">
            <span>
              Showing {visibleRows.length} of {flags.length} flags
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                disabled
                aria-label="Previous page"
              >
                <ChevronLeftIcon />
              </Button>
              <span className="px-1 tabular-nums">1</span>
              <Button
                variant="outline"
                size="icon-sm"
                disabled
                aria-label="Next page"
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({
  label,
  value,
  change,
  detail,
  icon,
  positive,
}: {
  label: string
  value: string
  change: string
  detail: string
  icon: React.ReactNode
  positive?: boolean
}) {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
            <span className="[&>svg]:size-3.5">{icon}</span>
          </span>
        </div>
        <div className="flex items-baseline gap-2">
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
        <p className="mt-1 text-[10px] text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  )
}
