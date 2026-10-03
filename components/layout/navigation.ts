import type { IconName } from '~/components/ui/icons'

export interface NavigationItem {
  label: string
  icon: IconName
  to?: string
  hasSublinks?: boolean
}

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
