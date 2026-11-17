import { Badge } from "@/components/reui/badge"
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame"
import { previouslyInstalledFlags } from "./history-data"

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
})

export function PreviouslyInstalledFlags() {
  return (
    <Frame className="min-w-0" spacing="default">
      <FrameHeader>
        <FrameTitle>Previously installed</FrameTitle>
        <FrameDescription>
          Flags deployed to connected applications
        </FrameDescription>
      </FrameHeader>
      <FramePanel className="min-w-0">
        {previouslyInstalledFlags.length > 0 ? (
          <ul className="flex flex-col">
            {previouslyInstalledFlags.map((flag) => (
              <li
                className="flex items-center justify-between gap-3 border-b py-2.5 last:border-0"
                key={flag.id}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{flag.name}</p>
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    {flag.key}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {flag.application} <span aria-hidden="true">·</span>{" "}
                    {flag.environment}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <Badge
                    variant={
                      flag.state === "Installed" ? "success-light" : "outline"
                    }
                  >
                    {flag.state}
                  </Badge>
                  <time
                    className="text-xs text-muted-foreground"
                    dateTime={flag.lastChangedAt.toISOString()}
                  >
                    {shortDateFormatter.format(flag.lastChangedAt)}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p
            className="py-12 text-center text-sm text-muted-foreground"
            role="status"
          >
            No flags have been installed yet.
          </p>
        )}
      </FramePanel>
    </Frame>
  )
}
