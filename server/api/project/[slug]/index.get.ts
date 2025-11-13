import { eq } from "drizzle-orm"
import { db } from "~~/server/database/drizzle"
import { project } from "~~/server/database/schema/projects/project"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug is required." })
  }

  try {
    return await db.query.project.findFirst({
      where: eq(project.slug, slug),
      with: {
        projectType: true,
        projectAuthors: {
          with: {
            author: true
          }
        }
      }
    })
  } catch (error) {
    console.error("Database fetch error:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch blog post."
    })
  }
})
