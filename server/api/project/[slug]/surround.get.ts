import { and, eq, lt, gt, desc, asc } from "drizzle-orm"
import { db } from "~~/server/database/drizzle"
import {
  project,
  type Project
} from "~~/server/database/schema/projects/project"

export default defineEventHandler(
  async (
    event
  ): Promise<{ previous: Project | null; next: Project | null }> => {
    const slug = getRouterParam(event, "slug")

    if (!slug) {
      throw createError({ statusCode: 400, statusMessage: "Slug is required." })
    }

    try {
      const currentProject = await db.query.project.findFirst({
        where: eq(project.slug, slug),
        columns: {
          id: true,
          index: true,
          type: true
        }
      })

      if (!currentProject) {
        throw createError({
          statusCode: 404,
          statusMessage: "Project not found."
        })
      }

      const { index: currentIndex, type: currentType } = currentProject

      const [previousProject, nextProject] = await Promise.all([
        db.query.project.findFirst({
          where: and(
            eq(project.type, currentType),
            gt(project.index, currentIndex)
          ),
          orderBy: [asc(project.index), asc(project.id)],
          columns: {
            slug: true,
            title: true,
            description: true,
            index: true
          }
        }) as Promise<Project | undefined>,

        db.query.project.findFirst({
          where: and(
            eq(project.type, currentType),
            lt(project.index, currentIndex)
          ),
          orderBy: [desc(project.index), desc(project.id)],
          columns: {
            slug: true,
            title: true,
            description: true,
            index: true
          }
        }) as Promise<Project | undefined>
      ])

      return {
        previous: previousProject ?? null,
        next: nextProject ?? null
      }
    } catch (error) {
      console.error("Database fetch error:", error)
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to fetch surrounding projects."
      })
    }
  }
)
