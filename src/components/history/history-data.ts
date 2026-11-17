export type FlagInstallState = "Installed" | "Removed"
export type InstallAction = "Installed" | "Updated" | "Removed" | "Rolled back"
export type InstallResult = "Succeeded" | "Failed"

export type PreviouslyInstalledFlag = {
  id: string
  name: string
  key: string
  application: string
  environment: string
  state: FlagInstallState
  lastChangedAt: Date
}

export type InstallEvent = {
  id: string
  occurredAt: Date
  flagName: string
  flagKey: string
  application: string
  environment: string
  action: InstallAction
  result: InstallResult
  actor: string
}

export type InstallActivityPoint = {
  date: Date
  storefrontWeb: number
  iosApp: number
  adminConsole: number
  billingApi: number
}

export const previouslyInstalledFlags: PreviouslyInstalledFlag[] = [
  {
    id: "checkout-simplification",
    name: "Checkout simplification",
    key: "checkout-simplification",
    application: "Storefront Web",
    environment: "Production",
    state: "Installed",
    lastChangedAt: new Date("2026-11-17T10:34:00Z"),
  },
  {
    id: "smart-suggestions",
    name: "Smart product suggestions",
    key: "smart-suggestions",
    application: "iOS app",
    environment: "Production",
    state: "Installed",
    lastChangedAt: new Date("2026-11-16T16:20:00Z"),
  },
  {
    id: "bulk-invoice-export",
    name: "Bulk invoice export",
    key: "bulk-invoice-export",
    application: "Admin console",
    environment: "Staging",
    state: "Installed",
    lastChangedAt: new Date("2026-11-15T13:15:00Z"),
  },
  {
    id: "usage-based-billing",
    name: "Usage-based billing",
    key: "usage-based-billing",
    application: "Billing API",
    environment: "Production",
    state: "Installed",
    lastChangedAt: new Date("2026-11-14T09:42:00Z"),
  },
  {
    id: "returns-portal",
    name: "Returns portal",
    key: "returns-portal",
    application: "Storefront Web",
    environment: "Beta",
    state: "Removed",
    lastChangedAt: new Date("2026-11-13T11:17:00Z"),
  },
  {
    id: "legacy-search-index",
    name: "Legacy search index",
    key: "legacy-search-index",
    application: "Admin console",
    environment: "Production",
    state: "Removed",
    lastChangedAt: new Date("2026-11-10T12:45:00Z"),
  },
]

