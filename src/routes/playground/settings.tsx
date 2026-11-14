import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/playground/settings"!</div>
}
