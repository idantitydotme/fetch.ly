import { relations } from "drizzle-orm"
import {
  pgTable,
  text,
  integer,
  jsonb,
  uuid,
  timestamp
} from "drizzle-orm/pg-core"
import { type Image, type Link, id, timestamps } from "../../types"
import { projectType } from "../index"
import { author } from "../index"
import { project_author } from "../index"

export const project = pgTable("project", {
  id: id.primaryKey(),
  index: integer("index").notNull(),
  slug: text("slug").notNull().unique(),
  type: uuid("project_type_id")
    .notNull()
    .references(() => projectType.id, {
      onDelete: "restrict",
      onUpdate: "cascade"
    }),
  image: jsonb("image").$type<Image>(),
  title: text("title").default("New Project").notNull(),
  description: text("description").default("A project.").notNull(),
  links: jsonb("links").$type<Link[]>(),
  content: jsonb("content").notNull(),
  posted_at: timestamp("posted_at", { withTimezone: true, mode: "date" }),
  ...timestamps
})

export type Project = typeof project.$inferSelect & {
  projectType: typeof projectType.$inferSelect
  projectAuthors: Array<
    typeof project_author.$inferSelect & {
      author: typeof author.$inferSelect
    }
  >
}

export const projectRelations = relations(project, ({ one, many }) => ({
  projectType: one(projectType, {
    fields: [project.type],
    references: [projectType.id]
  }),
  projectAuthors: many(project_author)
}))
