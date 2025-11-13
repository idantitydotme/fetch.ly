import { createAuthClient } from "better-auth/vue"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { adminClient } from "better-auth/client/plugins"
import type { auth } from "./auth"

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()]
})

export type Session = typeof authClient.$Infer.Session
