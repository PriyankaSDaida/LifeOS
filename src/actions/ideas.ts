'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getIdeas() {
    const session = await auth()
    if (!session?.user?.id) return []

    return await prisma.idea.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' }
    })
}

export async function createIdea(data: {
    content: string
    color: string
    rotation: number
}) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const idea = await prisma.idea.create({
        data: {
            content: data.content,
            color: data.color,
            rotation: data.rotation,
            userId: session.user.id
        }
    })

    revalidatePath('/')
    return idea
}

export async function deleteIdea(id: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const existing = await prisma.idea.findUnique({ where: { id } })
    if (!existing || existing.userId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    await prisma.idea.delete({ where: { id } })
    revalidatePath('/')
}
