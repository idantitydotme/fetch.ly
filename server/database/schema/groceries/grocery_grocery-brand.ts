import { relations } from "drizzle-orm"
import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core"
import { grocery } from "../index"
import { groceryBrand } from "../index"

export const grocery_groceryBrand = pgTable(
  "grocery_grocery-brand",
  {
    groceryId: uuid("project_id")
      .notNull()
      .references(() => grocery.id, { onDelete: "cascade" }),
    groceryBrandId: uuid("author_id")
      .notNull()
      .references(() => groceryBrand.id, { onDelete: "cascade" })
  },
  (t) => ({
    pk: primaryKey({ columns: [t.groceryId, t.groceryBrandId] })
  })
)

export const grocery_groceryBrandRelations = relations(
  grocery_groceryBrand,
  ({ one }) => ({
    grocery: one(grocery, {
      fields: [grocery_groceryBrand.groceryId],
      references: [grocery.id]
    }),
    brand: one(groceryBrand, {
      fields: [grocery_groceryBrand.groceryBrandId],
      references: [groceryBrand.id]
    })
  })
)
