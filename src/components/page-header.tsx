import { PageBreadcrumb } from "./page-breadcrumb"

export function PageHeader({
  children,
  title = "Page Title",
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <header className="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-4 border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {children}
        <PageBreadcrumb />
      </div>
    </header>
  )
}
