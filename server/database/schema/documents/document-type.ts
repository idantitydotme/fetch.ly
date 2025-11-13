import { relations } from "drizzle-orm"
import { pgTable, text, integer } from "drizzle-orm/pg-core"
import { id, timestamps } from "../../types"
import { document } from "../index"

export const documentType = pgTable("document_type", {
  id: id.primaryKey(),
  index: integer("index").notNull().unique(),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
  ...timestamps
})
export const documentTypeRelations = relations(documentType, ({ many }) => ({
  documents: many(document)
}))
