import { z } from "zod"
import {
  defineEventHandler,
  createError,
  readValidatedBody,
  setResponseStatus
} from "h3"
import { db } from "~~/server/database/drizzle"
import { blogPost } from "~~/server/database/schema"
import { v7 as uuidv7 } from "uuid"

const createBlogPostSchema = z
  .object({
    slug: z
      .string()
      .min(1, `Slug is required.`)
      .regex(
        /^[a-z0-9-/]+$/,
        `Slug can only contain lowercase letters, numbers, and hyphens.`
      )
      .transform((value) => value.trim().toLowerCase()),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    typeId: z.uuidv7().min(1, { message: "Type is required" })
  })
  .transform((data) => ({
    id: uuidv7(),
    slug: data.slug,
    type: data.typeId,
    title: data.title,
    description: data.description,
    content: {
      blocks: []
    },
    image: null,
    links: [],
    posted_at: null
  }))

export default defineEventHandler(async (event) => {
  const postData = await readValidatedBody(event, (data) =>
    createBlogPostSchema.parse(data)
  )

  setResponseStatus(event, 201)

  try {
    const [insertedPost] = await db
      .insert(blogPost)
      .values(postData)
      .returning({ id: blogPost.id, slug: blogPost.slug })

    if (!insertedPost) {
      console.error("Database insertion succeeded but returned no data.")
      throw createError({
        statusCode: 500,
        statusMessage:
          "Internal Server Error: Post created, but return data is missing."
      })
    }

    return {
      message: "Blog post created successfully.",
      id: insertedPost.id,
      slug: insertedPost.slug
    }
  } catch (error) {
    const dbError = error as { code?: string; message: string }
    const slug = postData.slug

    if (dbError.code === "23505") {
      throw createError({
        statusCode: 409,
        statusMessage: `A blog post with the slug '${slug}' already exists.`
      })
    }

    if (dbError.code === "23503") {
      throw createError({
        statusCode: 422,
        statusMessage: `The selected post type (ID: ${postData.type}) is invalid or does not exist.`
      })
    }

    console.error("Database insertion failed:", error)
    throw createError({
      statusCode: 500,
      statusMessage:
        "An unexpected database error occurred during post creation."
    })
  }
})
