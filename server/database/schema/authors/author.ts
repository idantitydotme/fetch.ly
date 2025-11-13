import { type InferSelectModel, relations } from "drizzle-orm"
import { pgTable, text, jsonb } from "drizzle-orm/pg-core"
import { type Image, id, timestamps } from "../../types"
import { blogPost_author } from "../index"

export const author = pgTable("author", {
  id: id.primaryKey(),
  avatar: jsonb("avatar").$type<Image>().notNull(),
  name: text("name").notNull(),
  username: text("username"),
  url: text("url"),
  ...timestamps
})

export type Author = InferSelectModel<typeof author>

export const authorRelations = relations(author, ({ many }) => ({
  blogPostAuthors: many(blogPost_author)
}))
