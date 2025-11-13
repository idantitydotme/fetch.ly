import { relations } from "drizzle-orm"
import { pgTable, text, integer } from "drizzle-orm/pg-core"
import { id, timestamps } from "../../types"
import { project } from "../index"

export const projectType = pgTable("project-type", {
  id: id.primaryKey(),
  index: integer("index").notNull().unique(),
  icon: text("icon").default("").notNull(),
  name: text("name").notNull().unique(),
  localizationKey: text("localization_key").notNull(),
  ...timestamps
})

export type ProjectType = typeof projectType.$inferSelect

export const projectTypeRelations = relations(projectType, ({ many }) => ({
  projects: many(project)
}))
