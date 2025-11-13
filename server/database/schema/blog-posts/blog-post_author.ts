import { relations } from "drizzle-orm"
import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core"
import { blogPost } from "../index"
import { author } from "../index"

export const blogPost_author = pgTable(
  "blog-post_author",
  {
    blogPostId: uuid("blog_post_id")
      .notNull()
      .references(() => blogPost.id, { onDelete: "cascade" }),
    authorId: uuid("author_id")
      .notNull()
      .references(() => author.id, { onDelete: "cascade" })
  },
  (t) => ({
    pk: primaryKey({ columns: [t.blogPostId, t.authorId] })
  })
)

export const blogPost_authorRelations = relations(
  blogPost_author,
  ({ one }) => ({
    blogPost: one(blogPost, {
      fields: [blogPost_author.blogPostId],
      references: [blogPost.id]
    }),
    author: one(author, {
      fields: [blogPost_author.authorId],
      references: [author.id]
    })
  })
)
