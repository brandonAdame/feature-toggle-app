import { useMemo, useState } from "react"
import {
  createColumnHelper,
  useTable,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table"
import type { DataGridFeatures } from "@/components/reui/data-grid/data-grid"
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
} from "@/components/reui/data-grid/data-grid"
import { DataGridColumnHeader } from "@/components/reui/data-grid/data-grid-column-header"
import { DataGridPagination } from "@/components/reui/data-grid/data-grid-pagination"
import { DataGridScrollArea } from "@/components/reui/data-grid/data-grid-scroll-area"
import { DataGridTable } from "@/components/reui/data-grid/data-grid-table"
import { Badge } from "@/components/reui/badge"
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame"
import { installEvents, type InstallEvent } from "./history-data"

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
})

const columnHelper = createColumnHelper<DataGridFeatures, InstallEvent>()

function getResultVariant(result: InstallEvent["result"]) {
  return result === "Succeeded" ? "success-light" : "destructive-light"
}

function getActionVariant(action: InstallEvent["action"]) {
  if (action === "Installed") {
    return "success-light"
  }
  if (action === "Updated") {
    return "info-light"
  }
  if (action === "Removed") {
    return "warning-light"
  }
  return "outline"
}

export function InstallHistoryTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "occurredAt", desc: true },
  ])
  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor("occurredAt", {
          header: ({ column }) => (
            <DataGridColumnHeader column={column} title="Date" />
          ),
          cell: ({ getValue }) => {
            const date = getValue()
            return (
              <time className="whitespace-nowrap" dateTime={date.toISOString()}>
                {dateTimeFormatter.format(date)}
              </time>
            )
          },
          size: 180,
          sortFn: "datetime",
        }),
        columnHelper.accessor("flagName", {
          header: ({ column }) => (
            <DataGridColumnHeader column={column} title="Feature flag" />
          ),
          cell: ({ row }) => (
            <div className="min-w-0">
              <p className="truncate font-medium">{row.original.flagName}</p>
              <p className="truncate font-mono text-xs text-muted-foreground">
                {row.original.flagKey}
              </p>
            </div>
          ),
          size: 210,
        }),
        columnHelper.accessor("application", {
          header: ({ column }) => (
            <DataGridColumnHeader column={column} title="Application" />
          ),
          size: 160,
        }),
        columnHelper.accessor("environment", {
          header: ({ column }) => (
            <DataGridColumnHeader column={column} title="Environment" />
          ),
          cell: ({ getValue }) => <Badge variant="outline">{getValue()}</Badge>,
          size: 140,
        }),
        columnHelper.accessor("action", {
          header: ({ column }) => (
            <DataGridColumnHeader column={column} title="Action" />
          ),
          cell: ({ getValue }) => (
            <Badge variant={getActionVariant(getValue())}>{getValue()}</Badge>
          ),
          size: 140,
        }),
        columnHelper.accessor("result", {
          header: ({ column }) => (
            <DataGridColumnHeader column={column} title="Result" />
          ),
          cell: ({ getValue }) => (
            <Badge variant={getResultVariant(getValue())}>{getValue()}</Badge>
          ),
          size: 130,
        }),
        columnHelper.accessor("actor", {
          header: ({ column }) => (
            <DataGridColumnHeader column={column} title="Actor" />
          ),
          size: 150,
        }),
      ]),
    []
  )
  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: installEvents,
    getRowId: (row) => row.id,
    pageCount: Math.ceil(installEvents.length / pagination.pageSize),
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
  })

  return (
    <Frame className="min-w-0" spacing="default">
      <FrameHeader>
        <FrameTitle>Install history</FrameTitle>
        <FrameDescription>
          Recent installs, updates, removals, and rollbacks
        </FrameDescription>
      </FrameHeader>
      <FramePanel className="min-w-0 p-0">
        <DataGrid
          emptyMessage="No installation events have been recorded yet."
          recordCount={installEvents.length}
          table={table}
          tableClassNames={{ base: "min-w-[980px]" }}
          tableLayout={{ dense: true, headerSticky: true, rowBorder: true }}
        >
          <div className="flex min-w-0 flex-col gap-3 p-4">
            <DataGridContainer>
              <DataGridScrollArea orientation="horizontal">
                <DataGridTable />
              </DataGridScrollArea>
            </DataGridContainer>
            <DataGridPagination sizes={[5, 10, 20]} />
          </div>
        </DataGrid>
      </FramePanel>
    </Frame>
  )
}
