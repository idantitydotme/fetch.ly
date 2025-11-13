import {
  defineEventHandler,
  createError,
  getRouterParam,
  setResponseStatus
} from "h3"
import { db } from "~~/server/database/drizzle"
import { blogPost } from "~~/server/database/schema"
import { eq, sql } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, "id")

  if (!postId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid post ID."
    })
  }

  try {
    const updatedPosts = await db
      .update(blogPost)
      .set({
        posted_at: sql`now()`
      })
      .where(eq(blogPost.id, postId))
      .returning({ id: blogPost.id })

    if (updatedPosts.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: `Blog post with ID '${postId}' not found.`
      })
    }

    setResponseStatus(event, 200)

    return {
      message: "Blog post posted_at timestamp updated successfully to now().",
      id: postId
    }
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error
    }

    console.error(`Database update failed for ID ${postId}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage:
        "An unexpected database error occurred while updating the post timestamp."
    })
  }
})
