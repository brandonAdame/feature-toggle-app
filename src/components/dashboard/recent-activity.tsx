import { ChevronRightIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { recentActivity } from "./dashboard-data"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="border-b border-border/70">
        <CardTitle>Recent activity</CardTitle>
        <CardDescription className="mt-1">
          Updates from your workspace
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 pt-5">
        {recentActivity.map(({ initials, person, action, flag, time }) => (
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
        <Button type="button" variant="outline" size="sm" className="w-full">
          View all activity
          <ChevronRightIcon />
        </Button>
      </CardContent>
    </Card>
  )
}
