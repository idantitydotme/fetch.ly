import { desc } from "drizzle-orm"
import { db } from "../../database/drizzle"
import { project } from "~~/server/database/schema"

export default defineEventHandler(async () => {
  try {
    return await db.query.project.findMany({
      with: {
        projectType: {
          columns: {
            id: true,
            localizationKey: true
          }
        },
        projectAuthors: {
          with: {
            author: {
              columns: {
                id: true,
                avatar: true,
                name: true,
                username: true,
                url: true
              }
            }
          }
        }
      },
      orderBy: [desc(project.created_at)]
    })
  } catch (error) {
    console.error("Database fetch error:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch projects."
    })
  }
})
