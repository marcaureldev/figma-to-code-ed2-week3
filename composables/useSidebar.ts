/**
 * Open state of the mobile sidebar, shared so the top bar's menu button and
 * the sidebar itself stay in sync.
 */
export const useSidebar = () => {
  const isOpen = useState<boolean>('sidebar:open', () => false)

  const open = () => {
    isOpen.value = true
  }
  const close = () => {
    isOpen.value = false
  }
  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  // Navigating from the mobile menu should dismiss it.
  const route = useRoute()
  watch(() => route.fullPath, close)

  return { isOpen, open, close, toggle }
}
