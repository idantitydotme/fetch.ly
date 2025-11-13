import {
  defineEventHandler,
  createError,
  getRouterParam,
  setResponseStatus
} from "h3"
import { db } from "~~/server/database/drizzle"
import { blogPost } from "~~/server/database/schema"
import { eq } from "drizzle-orm"
import { validate as uuidValidate, version as uuidVersion } from "uuid"

export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, "id")

  if (!postId || !uuidValidate(postId) || uuidVersion(postId) !== 7) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Invalid or missing post ID. Must be a valid UUIDv7 format."
    })
  }

  try {
    const deletedPosts = await db
      .delete(blogPost)
      .where(eq(blogPost.id, postId))
      .returning({ id: blogPost.id })

    if (deletedPosts.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: `Blog post with ID '${postId}' not found.`
      })
    }

    setResponseStatus(event, 200)

    return {
      message: "Blog post deleted successfully.",
      id: postId
    }
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error
    }

    console.error(`Database deletion failed for ID ${postId}:`, error)
    throw createError({
      statusCode: 500,
      statusMessage:
        "An unexpected database error occurred during post deletion."
    })
  }
})
