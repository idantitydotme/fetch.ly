import { relations } from "drizzle-orm"
import { pgTable, text, jsonb, uuid, timestamp } from "drizzle-orm/pg-core"
import { type Image, type Link, id, timestamps } from "../../types"
import { blogPostType } from "../index"
import { author } from "../index"
import { blogPost_author } from "../index"

export const blogPost = pgTable("blog-post", {
  id: id.primaryKey(),
  slug: text("slug").notNull().unique(),
  type: uuid("blog_post_type_id")
    .notNull()
    .references(() => blogPostType.id, {
      onDelete: "restrict",
      onUpdate: "cascade"
    }),
  image: jsonb("image").$type<Image>(),
  title: text("title").default("Blog Post").notNull(),
  description: text("description").default("A blog post.").notNull(),
  links: jsonb("links").$type<Link[]>(),
  content: jsonb("content").notNull(),
  posted_at: timestamp("posted_at", { withTimezone: true }),
  ...timestamps
})

export type BlogPost = typeof blogPost.$inferSelect & {
  blogPostType: typeof blogPostType.$inferSelect
  blogPostAuthors: Array<
    typeof blogPost_author.$inferSelect & {
      author: typeof author.$inferSelect
    }
  >
}

export const blogPostRelations = relations(blogPost, ({ one, many }) => ({
  blogPostType: one(blogPostType, {
    fields: [blogPost.type],
    references: [blogPostType.id]
  }),
  blogPostAuthors: many(blogPost_author)
}))
