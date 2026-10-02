import type { IconName } from '~/components/ui/icons'

export interface NavigationItem {
  label: string
  icon: IconName
  /** Undefined while the design has no screen behind the entry. */
  to?: string
  hasSublinks?: boolean
}

/** The sidebar menu, in the order and with the icons the design specifies. */
export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', icon: 'home', to: '/' },
  { label: 'News', icon: 'news', to: '/news' },
  { label: 'Activities', icon: 'chart' },
  { label: 'Cards', icon: 'credit-card' },
  { label: 'Reports', icon: 'reports', hasSublinks: true },
  { label: 'Notifications', icon: 'bell' },
  { label: 'Billing', icon: 'wallet' },
  { label: 'Invoices', icon: 'invoice' },
  { label: 'Help center', icon: 'headphone' },
  { label: 'Settings', icon: 'settings' },
]
