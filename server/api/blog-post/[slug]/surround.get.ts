import { and, eq, lt, gt, desc, asc, isNotNull } from "drizzle-orm"
import { db } from "~~/server/database/drizzle"
import {
  blogPost,
  type BlogPost
} from "~~/server/database/schema/blog-posts/blog-post"

export default defineEventHandler(
  async (
    event
  ): Promise<{ previous: BlogPost | null; next: BlogPost | null }> => {
    const slug = getRouterParam(event, "slug")

    if (!slug) {
      throw createError({ statusCode: 400, statusMessage: "Slug is required." })
    }

    try {
      const currentPost = await db.query.blogPost.findFirst({
        where: and(eq(blogPost.slug, slug), isNotNull(blogPost.posted_at)),
        columns: {
          id: true,
          posted_at: true,
          type: true
        }
      })

      if (!currentPost) {
        throw createError({
          statusCode: 404,
          statusMessage: "Blog post not found."
        })
      }

      const { posted_at: currentPostedAt, type: currentType } = currentPost

      // Guard against posts that haven't been 'posted' (e.g., drafts)
      if (!currentPostedAt) {
        return { previous: null, next: null }
      }

      const [previousPost, nextPost] = await Promise.all([
        db.query.blogPost.findFirst({
          where: and(
            eq(blogPost.type, currentType),
            lt(blogPost.posted_at, currentPostedAt),
            isNotNull(blogPost.posted_at)
          ),
          orderBy: [desc(blogPost.posted_at), desc(blogPost.id)],
          columns: {
            slug: true,
            title: true,
            description: true,
            posted_at: true
          }
        }) as Promise<BlogPost | undefined>,

        db.query.blogPost.findFirst({
          where: and(
            eq(blogPost.type, currentType),
            gt(blogPost.posted_at, currentPostedAt),
            isNotNull(blogPost.posted_at)
          ),
          orderBy: [asc(blogPost.posted_at), asc(blogPost.id)],
          columns: {
            slug: true,
            title: true,
            description: true,
            posted_at: true
          }
        }) as Promise<BlogPost | undefined>
      ])

      return {
        previous: previousPost ?? null,
        next: nextPost ?? null
      }
    } catch (error) {
      console.error("Database fetch error:", error)
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch surrounding blog posts."
      })
    }
  }
)
