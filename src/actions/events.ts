'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getEvents() {
    const session = await auth()
    if (!session?.user?.id) return []

    return await prisma.event.findMany({
        where: { userId: session.user.id },
        orderBy: { start: 'asc' }
    })
}

export async function createEvent(data: {
    title: string
    start: Date
    end: Date
    isGoal: boolean
    isCompleted: boolean
}) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const event = await prisma.event.create({
        data: {
            title: data.title,
            start: data.start,
            end: data.end,
            isGoal: data.isGoal,
            isCompleted: data.isCompleted,
            userId: session.user.id
        }
    })

    revalidatePath('/')
    return event
}

export async function updateEvent(id: string, data: Partial<{
    title: string
    start: Date
    end: Date
    isGoal: boolean
    isCompleted: boolean
}>) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const existing = await prisma.event.findUnique({ where: { id } })
    if (!existing || existing.userId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    const updated = await prisma.event.update({
        where: { id },
        data
    })

    revalidatePath('/')
    return updated
}

export async function deleteEvent(id: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const existing = await prisma.event.findUnique({ where: { id } })
    if (!existing || existing.userId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    await prisma.event.delete({ where: { id } })
    revalidatePath('/')
}
