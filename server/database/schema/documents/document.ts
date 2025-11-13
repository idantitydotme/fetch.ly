import { relations } from "drizzle-orm"
import { pgTable, uuid, text, jsonb } from "drizzle-orm/pg-core"
import { type Link, id, timestamps } from "../../types"
import { documentType } from "../index"

export const document = pgTable("document", {
  id: id.primaryKey(),
  slug: text("slug").notNull().unique(),
  type: uuid("document_type_id")
    .notNull()
    .references(() => documentType.id, {
      onDelete: "restrict",
      onUpdate: "cascade"
    }),
  title: text("title").default("New Project").notNull(),
  links: jsonb("links").$type<Link[]>(),
  content: jsonb("content").notNull(),
  ...timestamps
})
export const documentRelations = relations(document, ({ one }) => ({
  documentType: one(documentType, {
    fields: [document.type],
    references: [documentType.id]
  })
}))
