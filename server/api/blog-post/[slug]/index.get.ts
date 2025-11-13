import { and, eq, isNotNull } from "drizzle-orm"
import { db } from "~~/server/database/drizzle"
import { blogPost } from "~~/server/database/schema/blog-posts/blog-post"
import { auth } from "~~/lib/auth"
import { getRouterParam, createError, getHeaders } from "h3"

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug is required." })
  }

  const headers = new Headers(getHeaders(event) as HeadersInit)
  const session = await auth.api.getSession({ headers })
  const isEmployee = session?.user?.role === "employee"

  try {
    const post = await db.query.blogPost.findFirst({
      where: isEmployee
        ? eq(blogPost.slug, slug)
        : and(eq(blogPost.slug, slug), isNotNull(blogPost.posted_at)),
      with: {
        blogPostType: true,
        blogPostAuthors: {
          with: {
            author: true
          }
        }
      }
    })

    if (!post) {
      throw createError({ statusCode: 404, statusMessage: "Post not found." })
    }

    return post
  } catch (error) {
    console.error("Database fetch error:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch blog post."
    })
  }
})
