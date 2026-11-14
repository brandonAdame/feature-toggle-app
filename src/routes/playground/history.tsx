import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/playground/history"!</div>
}
