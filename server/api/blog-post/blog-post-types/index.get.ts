import { asc } from "drizzle-orm"
import { blogPostType } from "~~/server/database/schema/blog-posts/blog-post-type"
import { db } from "~~/server/database/drizzle"

export default defineEventHandler(async (_event) => {
  try {
    const postTypes = await db.query.blogPostType.findMany({
      orderBy: [asc(blogPostType.index)],
      columns: {
        id: true,
        name: true,
        icon: true,
        index: true,
        localizationKey: true
      }
    })

    if (!postTypes) {
      throw createError({
        statusCode: 404,
        statusMessage: "Blog post types not found."
      })
    }

    return postTypes
  } catch (error) {
    console.error("Failed to fetch blog post types:", error)

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error while fetching post types."
    })
  }
})
