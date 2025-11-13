import { relations } from "drizzle-orm"
import { pgTable, text, integer } from "drizzle-orm/pg-core"
import { id, timestamps } from "../../types"
import { grocery } from "../index"

export const groceryType = pgTable("grocery_type", {
  id: id.primaryKey(),
  index: integer("index").notNull().unique(),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
  ...timestamps
})

export const groceryTypeRelations = relations(groceryType, ({ many }) => ({
  groceries: many(grocery)
}))
