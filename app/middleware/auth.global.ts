import { authClient } from "~~/lib/auth-client"

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { data: session } = await authClient.useSession(useFetch)

  // User is not authenticated
  if (!session.value) {
    if (to.path === "/internal") {
      return navigateTo("/auth/sign-in")
    }
    if (to.path === "/blog/drafts") {
      return navigateTo("/auth/sign-in")
    }
  }

  // User is authenticated
  if (session.value) {
    if (to.path === "/auth/sign-in" || to.path === "/auth/sign-up") {
      return navigateTo("/")
    }
  }
})
