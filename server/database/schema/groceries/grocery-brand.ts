import { pgTable, text } from "drizzle-orm/pg-core"
import { id, timestamps } from "../../types"

export const groceryBrand = pgTable("grocery-brand", {
  id: id.primaryKey(),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
  ...timestamps
})
