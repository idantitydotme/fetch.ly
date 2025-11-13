import { asc, desc, isNull, type InferSelectModel } from "drizzle-orm"
import { db } from "~~/server/database/drizzle"
import { blogPost } from "~~/server/database/schema/blog-posts/blog-post"
import { blogPostType } from "~~/server/database/schema/blog-posts/blog-post-type"

export type BlogTypeSelection = Pick<
  InferSelectModel<typeof blogPostType>,
  "icon" | "name" | "localizationKey"
>

export type BlogPostSelection = Pick<
  InferSelectModel<typeof blogPost>,
  "slug" | "title" | "description"
>

export type BlogNavigationItem = BlogTypeSelection & {
  blogPosts: Array<BlogPostSelection>
}

export type BlogNavigationData = Array<BlogNavigationItem>

export default defineEventHandler(async (): Promise<BlogNavigationData> => {
  try {
    return await db.query.blogPostType.findMany({
      with: {
        blogPosts: {
          where: isNull(blogPost.posted_at),
          columns: {
            slug: true,
            title: true,
            description: true
          },
          orderBy: [desc(blogPost.posted_at)]
        }
      },
      columns: {
        icon: true,
        name: true,
        localizationKey: true
      },
      orderBy: [asc(blogPostType.index)]
    })
  } catch (error) {
    console.error("Database fetch error for navigation:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch blog navigation menu data."
    })
  }
})
