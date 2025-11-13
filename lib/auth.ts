import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../server/database/drizzle"
import { v7 as uuidv7 } from "uuid"
import { admin } from "better-auth/plugins"
import { generateUniqueTag } from "./utils"

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  advanced: {
    database: {
      generateId: () => uuidv7()
    },
    cookiePrefix: "better-auth",
    useSecureCookies: true
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    modelName: "rateLimit",
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": {
        window: 10,
        max: 3
      },
      "/two-factor/*": async (_request) => {
        return {
          window: 10,
          max: 3
        }
      }
    }
  },
  user: {
    additionalFields: {
      tag: {
        type: "string",
        required: false,
        default: "0000",
        input: false
      },
      role: {
        type: "string",
        required: false,
        default: "user",
        input: false
      },
      firstName: {
        type: "string",
        required: true,
        default: "",
        input: true
      },
      lastName: {
        type: "string",
        required: true,
        default: "",
        input: true
      }
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    freshAge: 60 * 15,
    disableSessionRefresh: false,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5
    }
  },
  plugins: [admin()],
  databaseHooks: {
    user: {
      create: {
        before: async (user, _ctx) => {
          const role = user.email.endsWith("@test.com") ? "employee" : "user"
          const uniqueTag = await generateUniqueTag(user.name)

          return {
            data: {
              ...user,
              role: role,
              tag: uniqueTag
            }
          }
        }
      }
    }
  }
})

export type Session = typeof auth.$Infer.Session
