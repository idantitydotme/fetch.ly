import { uuid, timestamp } from "drizzle-orm/pg-core"
import { z } from "zod"
import { sql } from "drizzle-orm"

export const id = uuid("id")
  .default(sql`uuidv7()`)
  .notNull()

export const timestamps = {
  updated_at: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => sql`now()`
  ),
  created_at: timestamp("created_at", { withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  deleted_at: timestamp("deleted_at", { withTimezone: true })
}

export const linkVariantEnum = z.enum([
  "solid",
  "outline",
  "subtle",
  "soft",
  "ghost",
  "link"
])

export const linkColorEnum = z.enum([
  "primary",
  "secondary",
  "neutral",
  "error",
  "warning",
  "success",
  "info"
])

export const ImageSchema = z.object({
  src: z.string().min(1, "Image source must be provided."),
  alt: z.string().min(1, "Image alt text must be provided."),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional()
})
export type Image = z.infer<typeof ImageSchema>

export const LinkSchema = z.object({
  label: z.string().min(1, "Link label must be provided."),
  to: z
    .string()
    .min(1, "Link destination must be provided.")
    .url("Link destination must be a valid URL."),
  icon: z.string().optional(),
  trailing: z.boolean().optional(),
  color: linkColorEnum.optional(),
  variant: linkVariantEnum.optional()
})
export type Link = z.infer<typeof LinkSchema>
