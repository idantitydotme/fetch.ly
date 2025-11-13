import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"
import { id, timestamps } from "../../types"
import { relations } from "drizzle-orm"
import { groceryType } from "../index"
import { grocery_groceryBrand } from "../index"

export const grocery = pgTable("grocery", {
  id: id.primaryKey(),
  type: uuid("grocery_type_id")
    .notNull()
    .references(() => groceryType.id, {
      onDelete: "restrict",
      onUpdate: "cascade"
    }),
  imageSrc: varchar("image_src", { length: 512 }),
  name: varchar("name", { length: 255 }).notNull(),
  packageSize: varchar("package_size", { length: 50 }),
  notes: varchar("notes", { length: 256 }),
  ...timestamps
})

export const groceryRelations = relations(grocery, ({ one, many }) => ({
  groceryType: one(groceryType, {
    fields: [grocery.type],
    references: [groceryType.id]
  }),
  groceryBrands: many(grocery_groceryBrand)
}))
