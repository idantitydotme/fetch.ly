import { relations } from "drizzle-orm"
import { pgTable, text, integer } from "drizzle-orm/pg-core"
import { id, timestamps } from "../../types"
import { blogPost } from "../index"

export const blogPostType = pgTable("blog_post_type", {
  id: id.primaryKey(),
  index: integer("index").notNull().unique(),
  icon: text("icon").default("").notNull(),
  name: text("name").notNull().unique(),
  localizationKey: text("localization_key").notNull(),
  ...timestamps
})

export type BlogPostType = typeof blogPostType.$inferSelect

export const blogPostTypeRelations = relations(blogPostType, ({ many }) => ({
  blogPosts: many(blogPost)
}))