export const installEvents: InstallEvent[] = [
  {
    id: "evt-2026-11-17-1034",
    occurredAt: new Date("2026-11-17T10:34:00Z"),
    flagName: "Checkout simplification",
    flagKey: "checkout-simplification",
    application: "Storefront Web",
    environment: "Production",
    action: "Installed",
    result: "Succeeded",
    actor: "Alex Morgan",
  },
  {
    id: "evt-2026-11-16-1620",
    occurredAt: new Date("2026-11-16T16:20:00Z"),
    flagName: "Smart product suggestions",
    flagKey: "smart-suggestions",
    application: "iOS app",
    environment: "Production",
    action: "Updated",
    result: "Succeeded",
    actor: "Jamie Chen",
  },
  {
    id: "evt-2026-11-15-1315",
    occurredAt: new Date("2026-11-15T13:15:00Z"),
    flagName: "Bulk invoice export",
    flagKey: "bulk-invoice-export",
    application: "Admin console",
    environment: "Staging",
    action: "Installed",
    result: "Succeeded",
    actor: "Asha Patel",
  },
  {
    id: "evt-2026-11-14-0942",
    occurredAt: new Date("2026-11-14T09:42:00Z"),
    flagName: "Usage-based billing",
    flagKey: "usage-based-billing",
    application: "Billing API",
    environment: "Production",
    action: "Updated",
    result: "Failed",
    actor: "Riley Lee",
  },
  {
    id: "evt-2026-11-13-1117",
    occurredAt: new Date("2026-11-13T11:17:00Z"),
    flagName: "Returns portal",
    flagKey: "returns-portal",
    application: "Storefront Web",
    environment: "Beta",
    action: "Removed",
    result: "Succeeded",
    actor: "Sam Kim",
  },
  {
    id: "evt-2026-11-12-0853",
    occurredAt: new Date("2026-11-12T08:53:00Z"),
    flagName: "Checkout simplification",
    flagKey: "checkout-simplification",
    application: "Storefront Web",
    environment: "Staging",
    action: "Rolled back",
    result: "Succeeded",
    actor: "Alex Morgan",
  },
  {
    id: "evt-2026-11-11-1502",
    occurredAt: new Date("2026-11-11T15:02:00Z"),
    flagName: "Smart product suggestions",
    flagKey: "smart-suggestions",
    application: "iOS app",
    environment: "Production",
    action: "Installed",
    result: "Succeeded",
    actor: "Jamie Chen",
  },
  {
    id: "evt-2026-11-10-1245",
    occurredAt: new Date("2026-11-10T12:45:00Z"),
    flagName: "Legacy search index",
    flagKey: "legacy-search-index",
    application: "Admin console",
    environment: "Production",
    action: "Removed",
    result: "Succeeded",
    actor: "Riley Lee",
  },
  {
    id: "evt-2026-11-09-0930",
    occurredAt: new Date("2026-11-09T09:30:00Z"),
    flagName: "Usage-based billing",
    flagKey: "usage-based-billing",
    application: "Billing API",
    environment: "Production",
    action: "Updated",
    result: "Succeeded",
    actor: "Alex Morgan",
  },
  {
    id: "evt-2026-11-08-1720",
    occurredAt: new Date("2026-11-08T17:20:00Z"),
    flagName: "Bulk invoice export",
    flagKey: "bulk-invoice-export",
    application: "Admin console",
    environment: "Staging",
    action: "Installed",
    result: "Succeeded",
    actor: "Asha Patel",
  },
  {
    id: "evt-2026-11-07-1410",
    occurredAt: new Date("2026-11-07T14:10:00Z"),
    flagName: "Returns portal",
    flagKey: "returns-portal",
    application: "Storefront Web",
    environment: "Beta",
    action: "Installed",
    result: "Failed",
    actor: "Sam Kim",
  },
  {
    id: "evt-2026-11-06-1005",
    occurredAt: new Date("2026-11-06T10:05:00Z"),
    flagName: "Checkout simplification",
    flagKey: "checkout-simplification",
    application: "Storefront Web",
    environment: "Production",
    action: "Updated",
    result: "Succeeded",
    actor: "Alex Morgan",
  },
]

export const installActivity: InstallActivityPoint[] = [
  {
    date: new Date("2026-10-13T12:00:00Z"),
    storefrontWeb: 8,
    iosApp: 4,
    adminConsole: 3,
    billingApi: 2,
  },
  {
    date: new Date("2026-10-20T12:00:00Z"),
    storefrontWeb: 10,
    iosApp: 5,
    adminConsole: 4,
    billingApi: 3,
  },
  {
    date: new Date("2026-10-27T12:00:00Z"),
    storefrontWeb: 9,
    iosApp: 6,
    adminConsole: 4,
    billingApi: 4,
  },
  {
    date: new Date("2026-11-03T12:00:00Z"),
    storefrontWeb: 12,
    iosApp: 7,
    adminConsole: 5,
    billingApi: 5,
  },
  {
    date: new Date("2026-11-10T12:00:00Z"),
    storefrontWeb: 14,
    iosApp: 8,
    adminConsole: 6,
    billingApi: 6,
  },
  {
    date: new Date("2026-11-17T12:00:00Z"),
    storefrontWeb: 16,
    iosApp: 9,
    adminConsole: 7,
    billingApi: 8,
  },
]
