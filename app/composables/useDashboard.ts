import { createSharedComposable } from "@vueuse/core"

const _useDashboard = () => {
  const route = useRoute()
  const router = useRouter()
  const isNotificationsSlideoverOpen = ref(false)

  defineShortcuts({
    "g-h": () => router.push(`/internal`),
    "g-i": () => router.push(`/internal/housing`),
    "g-c": () => router.push(`/internal/health`),
    "g-d": () => router.push(`/internal/music`),
    "g-s": () => router.push(`/internal/settings`),
    n: () =>
      (isNotificationsSlideoverOpen.value = !isNotificationsSlideoverOpen.value)
  })

  watch(
    () => route.fullPath,
    () => {
      isNotificationsSlideoverOpen.value = false
    }
  )

  return {
    isNotificationsSlideoverOpen
  }
}

export const useDashboard = createSharedComposable(_useDashboard)
