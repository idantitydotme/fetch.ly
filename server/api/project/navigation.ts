import { asc, type InferSelectModel } from "drizzle-orm"
import { db } from "../../database/drizzle"
import { project } from "~~/server/database/schema/projects/project"
import { projectType } from "~~/server/database/schema/projects/project-type"

export type ProjectTypeSelection = Pick<
  InferSelectModel<typeof projectType>,
  "icon" | "name" | "localizationKey"
>

export type ProjectSelection = Pick<
  InferSelectModel<typeof project>,
  "slug" | "title" | "description"
>

export type ProjectNavigationItem = ProjectTypeSelection & {
  projects: Array<ProjectSelection>
}

export type ProjectNavigationData = Array<ProjectNavigationItem>

export default defineEventHandler(async (): Promise<ProjectNavigationData> => {
  try {
    return await db.query.projectType.findMany({
      with: {
        projects: {
          columns: {
            slug: true,
            title: true,
            description: true
          },
          orderBy: [asc(project.index)]
        }
      },
      columns: {
        icon: true,
        name: true,
        localizationKey: true
      },
      orderBy: [asc(projectType.index)]
    })
  } catch (error) {
    // 4. Robust error handling remains
    console.error("Database fetch error for navigation:", error)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch project navigation menu data."
    })
  }
})
