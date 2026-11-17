import * as React from "react"
import {
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import {
  FilterIcon,
  MoreHorizontalIcon,
  SearchIcon,
  Settings2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
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

import { initialFlags, type FeatureFlag } from "./dashboard-data"

const statuses = ["All statuses", "Live", "Draft", "Paused"] as const
type StatusFilter = (typeof statuses)[number]

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

export function FeatureFlagsTable() {
  const [flags] = React.useState(initialFlags)
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [statusFilter, setStatusFilter] =
    React.useState<StatusFilter>("All statuses")

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
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="More actions"
            >
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
    setStatusFilter((current) => {
      const currentIndex = statuses.indexOf(current)
      return statuses[(currentIndex + 1) % statuses.length]
    })
  }

  return (
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleStatusFilter}
            >
              <FilterIcon />
              {statusFilter}
            </Button>
            <Button
              type="button"
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
              type="button"
              variant="outline"
              size="icon-sm"
              disabled
              aria-label="Previous page"
            >
              <ChevronLeftIcon />
            </Button>
            <span className="px-1 tabular-nums">1</span>
            <Button
              type="button"
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
  )
}
