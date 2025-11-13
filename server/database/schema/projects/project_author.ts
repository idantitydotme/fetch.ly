import { relations } from "drizzle-orm"
import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core"
import { project } from "../index"
import { author } from "../index"

export const project_author = pgTable(
  "project_author",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    authorId: uuid("author_id")
      .notNull()
      .references(() => author.id, { onDelete: "cascade" })
  },
  (t) => ({
    pk: primaryKey({ columns: [t.projectId, t.authorId] })
  })
)

export const project_authorRelations = relations(project_author, ({ one }) => ({
  project: one(project, {
    fields: [project_author.projectId],
    references: [project.id]
  }),
  author: one(author, {
    fields: [project_author.authorId],
    references: [author.id]
  })
}))
