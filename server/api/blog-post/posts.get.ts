import { desc, isNotNull } from "drizzle-orm"
import { db } from "~~/server/database/drizzle"
import { blogPost } from "~~/server/database/schema"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = Math.max(1, parseInt(query.limit as string) || 10)
  const offset = Math.max(0, parseInt(query.offset as string) || 0)

  try {
    return await db.query.blogPost.findMany({
      where: isNotNull(blogPost.posted_at),
      with: {
        blogPostType: {
          columns: {
            id: true,
            localizationKey: true
          }
        },
        blogPostAuthors: {
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
      orderBy: [desc(blogPost.created_at)],
      limit: limit,
      offset: offset
    })
  } catch (error) {
    console.error("Database fetch error:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch blog posts."
    })
  }
})
