export type FeatureFlag = {
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

export const initialFlags: FeatureFlag[] = [
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

export type ActivityPoint = {
  date: string
  evaluations: number
  uniqueUsers: number
}

export const activityData: ActivityPoint[] = [
  { date: "Oct 15", evaluations: 19_200, uniqueUsers: 11_900 },
  { date: "Oct 18", evaluations: 24_400, uniqueUsers: 15_100 },
  { date: "Oct 21", evaluations: 17_200, uniqueUsers: 10_700 },
  { date: "Oct 24", evaluations: 29_600, uniqueUsers: 18_300 },
  { date: "Oct 27", evaluations: 23_200, uniqueUsers: 14_400 },
  { date: "Oct 30", evaluations: 27_200, uniqueUsers: 16_900 },
  { date: "Nov 2", evaluations: 20_400, uniqueUsers: 12_600 },
  { date: "Nov 5", evaluations: 32_800, uniqueUsers: 20_300 },
  { date: "Nov 7", evaluations: 25_600, uniqueUsers: 15_900 },
  { date: "Nov 9", evaluations: 30_800, uniqueUsers: 19_100 },
  { date: "Nov 10", evaluations: 28_000, uniqueUsers: 17_400 },
  { date: "Nov 14", evaluations: 36_800, uniqueUsers: 22_800 },
]

export const recentActivity = [
  {
    initials: "AM",
    person: "Alex Morgan",
    action: "enabled",
    flag: "New navigation",
    time: "2h ago",
  },
  {
    initials: "JD",
    person: "Jamie Davis",
    action: "updated",
    flag: "Smart recommendations",
    time: "5h ago",
  },
  {
    initials: "SK",
    person: "Sam Kim",
    action: "created",
    flag: "Billing redesign",
    time: "1d ago",
  },
  {
    initials: "RL",
    person: "Riley Lee",
    action: "paused",
    flag: "Faster search",
    time: "1d ago",
  },
] as const
